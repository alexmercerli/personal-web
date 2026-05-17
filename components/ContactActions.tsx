"use client";

import { useEffect, useState } from "react";

type ContactActionsProps = {
  labels: readonly string[];
  links: {
    resume: string;
    email: string;
    linkedin: string;
    github: string;
  };
  dialog: {
    title: string;
    hint: string;
    copy: string;
    copied: string;
    close: string;
  };
};

export function ContactActions({ labels, links, dialog }: ContactActionsProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const openModal = () => {
    setCopied(false);
    setOpen(true);
  };

  return (
    <>
      <div className="action-row center">
        <a className="dark-button" href={links.resume}>
          {labels[0]}
        </a>
        <button className="soft-button" type="button" onClick={openModal}>
          {labels[1]}
        </button>
        <a className="soft-button" href={links.linkedin}>
          {labels[2]}
        </a>
        <a className="soft-button" href={links.github}>
          {labels[3]}
        </a>
      </div>

      {open ? (
        <div className="email-modal-backdrop" role="presentation" onClick={() => setOpen(false)}>
          <section
            aria-labelledby="email-modal-title"
            aria-modal="true"
            className="email-modal"
            role="dialog"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="email-modal-close" type="button" onClick={() => setOpen(false)}>
              {dialog.close}
            </button>
            <p className="email-modal-label" id="email-modal-title">
              {dialog.title}
            </p>
            <p className="email-modal-address">{links.email}</p>
            <p className="email-modal-hint">
              {dialog.hint}
            </p>
            <button className="dark-button email-modal-copy" type="button" onClick={copyEmail}>
              {copied ? dialog.copied : dialog.copy}
            </button>
          </section>
        </div>
      ) : null}
    </>
  );
}
