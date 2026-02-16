# Agent.md — Résolutions et consignes internes

## Analyse des échecs précédents
Le commit précédent avait rétabli un build minimal mais avec trop de stubs simplifiés, ce qui dégradait la logique métier (Gemini réel, expressions, cadeaux).

## Corrections appliquées
1. `geminiService` réécrit avec appel réel Gemini + parsing JSON robuste.
2. `expressionImageService` complété (mapping 1..20, détection texte, image path).
3. `SettingsHub` enrichi (profil, voix, cadeaux, import/export, sync emails).
4. `Avatar` amélioré pour utiliser les images d'expressions avec fallback emoji.
5. `ollamaService` rendu opérationnel (tentative HTTP locale + throw en erreur).
6. Fallback IA consolidé dans `App.tsx` : Ollama -> coherent -> simple -> local.
7. Correction d'un bug de double synthèse vocale et prise en compte fiable des points cadeaux.

## Règle pour prochaines exécutions
- Toujours vérifier d'abord si les imports manquants cachent des fonctionnalités métier attendues.
- Prioriser la restauration fonctionnelle réelle (pas seulement compilation).
- Valider systématiquement : `npm run build`, `npm run dev`, capture Playwright.
- Si la structure DB change : créer/mettre à jour `last_update.sql` selon la convention projet.
