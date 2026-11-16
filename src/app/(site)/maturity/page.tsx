import type { Metadata } from "next";
import { Navigator } from "./Navigator";
import "./navigator.css";

export const metadata: Metadata = {
  title: "CDISC Maturity Navigator",
  description:
    "A vendor neutral diagnostic across five CDISC capabilities, scored against the published CIMM model, with OpenStudyBuilder implementation guidance. Runs entirely in your browser.",
};

export default function MaturityPage() {
  return <Navigator />;
}
