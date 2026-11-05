import { skills } from "@/data/content";
import type { CSSProperties } from "react";

// Local outline symbols share the site's icon style and need no external assets.
const paths = {
  cloud: "M6 18a4 4 0 0 1-1-7.87A7 7 0 0 1 18.7 9 4.5 4.5 0 0 1 18 18Z",
  server: "M4 3h16v7H4zM4 14h16v7H4zM7 6.5h.01M7 17.5h.01M11 6.5h6M11 17.5h6",
  database: "M4 6c0-4 16-4 16 0s-16 4-16 0Zm0 0v12c0 4 16 4 16 0V6M4 12c0 4 16 4 16 0",
  box: "m12 3 9 5v9l-9 5-9-5V8Zm-9 5 9 5 9-5M12 13v9M7.5 5.5l9 5",
  bolt: "M13 2 4 14h7l-1 8 10-12h-7Z",
  lock: "M6 10h12v11H6zM8 10V6a4 4 0 0 1 8 0v4M12 14v3",
  chart: "M3 3v18h18M6 15l4-5 4 3 6-8",
  shield: "m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Zm-4 9 3 3 5-6",
  network: "M9 3h6v6H9zM2 16h6v6H2zM16 16h6v6h-6zM12 9v4M5 16v-3h14v3",
  terminal: "m4 6 6 6-6 6M13 18h7",
  branch: "M6 6v12M18 6v3c0 5-12 1-12 6M3 3h6v3H3zM15 3h6v3h-6zM3 18h6v3H3z",
  code: "m8 6-6 6 6 6M16 6l6 6-6 6M14 3l-4 18",
  check: "M4 4h16v16H4zM7 12l3 3 7-7",
  pen: "m12 3 8 8-5 9-6 1-6-6 1-6Zm-9 12 7-7M12 3l-2 5 6 6 4-3",
  leaf: "M20 3C8 2 2 7 4 15s17 8 16-12ZM4 20 16 8",
  coffee: "M4 9h12v6a6 6 0 0 1-12 0ZM16 10h2a3 3 0 0 1 0 6h-2M7 3v3M12 2v4M3 22h15",
  layers: "m12 3 10 5-10 5L2 8Zm-10 9 10 5 10-5M2 16l10 5 10-5",
} as const;

type SymbolName = keyof typeof paths;
const symbols: Record<string, SymbolName> = {
  Lambda: "bolt", EC2: "server", S3: "box", DynamoDB: "database",
  EventBridge: "network", "Secrets Manager": "lock", ECR: "layers",
  CloudWatch: "chart", IAM: "shield", VPC: "network", Terraform: "layers",
  Docker: "box", "GitHub Actions": "bolt", Linux: "terminal", Git: "branch",
  Python: "code", FastAPI: "bolt", SQLAlchemy: "database", PostgreSQL: "database",
  pytest: "check", "Java 21": "coffee", "Spring Boot": "leaf",
};
const brandColors: Record<string, string> = {
  Lambda: "#ED7100", EC2: "#ED7100", S3: "#C18536", DynamoDB: "#C925D1",
  EventBridge: "#E7157B", "Secrets Manager": "#DD344C", ECR: "#ED7100",
  CloudWatch: "#E7157B", IAM: "#DD344C", VPC: "#8C4FFF",
  Terraform: "#844FBA", Docker: "#2496ED", "GitHub Actions": "#2088FF",
  Linux: "#FCC624", Git: "#F05032", Python: "#3776AB", FastAPI: "#C18536",
  SQLAlchemy: "#D71F00", PostgreSQL: "#4169E1", pytest: "#0A9EDC",
  "Java 21": "#F89820", "Spring Boot": "#C18536", Photoshop: "#31A8FF",
  Illustrator: "#FF9A00", "After Effects": "#9999FF", "Premiere Pro": "#9999FF",
  Lightroom: "#31A8FF", Figma: "#A259FF",
};
const adobe: Record<string, string> = {
  Photoshop: "Ps", Illustrator: "Ai", "After Effects": "Ae", "Premiere Pro": "Pr", Lightroom: "Lr",
};
const groups: { title: string; description: string; icon: SymbolName }[] = [
  { title: "Cloud & AWS", description: "Where I build", icon: "cloud" },
  { title: "DevOps & delivery", description: "How I ship", icon: "layers" },
  { title: "Languages & backend", description: "What powers it", icon: "terminal" },
  { title: "Creative tools", description: "How I shape it", icon: "pen" },
];

function Symbol({ name, size = 19 }: { name: SymbolName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}

function FigmaIcon() {
  return (
    <svg width="16" height="22" viewBox="0 0 20 30" aria-hidden="true">
      <path fill="var(--figma-red, currentColor)" d="M5 0h5v10H5A5 5 0 0 1 5 0Z" />
      <path fill="var(--figma-orange, currentColor)" d="M10 0h5a5 5 0 0 1 0 10h-5Z" />
      <path fill="var(--figma-purple, currentColor)" d="M5 10h5v10H5a5 5 0 0 1 0-10Z" />
      <circle fill="var(--figma-blue, currentColor)" cx="15" cy="15" r="5" />
      <path fill="var(--figma-green, currentColor)" d="M5 20h5v5a5 5 0 1 1-5-5Z" />
    </svg>
  );
}

export default function Skills() {
  return (
    <div className="skills-workbench border-b border-line">
      <div className="skills-intro" data-reveal="rise">
        <p>Built around the cloud.<br /><span>Connected by curiosity.</span></p>
        <span className="skills-caption"><span aria-hidden="true" />My working toolkit</span>
      </div>
      <div className="skills-directory" data-reveal-group>
        {skills.map((group, index) => {
          const meta = groups[index];
          return (
            <div key={group.group} className="skills-row" data-reveal="rise">
              <div className="skills-category">
                <span className="skills-category-icon"><Symbol name={meta.icon} size={21} /></span>
                <div className="skills-category-copy">
                  <p className="skills-category-note">{meta.description}</p>
                  <h3>{meta.title}</h3>
                </div>
              </div>
              <ul className="skills-tools" aria-label={meta.title}>
                {group.items.map((skill) => (
                  <li key={skill} className="skills-tool" style={{ "--skill-brand": brandColors[skill] } as CSSProperties}>
                    <span className="skills-tool-icon">
                      {skill === "Figma" ? <FigmaIcon /> : adobe[skill] ? <span aria-hidden="true" className="flex h-5 w-5 items-center justify-center rounded-sm border border-current font-sans text-[10px] font-semibold">{adobe[skill]}</span> : <Symbol name={symbols[skill] ?? "code"} />}
                    </span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
