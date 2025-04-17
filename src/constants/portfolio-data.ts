import { Technology, Project } from "../types";

export const TECHNOLOGIES: Technology[] = [
  { name: "TypeScript", proficiency: 90 },
  { name: "JavaScript", proficiency: 95 },
  { name: "Next.js", proficiency: 85 },
  { name: "Node.js", proficiency: 88 },
  { name: "Tailwind CSS", proficiency: 92 },
  { name: "PostgreSQL", proficiency: 85 },
  { name: "Docker", proficiency: 80 },
  { name: "Kubernetes", proficiency: 75 },
  { name: "Prisma", proficiency: 88 },
  { name: "Clean Architecture", proficiency: 85 },
];

export const TOOLS: string[] = [
  "Firebase",
  "Google Cloud",
  "Vercel",
  "NextAuth",
  "Jest",
  "ESLint",
  "PostgreSQL",
  "Príncipio SOLID",
  "Edge Functions",
  "Shadcn UI",
  "Docker",
  "NestJS",
  "NextJS",
  "Node",
];

export const FEATURED_PROJECTS: Project[] = [
  {
    title: "Sistema de Notificações Extrajudiciais",
    description:
      "Sistema completo para gestão e automação de notificações extrajudiciais",
    features: [
      "Upload de lotes de arquivos",
      "Extração automática com IA de dados",
      "Integração com Google Maps",
      "Geração de rotas inteligentes",
      "Autenticação segura com NextAuth",
      "App mobile para entregadores",
      "Sistema de tentativas e reprogramação",
    ],
  },
  {
    title: "Sistema Financeiro Cartorário",
    description:
      "Em desenvolvimento - Sistema completo para gestão financeira cartorária",
    features: [
      "Geração automática de NF",
      "Sistema de pagamentos integrado",
      "Dashboard analítico",
      "Automação de pagamentos",
      "Análise com GPT API",
      "API Rest para integração com sistemas",
    ],
  },
];

export const TERMINAL_STEPS = [
  "INICIANDO PROTOCOLO DE SEGURANÇA...",
  "VERIFICANDO CREDENCIAIS DE INOVAÇÃO...",
  "ACESSANDO BASE DE CONHECIMENTO...",
  "ANALISANDO POTENCIAL DE MODERNIZAÇÃO...",
  "PREPARANDO DEMONSTRAÇÃO DE CAPACIDADES...",
  "DESENVOLVEDOR PRONTO PARA DESENCAPSULAMENTO...",
];
