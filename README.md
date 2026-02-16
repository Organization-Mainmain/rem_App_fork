# Rem App (FR/JP) — Avatar conversationnel Gemini

## Objectif
Application d'avatar conversationnel avec :
- réponses **français/japonais**,
- intégration **Gemini API**,
- expressions visuelles **1 à 20** selon le contexte,
- système de **cadeaux**,
- synthèse vocale orientée **voix féminines FR/JP**.

## Architecture
- `App.tsx` : orchestration chat, état utilisateur, stockage local, alarmes, cadeaux, modes IA.
- `services/geminiService.ts` : appel Gemini réel avec parsing JSON robuste.
- `services/expressionImageService.ts` : mapping des 20 expressions + détection conversationnelle.
- `components/SettingsHub.tsx` : profil, clé API Gemini, voix, cadeaux, import/export.
- `services/speechService.ts` : sélection automatique de voix féminines selon langue.

## Installation (frontend)
```bash
npm install
```

## Backend / Base de données
- Aucun backend applicatif ni base SQL dans ce dépôt actuellement.
- Persistance via `localStorage` (profil, messages, paramètres, clé Gemini).

## Configuration Gemini
- Option A: `.env.local`
```env
GEMINI_API_KEY=VOTRE_CLE
```
- Option B: directement dans l'application :
  - `Paramètres > API Gemini > Sauvegarder la clé API`.

## Lancer
```bash
npm run dev
```
URL: `http://localhost:3001`

## Build
```bash
npm run build
```

## Expressions
L'application utilise `public/expressions/1.png` ... `20.png`.
Si une image est absente, un fallback emoji est affiché.

## Notes
- Le bouton **Conversation** permet maintenant de masquer/réafficher clairement l'historique.
- En mode Gemini, une erreur explicite est levée si aucune clé n'est configurée.
