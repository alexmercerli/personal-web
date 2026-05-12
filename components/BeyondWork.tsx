"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";

type BeyondWorkImage = {
  src: string;
  alt: string;
};

type BeyondWorkInterest = {
  key: string;
  label: string;
  title: string;
  description: string;
  items: readonly string[];
  images?: readonly BeyondWorkImage[];
};

type BeyondWorkProps = {
  content: {
    title: string;
    eyebrow: string;
    text: string;
    quoteLabel: string;
    quote: string;
    portrait: BeyondWorkImage;
    interests: readonly BeyondWorkInterest[];
  };
};

export function BeyondWork({ content }: BeyondWorkProps) {
  const [activeKey, setActiveKey] = useState(content.interests[0]?.key ?? "");
  const active = useMemo(
    () => content.interests.find((interest) => interest.key === activeKey) ?? content.interests[0],
    [activeKey, content.interests]
  );

  if (!active) return null;

  const previewImages = active.images?.length ? active.images : [content.portrait];

  return (
    <section className="studio-section beyond-work-section" id="beyond-work">
      <SectionHeading title={content.title} eyebrow={content.eyebrow} />
      <div className="beyond-work-grid">
        <figure className="beyond-portrait">
          <Image src={content.portrait.src} alt={content.portrait.alt} width={960} height={1200} unoptimized />
        </figure>

        <div className="beyond-copy">
          <p>{content.text}</p>
          <blockquote>
            <span>{content.quoteLabel}</span>
            <strong>{content.quote}</strong>
          </blockquote>

          <div className="interest-tabs" aria-label="Beyond work interests">
            {content.interests.map((interest) => (
              <button
                className={interest.key === active.key ? "active" : ""}
                key={interest.key}
                onClick={() => setActiveKey(interest.key)}
                onFocus={() => setActiveKey(interest.key)}
                onMouseEnter={() => setActiveKey(interest.key)}
                type="button"
              >
                <i />
                {interest.label}
              </button>
            ))}
          </div>

          <article className="interest-preview" key={active.key}>
            <div className="interest-preview-copy">
              <p>{active.title}</p>
              <h3>{active.description}</h3>
              <ol>
                {active.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>

            <div className={`interest-images count-${previewImages.length}`}>
              {previewImages.map((image) => (
                <Image src={image.src} alt={image.alt} width={1200} height={760} unoptimized key={image.src} />
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
