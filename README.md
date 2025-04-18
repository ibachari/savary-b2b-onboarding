# Onboarding B2B « Passe Commande En Tant Qu'Invité »

## Objectif
Ce projet permet de proposer aux clients professionnels un accès rapide en tant qu’invité à la plateforme de commande B2B. Le formulaire collecte le nom de l’entreprise, l’e‑mail et le SIRET, vérifie automatiquement le numéro SIRET via l’API Sirene, crée/tague le client sur Shopify (`b2b`, `b2b-invited`) et envoie un e‑mail d’invitation.

## Structure du projet

```
savary-b2b-onboarding/
├── README.md                    # Ce fichier
├── templates/
│   └── customers/
│       └── register.liquid      # Formulaire invité sur /account/register
├── assets/
│   └── theme.scss.liquid        # Styles CSS pour le formulaire
├── api/
│   └── customer-register.js     # Fonction serverless Vercel
└── vercel.json                  # Configuration des routes Vercel
```

## Commandes Git & Vercel

1. **Initialiser et pousser sur GitHub**
   ```bash
   git init -b main
   git add .
   git commit -m "Initial commit – onboarding B2B"
   git branch -M main
   git remote add origin https://github.com/votre‑utilisateur/savary-b2b-onboarding.git
   git push -u origin main
   ```

2. **Déploiement sur Vercel**
   ```bash
   vercel --prod
   ```

> N’oubliez pas d’ajouter vos variables d’environnement (`SHOPIFY_API_TOKEN` et `SHOPIFY_WEBHOOK_SECRET`) dans les **Settings > Environment Variables** de Vercel avant de déployer.


