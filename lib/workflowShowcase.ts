import type { Locale } from "@/lib/content";

export type WorkflowCase = {
  id: string;
  title: string;
  summary: string;
  description: string;
  report: {
    incident: string;
    rootCauses: readonly string[];
    risk: string;
    actions: readonly string[];
    confidence: string;
    confidenceValue: number;
    humanReview: string;
  };
};

export type WorkflowAgent = {
  id: string;
  label: string;
  role: string;
  messages: readonly string[];
};

export type WorkflowShowcaseContent = {
  eyebrow: string;
  title: string;
  lead: string;
  principles: readonly string[];
  leftTitle: string;
  textareaLabel: string;
  analyzeLabel: string;
  resetLabel: string;
  centerTitle: string;
  centerHint: string;
  rightTitle: string;
  reportTitle: string;
  reportWaiting: string;
  eventLogTitle: string;
  cases: readonly WorkflowCase[];
  agents: readonly WorkflowAgent[];
  stepOrder: readonly (readonly string[])[];
  architecture: {
    layers: readonly string[];
    labels: readonly string[];
  };
  reportLabels: {
    incident: string;
    rootCauses: string;
    risk: string;
    actions: string;
    confidence: string;
    humanReview: string;
  };
};

export const workflowShowcase: Record<Locale, WorkflowShowcaseContent> = {
  zh: {
    eyebrow: "Interactive Case Study",
    title: "Industrial AI Multi-Agent Workflow Showcase",
    lead:
      "一个模拟制造问题调查的前端交互原型，展示 AI 如何协助工程师完成信息检索、风险评估、工艺分析和人工复核。",
    principles: ["AI 辅助工程师，而不是替代工程师", "人工确认是上线前的必要步骤", "工业 AI 需要可靠、可追溯、可解释"],
    leftTitle: "Manufacturing Investigation Cases",
    textareaLabel: "Issue Description",
    analyzeLabel: "Analyze",
    resetLabel: "Reset",
    centerTitle: "Multi-Agent Workflow",
    centerHint: "点击 Analyze 后，工作流会按步骤激活。",
    rightTitle: "System Architecture",
    reportTitle: "Final Investigation Report",
    reportWaiting: "等待分析完成后生成结构化调查报告。",
    eventLogTitle: "Event Log",
    cases: [
      {
        id: "yield-drop",
        title: "Yield Drop After Supplier Material Change",
        summary: "供应商批次切换后，边缘毛刺缺陷率上升。",
        description:
          "After supplier material batch transition,\nedge burr defect rate increased from 1.2% to 4.7%.\nYield dropped significantly during night shift production.",
        report: {
          incident:
            "供应商材料批次切换后，夜班生产的边缘毛刺缺陷率从 1.2% 上升到 4.7%，造成良率明显下降。",
          rootCauses: ["supplier material variance", "blade wear instability", "inspection threshold drift"],
          risk: "存在中等质量逃逸风险，需要确认缺陷边界、抽检范围和受影响批次。",
          actions: ["validate supplier batch consistency", "inspect tool wear condition", "recalibrate inspection threshold"],
          confidence: "Medium",
          confidenceValue: 62,
          humanReview: "Required before production release."
        }
      },
      {
        id: "vision-false-alarm",
        title: "Vision Inspection False Alarm Increase",
        summary: "AOI 误报率上升，影响产线节拍。",
        description:
          "Vision inspection false alarm rate increased after lighting maintenance.\nOperators reported frequent manual overrides and unstable defect classification.",
        report: {
          incident: "照明维护后，视觉检测误报率上升，操作员需要频繁人工复判，影响检测节拍。",
          rootCauses: ["lighting angle shift", "camera exposure drift", "inspection threshold mismatch"],
          risk: "真实缺陷与误报边界变窄，需要避免因过度调整阈值导致漏检。",
          actions: ["run golden sample comparison", "restore camera exposure baseline", "review threshold change history"],
          confidence: "Medium",
          confidenceValue: 58,
          humanReview: "Engineer validation required before threshold release."
        }
      },
      {
        id: "pilot-downtime",
        title: "Unexpected Equipment Downtime During Pilot Run",
        summary: "试产阶段设备非计划停机，影响工程验证节奏。",
        description:
          "During pilot run, equipment stopped unexpectedly twice within one shift.\nMaintenance logs show intermittent sensor alarm and delayed recovery.",
        report: {
          incident: "试产阶段同一班次内出现两次非计划停机，维护记录显示间歇性传感器报警和恢复延迟。",
          rootCauses: ["sensor signal instability", "loose connector condition", "pilot recipe parameter mismatch"],
          risk: "存在试产节奏延误和验证数据不连续风险，需要在继续放量前完成复核。",
          actions: ["check sensor wiring and connector status", "compare pilot recipe parameters", "add temporary monitoring checklist"],
          confidence: "Medium",
          confidenceValue: 55,
          humanReview: "Required before next pilot build."
        }
      }
    ],
    agents: [
      {
        id: "input",
        label: "Input",
        role: "Manufacturing issue description",
        messages: ["Receiving issue context..."]
      },
      {
        id: "planner",
        label: "Planner Agent",
        role: "Break down investigation strategy.",
        messages: ["Classifying manufacturing issue...", "Generating investigation strategy..."]
      },
      {
        id: "retrieval",
        label: "Retrieval Agent",
        role: "Retrieve historical cases and SOP knowledge.",
        messages: ["Retrieving historical quality incidents...", "3 similar historical cases found."]
      },
      {
        id: "qa",
        label: "QA Risk Agent",
        role: "Evaluate quality risks and escape risks.",
        messages: ["Potential quality escape risk detected."]
      },
      {
        id: "process",
        label: "Process Agent",
        role: "Analyze process instability and manufacturing variation.",
        messages: ["Analyzing supplier/process instability..."]
      },
      {
        id: "pm",
        label: "PM Agent",
        role: "Generate action items and escalation plans.",
        messages: ["Generating recommended actions..."]
      },
      {
        id: "human",
        label: "Human Review",
        role: "Engineer validation before execution.",
        messages: ["Engineer validation required before execution."]
      },
      {
        id: "report",
        label: "Final Report",
        role: "Structured investigation report.",
        messages: ["Compiling traceable investigation report..."]
      }
    ],
    stepOrder: [["input"], ["planner"], ["retrieval"], ["qa", "process"], ["pm"], ["human"], ["report"]],
    architecture: {
      layers: [
        "MES / QA Logs / SOP Database",
        "Embedding + Retrieval Layer",
        "Multi-Agent Orchestration Engine",
        "Reasoning + Risk Evaluation",
        "Human-in-the-loop Validation",
        "Structured Investigation Report"
      ],
      labels: ["RAG", "Agent Memory", "Tool Calling", "Workflow State", "Confidence Scoring"]
    },
    reportLabels: {
      incident: "Incident Summary",
      rootCauses: "Potential Root Causes",
      risk: "Risk Assessment",
      actions: "Recommended Actions",
      confidence: "Confidence Level",
      humanReview: "Human Review Status"
    }
  },
  en: {
    eyebrow: "Interactive Case Study",
    title: "Industrial AI Multi-Agent Workflow Showcase",
    lead:
      "A frontend simulation of an AI-assisted manufacturing investigation workflow, showing how agents support retrieval, risk evaluation, process analysis, and human review.",
    principles: ["AI assists engineers, not replaces engineers", "Human approval is required before execution", "Industrial AI must be reliable, traceable, and explainable"],
    leftTitle: "Manufacturing Investigation Cases",
    textareaLabel: "Issue Description",
    analyzeLabel: "Analyze",
    resetLabel: "Reset",
    centerTitle: "Multi-Agent Workflow",
    centerHint: "Click Analyze to activate the workflow step by step.",
    rightTitle: "System Architecture",
    reportTitle: "Final Investigation Report",
    reportWaiting: "A structured investigation report will appear after the analysis completes.",
    eventLogTitle: "Event Log",
    cases: [
      {
        id: "yield-drop",
        title: "Yield Drop After Supplier Material Change",
        summary: "Edge burr defect rate increased after supplier batch transition.",
        description:
          "After supplier material batch transition,\nedge burr defect rate increased from 1.2% to 4.7%.\nYield dropped significantly during night shift production.",
        report: {
          incident:
            "After supplier material batch transition, edge burr defect rate increased from 1.2% to 4.7%, causing a significant yield drop during night shift production.",
          rootCauses: ["supplier material variance", "blade wear instability", "inspection threshold drift"],
          risk: "Medium quality escape risk. Defect boundaries, sampling scope, and affected batches require engineering validation.",
          actions: ["validate supplier batch consistency", "inspect tool wear condition", "recalibrate inspection threshold"],
          confidence: "Medium",
          confidenceValue: 62,
          humanReview: "Required before production release."
        }
      },
      {
        id: "vision-false-alarm",
        title: "Vision Inspection False Alarm Increase",
        summary: "AOI false alarms increased and affected line rhythm.",
        description:
          "Vision inspection false alarm rate increased after lighting maintenance.\nOperators reported frequent manual overrides and unstable defect classification.",
        report: {
          incident:
            "After lighting maintenance, the vision inspection false alarm rate increased and operators needed frequent manual rechecks.",
          rootCauses: ["lighting angle shift", "camera exposure drift", "inspection threshold mismatch"],
          risk: "The boundary between real defects and false alarms is narrow. Threshold changes must avoid increasing missed detections.",
          actions: ["run golden sample comparison", "restore camera exposure baseline", "review threshold change history"],
          confidence: "Medium",
          confidenceValue: 58,
          humanReview: "Engineer validation required before threshold release."
        }
      },
      {
        id: "pilot-downtime",
        title: "Unexpected Equipment Downtime During Pilot Run",
        summary: "Unexpected downtime disrupted pilot validation rhythm.",
        description:
          "During pilot run, equipment stopped unexpectedly twice within one shift.\nMaintenance logs show intermittent sensor alarm and delayed recovery.",
        report: {
          incident:
            "During pilot production, equipment stopped unexpectedly twice within one shift. Maintenance logs show intermittent sensor alarms and delayed recovery.",
          rootCauses: ["sensor signal instability", "loose connector condition", "pilot recipe parameter mismatch"],
          risk: "Pilot validation may be delayed and validation data continuity may be affected. Engineering review is required before scaling.",
          actions: ["check sensor wiring and connector status", "compare pilot recipe parameters", "add temporary monitoring checklist"],
          confidence: "Medium",
          confidenceValue: 55,
          humanReview: "Required before next pilot build."
        }
      }
    ],
    agents: [
      {
        id: "input",
        label: "Input",
        role: "Manufacturing issue description",
        messages: ["Receiving issue context..."]
      },
      {
        id: "planner",
        label: "Planner Agent",
        role: "Break down investigation strategy.",
        messages: ["Classifying manufacturing issue...", "Generating investigation strategy..."]
      },
      {
        id: "retrieval",
        label: "Retrieval Agent",
        role: "Retrieve historical cases and SOP knowledge.",
        messages: ["Retrieving historical quality incidents...", "3 similar historical cases found."]
      },
      {
        id: "qa",
        label: "QA Risk Agent",
        role: "Evaluate quality risks and escape risks.",
        messages: ["Potential quality escape risk detected."]
      },
      {
        id: "process",
        label: "Process Agent",
        role: "Analyze process instability and manufacturing variation.",
        messages: ["Analyzing supplier/process instability..."]
      },
      {
        id: "pm",
        label: "PM Agent",
        role: "Generate action items and escalation plans.",
        messages: ["Generating recommended actions..."]
      },
      {
        id: "human",
        label: "Human Review",
        role: "Engineer validation before execution.",
        messages: ["Engineer validation required before execution."]
      },
      {
        id: "report",
        label: "Final Report",
        role: "Structured investigation report.",
        messages: ["Compiling traceable investigation report..."]
      }
    ],
    stepOrder: [["input"], ["planner"], ["retrieval"], ["qa", "process"], ["pm"], ["human"], ["report"]],
    architecture: {
      layers: [
        "MES / QA Logs / SOP Database",
        "Embedding + Retrieval Layer",
        "Multi-Agent Orchestration Engine",
        "Reasoning + Risk Evaluation",
        "Human-in-the-loop Validation",
        "Structured Investigation Report"
      ],
      labels: ["RAG", "Agent Memory", "Tool Calling", "Workflow State", "Confidence Scoring"]
    },
    reportLabels: {
      incident: "Incident Summary",
      rootCauses: "Potential Root Causes",
      risk: "Risk Assessment",
      actions: "Recommended Actions",
      confidence: "Confidence Level",
      humanReview: "Human Review Status"
    }
  }
} as const;
