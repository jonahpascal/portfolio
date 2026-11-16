import { Project } from '../types/portfolio';

export const PROJECTS: Project[] = [
  {
    slug: 'plateforme-suivi-interventions',
    code: 'PRJ // 01',
    title: 'Chronos — Suivi d’Interventions Techniques',
    subtitle: 'Application métier complète développée durant mon stage de BUT 2',
    category: 'Stage',
    year: '2025',
    duration: '10 semaines',
    role: 'Développeur Full-Stack (Stagiaire)',
    context:
      'Stage de fin de deuxième année au sein d’une PME de services informatiques : remplacement d’un suivi sur tableurs par une application web centralisée pour les techniciens et la direction.',
    summary:
      'Conception et mise en production d’un outil de ticketing et de planification d’interventions avec authentification par rôles, tableau de bord temps réel et export PDF des rapports d’intervention.',
    architecture: [
      'Front-end React + TypeScript typé de bout en bout avec validation de formulaires',
      'API REST Node.js / Express sécurisée par JWT et contrôle d’accès RBAC',
      'Base PostgreSQL avec historique d’audit des statuts d’intervention',
      'Déploiement conteneurisé via Docker Compose derrière un reverse proxy Nginx',
    ],
    highlights: [
      'Réduction estimée de 40 % du temps de saisie administrative des techniciens',
      'Mise en place d’un pipeline CI GitHub Actions exécutant lint et tests à chaque PR',
      'Adopté en production interne dès la dernière semaine de stage',
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'Nginx'],
    competences: [
      {
        competenceId: 'C1',
        contribution: 'Développement complet de l’interface React et de l’API REST Node.js avec tests d’intégration.',
      },
      {
        competenceId: 'C3',
        contribution: 'Conteneurisation Docker Compose et configuration du reverse proxy Nginx avec HTTPS.',
      },
      {
        competenceId: 'C4',
        contribution: 'Modélisation MCD/MLD et écriture des migrations PostgreSQL pour la traçabilité des tickets.',
      },
      {
        competenceId: 'C5',
        contribution: 'Recueil du besoin auprès des techniciens, maquettage Figma et démos hebdomadaires.',
      },
      {
        competenceId: 'C6',
        contribution: 'Intégration dans l’équipe technique, revues de code et rédaction du manuel utilisateur.',
      },
    ],
    githubUrl: 'https://github.com/jonahpascal',
    featured: true,
  },
  {
    slug: 'sae-graphe-itineraire-multimodal',
    code: 'PRJ // 02',
    title: 'AtlasRoute — Calculateur d’Itinéraires Multimodaux',
    subtitle: 'SAÉ d’algorithmique avancée et visualisation cartographique à l’IUT',
    category: 'IUT',
    year: '2025',
    duration: '6 semaines',
    role: 'Développeur Algorithmique & UI (Équipe de 3)',
    context:
      'Situation d’Apprentissage et d’Évaluation (SAÉ) de BUT 2/3 portant sur l’optimisation de graphes pondérés appliquée aux transports en commun.',
    summary:
      'Moteur de recherche de plus court chemin combinant algorithme A* et Dijkstra avec prise en compte des correspondances, visualisé sur une carte interactive fluide.',
    architecture: [
      'Modélisation du réseau sous forme de graphe orienté pondéré par les horaires',
      'Implémentation de A* avec heuristique géographique (distance de Haversine)',
      'Interface de visualisation pas-à-pas des nœuds explorés pour la soutenance',
    ],
    highlights: [
      'Temps de calcul moyen inférieur à 18 ms sur un graphe de 12 000 sommets',
      'Comparatif instrumenté entre Dijkstra classique et A* sur plusieurs jeux de tests',
    ],
    stack: ['TypeScript', 'Python', 'React', 'Algorithmes de graphes', 'Vitest'],
    competences: [
      {
        competenceId: 'C1',
        contribution: 'Création de l’interface interactive permettant de tracer et comparer les trajets.',
      },
      {
        competenceId: 'C2',
        contribution: 'Implémentation et benchmark de Dijkstra et A*, réduction mémoire de la file de priorité.',
      },
      {
        competenceId: 'C6',
        contribution: 'Répartition des modules en trinôme sur Git avec branches de fonctionnalités et soutenance.',
      },
    ],
    githubUrl: 'https://github.com/jonahpascal',
    featured: true,
  },
  {
    slug: 'homelab-ci-cd-observabilite',
    code: 'PRJ // 03',
    title: 'BlueprintStack — Infra Auto-hébergée & CI/CD',
    subtitle: 'Projet personnel d’administration système, conteneurisation et monitoring',
    category: 'Perso',
    year: '2026',
    duration: 'Continu',
    role: 'Créateur & Administrateur',
    context:
      'Projet personnel visant à maîtriser le cycle complet d’hébergement d’applications web sur un serveur Linux dédié.',
    summary:
      'Infrastructure reproductible gérant plusieurs services web isolés par conteneurs, déploiement automatisé depuis GitHub Actions et surveillance des ressources.',
    architecture: [
      'Configuration serveur durcie (SSH par clé, UFW, fail2ban)',
      'Reverse proxy automatisé avec renouvellement TLS automatique',
      'Workflows GitHub Actions bâtissant et poussant les images sur GHCR',
    ],
    highlights: [
      'Déploiement d’une nouvelle version en moins de 45 secondes après un push sur main',
      'Zéro interruption de service lors des mises à jour grâce au redémarrage orchestré',
    ],
    stack: ['Linux', 'Docker', 'GitHub Actions', 'Nginx', 'Bash'],
    competences: [
      {
        competenceId: 'C2',
        contribution: 'Optimisation de la taille des images Docker multi-stage (-65 % sur le poids final).',
      },
      {
        competenceId: 'C3',
        contribution: 'Administration Linux, sécurisation réseau, configuration Docker et pipelines CI/CD.',
      },
    ],
    githubUrl: 'https://github.com/jonahpascal',
    featured: true,
  },
  {
    slug: 'sae-erp-bibliotheque-universitaire',
    code: 'PRJ // 04',
    title: 'BiblioCore — Gestion de Fonds & Emprunts',
    subtitle: 'SAÉ Java / SQL en équipe agile de 4 étudiants à l’IUT',
    category: 'IUT',
    year: '2024',
    duration: '8 semaines',
    role: 'Lead Base de Données & Back-end (Équipe de 4)',
    context:
      'Projet semestriel à l’IUT : concevoir un logiciel de gestion de médiathèque multi-sites répondant à un cahier des charges client évolutif.',
    summary:
      'Application structurée autour d’une base relationnelle robuste gérant les exemplaires, réservations, pénalités et statistiques d’emprunt.',
    architecture: [
      'Schéma relationnel normalisé en 3FN avec contraintes d’intégrité et triggers SQL',
      'Couche DAO Java découplée facilitant les tests unitaires avec base en mémoire',
      'Gestion de projet en 4 sprints Scrum avec backlog priorisé',
    ],
    highlights: [
      'Couverture de tests unitaires supérieure à 80 % sur la logique métier',
      'Zéro anomalie bloquante lors de la recette finale devant le client fictif',
    ],
    stack: ['Java', 'PostgreSQL', 'JUnit', 'Git', 'Scrum'],
    competences: [
      {
        competenceId: 'C1',
        contribution: 'Architecture en couches DAO/Service et écriture des tests unitaires JUnit.',
      },
      {
        competenceId: 'C4',
        contribution: 'Conception MCD/MLD, création des vues statistiques et optimisation des requêtes SQL.',
      },
      {
        competenceId: 'C5',
        contribution: 'Animation des points d’avancement, découpage des user stories et suivi du backlog.',
      },
      {
        competenceId: 'C6',
        contribution: 'Coordination à 4 sur GitLab, résolution de conflits et présentation de fin de sprint.',
      },
    ],
    githubUrl: 'https://github.com/jonahpascal',
  },
  {
    slug: 'portfolio-architectural-blueprint',
    code: 'PRJ // 05',
    title: 'Folio Blueprint — Portfolio Éditorial Interactif',
    subtitle: 'Projet personnel React, TypeScript & Framer Motion hébergé sur GitHub Pages',
    category: 'Perso',
    year: '2026',
    duration: '2 semaines',
    role: 'Design & Développement',
    context:
      'Création de mon portfolio de BUT 3 Informatique avec une identité visuelle inspirée du dessin technique et de l’édition papier.',
    summary:
      'Site statique ultra-fluide mettant en relation bidirectionnelle mes projets et mes 6 compétences du BUT Informatique via une matrice interactive.',
    architecture: [
      'SPA React + TypeScript avec routage par hash compatible GitHub Pages',
      'Système de design éditorial sur grille blueprint avec mode d’affichage configurable',
      'Modèle de données typé reliant projets et compétences dans les deux sens',
    ],
    highlights: [
      'Matrice interactive Projets × Compétences avec filtrage instantané',
      'CV intégré avec feuille de style dédiée à l’export PDF haute précision',
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    competences: [
      {
        competenceId: 'C1',
        contribution: 'Développement complet de l’interface, du système de design et des animations.',
      },
      {
        competenceId: 'C2',
        contribution: 'Bundle léger, découpage propre et animations GPU fluides à 60 fps.',
      },
      {
        competenceId: 'C3',
        contribution: 'Déploiement automatisé sur GitHub Pages via GitHub Actions.',
      },
      {
        competenceId: 'C5',
        contribution: 'Structuration de l’arborescence et priorisation de l’expérience recruteur.',
      },
    ],
    githubUrl: 'https://github.com/jonahpascal/portfolio',
    liveUrl: 'https://jonahpascal.github.io/portfolio/',
  },
  {
    slug: 'cli-analyseur-logs-reseau',
    code: 'PRJ // 06',
    title: 'PulseLog — Analyseur de Logs HTTP en CLI',
    subtitle: 'Outil personnel en Python pour diagnostiquer rapidement les erreurs serveur',
    category: 'Perso',
    year: '2025',
    duration: '1 semaine',
    role: 'Créateur',
    context:
      'Besoin concret né lors de mon stage : parser rapidement des fichiers de logs Nginx volumineux sans dépendre d’une stack lourde.',
    summary:
      'Utilitaire en ligne de commande capable de traiter des centaines de milliers de lignes en streaming et d’en extraire les pics de latence, codes 5xx et IP suspectes.',
    architecture: [
      'Lecture en streaming ligne par ligne à empreinte mémoire constante O(1)',
      'Agrégation par fenêtre temporelle et export JSON / CSV',
    ],
    highlights: [
      'Analyse de 500 000 lignes de logs en moins de 1,4 seconde',
      'Adopté comme outil de diagnostic rapide sur l’environnement de pré-production',
    ],
    stack: ['Python', 'Regex', 'CLI', 'Linux'],
    competences: [
      {
        competenceId: 'C2',
        contribution: 'Traitement en flux sans chargement intégral en RAM et structures de comptage rapides.',
      },
      {
        competenceId: 'C3',
        contribution: 'Intégration dans des scripts shell Linux d’exploitation serveur.',
      },
      {
        competenceId: 'C4',
        contribution: 'Parsing, nettoyage et structuration des données de logs vers CSV/JSON.',
      },
    ],
    githubUrl: 'https://github.com/jonahpascal',
  },
];

export const PROJECT_MAP = Object.fromEntries(
  PROJECTS.map((p) => [p.slug, p])
) as Record<string, Project>;
