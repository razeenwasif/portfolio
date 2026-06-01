#!/bin/bash

# --- Deployment Script for Amaterasu Projects ---

deploy_portfolio() {
    echo "---------------------------------------"
    echo "🚀 Deploying Portfolio Site..."
    echo "---------------------------------------"
    cd /home/amaterasu/Portfolio || exit
    npm run build && npx firebase-tools deploy --only hosting --project razeenwasif
}

deploy_prism() {
    echo "---------------------------------------"
    echo "🚀 Deploying Prism AutoML Dashboard..."
    echo "---------------------------------------"
    cd /home/amaterasu/Prism/frontend || exit
    npm run build
    cd /home/amaterasu/Prism || exit
    npx firebase-tools deploy --only hosting
}

deploy_oracle() {
    echo "---------------------------------------"
    echo "🚀 Deploying Oracle Dashboard..."
    echo "---------------------------------------"
    cd /home/amaterasu/Oracle/dashboard || exit
    npm run build
    cd /home/amaterasu/Oracle || exit
    npx firebase-tools deploy --only hosting
}

case "$1" in
    portfolio)
        deploy_portfolio
        ;;
    prism)
        deploy_prism
        ;;
    oracle)
        deploy_oracle
        ;;
    all)
        deploy_portfolio
        deploy_prism
        deploy_oracle
        ;;
    *)
        echo "Usage: ./deploy.sh {portfolio|prism|oracle|all}"
        echo "Example: ./deploy.sh prism"
        exit 1
        ;;
esac

echo "✅ Deployment completed!"
