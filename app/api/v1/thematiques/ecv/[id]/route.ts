import { NextRequest, NextResponse } from 'next/server'
import { computedEquivalents } from 'src/providers/equivalents'
import { z } from 'zod'
import { categories } from 'data/categories'
import { getName } from 'utils/Equivalent/equivalent'
import { computeFootprint } from 'utils/computeECV'
import { trackAPIRequest } from 'utils/middleware'

const categoryValidation = z.object({
  id: z.string(),
  detail: z.coerce.number().int().min(0).max(1).optional().transform(Boolean),
  language: z.enum(['fr', 'en']).optional(),
})

/**
 * @swagger
 * components:
 *   schemas:
 *     ECV:
 *       type: object
 *       required:
 *       - name
 *       - ecv
 *       - slug
 *       properties:
 *         name:
 *           type: string
 *           example: Eau en bouteille
 *         ecv:
 *           type: number
 *           description: l'emission totale en kg de CO₂e
 *           example: 50.3
 *         slug:
 *           type: string
 *           example: eauenbouteille
 *         footprint:
 *           type: number
 *           description: l'emission de base de l'objet en kg de CO₂e [disponible uniquement en mode détaillé]
 *           example: 45.2
 *         footprintDetail:
 *           description: l'emission de base détaillé de l'objet en kg de CO₂e [disponible uniquement en mode détaillé]
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 description: |-
 *                   id du poste détaillé
 *                   - 1: Matières premières
 *                   - 2: Approvisionnement
 *                   - 3: Mise en forme
 *                   - 4: Assemblage et distribution
 *                   - 5: Construction
 *                   - 6: Carburant
 *                   - 7: Trainées de condensation
 *                   - 8: Usage
 *                   - 13: Construction des terminaux
 *                   - 14: Usage des terminaux
 *                   - 15: Transmission
 *                   - 16: Construction des data-centers
 *                   - 17: Usage des data-centers
 *                   - 30: Agriculture
 *                   - 31: Transformation
 *                   - 32: Emballage
 *                   - 33: Transport
 *                   - 34: Supermarché et distribution
 *                   - 35: Consommation
 *                 example:
 *               value:
 *                 type: number
 *                 description: emission du poste détaillé en kg de CO₂e
 *                 example: 12.3
 *         usage:
 *           description: l'emission moyenne produite par l'utilisation de l'objet en kg de CO₂e [disponible uniquement en mode détaillé]
 *           type: object
 *           properties:
 *             peryear:
 *               type: number
 *               description: emission produite par l'utilisation de l'objet en kg de CO₂e par an
 *               example: 25.3
 *             defaultyears:
 *               type: number
 *               description: duréé de vie moyenne de l'objet
 *               example: 5
 *         endOfLife:
 *           type: number
 *           description: l'emission générée (ou économisée) en fin de vie de l'objet en kg de CO₂e [disponible uniquement en mode détaillé]
 *           example: 45.2
 */

/**
 * @swagger
 * /thematiques/ecv/{id}:
 *   get:
 *     tags:
 *     - ECV
 *     summary: Récupérer les données carbones pour chaque objet du site
 *     description: Retourne les emissions pour une thématique donnée
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         oneOf:
 *         - type: string
 *         - type: integer
 *       required: true
 *       description:  |-
 *         ID ou Slug de la thématique demandée
 *         - 1 : numerique
 *         - 2 : repas
 *         - 3 : boisson
 *         - 4 : transport
 *         - 5 : habillement
 *         - 6 : electromenager
 *         - 7 : mobilier
 *         - 8 : chauffage
 *         - 9 : fruitsetlegumes
 *         - 10 : usagenumerique
 *         - 13 : caspratiques
 *     - in: query
 *       name: detail
 *       default: 0
 *       schema:
 *         type: integer
 *         enum: [0, 1]
 *       description: Si 1, retourne le détail du calcul de l'ecv. Sinon retourne uniquement le total
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
 *       200:
 *         description: Les emissions de chaque objet de la catégorie
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
 *                     $ref: '#/components/schemas/ECV'
 */

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { searchParams } = new URL(req.url)
  const inputs = categoryValidation.safeParse({
    ...context.params,
    detail: searchParams.get('detail'),
    language: searchParams.get('language') || 'fr',
  })
  if (!inputs.success) {
    console.log(inputs.error)
    return NextResponse.json(inputs.error, { status: 400 })
  }

  const { id, detail } = inputs.data
  const hasAPIKey = await trackAPIRequest(req, 'category', id)

  const idNumber = Number.parseInt(id)
  const category = Number.isNaN(idNumber)
    ? categories.find((category) => category.slug === id)
    : categories.find((category) => category.id === idNumber)

  if (!category) {
    return NextResponse.json('Category not found.', { status: 400 })
  }

  return NextResponse.json(
    {
      data: computedEquivalents
        .filter((equivalent) => equivalent.category === category.id)
        .map((equivalent) => {
          const detailedECV = detail
            ? {
                footprint: computeFootprint(equivalent),
                footprintDetail: 'ecv' in equivalent ? equivalent.ecv : undefined,
                usage: 'usage' in equivalent ? equivalent.usage : undefined,
                endOfLife: 'end' in equivalent ? equivalent.end : undefined,
              }
            : {}
          return {
            name: getName(inputs.data.language || 'fr', equivalent),
            slug: equivalent.slug,
            ecv: equivalent.value,
            ...detailedECV,
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
