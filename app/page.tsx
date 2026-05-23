import { CinematicHero } from "@/components/layout/cinematic-hero";
import { EraSection } from "@/components/layout/era-section";
import { PipelineTimeline } from "@/components/layout/pipeline-timeline";
import { TokenGallery } from "@/components/layout/token-gallery";
import { ChapterIndex } from "@/components/layout/chapter-index";
import { CinematicFooter } from "@/components/layout/cinematic-footer";

export default function Home() {
  return (
    <>
      <CinematicHero />
      <EraSection />
      <PipelineTimeline />
      <TokenGallery />
      <ChapterIndex />
      <CinematicFooter />
    </>
  );
}
