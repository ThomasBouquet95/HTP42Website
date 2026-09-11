"use client";

import { useMemo, useState, useTransition } from "react";
import type { Field, Overrides } from "@/content/registry";
import { resetAll, saveContent, signOut } from "@/app/admin/actions";

/**
 * The content editor.
 *
 * The field list is generated from the content tree rather than maintained by
 * hand, so anything added to the site later appears here on its own. The job
 * this has to do well is "find a sentence and change it", so the filter is the
 * primary control: it matches the text itself as well as the labels.
 *
 * Only changed fields are sent. Reverting a field sends the original text,
 * which the server drops from the store because it equals the default.
 */
export function Editor({
  fields,
  overrides,
  storeKind,
  storeMessage,
}: {
  fields: Field[];
  overrides: Overrides;
  storeKind: "blob" | "file" | "none";
  storeMessage?: string;
}) {
  const initial = useMemo(() => {
    const map: Record<string, string> = {};
    for (const field of fields) {
      const override = overrides[field.path];
      map[field.path] = String(override ?? field.value);
    }
    return map;
  }, [fields, overrides]);

  const [values, setValues] = useState<Record<string, string>>(initial);
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(
    null,
  );
  const [pending, startTransition] = useTransition();

  const defaults = useMemo(() => {
    const map: Record<string, string> = {};
    for (const field of fields) map[field.path] = String(field.value);
    return map;
  }, [fields]);

  const changed = useMemo(
    () => fields.filter((f) => values[f.path] !== initial[f.path]),
    [fields, values, initial],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return fields;
    return fields.filter(
      (f) =>
        values[f.path]?.toLowerCase().includes(q) ||
        f.label.toLowerCase().includes(q) ||
        f.context.toLowerCase().includes(q),
    );
  }, [fields, query, values]);

  const groups = useMemo(() => {
    const map = new Map<string, Field[]>();
    for (const field of filtered) {
      const list = map.get(field.context);
      if (list) list.push(field);
      else map.set(field.context, [field]);
    }
    return [...map.entries()];
  }, [filtered]);

  const save = () => {
    const payload: Record<string, string> = {};
    for (const field of changed) payload[field.path] = values[field.path];
    startTransition(async () => {
      const result = await saveContent(payload);
      setNotice({ ok: result.ok, text: result.message });
    });
  };

  const revertAll = () => {
    startTransition(async () => {
      const result = await resetAll();
      setNotice({ ok: result.ok, text: result.message });
      if (result.ok) setValues(defaults);
    });
  };

  const overriddenCount = fields.filter(
    (f) => values[f.path] !== defaults[f.path],
  ).length;

  return (
    <div className="mx-auto max-w-4xl px-5 pb-40 md:px-8">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-ink/12 pt-12 pb-6">
        <div>
          <p className="eyebrow text-ink-300">HTP42</p>
          <h1 className="mt-3 text-3xl tracking-[-0.03em]">Content editor</h1>
          <p className="mt-2 text-sm text-ink-400">
            {fields.length} editable fields. {overriddenCount} changed from the
            original.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-brand hover:underline"
          >
            View site
          </a>
          <form action={signOut}>
            <button
              type="submit"
              className="text-sm font-medium text-ink-400 hover:text-ink"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>

      {storeKind === "none" ? (
        <p className="mt-6 rounded-lg border border-amber-400/60 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
          <strong className="font-medium">Saving is not set up yet.</strong>{" "}
          {storeMessage}
        </p>
      ) : null}

      {storeKind === "file" ? (
        <p className="mt-6 rounded-lg border border-ink/15 bg-paper p-4 text-sm text-ink-600">
          Saving to a local file, for development only.
        </p>
      ) : null}

      <div className="sticky top-0 z-10 -mx-5 mt-6 bg-paper-2/95 px-5 py-4 backdrop-blur md:-mx-8 md:px-8">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search the text you want to change"
          aria-label="Search fields"
          className="w-full rounded-md border border-ink/15 bg-paper px-4 py-3 text-base outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/25"
        />
        {query ? (
          <p className="mt-2 text-xs text-ink-400">
            {filtered.length} of {fields.length} fields
          </p>
        ) : null}
      </div>

      {groups.map(([context, list]) => (
        <section key={context} className="mt-10">
          <h2 className="eyebrow border-b border-ink/12 pb-3 text-ink-300">
            {context}
          </h2>
          <div className="flex flex-col">
            {list.map((field) => {
              const isChanged = values[field.path] !== initial[field.path];
              const isOverridden = values[field.path] !== defaults[field.path];
              return (
                <div
                  key={field.path}
                  className="border-b border-ink/[0.07] py-5"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <label
                      htmlFor={field.path}
                      className="text-sm font-medium tracking-[-0.006em] text-ink"
                    >
                      {field.label}
                      {isChanged ? (
                        <span className="ml-2 align-middle text-xs font-normal text-brand">
                          unsaved
                        </span>
                      ) : null}
                    </label>
                    {isOverridden ? (
                      <button
                        type="button"
                        onClick={() =>
                          setValues((v) => ({
                            ...v,
                            [field.path]: defaults[field.path],
                          }))
                        }
                        className="shrink-0 text-xs font-medium text-ink-400 hover:text-brand"
                      >
                        Revert
                      </button>
                    ) : null}
                  </div>

                  {field.kind === "textarea" ? (
                    <textarea
                      id={field.path}
                      value={values[field.path]}
                      rows={Math.min(
                        8,
                        Math.ceil(values[field.path].length / 78) + 1,
                      )}
                      onChange={(event) =>
                        setValues((v) => ({
                          ...v,
                          [field.path]: event.target.value,
                        }))
                      }
                      className="mt-2.5 w-full rounded-md border border-ink/15 bg-paper px-3.5 py-2.5 text-sm leading-relaxed outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/25"
                    />
                  ) : (
                    <input
                      id={field.path}
                      type={field.kind === "number" ? "number" : "text"}
                      value={values[field.path]}
                      onChange={(event) =>
                        setValues((v) => ({
                          ...v,
                          [field.path]: event.target.value,
                        }))
                      }
                      className="mt-2.5 w-full rounded-md border border-ink/15 bg-paper px-3.5 py-2.5 text-sm outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/25"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {groups.length === 0 ? (
        <p className="mt-10 text-base text-ink-400">
          Nothing matches “{query}”.
        </p>
      ) : null}

      {/* Save bar */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-ink/12 bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-5 py-4 md:px-8">
          <div className="min-w-0">
            {notice ? (
              <p
                role="status"
                className={`truncate text-sm ${notice.ok ? "text-ink-600" : "text-red-700"}`}
              >
                {notice.text}
              </p>
            ) : (
              <p className="text-sm text-ink-400">
                {changed.length === 0
                  ? "No unsaved changes."
                  : `${changed.length} unsaved change${changed.length === 1 ? "" : "s"}.`}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {overriddenCount > 0 ? (
              <button
                type="button"
                onClick={revertAll}
                disabled={pending}
                className="text-sm font-medium text-ink-400 hover:text-ink disabled:opacity-50"
              >
                Reset all
              </button>
            ) : null}
            <button
              type="button"
              onClick={save}
              disabled={pending || changed.length === 0 || storeKind === "none"}
              className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand disabled:opacity-40"
            >
              {pending ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
