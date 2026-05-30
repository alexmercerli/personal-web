import { NextResponse } from "next/server";
import { ragShowcase, type RagChunk } from "@/lib/ragShowcase";

export const runtime = "nodejs";

type EmbeddingResponse = {
  data?: {
    embedding?: number[];
  }[];
  detail?: string;
  error?: unknown;
};

type RerankResponse = {
  results?: {
    index: number;
    relevance_score?: number;
    score?: number;
  }[];
  detail?: string;
  error?: unknown;
};

type RetrievedChunk = RagChunk & {
  retrievalScore: number;
  matchedKeywords: string[];
};

const JINA_EMBEDDING_MODEL = "jina-embeddings-v3";
const JINA_RERANK_MODEL = "jina-reranker-v2-base-multilingual";

function cosineSimilarity(a: number[], b: number[]) {
  let dot = 0;
  let aNorm = 0;
  let bNorm = 0;

  for (let index = 0; index < Math.min(a.length, b.length); index += 1) {
    dot += a[index] * b[index];
    aNorm += a[index] * a[index];
    bNorm += b[index] * b[index];
  }

  if (!aNorm || !bNorm) return 0;
  return dot / (Math.sqrt(aNorm) * Math.sqrt(bNorm));
}

function roundScore(score: number) {
  return Math.round(score * 1000) / 1000;
}

function findMatchedKeywords(query: string, chunk: RagChunk) {
  const normalizedQuery = query.toLowerCase();
  return chunk.keywords.filter((keyword) => normalizedQuery.includes(keyword.toLowerCase()));
}

function collectKeywords(chunks: RetrievedChunk[]) {
  const keywords = chunks.flatMap((chunk) => (chunk.matchedKeywords.length > 0 ? chunk.matchedKeywords : chunk.keywords.slice(0, 2)));
  return Array.from(new Set(keywords)).slice(0, 10);
}

function buildPromptPayload(query: string, chunks: RetrievedChunk[], keywords: string[]) {
  return [
    "System: You are an evidence-grounded assistant. Answer only from the provided Chinese PDF context.",
    `User question: ${query}`,
    `Keywords: ${keywords.join(", ")}`,
    "Context:",
    ...chunks.map((chunk) => `[${chunk.id} / ${chunk.page}] ${chunk.text}`)
  ].join("\n");
}

async function requestJinaEmbeddings(apiKey: string, input: string[], task: "retrieval.query" | "retrieval.passage") {
  const response = await fetch("https://api.jina.ai/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: JINA_EMBEDDING_MODEL,
      task,
      input
    })
  });

  const payload = (await response.json()) as EmbeddingResponse;

  if (!response.ok || !payload.data) {
    throw new Error(typeof payload.detail === "string" ? payload.detail : "Jina embedding request failed");
  }

  return payload.data.map((item) => item.embedding ?? []);
}

async function requestJinaRerank(apiKey: string, query: string, chunks: RetrievedChunk[]) {
  const response = await fetch("https://api.jina.ai/v1/rerank", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: JINA_RERANK_MODEL,
      query,
      top_n: chunks.length,
      documents: chunks.map((chunk) => `${chunk.title}\n${chunk.text}`)
    })
  });

  const payload = (await response.json()) as RerankResponse;

  if (!response.ok || !payload.results) {
    throw new Error(typeof payload.detail === "string" ? payload.detail : "Jina rerank request failed");
  }

  return payload.results.map((item) => ({
    index: item.index,
    rerankScore: roundScore(item.relevance_score ?? item.score ?? 0)
  }));
}

export async function POST(request: Request) {
  const apiKey = process.env.JINA_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "missing_jina_api_key" }, { status: 503 });
  }

  const body = (await request.json().catch(() => null)) as null | {
    documentId?: string;
    query?: string;
  };
  const query = body?.query?.trim() ?? "";
  const documentId = body?.documentId;
  const document = ragShowcase.zh.documents.find((item) => item.id === documentId);

  if (!document || !query) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  try {
    const [queryEmbedding] = await requestJinaEmbeddings(apiKey, [query], "retrieval.query");
    const chunkEmbeddings = await requestJinaEmbeddings(
      apiKey,
      document.chunks.map((chunk) => chunk.text),
      "retrieval.passage"
    );

    const retrieved = document.chunks
      .map((chunk, index) => ({
        ...chunk,
        retrievalScore: roundScore(cosineSimilarity(queryEmbedding, chunkEmbeddings[index] ?? [])),
        matchedKeywords: findMatchedKeywords(query, chunk)
      }))
      .sort((a, b) => b.retrievalScore - a.retrievalScore)
      .slice(0, 4);

    const rerankResults = await requestJinaRerank(apiKey, query, retrieved);
    const reranked = rerankResults
      .map((result) => ({
        ...retrieved[result.index],
        rerankScore: result.rerankScore
      }))
      .filter(Boolean)
      .sort((a, b) => b.rerankScore - a.rerankScore);

    const llmChunks = reranked.slice(0, 3);
    const keywords = collectKeywords(llmChunks);

    return NextResponse.json({
      query,
      documentId,
      retrieval: retrieved,
      reranked,
      llmInput: {
        keywords,
        context: llmChunks,
        promptPayload: buildPromptPayload(query, llmChunks, keywords)
      }
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "rag_api_failed",
        message: error instanceof Error ? error.message : "Unknown RAG API error"
      },
      { status: 500 }
    );
  }
}
