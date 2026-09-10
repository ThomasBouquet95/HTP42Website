import { HomeHero } from "@/components/sections/HomeHero";
import { Positioning } from "@/components/sections/Positioning";
import { Offerings } from "@/components/sections/Offerings";
import { ExpertiseAreas } from "@/components/sections/ExpertiseAreas";
import { ProofPoints } from "@/components/sections/ProofPoints";
import { TheNetwork } from "@/components/sections/TheNetwork";
import { FeaturedCases } from "@/components/sections/FeaturedCases";
import { PerspectivesTeaser } from "@/components/sections/PerspectivesTeaser";
import { CtaBand } from "@/components/CtaBand";

/**
 * Section order follows the navigation: expertise, the network, client impact,
 * perspectives. The network section carries the "why HTP42" argument, since
 * splitting the two produced a duplicate discussion of the same subject.
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
      <FeaturedCases />
      <PerspectivesTeaser />
      <CtaBand
        secondary={{ label: "Read the case studies", href: "/impact" }}
      />
    </>
  );
}
