# Portfolio

1. Dans `astro.config.mjs` : remplace `VOTRE-PSEUDO` (pseudo GitHub) et `base` (nom du dépôt).
2. Sur GitHub : Settings > Pages > Source : **GitHub Actions**.
3. Push sur `main` : le site se déploie tout seul.
4. Contenu : modifie `src/data/projets.json` et `src/data/competences.json`.
   Les liens Projets <-> Compétences se créent tout seuls via le champ `competences` de chaque projet.
5. Mets ta photo dans `public/` et ton CV dans `public/cv.pdf`.
6. Formulaire : crée un formulaire sur formspree.io et colle son URL dans `src/pages/contact.astro`.

En local : `npm install` puis `npm run dev`.
