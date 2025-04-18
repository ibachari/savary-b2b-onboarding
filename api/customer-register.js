mkdir -p api
import crypto from 'crypto';
import fetch from 'node-fetch';

const SHOP = '903784-bc.myshopify.com';
const API_TOKEN = process.env.SHOPIFY_API_TOKEN;
const SECRET    = process.env.SHOPIFY_WEBHOOK_SECRET;

export default async function handler(req, res) {
  try {
    // 1. Récupérer et parser le corps de la requête
    const { email, company, siret } = JSON.parse(req.body);

    // 2. Valider le SIRET (14 chiffres)
    if (!/^\d{14}$/.test(siret)) {
      return res.status(400).json({ error: 'Le SIRET doit contenir 14 chiffres.' });
    }

    // 3. Vérifier le SIRET via l’API Sirene
    const sirene = await fetch(`https://entreprise.data.gouv.fr/api/sirene/v3/unites_legales/${siret}`);
    if (!sirene.ok) {
      return res.status(400).json({ error: 'SIRET invalide ou non trouvé.' });
    }

    // 4. Créer (ou mettre à jour) le client sur Shopify
    const createRes = await fetch(`https://${SHOP}/admin/api/2025-01/customers.json`, {
      method: 'POST',
      headers: {
        'X-Shopify-Access-Token': API_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customer: {
          email,
          verified_email: true,
          tags: 'b2b,b2b-invited',
          metafields: [
            {
              namespace: 'sparklayer',
              key:       'vat_number',
              type:      'single_line_text_field',
              value:     siret
            },
            {
              namespace: 'sparklayer',
              key:       'company',
              type:      'single_line_text_field',
              value:     company
            }
          ]
        }
      })
    });
    const { customer } = await createRes.json();

    // 5. Envoyer l’invitation
    await fetch(
      `https://${SHOP}/admin/api/2025-01/customers/${customer.id}/send_invite.json`,
      {
        method: 'POST',
        headers: {
          'X-Shopify-Access-Token': API_TOKEN,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ customer_invite: { customer_id: customer.id, to: email } })
      }
    );

    // 6. Répondre au client
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur interne, merci de réessayer.' });
  }
}
