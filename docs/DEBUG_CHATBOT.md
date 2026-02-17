# 🐛 **DEBUG : Pourquoi le chatbot ne répond pas**

## 🔍 **Diagnostic du problème**

Le chatbot affiche "Désolée Pierre-sama, mon âme s'est troublée..." en boucle car **il ne peut pas communiquer avec Google Gemini API**.

## ⚠️ **Causes possibles**

### **1. Clé API manquante ou incorrecte**
- Le fichier `.env.local` n'existe pas
- La clé `GEMINI_API_KEY` est manquante
- La clé est invalide ou expirée

### **2. Problème de configuration Vite**
- La variable d'environnement n'est pas passée correctement
- Le fichier `vite.config.ts` a un problème

### **3. Problème réseau**
- Pas de connexion internet
- Firewall bloquant l'API
- API Google Gemini inaccessible

## 🔧 **Solutions étape par étape**

### **Étape 1: Vérifier la clé API**

1. **Créez le fichier `.env.local`** dans le dossier du projet :
```
GEMINI_API_KEY=votre_clé_api_ici
```

2. **Obtenez une clé valide** :
   - Allez sur : https://aistudio.google.com/app/apikey
   - Connectez-vous avec votre compte Google
   - Cliquez sur "Create API Key"
   - Copiez la clé

### **Étape 2: Vérifier la configuration**

Dans `vite.config.ts`, vérifiez :
```typescript
define: {
  'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
  'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
}
```

### **Étape 3: Tester la connexion**

1. **Ouvrez les outils de développement** (F12)
2. **Allez dans l'onglet "Network"**
3. **Envoyez un message**
4. **Cherchez les erreurs** :
   - `401 Unauthorized` → Clé API invalide
   - `403 Forbidden` → Clé sans permissions
   - `Failed to fetch` → Problème réseau

## 🚨 **Messages d'erreur courants**

### **Dans la console du navigateur** :
```
Error: 401 API key not valid
Error: Failed to fetch
Error: Network request failed
```

### **Dans le chatbot** :
```
"Désolée Pierre-sama, mon âme s'est troublée..."
```

## 🛠️ **Actions immédiates**

### **1. Créer le fichier .env.local**
```env
GEMINI_API_KEY=AIzaSyD...votre_clé_complète...xyz
```

### **2. Redémarrer complètement**
1. Arrêtez le serveur (Ctrl+C)
2. Fermez le navigateur
3. Relancez le serveur
4. Rouvrez l'application

### **3. Vérifier les logs**
Ouvrez la console (F12) et cherchez :
- Messages d'erreur API
- Réponses réseau
- Problèmes de configuration

## 📋 **Checklist de résolution**

- [ ] Fichier `.env.local` créé avec clé valide
- [ ] Clé API copiée correctement (sans espaces)
- [ ] Serveur redémarré après création du fichier
- [ ] Aucune erreur 401/403 dans la console
- [ ] Connexion internet fonctionnelle
- [ ] API Gemini accessible

## 🎯 **Test final**

Après correction :
1. **Tapez "bonjour"**
2. **Devriez voir** une réponse normale de Rem-san
3. **Les expressions** devraient aussi fonctionner

## 🆘 **Si ça ne marche toujours**

1. **Vérifiez la clé** : est-elle bien active ?
2. **Testez manuellement** : appelez l'API directement
3. **Contactez le support** si nécessaire

**Le problème est 99% du temps la clé API manquante ou invalide !** 🔑
