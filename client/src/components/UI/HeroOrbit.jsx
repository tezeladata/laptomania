import { cn } from "../../lib/utils";

export const HeroOrbit = ({ className = "" }) => {
  return (
    <div className={cn("hero-orbit", className)}>
      <div className="hero-orbit__sphere" />
      <span className="hero-orbit__ring hero-orbit__ring--1" />
      <span className="hero-orbit__ring hero-orbit__ring--2" />
      <span className="hero-orbit__ring hero-orbit__ring--3" />
      <span className="hero-orbit__ring hero-orbit__ring--4" />
      <span className="hero-orbit__ring hero-orbit__ring--5" />

      <div className="hero-orbit__chip">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
};
