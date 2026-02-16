# Agent.md — Notes d'exécution et maintenance

## Résumé du diagnostic
- Le projet original référençait des imports manquants (`components/*`, `services/*`, `styles/*`).
- Le build échouait initialement sur des modules inexistants.

## Résolution appliquée
1. Création des dossiers `components/`, `services/`, `styles/`.
2. Ajout d'implémentations minimales et typées pour restaurer un état exécutable.
3. Vérification `npm run build` réussie.
4. Vérification visuelle via Playwright.

## Bonnes pratiques pour prochaines itérations
- Ajouter toute nouvelle dépendance dans `package.json`.
- Vérifier les imports avant commit (`npm run build`).
- Garder les signatures de services stables pour limiter la régression sur `App.tsx`.
- Si des changements DB arrivent: créer/mettre à jour `last_update.sql` selon la convention projet.

## Limitations connues
- Pas de backend ni BDD inclus dans ce dépôt actuellement.
- Les services IA sont en mode démonstration locale tant qu'aucune intégration serveur/API complète n'est branchée.
