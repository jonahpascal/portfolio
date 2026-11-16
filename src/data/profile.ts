import { ProfileData, TimelineItem } from '../types/portfolio';

export const PROFILE: ProfileData = {
  name: 'Jonah Pascal',
  handle: 'jonahpascal',
  role: 'Étudiant en BUT 3 Informatique — Développeur Full-Stack',
  availability: 'Ouvert aux opportunités (Stage fin d’études / Alternance / Junior)',
  location: 'France',
  email: 'jonah.pascal@orange.fr',
  github: 'https://github.com/jonahpascal',
  linkedin: 'https://www.linkedin.com',
  bio: 'Étudiant en 3e année de BUT Informatique, je conçois des applications web et logicielles structurées, rapides et maintenables. J’aime autant l’architecture logicielle et l’algorithmique que le soin apporté aux interfaces.',
  approach:
    'Chaque projet est abordé comme un plan d’architecture : comprendre les contraintes métier, modéliser proprement les données, choisir des outils sobres et livrer un produit fiable, testé et documenté.',
  languages: [
    { name: 'Français', level: 'Langue maternelle' },
    { name: 'Anglais', level: 'Niveau B2 — Technique & professionnel' },
  ],
  interests: [
    'Architecture logicielle & Design systems',
    'Auto-hébergement & DevOps',
    'Algorithmique & Visualisation de données',
    'Typographie & Édition numérique',
  ],
};

export const TIMELINE: TimelineItem[] = [
  {
    id: 'but-3',
    period: '2025 — 2026',
    code: 'PHASE // 04',
    title: 'BUT 3 Informatique — Réalisation d’applications',
    organization: 'IUT Informatique',
    location: 'France',
    type: 'Formation',
    description:
      'Approfondissement en architecture logicielle, qualité de code, optimisation, déploiement continu et conduite de projets complexes en équipe.',
    tags: ['Architecture', 'CI/CD', 'Tests', 'Gestion de projet'],
  },
  {
    id: 'stage-but2',
    period: 'Avril — Juin 2025',
    code: 'PHASE // 03',
    title: 'Stage Développeur Full-Stack (10 semaines)',
    organization: 'Entreprise de Services Numériques',
    location: 'France',
    type: 'Expérience',
    description:
      'Conception, développement et mise en production de Chronos, une application interne de suivi d’interventions (React, Node.js, PostgreSQL, Docker).',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
  },
  {
    id: 'but-2',
    period: '2024 — 2025',
    code: 'PHASE // 02',
    title: 'BUT 2 Informatique',
    organization: 'IUT Informatique',
    location: 'France',
    type: 'Formation',
    description:
      'Développement web et logiciel avancé, modélisation de bases de données, réseaux, systèmes Linux et méthodes agiles au travers de SAÉ en équipe.',
    tags: ['Java', 'SQL', 'Web', 'Scrum', 'Linux'],
  },
  {
    id: 'but-1',
    period: '2023 — 2024',
    code: 'PHASE // 01',
    title: 'BUT 1 Informatique',
    organization: 'IUT Informatique',
    location: 'France',
    type: 'Formation',
    description:
      'Fondamentaux de la programmation, algorithmique, architecture des ordinateurs, bases de données relationnelles et travail collaboratif.',
    tags: ['Algorithmique', 'C / Java', 'HTML/CSS', 'SQL'],
  },
];
