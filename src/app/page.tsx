import { HomeHero } from "@/components/sections/HomeHero";
import { Positioning } from "@/components/sections/Positioning";
import { PracticesGrid } from "@/components/sections/PracticesGrid";
import { ProofPoints } from "@/components/sections/ProofPoints";
import { WhyHtp42 } from "@/components/sections/WhyHtp42";
import { FeaturedCases } from "@/components/sections/FeaturedCases";
import { NetworkTeaser } from "@/components/sections/NetworkTeaser";
import { PerspectivesTeaser } from "@/components/sections/PerspectivesTeaser";
import { CtaBand } from "@/components/CtaBand";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Positioning />
      <PracticesGrid />
      <ProofPoints />
      <WhyHtp42 />
      <FeaturedCases />
      <NetworkTeaser />
      <PerspectivesTeaser />
      <CtaBand
        secondary={{ label: "Read the case studies", href: "/impact" }}
      />
    </>
  );
}
