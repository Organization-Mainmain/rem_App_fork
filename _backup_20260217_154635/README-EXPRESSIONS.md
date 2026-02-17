# 🎭 Guide d'intégration des expressions avec illustrations

## 📸 Vos 20 expressions sont maintenant intégrées !

### Expressions originales (5) :

1. **🔊 Attentive à ton écoute** (obligatoire)
   - Légère inclinaison de la tête
   - Regard posé vers l'avant
   - Bouche neutre ou très légèrement ouverte
   - Sourcils légèrement relevés

2. **😊 Expression normale / neutre**
   - Petit sourire fermé
   - Yeux détendus
   - Bouche simple, naturelle

3. **😀 Sourire joyeux**
   - Grand sourire
   - Yeux légèrement plissés
   - Joues un peu rosées

4. **🤔 Expression de réflexion**
   - Sourcil un peu levé
   - Regard vers le haut ou légèrement sur le côté
   - Petit "hmm" visuel, bouche en demi-lune

5. **😯 En attente / en veille**
   - Bouche neutre
   - Yeux légèrement agrandis
   - Posture droite

### Nouvelles expressions (15) :

6. **😄 Accroche / bienvenue**
   - Grand sourire, yeux expressifs, tête légèrement inclinée

7. **😳 Surprise douce**
   - Yeux ronds, petite bouche en "o", sourcils relevés

8. **😌 Appréciation / contentement**
   - Yeux mi-clos, petit sourire, air relax

9. **😐 Sérieuse / concentrée**
   - Regard fixe, sourcils rapprochés, bouche fine

10. **💤 Fatiguée / endormie**
    - Yeux mi-clos ou fermés, petite bouche "ω", air doux

11. **🛠️ Je traite l'information**
    - Yeux plissés, bouche "hmm", air analysant

12. **🔧 Confusion / erreur**
    - Sourcil levé + un autre baissé, bouche en zigzag, regard hésitant

13. **😁 Affirmation / OK**
    - Grand sourire confiant, tête légèrement en avant

14. **😢 Tristesse**
    - Sourcils relevés au centre, yeux humides/baissés, bouche vers le bas

15. **😠 Colère**
    - Sourcils rapprochés, yeux plissés, bouche ">_<"

16. **😤 Boudeuse**
    - Tête de côté, joues gonflées, petite bouche serrée

17. **😵 Dégoût / grimace**
    - Yeux fermés/plissés, sourcils diagonaux, bouche tordue

18. **😱 Peur / effrayée**
    - Yeux grands ouverts, sourcils levés, bouche "ah !"

19. **😕 Gênée / malaise doux**
    - Joues rosées, regard sur le côté, petit sourire awkward

20. **🤯 Choquée**
    - Yeux ronds, sourcils levés, bouche ouverte

## 📁 Installation de vos illustrations

### Étape 1: Ajouter les images
Placez vos illustrations dans le dossier `public/expressions/` avec les noms exacts :

```
public/expressions/
├── attentive.png         # 🔊 Attentive
├── normal_smile.png      # 😊 Normal
├── joyful_smile.png      # 😀 Joyeux
├── reflective.png        # 🤔 Réflexion
├── waiting.png           # 😯 En attente
├── welcome.png          # 😄 Bienvenue
├── surprised_soft.png    # 😳 Surprise
├── appreciative.png     # 😌 Appréciation
```

### Étape 2: Formats supportés
- **PNG** (recommandé pour la transparence)
- **JPG** (pour les photos)
- **WebP** (format moderne, plus léger)

### Étape 3: Dimensions recommandées
- **Minimum**: 400x400 pixels
- **Idéal**: 800x800 pixels
- **Rapport**: Carré (1:1)

## 🎯 Fonctionnalités intégrées

### ✅ Détection automatique
L'application détecte automatiquement l'expression appropriée selon le contenu des messages :

- **"Bonjour", "salut", "bienvenue"** → 😄 Accroche / bienvenue
- **"Wow", "incroyable", "surprenant"** → 😳 Surprise douce
- **"Merci", "génial", "content"** → 😌 Appréciation / contentement
- **"Sérieux", "important", "concentré"** → 😐 Sérieuse / concentrée
- **"Fatigué", "sommeil", "dormir"** → 💤 Fatiguée / endormie
- **"Je cherche", "je vérifie", "un instant"** → 🛠️ Je traite l'information
- **"Confus", "erreur", "pas compris"** → 🔧 Confusion / erreur
- **"OK", "oui", "d'accord"** → 😁 Affirmation / OK
- **"Triste", "peiné", "déçu"** → 😢 Tristesse
- **"Énervé", "fâché", "pas content"** → 😠 Colère
- **"Boude", "marre", "s énervé"** → 😤 Boudeuse
- **"Beurk", "dégoût", "grimace"** → 😵 Dégoût / grimace
- **"Peur", "effrayé", "terrifié"** → 😱 Peur / effrayée
- **"Gêné", "malaise", "embarrassé"** → 😕 Gênée / malaise doux
- **"Choqué", "incroyable", "ah bon"** → 🤯 Choquée
- **Messages avec "?"** → 😯 En attente
- **Messages avec "!"** → 😀 Sourire joyeux
- **Messages avec "hum", "réfléchir"** → 🤔 Expression de réflexion
- **Messages utilisateur** → 🔊 Attentive

### ✅ Interface de configuration
Un panneau de paramètres permet de :
- Choisir l'expression par défaut
- Activer/désactiver les expressions automatiques
- Prévisualiser chaque expression

### ✅ Affichage intelligent
- Les illustrations s'affichent automatiquement
- Animation de parole quand l'IA parle
- Transition fluide entre les expressions

## 🚀 Lancement du serveur

```bash
npm run dev
```

Puis accédez à l'application et testez les nouvelles expressions !

## 🎨 Personnalisation avancée

### Modifier les couleurs
Chaque expression a sa couleur thème :
- Attentive: `#3B82F6` (Bleu)
- Normal: `#10B981` (Vert)
- Joyeux: `#F59E0B` (Orange)
- Réflexion: `#8B5CF6` (Violet)
- Attente: `#EC4899` (Rose)

### Ajouter de nouvelles expressions
1. Ajoutez l'émotion dans `types.ts`
2. Mettez à jour `expressionService.ts`
3. Ajoutez l'illustration dans `public/expressions/`

Vos expressions sont maintenant prêtes à être utilisées ! 🎉
