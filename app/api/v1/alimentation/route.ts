import { NextRequest, NextResponse } from 'next/server'
import { Language } from 'types/equivalent'
import { z } from 'zod'
import { AlimentationCategories, equivalentsByCategory } from 'utils/alimentation'
import { trackAPIRequest } from 'utils/middleware'

const alimentationValidation = z.object({
  category: z.nativeEnum(AlimentationCategories),
  language: z.enum(['fr', 'en', 'es']).optional(),
})

const names: Record<Language, Record<string, string>> = {
  en: {
    viandes: 'Meats',
    poissons: 'Fish and seafood',
    laitier: 'Eggs and dairy products',
    cereales: 'Cereals and legumes',
    plats: 'Prepared dishes',
    encas: 'Snacks',
    fruits: 'Fruits and vegetables',
    boucherie: 'Butchery',
    poissonnerie: 'Fishmonger',
    traiteur: 'Deli',
    fromagerie: 'Cheese shop',
    boulangerie: 'Bakery',
    epiceriesalee: 'Savory groceries',
    epiceriesucree: 'Sweet groceries',
  },
  fr: {
    viandes: 'Viandes',
    poissons: 'Poissons et fruits de mer',
    laitier: 'Oeufs et produits laitiers',
    cereales: 'Céréales et légumineuses',
    plats: 'Plats préparés',
    encas: 'En-cas',
    fruits: 'Fruits et légumes',
    boucherie: 'Boucherie',
    poissonnerie: 'Poissonnerie',
    traiteur: 'Traiteur',
    fromagerie: 'Fromagerie',
    boulangerie: 'Boulangerie',
    epiceriesalee: 'Épicerie salée',
    epiceriesucree: 'Épicerie sucrée',
  },
  es: {
    viandes: 'Carnes',
    poissons: 'Pescados y mariscos',
    laitier: 'Huevos y productos lácteos',
    cereales: 'Cereales y legumbres',
    plats: 'Platos preparados',
    encas: 'Aperitivos',
    fruits: 'Frutas y verduras',
    boucherie: 'Carnicería',
    poissonnerie: 'Pescadería',
    traiteur: 'Charcutería',
    fromagerie: 'Quesería',
    boulangerie: 'Panadería',
    epiceriesalee: 'Comestibles salados',
    epiceriesucree: 'Comestibles dulces',
  },
}

/**
 * @swagger
 * /alimentation:
 *   get:
 *     tags:
 *     - Alimentation
 *     summary: Récupérer les données de l'alimentation
 *     description: Retourne les émissions par kg d'aliments, classé par catégorie
 *     parameters:
 *     - in: query
 *       name: category
 *       schema:
 *         type: string
 *         enum: [group, rayon, popularity]
 *       description: |-
 *        Catégorie utilisé pour ranger les aliments :
 *        - group : Groupe d'aliments (viandes, poissons, produits laitiers...)
 *        - rayon : Rayons du magasin (épicerie salée, boulangerie, traiteur...)
 *        - popularity : Popularité (les 10 aliments les plus consommés)
 *     - in: query
 *       name: language
 *       default: fr
 *       schema:
 *        type: string
 *        enum: [fr, en, es]
 *       description: Langue dans laquelle retourner les noms d'équivalent
 *     responses:
 *       405:
 *         description: Mauvais type de requete HTTP
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Only GET queries are allowed
 *       400:
 *         description: Mauvais paramètres
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: Erreur d'input générée via zod
 *       200:
 *         description: Les émissions de l'alimentation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *               - data
 *               properties:
 *                 warning:
 *                   type: string
 *                   example: La requete n'est pas authentifée.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     required:
 *                     - name
 *                     - slug
 *                     - items
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: Viandes
 *                       slug:
 *                         type: string
 *                         example: viandes
 *                       items:
 *                         type: array
 *                         items:
 *                           type: object
 *                           required:
 *                           - name
 *                           - ecv
 *                           - slug
 *                           properties:
 *                             name:
 *                               type: string
 *                               example: Boeuf
 *                             ecv:
 *                               type: number
 *                               description: l'emission totale en kg de CO₂e
 *                               example: 26.2
 *                             slug:
 *                               type: string
 *                               example: boeuf
 */

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const inputs = alimentationValidation.safeParse(Object.fromEntries(searchParams))
  if (!inputs.success) {
    return NextResponse.json(inputs.error, { status: 400 })
  }

  const hasAPIKey = await trackAPIRequest(req, 'alimentation', JSON.stringify(inputs.data))
  const equivalents = equivalentsByCategory[inputs.data.category]
  return NextResponse.json(
    {
      data: equivalents.map(({ name, equivalents }) => ({
        name: names[inputs.data.language || 'fr'][name],
        slug: name,
        items: equivalents.map(({ name, value, slug }) => ({
          name,
          slug,
          ecv: value,
        })),
      })),
      warning: hasAPIKey
        ? undefined
        : `La requete n'est pas authentifée. Nous nous reservons le droit de couper cette API aux utilisateurs anonymes, veuillez nous contacter à ${process.env.NEXT_PUBLIC_CONTACT_EMAIL} pour obtenir une clé d'API gratuite.`,
    },
    { status: 200 }
  )
}

export async function OPTIONS() {
  return NextResponse.json('Success', {
    status: 204,
    headers: { Allow: 'GET', 'Access-Control-Allow-Headers': 'Authorization' },
  })
}
