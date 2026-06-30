import { GlitchText } from "./GlitchText";
import { IntroCubes } from "./IntroCubes";
import styles from "../home.module.css";

export function HeroSection() {
  return (
    <section
      data-scroll-section
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-8 text-center"
    >
      <p className="relative z-10 mb-5 text-xs tracking-[0.55em] text-[#9b967f]">
        SYSTEM WAKE SEQUENCE
      </p>
      <h1
        aria-label="Hello"
        className={`${styles.helloWord} relative z-10 text-7xl font-bold uppercase tracking-[0.08em] sm:text-9xl`}
      >
        <GlitchText text="Hello" />
      </h1>
      <IntroCubes />
      <div className="absolute bottom-10 z-10 flex flex-col items-center gap-3 text-[10px] tracking-[0.4em] text-[#9b967f]">
        <span>SCROLL TO INITIALIZE</span>
        <span aria-hidden="true" className="h-12 w-px bg-[#9b967f]" />
      </div>
    </section>
  );
}
