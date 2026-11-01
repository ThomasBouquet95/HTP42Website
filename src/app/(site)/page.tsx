import { HomeHero } from "@/components/sections/HomeHero";
import { Positioning } from "@/components/sections/Positioning";
import { Offerings } from "@/components/sections/Offerings";
import { ExpertiseAreas } from "@/components/sections/ExpertiseAreas";
import { ProofPoints } from "@/components/sections/ProofPoints";
import { TheNetwork } from "@/components/sections/TheNetwork";
import { ClientImpact } from "@/components/sections/ClientImpact";
import { PerspectivesTeaser } from "@/components/sections/PerspectivesTeaser";
import { CtaBand } from "@/components/CtaBand";

/**
 * The site. There is one page, and the navigation is its sections: expertise,
 * the network, client impact, perspectives, contact. The network section
 * carries the "why HTP42" argument, since splitting the two produced a
 * duplicate discussion of the same subject.
 *
 * Every section the navigation points at owns the matching id and a scroll
 * margin that clears the fixed header.
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Positioning />
      <Offerings />
      <ExpertiseAreas />
      <ProofPoints />
      <TheNetwork />
      <ClientImpact />
      <PerspectivesTeaser />
      <CtaBand />
    </>
  );
}
