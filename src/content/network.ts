export type Leader = {
  name: string;
  role: string;
  note: string;
  /**
   * Square portrait under `public/team/`. Optional: where we do not hold a
   * photograph the card falls back to a typeset monogram, so a partner can be
   * listed before their portrait arrives.
   */
  photo?: string;
};


/** Headline network size. Extended sourcing sits on top of this. */
export const EXPERT_COUNT = 50;

export const leadership: Leader[] = [
  {
    name: "Pascal Bouquet",
    role: "Managing Director & Partner",
    note: "Former Novartis VP and Head of Technology (CTO) for data42. Health data, AI strategy and clinical data systems.",
    photo: "/team/pascal-bouquet.jpg",
  },
  {
    name: "Gabriel Eichler",
    role: "Partner",
    note: "Former VP and Chief Data Officer for data42 at Novartis. Advises top 10 pharma and investors.",
    photo: "/team/gabriel-eichler.jpg",
  },
  {
    name: "Jennifer Cubino",
    role: "Partner",
    note: "Clinical operations executive, first in human through post authorisation. Real world data, EMR and privacy, across oncology, immunology and rare disease.",
    photo: "/team/jennifer-cubino.jpg",
  },
  {
    name: "Linda Dib",
    role: "Partner",
    note: "Data strategy leader with deep experience in clinical trial reengineering and biostatistics.",
    photo: "/team/linda-dib.jpg",
  },
];




