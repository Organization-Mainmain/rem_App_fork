@echo off
echo ========================================
echo   AI IDOL COMPANION - SERVEUR
echo ========================================
echo.
echo Lancement du serveur de développement...
echo.

cd /d "%~dp0"

REM Vérifier si la clé API est configurée
if not exist ".env.local" (
    echo ⚠️  ATTENTION : Fichier .env.local non trouvé !
    echo.
    echo 🔑 Veuillez configurer votre clé API Google Gemini :
    echo 1. Allez sur https://aistudio.google.com/app/apikey
    echo 2. Créez une clé API
    echo 3. Créez un fichier .env.local avec : GEMINI_API_KEY=votre_clé
    echo.
    echo 📋 Voir CONFIGURATION_API.md pour les détails
    echo.
    pause
    exit /b 1
)

REM Vérifier si node_modules existe
if not exist "node_modules" (
    echo Installation des dépendances...
    npm install
    echo.
)

REM Lancement du serveur
echo Démarrage de Vite sur http://localhost:3000
echo Appuyez sur Ctrl+C pour arrêter le serveur
echo.
echo ========================================

npm run dev
