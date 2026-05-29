import { Hero } from "@/app/components/Hero";
import { About } from "@/app/components/About";
import { Projects } from "@/app/components/Projects";
import { Contact } from "@/app/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Contact />
    </main>
  );
}
