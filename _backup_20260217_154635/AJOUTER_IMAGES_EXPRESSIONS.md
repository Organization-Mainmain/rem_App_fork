# 🖼️ GUIDE : Ajouter les images des expressions

## ⚠️ **Problème identifié**

Les expressions ne s'affichent pas correctement car **les 20 images manquent** dans le dossier `public/expressions/`. Actuellement, seul l'emoji s'affiche.

## 📋 **Images requises (20 fichiers)**

### **Expressions originales (5)**
1. `attentive.png` - 🔊 Attentive
2. `normal_smile.png` - 😊 Normal
3. `joyful_smile.png` - 😀 Joyeux
4. `reflective.png` - 🤔 Réflexion
5. `waiting.png` - 😯 En attente

### **Premières nouvelles expressions (5)**
6. `welcome.png` - 😄 Bienvenue
7. `surprised_soft.png` - 😳 Surprise
8. `appreciative.png` - 😌 Appréciation
9. `serious_focused.png` - 😐 Sérieuse
10. `sleepy.png` - 💤 Fatiguée

### **Deuxièmes nouvelles expressions (5)**
11. `processing.png` - 🛠️ Traitement
12. `confusion.png` - 🔧 Confusion
13. `affirmation.png` - 😁 Affirmation
14. `sadness.png` - 😢 Tristesse
15. `anger.png` - 😠 Colère

### **Troisièmes nouvelles expressions (5)**
16. `pouting_new.png` - 😤 Boudeuse
17. `disgust_new.png` - 😵 Dégoût
18. `fear_new.png` - 😱 Peur
19. `awkward.png` - 😕 Gênée
20. `shocked_new.png` - 🤯 Choquée

## 🎨 **Spécifications techniques**

### **Dimensions recommandées**
- **Minimum** : 400x400 pixels
- **Idéal** : 800x800 pixels
- **Format** : Carré (1:1)

### **Formats supportés**
- **PNG** (recommandé pour transparence)
- **JPG** (pour les photos)
- **WebP** (format moderne, plus léger)

### **Style visuel**
- Fond transparent (PNG)
- Personnage centré
- Expression claire et visible
- Cohérence artistique entre toutes les expressions

## 📁 **Installation**

### **Étape 1: Préparer les images**
1. Créez ou obtenez vos 20 illustrations
2. Nommez-les exactement comme dans la liste ci-dessus
3. Vérifiez les dimensions (minimum 400x400)

### **Étape 2: Placer les fichiers**
1. Allez dans le dossier : `public/expressions/`
2. Copiez-y vos 20 images
3. Vérifiez que tous les fichiers sont présents

### **Étape 3: Vérifier**
1. Redémarrez le serveur
2. Les images devraient remplacer les emojis
3. Chaque expression montrera son illustration

## 🎯 **Test rapide**

Après avoir ajouté les images :
1. Lancez le serveur
2. Tapez "bonjour" → 😄 Bienvenue (image welcome.png)
3. Tapez "peur" → 😱 Peur (image fear_new.png)
4. Tapez "triste" → 😢 Tristesse (image sadness.png)

## 🔧 **Dépannage**

### **Si les images ne s'affichent pas**
1. **Vérifiez les noms** : doivent être exacts (sans majuscules)
2. **Vérifiez le format** : PNG/JPG/WebP acceptés
3. **Vérifiez le chemin** : dans `public/expressions/`
4. **Redémarrez le serveur** après ajout des images

### **Si certaines expressions manquent**
1. Ouvrez les outils de développement (F12)
2. Vérifiez l'onglet "Network" pour les erreurs 404
3. Corrigez les noms de fichiers manquants

## 🎨 **Création rapide des images**

### **Option 1: IA générative**
- Utilisez Midjourney, DALL-E ou Stable Diffusion
- Prompt : "anime girl, [expression], transparent background, 800x800"

### **Option 2: Dessin manuel**
- Photoshop, Krita, ou Procreate
- Calque de fond transparent
- Export en PNG

### **Option 3: Images temporaires**
- Utilisez des emojis agrandis en attendant
- Ou des symboles simples

## ✅ **Vérification finale**

Une fois les 20 images ajoutées :
- ✅ Les emojis sont remplacés par les illustrations
- ✅ Chaque expression a sa propre image
- ✅ Les transitions entre expressions sont fluides
- ✅ L'interface est visuellement complète

**Rem-san attend vos illustrations pour être complète !** 🌸✨
