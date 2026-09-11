"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Field } from "@/content/registry";
import { signOut } from "@/app/admin/actions";

/**
 * The content editor: the real site in a preview, with its text open for
 * editing, and an export of everything that changed.
 *
 * Nothing publishes from here. Edits are a draft held in this browser, and the
 * export is a file handed back to a developer who applies it. That keeps the
 * repository the single source of truth for the site's copy, and it means the
 * editor needs no database and no second environment variable.
 *
 * Fields are matched to the preview by their exact text, which is why no
 * component needed a data attribute to make this work. The consequence is that
 * matching is best effort: a sentence broken across an italic accent will not
 * be found in the page. Those fields stay fully editable in the panel, they
 * just do not light up in the preview, and the export is keyed by content path
 * either way, so what a developer receives is never ambiguous.
 */

const DRAFT_KEY = "htp42-content-draft-v1";

const PAGES = [
  { label: "Home", path: "/" },
  { label: "Expertise", path: "/expertise" },
  { label: "The Network", path: "/network" },
  { label: "Client Impact", path: "/impact" },
  { label: "Perspectives", path: "/perspectives" },
  { label: "Contact", path: "/contact" },
];

const WIDTHS = [
  { label: "Desktop", value: 1440 },
  { label: "Tablet", value: 820 },
  { label: "Phone", value: 390 },
];

type Draft = Record<string, string>;

