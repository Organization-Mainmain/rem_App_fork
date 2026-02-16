# Agent.md — Résolutions et plan de continuité

## Problèmes corrigés dans cette itération
1. Bouton focus/conversation ambigu : maintenant il masque/réaffiche explicitement l'historique.
2. Expressions avatar : association améliorée via détection sur la conversation (question + réponse) et mapping complet 1..20.
3. Clé Gemini configurable côté utilisateur : ajout du champ dans Paramètres + stockage local.
4. Voix féminines FR/JP : sélection automatique par langue avec fallback navigateur.

## Décisions techniques
- `geminiApiKey` stockée localement (`localStorage`) et utilisée en priorité sur les variables d'environnement.
- `speechService` tente d'abord la voix préférée, puis détecte une voix féminine par heuristiques de nom/langue.
- Fallback IA préservé : Ollama → IA locale cohérente → fallback simple.

## Vérifications à toujours exécuter
- `npm run build`
- `npm run dev -- --host 0.0.0.0 --port 3001`
- Capture Playwright après modification UI

## Rappel DB
- Aucun schéma SQL actif dans ce projet.
- Si une DB est ajoutée/modifiée : créer/mettre à jour `last_update.sql` (et archiver vers `last_update_old.sql` si nécessaire).
