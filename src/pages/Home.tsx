import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Projects } from "../components/Projects";
import { Research } from "../components/Research";
import { Stack } from "../components/Stack";
import { Experience } from "../components/Experience";
import { Contact } from "../components/Contact";

export function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Research />
      <Stack />
      <Experience />
      <Contact />
    </>
  );
}