export function Editor({ fields }: { fields: Field[] }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [draft, setDraft] = useState<Draft>({});
  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState(PAGES[0].path);
  const [width, setWidth] = useState(WIDTHS[0].value);
  const [query, setQuery] = useState("");
  const [onPage, setOnPage] = useState<Set<string>>(new Set());
  const [focusPath, setFocusPath] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const byPath = useMemo(
    () => new Map(fields.map((f) => [f.path, f])),
    [fields],
  );

  /** The text currently shown for a field: the draft if edited, else original. */
  const current = useCallback(
    (path: string) => draft[path] ?? String(byPath.get(path)?.value ?? ""),
    [draft, byPath],
  );

  // Restore the draft before the first preview scan, so reopening the editor
  // shows the work in progress rather than the published text.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(DRAFT_KEY);
      if (raw) setDraft(JSON.parse(raw));
    } catch {
      // A blocked or full localStorage should not stop the editor opening.
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch {
      // Nothing to do: the draft simply will not survive a refresh.
    }
  }, [draft, loaded]);

  const changes = useMemo(
    () =>
      fields
        .filter((f) => draft[f.path] !== undefined)
        .filter((f) => draft[f.path] !== String(f.value)),
    [fields, draft],
  );

  /** Every text node in the preview, so text can be found and replaced. */
  const textNodes = useCallback((): Text[] => {
    const doc = frame.current?.contentDocument;
    if (!doc?.body) return [];
    const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
    const out: Text[] = [];
    let node = walker.nextNode();
    while (node) {
      const text = node.nodeValue ?? "";
      if (text.trim().length > 1) out.push(node as Text);
      node = walker.nextNode();
    }
    return out;
  }, []);

  /**
   * Where each field's text sits in the preview.
   *
   * Resolved once per page load and then reused. Searching by text on every
   * keystroke does not work: after the first character the node holds neither
   * the original nor the finished new value, so the field stops being found,
   * drops out of the panel, and the input you are typing into unmounts.
   *
   * `template` is the node's full original text, so a field that is only part
   * of a longer run can be rewritten from the original every time rather than
   * from whatever the last keystroke left behind.
   */
  const anchors = useRef<
    Map<string, { node: Text; template: string; original: string }[]>
  >(new Map());

  /** Write the draft into the nodes already resolved for this page. */
  const applyDraft = useCallback(() => {
    for (const [path, list] of anchors.current) {
      const shown = current(path);
      for (const { node, template, original } of list) {
        const next =
          template === original ? shown : template.replace(original, shown);
        if (node.nodeValue !== next) node.nodeValue = next;
      }
    }
  }, [current]);

  /** Resolve every field to its nodes in the freshly loaded preview. */
  const scanPreview = useCallback(() => {
    const nodes = textNodes();
    if (nodes.length === 0) return;

    const exact = new Map<string, Text[]>();
    for (const node of nodes) {
      const key = (node.nodeValue ?? "").trim();
      const list = exact.get(key);
      if (list) list.push(node);
      else exact.set(key, [node]);
    }
    const corpus = nodes.map((n) => n.nodeValue).join(" ");

    const found = new Map<
      string,
      { node: Text; template: string; original: string }[]
    >();
    for (const field of fields) {
      const original = String(field.value);
      if (original.length < 2) continue;

      // The page may already be showing a draft value, so accept either.
      const shown = current(field.path);
      const hit = exact.get(original) ?? exact.get(shown);
      if (hit) {
        found.set(
          field.path,
          hit.map((node) => ({
            node,
            template: node.nodeValue ?? "",
            original: (node.nodeValue ?? "").trim(),
          })),
        );
        continue;
      }
      // Part of a longer run of text.
      if (original.length >= 12 && corpus.includes(original)) {
        const node = nodes.find((n) => n.nodeValue?.includes(original));
        if (node) {
          found.set(field.path, [
            { node, template: node.nodeValue ?? "", original },
          ]);
        }
      }
    }

    anchors.current = found;
    setOnPage(new Set(found.keys()));
    applyDraft();
  }, [fields, current, textNodes, applyDraft]);

  /**
   * Which field produced a given run of text. Held in a ref so the listener
   * installed in the preview always consults the latest draft rather than the
   * values that existed when it was attached.
   */
  const matchText = useRef<(text: string) => string | null>(() => null);
  matchText.current = (text: string) => {
    const exact = fields.find((f) => current(f.path) === text);
    if (exact) return exact.path;
    const inside = fields.find(
      (f) => current(f.path).length > 11 && text.includes(current(f.path)),
    );
    return inside?.path ?? null;
  };

  /** Clicking text in the preview jumps to the field that produced it. */
  const wirePreview = useCallback(() => {
    const doc = frame.current?.contentDocument as
      | (Document & { __htp42Wired?: boolean })
      | undefined;
    if (!doc || doc.__htp42Wired) return;
    doc.__htp42Wired = true;

    doc.addEventListener(
      "click",
      (event) => {
        const target = event.target as HTMLElement | null;
        const text = target?.textContent?.trim();
        if (!text) return;
        const path = matchText.current(text);
        if (!path) return;
        // Only swallow the click when it actually resolved to a field, so
        // links and buttons in the preview still work.
        event.preventDefault();
        event.stopPropagation();
        setQuery("");
        setFocusPath(path);
      },
      true,
    );
  }, []);

  /** Kept in a ref so the load listener always runs the latest scan. */
  const onLoadRef = useRef<() => void>(() => {});
  onLoadRef.current = () => {
    wirePreview();
    scanPreview();
  };

  /**
   * Wire and sync the preview. A native load listener rather than React's
   * onLoad: the iframe often finishes loading before hydration attaches the
   * prop, so onLoad is missed and nothing is ever wired. This also covers the
   * already loaded case and any navigation the reader does inside the preview.
   */
  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const handle = () => onLoadRef.current();
    el.addEventListener("load", handle);
    if (el.contentDocument?.readyState === "complete") handle();
    return () => el.removeEventListener("load", handle);
    // Only the page matters here. Depending on the callbacks would re-attach
    // and re-scan on every keystroke, because they close over the draft.
  }, [page]);

  // Every keystroke only writes into nodes already resolved, so typing stays
  // cheap and the panel does not re-order underneath the cursor.
  useEffect(() => {
    if (loaded) applyDraft();
  }, [draft, loaded, applyDraft]);

  useEffect(() => {
    if (!focusPath) return;
    const el = document.getElementById(`field-${focusPath}`);
    el?.scrollIntoView({ block: "center", behavior: "smooth" });
    (el as HTMLInputElement | HTMLTextAreaElement | null)?.focus();
    const timer = window.setTimeout(() => setFocusPath(null), 1200);
    return () => window.clearTimeout(timer);
  }, [focusPath]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const pool = q ? fields : fields.filter((f) => onPage.has(f.path));
    if (!q) return pool;
    return pool.filter(
      (f) =>
        current(f.path).toLowerCase().includes(q) ||
        f.label.toLowerCase().includes(q) ||
        f.context.toLowerCase().includes(q),
    );
  }, [fields, query, onPage, current]);

  const groups = useMemo(() => {
    const map = new Map<string, Field[]>();
    for (const field of visible) {
      const list = map.get(field.context);
      if (list) list.push(field);
      else map.set(field.context, [field]);
    }
    return [...map.entries()];
  }, [visible]);

  const exportPayload = useMemo(
    () => ({
      site: "htp42.com",
      generatedAt: new Date().toISOString(),
      note: "Text changes from the HTP42 content editor. Apply each change at the given content path.",
      changeCount: changes.length,
      changes: changes.map((f) => ({
        path: f.path,
        where: `${f.context} - ${f.label}`,
        before: String(f.value),
        after: draft[f.path],
      })),
    }),
    [changes, draft],
  );

  const download = () => {
    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const stamp = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `htp42-text-changes-${stamp}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(
        JSON.stringify(exportPayload, null, 2),
      );
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const discard = () => {
    if (!window.confirm("Discard every change in this draft?")) return;
    setDraft({});
  };

  return (
    <div className="flex h-dvh flex-col">
      <header className="flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-ink/12 bg-paper px-4 py-3">
        <div className="flex items-baseline gap-2.5">
          <span className="eyebrow text-ink-300">HTP42</span>
          <span className="text-sm font-medium">Content editor</span>
        </div>

        <nav className="flex flex-wrap items-center gap-1" aria-label="Pages">
          {PAGES.map((p) => (
            <button
              key={p.path}
              type="button"
              onClick={() => setPage(p.path)}
              aria-current={page === p.path ? "page" : undefined}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                page === p.path
                  ? "bg-ink text-white"
                  : "text-ink-400 hover:bg-ink/5 hover:text-ink"
              }`}
            >
              {p.label}
            </button>
          ))}
        </nav>

        <div
          className="flex items-center gap-1"
          role="group"
          aria-label="Preview width"
        >
          {WIDTHS.map((w) => (
            <button
              key={w.value}
              type="button"
              onClick={() => setWidth(w.value)}
              aria-pressed={width === w.value}
              className={`rounded-full px-2.5 py-1.5 text-xs transition-colors ${
                width === w.value
                  ? "bg-brand-soft text-brand"
                  : "text-ink-300 hover:text-ink"
              }`}
            >
              {w.label}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-3">
          <span className="tnum text-xs text-ink-400">
            {changes.length === 0
              ? "No changes"
              : `${changes.length} change${changes.length === 1 ? "" : "s"}`}
          </span>
          {changes.length > 0 ? (
            <>
              <button
                type="button"
                onClick={discard}
                className="text-xs font-medium text-ink-400 hover:text-ink"
              >
                Discard
              </button>
              <button
                type="button"
                onClick={copy}
                className="rounded-full border border-ink/20 px-3.5 py-1.5 text-xs font-medium text-ink transition-colors hover:border-brand hover:text-brand"
              >
                {copied ? "Copied" : "Copy"}
              </button>
              <button
                type="button"
                onClick={download}
                className="rounded-full bg-ink px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-brand"
              >
                Export
              </button>
            </>
          ) : null}
          <form action={signOut}>
            <button
              type="submit"
              className="text-xs font-medium text-ink-300 hover:text-ink"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <div className="min-h-0 flex-1 overflow-auto bg-ink/5 p-4">
          <div
            className="mx-auto h-full bg-paper shadow-sm"
            style={{ maxWidth: width }}
          >
            <iframe
              ref={frame}
              src={page}
              title="Site preview"
              className="h-full w-full border-0"
            />
          </div>
        </div>

        <aside className="flex min-h-0 w-full flex-col border-t border-ink/12 bg-paper lg:w-[26rem] lg:border-t-0 lg:border-l">
          <div className="border-b border-ink/10 px-4 py-3">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search all text on the site"
              aria-label="Search all text"
              className="w-full rounded-md border border-ink/15 bg-paper px-3 py-2 text-sm outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/25"
            />
            <p className="mt-2 text-xs text-ink-400">
              {query
                ? `${visible.length} of ${fields.length} fields`
                : `${visible.length} fields on this page. Click text in the preview to jump to it.`}
            </p>
          </div>

          <div className="min-h-0 flex-1 overflow-auto px-4 pb-10">
            {groups.map(([context, list]) => (
              <section key={context} className="mt-5">
                <h2 className="eyebrow sticky top-0 bg-paper py-2 text-ink-300">
                  {context}
                </h2>
                {list.map((field) => {
                  const value = current(field.path);
                  const isChanged = value !== String(field.value);
                  return (
                    <div
                      key={field.path}
                      className="border-t border-ink/[0.07] py-3.5"
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <label
                          htmlFor={`field-${field.path}`}
                          className="text-xs font-medium text-ink"
                        >
                          {field.label}
                          {isChanged ? (
                            <span className="ml-2 font-normal text-brand">
                              changed
                            </span>
                          ) : null}
                        </label>
                        {isChanged ? (
                          <button
                            type="button"
                            onClick={() =>
                              setDraft((d) => {
                                const next = { ...d };
                                delete next[field.path];
                                return next;
                              })
                            }
                            className="shrink-0 text-xs text-ink-300 hover:text-brand"
                          >
                            Revert
                          </button>
                        ) : null}
                      </div>

                      {field.kind === "textarea" ? (
                        <textarea
                          id={`field-${field.path}`}
                          value={value}
                          rows={Math.min(9, Math.ceil(value.length / 44) + 1)}
                          onChange={(event) =>
                            setDraft((d) => ({
                              ...d,
                              [field.path]: event.target.value,
                            }))
                          }
                          className={`mt-2 w-full rounded-md border bg-paper px-3 py-2 text-sm leading-relaxed outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/25 ${
                            isChanged ? "border-brand/50" : "border-ink/15"
                          }`}
                        />
                      ) : (
                        <input
                          id={`field-${field.path}`}
                          type={field.kind === "number" ? "number" : "text"}
                          value={value}
                          onChange={(event) =>
                            setDraft((d) => ({
                              ...d,
                              [field.path]: event.target.value,
                            }))
                          }
                          className={`mt-2 w-full rounded-md border bg-paper px-3 py-2 text-sm outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/25 ${
                            isChanged ? "border-brand/50" : "border-ink/15"
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </section>
            ))}

            {groups.length === 0 ? (
              <p className="mt-6 text-sm text-ink-400">
                {query
                  ? "Nothing matches that search."
                  : "No editable text found on this page yet. Give the preview a moment, or search for the words you want to change."}
              </p>
            ) : null}
          </div>
        </aside>
      </div>
    </div>
  );
}
