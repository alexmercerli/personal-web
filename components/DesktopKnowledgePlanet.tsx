"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { PlanetTag } from "@/lib/planetTags";

const KnowledgePlanet = dynamic(
  () => import("@/components/KnowledgePlanet").then((module) => module.KnowledgePlanet),
  {
    ssr: false,
    loading: () => <div className="planet-loading" aria-hidden="true" />
  }
);

type DesktopKnowledgePlanetProps = {
  tags: PlanetTag[];
};

export function DesktopKnowledgePlanet({ tags }: DesktopKnowledgePlanetProps) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 681px)");
    const update = () => setIsDesktop(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return isDesktop ? <KnowledgePlanet tags={tags} /> : null;
}
