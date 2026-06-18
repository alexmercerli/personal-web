"use client";

import { useEffect, useRef, useState } from "react";

type MobileTab = {
  label: string;
  href: string;
  icon: "person" | "experience" | "projects" | "lab" | "life";
};

type MobileTabBarProps = {
  tabs: readonly MobileTab[];
};

const icons = {
  person: (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 12.2a3.7 3.7 0 1 0 0-7.4 3.7 3.7 0 0 0 0 7.4Z" />
      <path d="M5.4 19.4c.8-3.1 3.3-4.8 6.6-4.8s5.8 1.7 6.6 4.8" />
    </svg>
  ),
  projects: (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M5 5.5h5.6v5.6H5z" />
      <path d="M13.4 5.5H19v5.6h-5.6z" />
      <path d="M5 13.4h5.6V19H5z" />
      <path d="M13.4 13.4H19V19h-5.6z" />
    </svg>
  ),
  experience: (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M7.1 8.1V6.7A1.7 1.7 0 0 1 8.8 5h6.4a1.7 1.7 0 0 1 1.7 1.7v1.4" />
      <path d="M5.7 8.1h12.6a1.6 1.6 0 0 1 1.6 1.6v7.7a1.6 1.6 0 0 1-1.6 1.6H5.7a1.6 1.6 0 0 1-1.6-1.6V9.7a1.6 1.6 0 0 1 1.6-1.6Z" />
      <path d="M9.1 12.4h5.8" />
      <path d="M12 10.9v3" />
    </svg>
  ),
  lab: (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 4.5v4.2" />
      <path d="M7.2 12H4.5" />
      <path d="M19.5 12h-2.7" />
      <path d="M8.6 8.6 6.8 6.8" />
      <path d="m17.2 6.8-1.8 1.8" />
      <path d="M12 9.1 14.9 12 12 14.9 9.1 12z" />
      <path d="M12 15.3v4.2" />
    </svg>
  ),
  life: (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M6.8 5.3h10.4a1.4 1.4 0 0 1 1.4 1.4v12l-6.6-3-6.6 3v-12a1.4 1.4 0 0 1 1.4-1.4Z" />
      <path d="M9 9h6" />
    </svg>
  )
};

export function MobileTabBar({ tabs }: MobileTabBarProps) {
  const [hidden, setHidden] = useState(false);
  const [activeIcon, setActiveIcon] = useState<MobileTab["icon"]>(tabs[0]?.icon ?? "person");
  const lastScrollY = useRef(0);
  const idleTimer = useRef<number | null>(null);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const sectionIdByIcon: Partial<Record<MobileTab["icon"], string>> = {
      person: "about",
      experience: "ground",
      projects: "projects",
      lab: "lab",
      life: "beyond-work"
    };

    const updateActiveSection = () => {
      const marker = window.innerHeight * 0.38;
      let nextActive = tabs[0]?.icon ?? "person";

      tabs.forEach((tab) => {
        const sectionId = sectionIdByIcon[tab.icon];
        const section = sectionId ? document.getElementById(sectionId) : null;
        if (section && section.getBoundingClientRect().top <= marker) {
          nextActive = tab.icon;
        }
      });

      setActiveIcon(nextActive);
    };

    const updateFromHash = () => {
      const targetId = window.location.hash.slice(1);
      const matchingTab = tabs.find((tab) => sectionIdByIcon[tab.icon] === targetId);

      if (matchingTab) {
        setActiveIcon(matchingTab.icon);
      } else {
        updateActiveSection();
      }
    };

    const showWhenIdle = () => {
      if (idleTimer.current) {
        window.clearTimeout(idleTimer.current);
      }

      idleTimer.current = window.setTimeout(() => {
        setHidden(false);
      }, 900);
    };

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      updateActiveSection();

      if (currentY < 24 || delta < -4) {
        setHidden(false);
      } else if (delta > 6) {
        setHidden(true);
        showWhenIdle();
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", updateFromHash);
    window.addEventListener("resize", updateActiveSection);
    const syncTimer = window.setTimeout(updateFromHash, 350);
    updateFromHash();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", updateFromHash);
      window.removeEventListener("resize", updateActiveSection);
      window.clearTimeout(syncTimer);
      if (idleTimer.current) {
        window.clearTimeout(idleTimer.current);
      }
    };
  }, [tabs]);

  return (
    <nav className={hidden ? "mobile-tab-bar is-hidden" : "mobile-tab-bar"} aria-label="Mobile portfolio navigation">
      {tabs.map((tab) => (
        <a
          className={tab.icon === activeIcon ? "active" : undefined}
          href={tab.href}
          key={tab.label}
          aria-current={tab.icon === activeIcon ? "location" : undefined}
        >
          <span className="mobile-tab-icon">{icons[tab.icon]}</span>
          <span>
            <strong>{tab.label}</strong>
          </span>
        </a>
      ))}
    </nav>
  );
}
