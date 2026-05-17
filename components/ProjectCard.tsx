"use client";

import { useEffect, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { RichText } from "@/components/RichText";

type ProjectAction =
  | {
      type: "flip";
      label: string;
      backEyebrow: string;
      hint: string;
      backTitle: string;
      backText: string;
      cta: string;
      href: string;
    }
  | {
      type: "external";
      label: string;
      hint: string;
      href: string;
    }
  | {
      type: "video";
      label: string;
      hint: string;
      src: string;
      modalTitle: string;
      placeholderTitle: string;
      placeholderText: string;
      close: string;
    };

type Project = {
  title: string;
  context: string;
  role: string;
  approach: string;
  tools: string;
  outcome: string;
  keywords: readonly string[];
  action: ProjectAction;
};

type ProjectCardProps = {
  project: Project;
  index: number;
  labels: {
    context: string;
    role: string;
    approach: string;
    tools: string;
    outcome: string;
  };
};

export function ProjectCard({ project, index, labels }: ProjectCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const isFlip = project.action.type === "flip";

  useEffect(() => {
    if (!videoOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setVideoOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [videoOpen]);

  const activateCard = () => {
    if (project.action.type === "flip") {
      setFlipped((current) => !current);
      return;
    }

    if (project.action.type === "external") {
      window.open(project.action.href, "_blank", "noopener,noreferrer");
      return;
    }

    setVideoReady(false);
    setVideoOpen(true);
  };

  const onKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    activateCard();
  };

  return (
    <>
      <article
        className={`project-card project-card-interactive ${isFlip ? "project-card-flip" : ""} ${
          flipped ? "is-flipped" : ""
        }`}
        role="button"
        tabIndex={0}
        onClick={activateCard}
        onKeyDown={onKeyDown}
      >
        <div className="project-card-stack">
          <div className="project-card-face project-card-front">
            <div className="project-card-topline">
              <div className="project-index">{String(index + 1).padStart(2, "0")}</div>
              <span className="project-action-pill">{project.action.label}</span>
            </div>
            <h3>{project.title}</h3>
            <dl>
              <div>
                <dt>{labels.context}</dt>
                <dd>
                  <RichText text={project.context} />
                </dd>
              </div>
              <div>
                <dt>{labels.role}</dt>
                <dd>
                  <RichText text={project.role} />
                </dd>
              </div>
              <div>
                <dt>{labels.approach}</dt>
                <dd>
                  <RichText text={project.approach} />
                </dd>
              </div>
              <div>
                <dt>{labels.tools}</dt>
                <dd>
                  <RichText text={project.tools} />
                </dd>
              </div>
              <div>
                <dt>{labels.outcome}</dt>
                <dd>
                  <RichText text={project.outcome} />
                </dd>
              </div>
            </dl>
            <div className="tag-row compact">
              {project.keywords.map((keyword) => (
                <span key={keyword}>{keyword}</span>
              ))}
            </div>
            <span className="project-action-line">{project.action.hint}</span>
          </div>

          {project.action.type === "flip" ? (
            <div className="project-card-face project-card-back">
              <div className="project-back-grid" aria-hidden="true" />
              <p className="project-back-eyebrow">{project.action.backEyebrow}</p>
              <h3>{project.action.backTitle}</h3>
              <p>{project.action.backText}</p>
              <a
                className="dark-button project-back-link"
                href={project.action.href}
                onClick={(event) => event.stopPropagation()}
              >
                {project.action.cta}
              </a>
              <span className="project-action-line">{project.action.hint}</span>
            </div>
          ) : null}
        </div>
      </article>

      {project.action.type === "video" && videoOpen ? (
        <div className="project-video-backdrop" role="presentation" onClick={() => setVideoOpen(false)}>
          <section
            aria-label={project.action.modalTitle}
            aria-modal="true"
            className="project-video-modal"
            role="dialog"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="project-video-close" type="button" onClick={() => setVideoOpen(false)}>
              {project.action.close}
            </button>
            <p className="project-video-label">{project.action.label}</p>
            <h3>{project.action.modalTitle}</h3>
            <div className="project-video-frame">
              <video controls preload="metadata" onCanPlay={() => setVideoReady(true)}>
                <source src={project.action.src} type="video/mp4" />
              </video>
              {!videoReady ? (
                <div className="project-video-placeholder">
                  <strong>{project.action.placeholderTitle}</strong>
                  <span>{project.action.placeholderText}</span>
                </div>
              ) : null}
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
