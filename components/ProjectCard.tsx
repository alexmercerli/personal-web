import { RichText } from "@/components/RichText";

type Project = {
  title: string;
  context: string;
  role: string;
  approach: string;
  tools: string;
  outcome: string;
  keywords: readonly string[];
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
  return (
    <article className="project-card">
      <div className="project-index">{String(index + 1).padStart(2, "0")}</div>
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
    </article>
  );
}
