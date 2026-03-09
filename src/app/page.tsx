import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Separator } from "@/components/ui/separator";
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
