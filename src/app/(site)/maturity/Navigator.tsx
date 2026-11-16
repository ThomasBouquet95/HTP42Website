"use client";

import Script from "next/script";

declare global {
  interface Window {
    exportJSON?: () => void;
  }
}

/**
 * The chrome around the CDISC Maturity Navigator.
 *
 * The tool itself is public/maturity-navigator.js, a plain script that writes
 * its markup into #nav and #view. It is the logic and is left as it is; this
 * component supplies the frame it is missing — a masthead that says whose
 * workspace this is, the step rail, and the one control that is not part of
 * any single view. The site layout supplies the header and footer, so the
 * tool sits inside the site rather than beside it.
 *
 * The script is loaded after hydration, which is after #nav and #view exist,
 * and it defines the handlers its own generated markup calls.
 */
export function Navigator() {
  return (
    <div className="nv">
      <div className="nvTop">
        <div className="nvWrap nvTopIn">
          <div>
            <p className="nvKicker">CDISC Maturity Navigator</p>
            <p className="nvWorkspace" id="topLabel">
              Understand your CDISC maturity
            </p>
            <p className="nvWorkspaceNote">
              Twenty five indicators across five capabilities, scored against
              the published CIMM model. Nothing you enter leaves this browser.
            </p>
          </div>

          <div className="nvTopActions">
            <span className="tag" id="modeBadge" />
            <button
              type="button"
              className="nvGhost noprint"
              onClick={() => window.exportJSON?.()}
            >
              Export data
            </button>
          </div>
        </div>
      </div>

      <div className="nvRail">
        <nav className="nvWrap nvRailIn" id="nav" aria-label="Assessment steps" />
      </div>

      <div className="content" id="view">
        <noscript>
          <p className="lede">
            The Navigator scores your answers in the browser, so it needs
            JavaScript to run. With it switched off there is nothing to score.
          </p>
        </noscript>
      </div>

      <Script src="/maturity-navigator.js" strategy="afterInteractive" />
    </div>
  );
}
