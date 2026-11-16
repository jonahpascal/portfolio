import { Competence } from '../types/portfolio';

export const COMPETENCES: Competence[] = [
  {
    id: 'C1',
    code: 'COMP // 01',
    butTitle: 'Réaliser un développement d’application',
    title: 'Développement d’Applications',
    tagline: 'Concevoir, coder, tester et maintenir des applications web, mobiles et logicielles robustes.',
    description:
      'De la maquette à la mise en production : architecture modulaire, interfaces soignées, tests automatisés et respect des bonnes pratiques de génie logiciel.',
    pillars: [
      'Architecture front-end & back-end maintenable (MVC, composants, API REST)',
      'Intégration d’interfaces accessibles, responsives et animées',
      'Tests unitaires, d’intégration et validation qualité du code',
      'Documentation technique et versioning propre sous Git',
    ],
    tools: ['TypeScript', 'React', 'Java', 'Node.js', 'Tailwind CSS', 'JUnit / Vitest'],
    level: 'Niveau 3 — BUT 3',
    accentNote: 'Production & Qualité logicielle',
  },
  {
    id: 'C2',
    code: 'COMP // 02',
    butTitle: 'Optimiser des applications informatiques',
    title: 'Algorithmique & Optimisation',
    tagline: 'Analyser la complexité, profiler les goulets d’étranglement et accélérer les traitements.',
    description:
      'Choix de structures de données adaptées, réduction de la complexité algorithmique, optimisation des temps de rendu et des requêtes réseau.',
    pillars: [
      'Analyse de complexité temporelle et spatiale (graphes, arbres, tri, cache)',
      'Profiling de performance front-end (rendu, bundle, lazy-loading)',
      'Optimisation de requêtes SQL et indexation ciblée',
      'Résolution de problèmes algorithmiques sous contraintes',
    ],
    tools: ['C / C++', 'Python', 'TypeScript', 'PostgreSQL Explain', 'Lighthouse', 'Structures de graphes'],
    level: 'Niveau 3 — BUT 3',
    accentNote: 'Performance & Complexité',
  },
  {
    id: 'C3',
    code: 'COMP // 03',
    butTitle: 'Administrer des systèmes informatiques communicants complexes',
    title: 'Systèmes, Réseaux & DevOps',
    tagline: 'Déployer, sécuriser et automatiser des services conteneurisés et des pipelines CI/CD.',
    description:
      'Configuration d’environnements Linux, conteneurisation Docker, mise en place de workflows CI/CD et sécurisation des échanges réseau.',
    pillars: [
      'Administration Linux, gestion des services, droits et pare-feu',
      'Conteneurisation & orchestration locale (Docker, Docker Compose)',
      'Automatisation des builds et déploiements via GitHub Actions',
      'Protocoles réseau, reverse proxy (Nginx) et certificats TLS',
    ],
    tools: ['Linux', 'Docker', 'GitHub Actions', 'Nginx', 'Bash', 'TCP/IP & SSH'],
    level: 'Niveau 2/3 — BUT 3',
    accentNote: 'Infra & Déploiement continu',
  },
  {
    id: 'C4',
    code: 'COMP // 04',
    butTitle: 'Gérer des données de l’information',
    title: 'Données & Bases de Données',
    tagline: 'Modéliser, structurer, interroger et sécuriser les données relationnelles et NoSQL.',
    description:
      'Conception de schémas normalisés (MCD/MLD), écriture de requêtes complexes, gestion de l’intégrité, des migrations et des sauvegardes.',
    pillars: [
      'Modélisation conceptuelle et logique (MCD, MLD, normalisation)',
      'SQL avancé : jointures, vues, triggers, transactions et procédures',
      'Modélisation NoSQL orientée documents et cache',
      'Protection des données, RGPD et contrôle d’accès',
    ],
    tools: ['PostgreSQL', 'MySQL', 'SQLite', 'MongoDB', 'Prisma', 'Merise / UML'],
    level: 'Niveau 2 — BUT 3',
    accentNote: 'Modélisation & Persistance',
  },
  {
    id: 'C5',
    code: 'COMP // 05',
    butTitle: 'Conduire un projet',
    title: 'Gestion de Projet & Produit',
    tagline: 'Cadrer le besoin, découper les lots, prioriser et livrer de la valeur en itérations.',
    description:
      'Recueil des besoins auprès du client ou du tuteur, rédaction de cahiers des charges, planification agile (Scrum/Kanban) et suivi des risques.',
    pillars: [
      'Analyse du besoin, personas et rédaction de user stories',
      'Planification itérative par sprints, estimation et priorisation',
      'Suivi d’avancement, gestion des risques et recettes fonctionnelles',
      'Livraison incrémentale et démonstrations régulières',
    ],
    tools: ['Scrum / Kanban', 'GitHub Projects', 'Figma', 'Notion', 'UML', 'Cahier des charges'],
    level: 'Niveau 2 — BUT 3',
    accentNote: 'Cadrage & Livraison',
  },
  {
    id: 'C6',
    code: 'COMP // 06',
    butTitle: 'Collaborer au sein d’une équipe informatique',
    title: 'Collaboration & Communication',
    tagline: 'Travailler efficacement en équipe technique, relire du code et vulgariser ses choix.',
    description:
      'Collaboration fluide via Git Flow, revues de code constructives, pair programming, communication claire avec les parties prenantes techniques et non techniques.',
    pillars: [
      'Workflow Git collaboratif (branches, Pull Requests, code reviews)',
      'Pair programming et partage de connaissances en équipe',
      'Rédaction de documentation claire et comptes-rendus techniques',
      'Soutenance orale et démonstration devant jury ou client',
    ],
    tools: ['Git / GitHub', 'Pull Requests', 'Markdown', 'Discord / Slack', 'Présentations techniques'],
    level: 'Niveau 3 — BUT 3',
    accentNote: 'Équipe & Transmission',
  },
];

export const COMPETENCE_MAP = Object.fromEntries(
  COMPETENCES.map((c) => [c.id, c])
) as Record<Competence['id'], Competence>;
