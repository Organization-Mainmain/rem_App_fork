# AI Idol Companion - Version PWA

## Installation comme application Android

Votre application AI Idol Companion est maintenant une **Progressive Web App (PWA)** et peut être installée comme une application native sur Android.

### Étapes d'installation :

1. **Ouvrir l'application dans votre navigateur mobile**
   - Lancez `npm run dev` sur votre ordinateur
   - Accédez à l'URL locale depuis votre téléphone (ex: `http://192.168.1.100:5173`)

2. **Installer l'application**
   - Dans Chrome/Edge Android, cliquez sur le menu (⋮)
   - Sélectionnez "Ajouter à l'écran d'accueil" ou "Installer l'application"
   - Confirmez l'installation

3. **Lancer l'application**
   - L'icône apparaîtra sur votre écran d'accueil
   - L'application se lancera en mode plein écran

### Fonctionnalités PWA :

✅ **Installation native** sur Android/iOS  
✅ **Mode hors ligne** avec cache intelligent  
✅ **Notifications push** intégrées  
✅ **Icône personnalisée** sur l'écran d'accueil  
✅ **Interface plein écran** sans barre d'adresse  
✅ **Mises à jour automatiques**  

### Génération des icônes :

1. Ouvrez `public/icon-generator.html` dans votre navigateur
2. Cliquez sur "Générer toutes les icônes"
3. Téléchargez les différentes tailles d'icônes
4. Placez-les dans le dossier `public/` de votre projet

### Déploiement :

Pour une installation facile, déployez l'application sur :
- **Vercel** (recommandé)
- **Netlify**
- **Firebase Hosting**
- **GitHub Pages**

L'application sera alors accessible via une URL publique et installable en PWA.

### Différence avec APK :

| PWA | APK |
|-----|-----|
| ✅ Installation en 1 clic | ⚠️ Installation manuelle |
| ✅ Mises à jour auto | ⚠️ Mises à jour manuelles |
| ✅ Compatible tous OS | ⚠️ Android uniquement |
| ✅ Taille réduite | ⚠️ Taille plus grande |
| ✅ Pas de store requis | ⚠️ Google Play Store requis |

### Notes techniques :

- Service Worker : `sw.js`
- Manifest PWA : `manifest.json`
- Support offline activé
- Notifications push configurées
- Thème personnalisé (#ff337a)
