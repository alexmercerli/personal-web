export type PlanetTag = {
  label: string;
  tone?: "blue" | "violet" | "orange" | "green";
};

export const planetTags: PlanetTag[] = [
  { label: "Process Engineering", tone: "blue" },
  { label: "Automation Testing", tone: "violet" },
  { label: "Machine Vision", tone: "green" },
  { label: "Medical AI", tone: "orange" },
  { label: "AI Agent Workflow", tone: "violet" },
  { label: "AI Product Thinking", tone: "blue" }
];
