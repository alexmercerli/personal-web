"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Background, Controls, MarkerType, ReactFlow, type Edge, type Node } from "@xyflow/react";
import type { WorkflowCase, WorkflowShowcaseContent } from "@/lib/workflowShowcase";

type WorkflowShowcaseExperienceProps = {
  content: WorkflowShowcaseContent;
};

const nodePositions: Record<string, { x: number; y: number }> = {
  input: { x: 230, y: 10 },
  planner: { x: 230, y: 112 },
  retrieval: { x: 230, y: 214 },
  qa: { x: 64, y: 328 },
  process: { x: 396, y: 328 },
  pm: { x: 230, y: 450 },
  human: { x: 230, y: 562 },
  report: { x: 230, y: 674 }
};

const baseEdges = [
  ["input", "planner"],
  ["planner", "retrieval"],
  ["retrieval", "qa"],
  ["retrieval", "process"],
  ["qa", "pm"],
  ["process", "pm"],
  ["pm", "human"],
  ["human", "report"]
] as const;

const sleep = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

function createTimestamp() {
  return new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).format(new Date());
}

export function WorkflowShowcaseExperience({ content }: WorkflowShowcaseExperienceProps) {
  const [selectedCaseId, setSelectedCaseId] = useState(content.cases[0].id);
  const [description, setDescription] = useState(content.cases[0].description);
  const [activeIds, setActiveIds] = useState<string[]>([]);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [reportReady, setReportReady] = useState(false);
  const [running, setRunning] = useState(false);
  const [eventLog, setEventLog] = useState<string[]>([]);
  const runIdRef = useRef(0);

  const selectedCase = content.cases.find((item) => item.id === selectedCaseId) ?? content.cases[0];

  const statusFor = useCallback((id: string) => {
    if (activeIds.includes(id)) return "running";
    if (completedIds.includes(id)) return "completed";
    return "idle";
  }, [activeIds, completedIds]);

  const selectCase = (item: WorkflowCase) => {
    setSelectedCaseId(item.id);
    setDescription(item.description);
    setActiveIds([]);
    setCompletedIds([]);
    setReportReady(false);
    setRunning(false);
    runIdRef.current += 1;
    setEventLog([]);
  };

  const runWorkflow = async () => {
    const runId = runIdRef.current + 1;
    runIdRef.current = runId;
    setRunning(true);
    setReportReady(false);
    setActiveIds([]);
    setCompletedIds([]);
    setEventLog([`${createTimestamp()}  Input received for ${selectedCase.title}`]);

    for (const group of content.stepOrder) {
      if (runIdRef.current !== runId) return;
      setActiveIds([...group]);
      setEventLog((items) => [
        ...items.slice(-5),
        `${createTimestamp()}  ${group
          .map((id) => content.agents.find((agent) => agent.id === id)?.label ?? id)
          .join(" + ")} running`
      ]);
      await sleep(group.length > 1 ? 1150 : 900);
      if (runIdRef.current !== runId) return;
      setCompletedIds((items) => Array.from(new Set([...items, ...group])));
      await sleep(180);
    }

    if (runIdRef.current !== runId) return;
    setActiveIds([]);
    setReportReady(true);
    setRunning(false);
    setEventLog((items) => [...items.slice(-5), `${createTimestamp()}  Human review required before execution`]);
  };

  const resetWorkflow = () => {
    runIdRef.current += 1;
    setActiveIds([]);
    setCompletedIds([]);
    setReportReady(false);
    setRunning(false);
    setEventLog([]);
  };

  const nodes: Node[] = useMemo(
    () =>
      content.agents.map((agent) => {
        const status = statusFor(agent.id);
        const message =
          status === "running"
            ? agent.messages[0]
            : status === "completed"
              ? agent.messages[agent.messages.length - 1]
              : agent.role;

        return {
          id: agent.id,
          position: nodePositions[agent.id],
          data: {
            label: (
              <div className="workflow-node-inner">
                <span>{status}</span>
                <strong>{agent.label}</strong>
                <small>{message}</small>
              </div>
            )
          },
          className: `workflow-flow-node is-${status}`,
          draggable: false,
          selectable: false
        };
      }),
    [content.agents, statusFor]
  );

  const edges: Edge[] = useMemo(
    () =>
      baseEdges.map(([source, target]) => {
        const targetStatus = statusFor(target);
        const sourceStatus = statusFor(source);
        const isActive = targetStatus === "running" || (sourceStatus === "running" && targetStatus !== "idle");

        return {
          id: `${source}-${target}`,
          source,
          target,
          animated: isActive,
          markerEnd: { type: MarkerType.ArrowClosed },
          className: isActive || targetStatus === "completed" ? "workflow-edge-active" : "workflow-edge",
          style: {
            strokeWidth: isActive ? 2 : 1.4
          }
        };
      }),
    [statusFor]
  );

  return (
    <div className="workflow-experience">
      <section className="workflow-hero">
        <p className="eyebrow">{content.eyebrow}</p>
        <h1>{content.title}</h1>
        <p>{content.lead}</p>
        <div className="workflow-principles">
          {content.principles.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="workflow-workbench" aria-label={content.title}>
        <aside className="workflow-panel workflow-case-panel">
          <div className="workflow-panel-heading">
            <p className="eyebrow">{content.leftTitle}</p>
            <strong>{content.textareaLabel}</strong>
          </div>
          <div className="workflow-case-list">
            {content.cases.map((item) => (
              <button
                className={item.id === selectedCaseId ? "active" : ""}
                key={item.id}
                type="button"
                onClick={() => selectCase(item)}
              >
                <strong>{item.title}</strong>
                <span>{item.summary}</span>
              </button>
            ))}
          </div>
          <label className="workflow-textarea-label" htmlFor="workflow-issue">
            {content.textareaLabel}
          </label>
          <textarea id="workflow-issue" value={description} onChange={(event) => setDescription(event.target.value)} />
          <div className="workflow-actions">
            <button className="dark-button" type="button" onClick={runWorkflow} disabled={running}>
              {content.analyzeLabel}
            </button>
            <button className="soft-button" type="button" onClick={resetWorkflow}>
              {content.resetLabel}
            </button>
          </div>
        </aside>

        <section className="workflow-panel workflow-flow-panel">
          <div className="workflow-panel-heading">
            <p className="eyebrow">{content.centerTitle}</p>
            <span>{content.centerHint}</span>
          </div>
          <div className="workflow-flow-canvas">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              fitView
              fitViewOptions={{ padding: 0.16 }}
              minZoom={0.48}
              maxZoom={1.2}
              nodesDraggable={false}
              nodesConnectable={false}
              panOnScroll
              preventScrolling={false}
            >
              <Background color="rgba(110, 157, 180, 0.28)" gap={22} size={1} />
              <Controls showInteractive={false} />
            </ReactFlow>
          </div>
        </section>

        <aside className="workflow-panel workflow-architecture-panel">
          <div className="workflow-panel-heading">
            <p className="eyebrow">{content.rightTitle}</p>
            <strong>RAG + Agent Orchestration</strong>
          </div>
          <div className="architecture-stack">
            {content.architecture.layers.map((layer, index) => (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="architecture-layer"
                initial={{ opacity: 0, y: 8 }}
                key={layer}
                transition={{ delay: index * 0.05 }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{layer}</strong>
              </motion.div>
            ))}
          </div>
          <div className="architecture-labels">
            {content.architecture.labels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </aside>
      </section>

      <section className="workflow-bottom-grid">
        <motion.article className="workflow-panel workflow-report" layout>
          <div className="workflow-panel-heading">
            <p className="eyebrow">{content.reportTitle}</p>
            <strong>{reportReady ? selectedCase.title : content.reportWaiting}</strong>
          </div>
          {reportReady ? (
            <div className="report-grid">
              <section>
                <h3>{content.reportLabels.incident}</h3>
                <p>{selectedCase.report.incident}</p>
              </section>
              <section>
                <h3>{content.reportLabels.rootCauses}</h3>
                <ul>
                  {selectedCase.report.rootCauses.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
              <section>
                <h3>{content.reportLabels.risk}</h3>
                <p>{selectedCase.report.risk}</p>
              </section>
              <section>
                <h3>{content.reportLabels.actions}</h3>
                <ul>
                  {selectedCase.report.actions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
              <section className="confidence-panel">
                <h3>{content.reportLabels.confidence}</h3>
                <strong>{selectedCase.report.confidence}</strong>
                <span>
                  <motion.i
                    animate={{ width: `${selectedCase.report.confidenceValue}%` }}
                    initial={{ width: "0%" }}
                    transition={{ duration: 0.65, ease: "easeOut" }}
                  />
                </span>
              </section>
              <section>
                <h3>{content.reportLabels.humanReview}</h3>
                <p>{selectedCase.report.humanReview}</p>
              </section>
            </div>
          ) : (
            <div className="workflow-report-empty">
              <span />
              <p>{content.reportWaiting}</p>
            </div>
          )}
        </motion.article>

        <aside className="workflow-panel workflow-event-log">
          <div className="workflow-panel-heading">
            <p className="eyebrow">{content.eventLogTitle}</p>
            <strong>Trace</strong>
          </div>
          <div>
            {(eventLog.length > 0 ? eventLog : [content.reportWaiting]).map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}
