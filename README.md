# Rem App — Analyse et exécution locale

## Vue d'ensemble
Rem App est une application **frontend React + Vite + TypeScript** orientée assistant conversationnel avec avatar, stockage local et modes de réponses IA (Gemini, local, Ollama simulé). Le projet est actuellement **sans backend serveur dédié** ni schéma de base de données relationnelle versionné.

## Analyse de l'architecture

### Stack technique
- **Frontend**: React 19, Vite 6, TypeScript.
- **UI**: composants maison (`components/*`) avec styles CSS globaux.
- **Services**: couche d'abstraction IA et utilitaires (`services/*`).
- **Stockage**: `localStorage` côté navigateur pour profil, messages et configuration.

### Points fonctionnels identifiés
- Chat principal dans `App.tsx`.
- Gestion d'état utilisateur (profil, voix, expressions, historique).
- Prise en charge de modes IA multiples (démonstration locale/placeholder).
- Écran de chargement, historique et panneau de paramètres.

## Installation et lancement

## 1) Frontend
Prérequis: Node.js 20+

```bash
npm install
npm run dev
```

Application accessible sur: `http://localhost:3001`

## 2) Backend
Aucun backend applicatif n'est fourni dans ce dépôt.

Si vous souhaitez un backend, vous pouvez en ajouter un service Node/Express ou FastAPI, puis connecter `services/*` à des endpoints HTTP.

## 3) Base de données
Aucune base de données n'est fournie ni requise pour l'exécution actuelle (stockage local navigateur).

Si une base est ajoutée plus tard, pensez à versionner les migrations SQL et suivre la convention `last_update.sql` demandée.

## Build de production
```bash
npm run build
```

## Structure principale
- `App.tsx`: orchestrateur principal.
- `components/`: composants UI.
- `services/`: services IA, thème, voix, expressions.
- `types.ts`: types et enums métier.
- `styles/`: feuilles CSS importées par `index.css`.

## État actuel
Le projet compile et se lance localement en mode développement et build de production.
