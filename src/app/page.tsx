import { AskSiddhant } from "@/components/AskSiddhant";
import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { CursorSpotlight, NeuralBackground } from "@/components/NeuralBackground";
import { Nav } from "@/components/Nav";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Impact } from "@/components/Impact";
import { CommandPalette } from "@/components/CommandPalette";
import { Providers } from "@/components/ui";

export default function Home() {
  return (
    <Providers>
      <NeuralBackground />
      <CursorSpotlight />
      <div className="grain" aria-hidden />
      <Nav />
      <CommandPalette />
      <main>
        <Hero />
        <Experience />
        <Impact />
        <Projects />
        <AskSiddhant />
        <Skills />
        <Education />
        <Contact />
      </main>
    </Providers>
  );
}
