import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { chauffage } from 'data/categories/chauffage'
import { getNameWithoutSuffix } from 'utils/Equivalent/equivalent'
import { trackAPIRequest } from 'utils/middleware'

const chauffageValidation = z.object({
  m2: z.coerce.number().min(1).optional(),
  chauffages: z
    .string()
    .transform((value) => value.split(',').map(Number))
    .optional(),
  language: z.enum(['fr', 'en']).optional(),
})

/**
 * @swagger
 * /chauffage:
 *   get:
 *     tags:
 *     - Chauffage
 *     summary: Récupérer les données pour le chauffage
 *     description: Retourne les emissions par année pour un nombre de m<sup>2</sup> donnée par type de chauffage
 *     parameters:
 *     - in: query
 *       name: m2
 *       schema:
 *         type: integer
 *       description: "Nombre de m<sup>2</sup> sur lequel calculer les emissions. Si non renseigné, utilise la taille moyenne d'un appartement en France : 63m<sup>2</sup>"
 *     - in: query
 *       name: chauffages
 *       schema:
 *         type: string
 *       description: |-
 *         Liste des id de chauffage à retourner, séparés par des ','. Si non rempli, retourne l'integralité des résultats.
 *         - 1 : Chauffage au gaz
 *         - 2 : Chauffage au fioul
 *         - 3 : Chauffage électrique
 *         - 4 : Chauffage avec une pompe à chaleur
 *         - 5 : Chauffage avec un poêle à granulés
 *         - 6 : Chauffage avec un poêle à bois
 *         - 7 : Chauffage via un réseau de chaleur
 *     - in: query
 *       name: language
 *       default: fr
 *       schema:
 *        type: string
 *        enum: [fr, en]
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
 *         description: Les categories et leur metadata
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
 *                     - ecv
 *                     - slug
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: Chauffage au gaz
 *                       ecv:
 *                         type: number
 *                         description: l'emission totale en kg de CO₂e
 *                         example: 50.3
 *                       slug:
 *                         type: string
 *                         example: chauffagegaz
 */

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const inputs = chauffageValidation.safeParse(Object.fromEntries(searchParams))
  if (!inputs.success) {
    return NextResponse.json(inputs.error, { status: 400 })
  }

  const hasAPIKey = await trackAPIRequest(req, 'chauffage', JSON.stringify(inputs.data))
  return NextResponse.json(
    {
      data: chauffage
        .filter((chauffage) => (inputs.data.chauffages ? inputs.data.chauffages.includes(chauffage.id) : true))
        .map((chauffage) => {
          return {
            name: getNameWithoutSuffix(inputs.data.language || 'fr', chauffage),
            slug: chauffage.slug,
            ecv: chauffage.total * (inputs.data.m2 || 63),
          }
        }),
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
