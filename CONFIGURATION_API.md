# 🔑 CONFIGURATION CLÉ API GOOGLE GEMINI

## ⚠️ **PROBLÈME IDENTIFIÉ**

Le chatbot affiche "Désolée Pierre-sama, mon âme s'est troublée..." en boucle car **il manque la clé API Google Gemini**.

## 🚀 **SOLUTION RAPIDE**

### Étape 1: Obtenir votre clé API
1. Allez sur : https://aistudio.google.com/app/apikey
2. Connectez-vous avec votre compte Google
3. Cliquez sur **"Create API Key"**
4. Copiez la clé générée

### Étape 2: Configurer la clé
Créez un fichier `.env.local` dans le dossier du projet avec :

```env
GEMINI_API_KEY=votre_clé_api_ici
```

### Étape 3: Redémarrer
1. Arrêtez le serveur (Ctrl+C)
2. Relancez avec `npm run dev`
3. L'application fonctionnera normalement

## 📋 **Vérification**

Après configuration, vous devriez voir :
- ✅ Rem-san répond normalement
- ✅ Les 20 expressions fonctionnent
- ✅ Plus de boucle d'erreur

## 🔧 **Dépannage**

Si le problème persiste :
1. Vérifiez que la clé API est correcte
2. Assurez-vous d'avoir un quota disponible
3. Redémarrez complètement le navigateur

**Rem-san attend votre clé API pour fonctionner !** 🌸
