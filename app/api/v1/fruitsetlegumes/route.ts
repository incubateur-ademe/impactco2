import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { fruitsEtLegumes } from 'data/categories/fruitsetlegumes'
import { getName } from 'utils/Equivalent/equivalent'
import { computeECV } from 'utils/computeECV'
import { fldsCategories, fldsCategoriesId } from 'utils/fruitsetlegumes'
import { trackAPIRequest } from 'utils/middleware'

const validation = z.object({
  month: z.coerce.number().min(1).max(12).optional(),
  language: z.enum(['fr', 'en']).optional(),
  categories: z
    .string()
    .transform((value) => value.split(',').map((value) => fldsCategoriesId[Number(value)]))
    .optional(),
})

/**
 * @swagger
 * /fruitsetlegumes:
 *   get:
 *     tags:
 *     - Fruits et légumes de saisons
 *     summary: Récupérer les données pour les fruits et légumes de saisons
 *     description: Retourne les emissions des fruits et légumes de saisons pour un mois donné.
 *     parameters:
 *     - in: query
 *       name: month
 *       schema:
 *         type: integer
 *       description: Mois pour lequel récupérer les fruits et légumes de saisons (mois courant par défaut).
 *     - in: query
 *       name: category
 *       schema:
 *         type: string
 *       description: |-
 *         Liste des id de categories à retourner, séparés par des ','
 *         - 1 : fruits
 *         - 2 : légumes
 *         - 3 : herbes
 *         - 4 : pâtes, riz et céréales
 *         - 5 : pommes de terre et autres tubercules
 *         - 6 : fruits à coque et graines oléagineuses
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
 *                     - months
 *                     - ecv
 *                     - slug
 *                     - category
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: Asperge
 *                       months:
 *                         type: array
 *                         items:
 *                           type: number
 *                         example: [4, 5, 6]
 *                       ecv:
 *                         type: number
 *                         description: l'emission totale en kg de CO₂e
 *                         example: 1.559309081
 *                       slug:
 *                         type: string
 *                         example: asperge
 *                       category:
 *                         type: string
 *                         example: légumes
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const inputs = validation.safeParse(Object.fromEntries(searchParams))
  if (!inputs.success) {
    return NextResponse.json(inputs.error, { status: 400 })
  }

  const hasAPIKey = await trackAPIRequest(req, 'fruitsetlegumes', JSON.stringify(inputs.data))

  const month = inputs.data.month ? inputs.data.month - 1 : new Date().getMonth()
  return NextResponse.json(
    {
      data: fruitsEtLegumes
        .filter((value) => value.months.includes(month))
        .map((value) => {
          return {
            name: getName(inputs.data.language || 'fr', value),
            slug: value.slug,
            months: value.months.map((month) => month + 1),
            ecv: computeECV(value),
            category: fldsCategories[value.slug],
          }
        })
        .filter((value) => !inputs.data.categories || inputs.data.categories.includes(value.category)),
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
