# AI IDOL COMPANION - SERVEUR
# Script PowerShell pour lancer le serveur de développement

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "   AI IDOL COMPANION - SERVEUR" -ForegroundColor Yellow
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Lancement du serveur de développement..." -ForegroundColor Green
Write-Host ""

# Vérifier si la clé API est configurée
if (-not (Test-Path ".env.local")) {
    Write-Host "⚠️  ATTENTION : Fichier .env.local non trouvé !" -ForegroundColor Red
    Write-Host ""
    Write-Host "🔑 Veuillez configurer votre clé API Google Gemini :" -ForegroundColor Yellow
    Write-Host "1. Allez sur https://aistudio.google.com/app/apikey" -ForegroundColor White
    Write-Host "2. Créez une clé API" -ForegroundColor White
    Write-Host "3. Créez un fichier .env.local avec : GEMINI_API_KEY=votre_clé" -ForegroundColor White
    Write-Host ""
    Write-Host "📋 Voir CONFIGURATION_API.md pour les détails" -ForegroundColor Cyan
    Write-Host ""
    Read-Host "Appuyez sur Entrée pour continuer"
    exit 1
}

# Vérifier si node_modules existe
if (-not (Test-Path "node_modules")) {
    Write-Host "Installation des dépendances..." -ForegroundColor Yellow
    npm install
    Write-Host ""
}

# Lancement du serveur
Write-Host "Démarrage de Vite sur http://localhost:3000" -ForegroundColor Green
Write-Host "Appuyez sur Ctrl+C pour arrêter le serveur" -ForegroundColor Gray
Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan

npm run dev
