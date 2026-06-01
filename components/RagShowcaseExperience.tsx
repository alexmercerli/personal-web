"use client";

import { useMemo, useState } from "react";
import type { RagChunk, RagShowcaseContent } from "@/lib/ragShowcase";

type RagShowcaseExperienceProps = {
  content: RagShowcaseContent;
};

type ApiChunk = RagChunk & {
  retrievalScore: number;
  rerankScore?: number;
  matchedKeywords: string[];
};

type RagApiResult = {
  retrieval: ApiChunk[];
  reranked: ApiChunk[];
  llmInput: {
    keywords: string[];
    context: ApiChunk[];
    promptPayload: string;
  };
};

function formatScore(score?: number) {
  if (typeof score !== "number") return "-";
  return score.toFixed(3);
}

function getPdfPreviewHref(href: string) {
  return `${href}#page=1&view=Fit&zoom=page-fit`;
}

export function RagShowcaseExperience({ content }: RagShowcaseExperienceProps) {
  const [selectedDocumentId, setSelectedDocumentId] = useState(content.documents[0].id);
  const [query, setQuery] = useState(content.documents[0].questions[0]);
  const [result, setResult] = useState<RagApiResult | null>(null);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPdfOpen, setIsPdfOpen] = useState(false);

  const selectedDocument =
    content.documents.find((document) => document.id === selectedDocumentId) ?? content.documents[0];

  const activeChunkIds = useMemo(() => new Set(result?.reranked.map((chunk) => chunk.id) ?? []), [result]);

  const selectDocument = (documentId: string) => {
    const nextDocument = content.documents.find((document) => document.id === documentId) ?? content.documents[0];
    setSelectedDocumentId(nextDocument.id);
    setQuery(nextDocument.questions[0]);
    setResult(null);
    setError(null);
  };

  const resetFlow = () => {
    setQuery("");
    setResult(null);
    setError(null);
    setRunning(false);
  };

  const runRag = async () => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    setRunning(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch("/api/rag-query/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          documentId: selectedDocument.id,
          query: trimmedQuery
        })
      });
      const payload = await response.json();

      if (!response.ok) {
        setError(payload?.error === "missing_jina_api_key" ? content.apiMissing : content.apiError);
        return;
      }

      setResult(payload as RagApiResult);
    } catch {
      setError(content.apiError);
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="rag-experience">
      <section className="rag-hero">
        <p className="eyebrow">{content.eyebrow}</p>
        <h1>{content.title}</h1>
        <p>{content.lead}</p>
        <div className="rag-principles">
          {content.principles.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="rag-workspace" aria-label={content.title}>
        <aside className="rag-panel rag-library-panel">
          <div className="rag-panel-heading">
            <p className="eyebrow">{content.libraryTitle}</p>
            <span>{content.libraryHint}</span>
          </div>
          <div className="rag-document-list">
            {content.documents.map((document) => (
              <button
                className={document.id === selectedDocumentId ? "is-selected is-previewed" : ""}
                key={document.id}
                type="button"
                onClick={() => selectDocument(document.id)}
              >
                <small>{document.category}</small>
                <strong>{document.title}</strong>
                <span>{document.summary}</span>
              </button>
            ))}
          </div>
        </aside>

        <section className="rag-panel rag-preview-panel">
          <div className="rag-panel-heading">
            <p className="eyebrow">{content.previewTitle}</p>
            <span>{content.previewHint}</span>
          </div>
          <div className="rag-pdf-frame">
            <div className="rag-pdf-toolbar">
              <span>{selectedDocument.fileName}</span>
              <i>PDF</i>
            </div>
            <div className="rag-pdf-page">
              <p>{selectedDocument.category}</p>
              <h2>{selectedDocument.previewTitle}</h2>
              <span>{selectedDocument.previewExcerpt}</span>
              <div>
                <b />
                <b />
                <b />
              </div>
            </div>
          </div>
          <div className="rag-pdf-actions">
            <button className="dark-button" type="button" onClick={() => setIsPdfOpen(true)}>
              {content.openPdfLabel}
            </button>
            <a className="soft-button" href={selectedDocument.pdfHref} target="_blank" rel="noreferrer">
              {content.openPdfNewTabLabel}
            </a>
          </div>
        </section>

        <section className="rag-panel rag-question-panel">
          <div className="rag-panel-heading">
            <p className="eyebrow">{content.questionTitle}</p>
            <span>{content.questionHint}</span>
          </div>
          <label className="rag-active-document">
            <span>{content.selectedLabel}</span>
            <strong>{selectedDocument.title}</strong>
          </label>
          <textarea value={query} placeholder={content.questionPlaceholder} onChange={(event) => setQuery(event.target.value)} />
          <div className="rag-suggestions" aria-label={content.suggestionsLabel}>
            <p>{content.suggestionsLabel}</p>
            {selectedDocument.questions.map((item) => (
              <button key={item} type="button" onClick={() => setQuery(item)}>
                {item}
              </button>
            ))}
          </div>
          <div className="rag-actions">
            <button className="dark-button" type="button" onClick={runRag} disabled={running || query.trim().length === 0}>
              {running ? content.analyzingLabel : content.analyzeLabel}
            </button>
            <button className="soft-button" type="button" onClick={resetFlow}>
              {content.resetLabel}
            </button>
          </div>
          {error ? <p className="rag-error">{error}</p> : null}
        </section>
      </section>

      <section className="rag-analysis-grid">
        <article className="rag-panel rag-chunks-panel">
          <div className="rag-panel-heading">
            <p className="eyebrow">{content.chunksTitle}</p>
            <span>{content.chunksHint}</span>
          </div>
          <div className="rag-chunk-list">
            {selectedDocument.chunks.map((chunk) => (
              <section className={activeChunkIds.has(chunk.id) ? "is-visible is-selected" : "is-visible"} key={chunk.id}>
                <div>
                  <strong>{chunk.id}</strong>
                  <span>
                    {chunk.page} / {chunk.tokens}
                  </span>
                </div>
                <h3>{chunk.title}</h3>
                <p>{chunk.text}</p>
              </section>
            ))}
          </div>
        </article>

        <article className="rag-panel rag-ranking-panel">
          <div className="rag-panel-heading">
            <p className="eyebrow">{content.retrievalTitle}</p>
            <span>{content.retrievalHint}</span>
          </div>
          {result ? (
            <div className="rag-result-list">
              {result.retrieval.map((chunk, index) => (
                <section key={chunk.id}>
                  <small>Top {index + 1}</small>
                  <strong>
                    {chunk.id} / {chunk.title}
                  </strong>
                  <p>{chunk.text}</p>
                  <div>
                    <span>
                      {content.scoreLabel}: {formatScore(chunk.retrievalScore)}
                    </span>
                    <span>
                      {content.matchedKeywordsLabel}:{" "}
                      {chunk.matchedKeywords.length > 0 ? chunk.matchedKeywords.join(" / ") : chunk.keywords.slice(0, 2).join(" / ")}
                    </span>
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="rag-answer-empty">
              <p>{content.emptyRetrieval}</p>
            </div>
          )}
        </article>

        <article className="rag-panel rag-ranking-panel">
          <div className="rag-panel-heading">
            <p className="eyebrow">{content.rerankTitle}</p>
            <span>{content.rerankHint}</span>
          </div>
          {result ? (
            <div className="rag-result-list">
              {result.reranked.map((chunk, index) => (
                <section key={chunk.id}>
                  <small>Rank {index + 1}</small>
                  <strong>
                    {chunk.id} / {chunk.title}
                  </strong>
                  <p>{chunk.text}</p>
                  <div>
                    <span>
                      {content.rerankScoreLabel}: {formatScore(chunk.rerankScore)}
                    </span>
                    <span>
                      {content.scoreLabel}: {formatScore(chunk.retrievalScore)}
                    </span>
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="rag-answer-empty">
              <p>{content.emptyRetrieval}</p>
            </div>
          )}
        </article>
      </section>

      <section className="rag-panel rag-answer-panel">
        <div className="rag-panel-heading">
          <p className="eyebrow">{content.llmInputTitle}</p>
          <span>{content.llmInputHint}</span>
        </div>
        {result ? (
          <div className="rag-llm-grid">
            <article>
              <strong>{content.keywordsLabel}</strong>
              <div className="rag-keyword-row">
                {result.llmInput.keywords.map((keyword) => (
                  <span key={keyword}>{keyword}</span>
                ))}
              </div>
            </article>
            <article>
              <strong>{content.contextLabel}</strong>
              <ul>
                {result.llmInput.context.map((chunk) => (
                  <li key={chunk.id}>
                    {chunk.id} / {chunk.page} - {chunk.title}
                  </li>
                ))}
              </ul>
            </article>
            <article className="rag-prompt-panel">
              <strong>{content.promptLabel}</strong>
              <pre>{result.llmInput.promptPayload}</pre>
            </article>
          </div>
        ) : (
          <div className="rag-answer-empty">
            <p>{content.emptyLlmInput}</p>
          </div>
        )}
      </section>

      {isPdfOpen ? (
        <div className="rag-pdf-modal-backdrop" role="dialog" aria-modal="true" aria-label={selectedDocument.title}>
          <div className="rag-pdf-modal">
            <div className="rag-pdf-modal-header">
              <div>
                <p className="eyebrow">{content.previewTitle}</p>
                <strong>{selectedDocument.title}</strong>
              </div>
              <button type="button" onClick={() => setIsPdfOpen(false)}>
                {content.closeLabel}
              </button>
            </div>
            <iframe title={selectedDocument.title} src={getPdfPreviewHref(selectedDocument.pdfHref)} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
