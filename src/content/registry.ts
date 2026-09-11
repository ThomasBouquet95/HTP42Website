import { site, proofPoints, nav, clients, capabilityKeywords } from "@/content/site";
import { offerings } from "@/content/offerings";
import { expertiseAreas, engagementModel } from "@/content/expertise";
import {
  EXPERT_COUNT,
  leadership,
  disciplines,
  modelComparison,
  values,
} from "@/content/network";
import { audiences, networkEffect } from "@/content/audiences";
import { caseStudies } from "@/content/cases";
import { perspectives } from "@/content/perspectives";

/**
 * Every piece of editable content on the site, in one tree.
 *
 * This is the source of truth that ships with the build. The admin editor
 * stores only the fields that have been changed, keyed by their path in this
 * tree, and `getContent()` merges the two. Anything not overridden falls back
 * here, so the site renders correctly with no store configured at all.
 *
 * Derived values (allServices, featuredCases, proofFacts and so on) are
 * deliberately absent: they are recomputed from the merged tree in
 * `getContent()`, because an override to an expertise area has to flow into
 * the flattened service list as well.
 */
export const contentDefaults = {
  site,
  nav,
  proofPoints,
  clients,
  capabilityKeywords,
  offerings,
  expertiseAreas,
  engagementModel,
  expertCount: EXPERT_COUNT,
  leadership,
  disciplines,
  modelComparison,
  values,
  audiences,
  networkEffect,
  caseStudies,
  perspectives,
};

export type ContentTree = typeof contentDefaults;

/** A changed field, keyed by its dotted path: `offerings.0.points.1.detail`. */
export type Overrides = Record<string, string | number>;

/**
 * Keys that are structural rather than copy. Editing a slug would break the
 * URL it generates and every link to it; an icon name has to match a component
 * that exists. They are read only in the editor.
 */
const STRUCTURAL = new Set([
  "slug",
  "href",
  "icon",
  "logo",
  "url",
  "featured",
  "suffix",
]);

export type Field = {
  path: string;
  value: string | number;
  /** Sentence case label for the field itself, e.g. "Promise". */
  label: string;
  /** Where it sits, e.g. "Offerings › Expert Deployment". */
  context: string;
  kind: "text" | "textarea" | "number";
};

const LABELS: Record<string, string> = {
  site: "Site",
  nav: "Navigation",
  proofPoints: "Numbers band",
  clients: "Client list",
  capabilityKeywords: "Capability marquee",
  offerings: "How we work with you",
  expertiseAreas: "Expertise areas",
  engagementModel: "Engagement model",
  expertCount: "Expert count",
  leadership: "Partners",
  disciplines: "Disciplines",
  modelComparison: "Model comparison",
  values: "Values",
  audiences: "Three sided proposition",
  networkEffect: "Network effect line",
  caseStudies: "Case studies",
  perspectives: "Perspectives",
};

function humanise(key: string): string {
  const spaced = key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

/** A readable name for an item in a list, so the editor is navigable. */
function itemName(item: unknown, index: number): string {
  if (item && typeof item === "object") {
    const o = item as Record<string, unknown>;
    for (const key of ["name", "title", "label", "who", "dimension"]) {
      if (typeof o[key] === "string") return o[key] as string;
    }
  }
  return `Item ${index + 1}`;
}

/**
 * Walk the tree and collect every editable leaf. Generic on purpose: content I
 * add later shows up in the editor without anyone maintaining a field list.
 */
export function collectFields(
  node: unknown = contentDefaults,
  path: string[] = [],
  context: string[] = [],
): Field[] {
  const out: Field[] = [];

  if (Array.isArray(node)) {
    node.forEach((item, i) => {
      const label = typeof item === "string" ? `${i + 1}` : itemName(item, i);
      out.push(
        ...collectFields(
          item,
          [...path, String(i)],
          typeof item === "string" ? context : [...context, label],
        ),
      );
    });
    return out;
  }

  if (node && typeof node === "object") {
    for (const [key, value] of Object.entries(node)) {
      if (STRUCTURAL.has(key)) continue;
      out.push(...collectFields(value, [...path, key], context));
    }
    return out;
  }

  if (typeof node === "string" || typeof node === "number") {
    const key = path[path.length - 1] ?? "";
    const top = path[0] ?? "";
    // A numeric last segment means a plain string inside an array.
    const isIndex = /^\d+$/.test(key);
    const label = isIndex ? `${Number(key) + 1}` : humanise(key);
    const ctx = [LABELS[top] ?? humanise(top), ...context].join(" › ");
    out.push({
      path: path.join("."),
      value: node,
      label,
      context: ctx,
      kind:
        typeof node === "number"
          ? "number"
          : node.length > 90
            ? "textarea"
            : "text",
    });
  }

  return out;
}

/** Read a value out of the defaults tree by path. Used to validate writes. */
export function defaultAt(path: string): string | number | undefined {
  let node: unknown = contentDefaults;
  for (const seg of path.split(".")) {
    if (node === null || typeof node !== "object") return undefined;
    node = (node as Record<string, unknown>)[seg];
  }
  return typeof node === "string" || typeof node === "number" ? node : undefined;
}

/**
 * Keep only overrides that name a real editable leaf and actually differ from
 * the default. That drops stale paths after a content refactor, refuses
 * anything invented by hand, and stops the store filling with no-op entries.
 */
export function sanitiseOverrides(raw: unknown): Overrides {
  if (!raw || typeof raw !== "object") return {};
  const editable = new Map(collectFields().map((f) => [f.path, f]));
  const out: Overrides = {};
  for (const [path, value] of Object.entries(raw as Record<string, unknown>)) {
    const field = editable.get(path);
    if (!field) continue;
    if (field.kind === "number") {
      const n = typeof value === "number" ? value : Number(value);
      if (!Number.isFinite(n) || n === field.value) continue;
      out[path] = n;
      continue;
    }
    if (typeof value !== "string") continue;
    const trimmed = value.replace(/\r\n/g, "\n");
    if (trimmed === field.value) continue;
    out[path] = trimmed;
  }
  return out;
}

/** Deep clone the defaults and apply the overrides on top. */
export function applyOverrides(overrides: Overrides): ContentTree {
  const tree = structuredClone(contentDefaults) as unknown as Record<
    string,
    unknown
  >;
  for (const [path, value] of Object.entries(overrides)) {
    const segs = path.split(".");
    let node: Record<string, unknown> | unknown[] = tree;
    for (const seg of segs.slice(0, -1)) {
      const next = (node as Record<string, unknown>)[seg];
      if (next === null || typeof next !== "object") {
        node = null as never;
        break;
      }
      node = next as Record<string, unknown>;
    }
    if (!node) continue;
    (node as Record<string, unknown>)[segs[segs.length - 1]] = value;
  }
  return tree as unknown as ContentTree;
}
