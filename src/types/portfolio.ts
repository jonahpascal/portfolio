export type CompetenceId = 'C1' | 'C2' | 'C3' | 'C4' | 'C5' | 'C6';

export type ProjectCategory = 'IUT' | 'Stage' | 'Perso';

export interface Competence {
  id: CompetenceId;
  code: string;
  butTitle: string;
  title: string;
  tagline: string;
  description: string;
  pillars: string[];
  tools: string[];
  level: string;
  accentNote: string;
}

export interface ProjectCompetenceRef {
  competenceId: CompetenceId;
  contribution: string;
}

export interface Project {
  slug: string;
  code: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  year: string;
  duration: string;
  role: string;
  context: string;
  summary: string;
  architecture: string[];
  highlights: string[];
  stack: string[];
  competences: ProjectCompetenceRef[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface TimelineItem {
  id: string;
  period: string;
  code: string;
  title: string;
  organization: string;
  location: string;
  type: 'Formation' | 'Expérience';
  description: string;
  tags: string[];
}

export interface ProfileData {
  name: string;
  handle: string;
  role: string;
  availability: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  bio: string;
  approach: string;
  languages: { name: string; level: string }[];
  interests: string[];
}
