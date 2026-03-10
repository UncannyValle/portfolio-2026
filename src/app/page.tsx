import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Separator } from "@/components/ui/Separator";
import { CAREERS, PROJECTS, SKILLS } from "@/lib/data";

export default function Home() {
  return (
    <main>
      <Hero />
      <Separator className="mx-auto w-[min(92%,72rem)]" />
      <About />
      <Separator className="mx-auto w-[min(92%,72rem)]" />
      <Skills skills={SKILLS} />
      <Separator className="mx-auto w-[min(92%,72rem)]" />
      <Projects projects={PROJECTS} />
      <Separator className="mx-auto w-[min(92%,72rem)]" />
      <Experience careers={CAREERS} />
      <Separator className="mx-auto w-[min(92%,72rem)]" />
      <Contact />
    </main>
  );
}
