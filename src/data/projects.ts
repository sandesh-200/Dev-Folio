// export interface Project {
//     title: string;
//     description: string;
//     tech: string[];
//     href?: string;
//     githubHref?: string;
//     featured?: boolean;
// }

// export const projects: Project[] = [
//     {
//         title: "DevNotes",
//         description:
//             "A fast, keyboard-first Markdown note-taking app for developers with local-first sync and code highlighting.",
//         tech: ["Next.js", "TypeScript", "SQLite", "Tauri"],
//         href: "https://devnotes.app",
//         githubHref: "https://github.com/sandesh/devnotes",
//         featured: true,
//     },
//     {
//         title: "Pulse — API Monitor",
//         description:
//             "Lightweight uptime monitoring dashboard. Tracks endpoints, latency, and sends Slack alerts on downtime.",
//         tech: ["Node.js", "React", "PostgreSQL", "Docker"],
//         href: "https://pulse.sandeshdhakal.dev",
//         githubHref: "https://github.com/sandesh/pulse",
//         featured: true,
//     },
//     {
//         title: "Snapform",
//         description:
//             "Embeddable form builder with a visual drag-and-drop interface that outputs a single JSON schema. Zero backend.",
//         tech: ["React", "TypeScript", "Zustand", "Tailwind"],
//         githubHref: "https://github.com/sandesh/snapform",
//         featured: true,
//     },
//     {
//         title: "CLI Toolkit",
//         description:
//             "A collection of composable shell utilities for automating dev workflows — project scaffolding, git hooks, env management.",
//         tech: ["Go", "Cobra", "Bash"],
//         githubHref: "https://github.com/sandesh/cli-toolkit",
//         featured: true,
//     },
// ];

export interface Project {
  title: string;
  description: string;
  tech: string[];
  href?: string;
  githubHref?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: "AI Voice Call Bot",
    description:
      "Built an AI-powered voice call bot that automates real-time conversational interactions using OpenAI and Telnyx. Call details and transcripts are securely stored in PostgreSQL for analysis and record keeping.",
    tech: ["Django", "OpenAI", "Telnyx", "PostgreSQL"],
    githubHref: "https://github.com/sandesh-200/Voice-Call-Bot-Telnyx",
    featured: true,
  },
  {
    title: "Bachao — Disaster Management Platform",
    description:
      "Developed a real-time disaster management web application enabling instant alerts and communication during crises. Integrated services such as aid coordination and ambulance support using Socket.IO.",
    tech: ["Node.js", "Express", "React", "MongoDB", "Socket.IO"],
    githubHref: "https://github.com/sandesh-200/Bachao",
    featured: true,
  },
  {
    title: "SayIt — Speech Rating App",
    description:
      "Created a speech evaluation platform that analyzes recorded audio for pauses, word selection, and basic speech patterns. Implemented audio analysis using Librosa along with grammar evaluation modules.",
    tech: ["Django", "Django REST Framework", "PostgreSQL", "React", "Librosa"],
    githubHref:
      "https://github.com/sandesh-200/SayIt---Collaborative-Speech-Training-Platform",
    featured: true,
  },
];
