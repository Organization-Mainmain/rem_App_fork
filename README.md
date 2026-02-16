# Rem App (FR/JP) — Avatar conversationnel Gemini

## Objectif produit
Rem App est une application **frontend React/Vite** d'avatar conversationnel orientée :
- réponses en **français / japonais**,
- pilotage via **Google Gemini API** (avec fallback local),
- affichage d'**expressions numérotées** (1 à 20),
- système de **cadeaux** qui influence le niveau d'amitié.

## Architecture actuelle
- `App.tsx` : orchestration globale (chat, voix, profil, mémoire, alarmes, cadeaux, mode nuit).
- `components/*` : avatar, historique, contrôles chat, hub de paramètres.
- `services/geminiService.ts` : appel réel à Gemini (`generateContent`) + parsing JSON robuste.
- `services/ollamaService.ts` : tentative locale Ollama (`localhost:11434`), fallback géré côté `App.tsx`.
- `services/expressionImageService.ts` : mapping complet expressions `1..20` + détection heuristique.

## Prérequis
- Node.js 20+
- (Optionnel) Ollama local si vous voulez utiliser le mode local avancé
- Clé Gemini dans `.env.local`

## Installation
```bash
npm install
```

## Configuration Gemini
Créez/éditez `.env.local` :
```env
GEMINI_API_KEY=VOTRE_CLE_GEMINI
```

## Lancer l'application
```bash
npm run dev
```
URL locale : `http://localhost:3001`

## Build de production
```bash
npm run build
```

## Expressions visuelles
L'app tente de charger des images dans `public/expressions/1.png` à `20.png`.
Si une image manque, l'avatar affiche un fallback emoji.

## Notes Backend / BDD
- Ce dépôt ne contient pas de backend applicatif ni schéma SQL actif.
- Le stockage est principalement en `localStorage`.
- Donc aucune migration DB n'a été nécessaire dans cette itération.
