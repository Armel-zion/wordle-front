# Wordle

## Présentation

Ce projet consiste à réaliser un jeu de Wordle en français.

Le joueur doit trouver un mot de 5 lettres en plusieurs tentatives. Après chaque tentative, les lettres sont colorées afin d'indiquer si elles sont correctement placées, présentes dans le mot mais mal placées, ou absentes du mot.

Le projet utilise une API Wordle permettant de récupérer le mot du jour.

---

## Technologies utilisées

- React
- TypeScript
- Vite
- HTML / CSS
- Next.js pour l'API
- API Wordle

---

# Lancement du backend

Le backend correspond à l'API Wordle fournie pour le projet.

### Prérequis

- Node.js 18 ou supérieur
- npm, yarn, pnpm ou bun

### Installation

Se placer dans le dossier du backend puis installer les dépendances :

```bash
npm install
Variables d'environnement

Créer un fichier .env.local à la racine du backend :

API_KEY=your-secret-api-key
CLIENT_URL=https://your-frontend-domain.com
API_KEY correspond à la clé utilisée pour sécuriser l'accès à l'API.
CLIENT_URL correspond à l'adresse du frontend autorisé à communiquer avec l'API.
Lancer le backend

Pour lancer le serveur en mode développement :

npm run dev

L'API sera ensuite accessible à l'adresse :

http://localhost:3000/api/word
Utilisation de l'API

L'API permet de récupérer le mot du jour.

Requête
GET /api/word

La requête doit contenir la clé API dans les headers :

x-api-key: your-secret-api-key

La langue peut être précisée grâce au paramètre lang.

Les langues disponibles sont :

en : anglais
es : espagnol
fr : français

Pour récupérer le mot du jour en français :

GET /api/word?lang=fr

Dans notre projet, nous utilisons la langue française.

Sources

Les sources utilisées pour réaliser le projet sont :

Documentation officielle React : https://react.dev/
Documentation officielle TypeScript : https://www.typescriptlang.org/docs/
Documentation officielle Vite : https://vite.dev/guide/
MDN Web Docs : https://developer.mozilla.org/
API Wordle fournie dans le cadre du projet
