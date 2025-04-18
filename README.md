# savary-b2b-onboarding
# Onboarding B2B « Passe Commande En Tant Qu'Invité »

Ce dépôt contient tout le nécessaire pour :
1. Afficher un formulaire rapide B2B invité sur `https://savary.pro/account/register`
2. Vérifier le SIRET via l’API Sirene
3. Créer/taguer le client dans Shopify (`b2b`, `b2b-invited`)
4. Envoyer l’invitation d’activation par email
5. Tourner en serverless sur Vercel

---

## Étapes d’installation

1. **Cloner** ce dépôt sur GitHub  
2. **Importer** dans Vercel (via l’UI ou `vercel` CLI)  
3. **Définir** les variables d’environnement dans Vercel :  
   - `SHOPIFY_API_TOKEN`  
   - `SHOPIFY_WEBHOOK_SECRET`  
4. **Déployer** (`vercel --prod` ou bouton Redeploy)  
5. **Configurer** l’App Proxy Shopify :  
   - Sub path prefix : `apps`  
   - Sub path        : `b2b-onboarding`  
   - Proxy URL       : `https://<VOTRE_PROJET>.vercel.app/apps/b2b-onboarding`  
6. **Tester** sur `https://savary.pro/account/register`

---

## Structure du projet

- **templates/customers/register.liquid** → le formulaire Liquid  
- **assets/theme.scss.liquid**         → le CSS pour centrer et rendre responsive  
- **api/customer-register.js**         → la fonction serverless Node.js  
- **vercel.json**                      → la config de routes Vercel  
