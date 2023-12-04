import type { NextApiRequest, NextApiResponse } from 'next'
import { APIECVV1 } from 'types/equivalent'
import { ZodError, z } from 'zod'
import categories from 'data/categories.json'
import boisson from 'data/categories/boisson.json'
import chauffage from 'data/categories/chauffage.json'
import deplacement from 'data/categories/deplacement.json'
import divers from 'data/categories/divers.json'
import electromenager from 'data/categories/electromenager.json'
import fruitsetlegumes from 'data/categories/fruitsetlegumes.json'
import habillement from 'data/categories/habillement.json'
import mobilier from 'data/categories/mobilier.json'
import numerique from 'data/categories/numerique.json'
import repas from 'data/categories/repas.json'
import usagenumerique from 'data/categories/usagenumerique.json'
import { computeECV } from 'utils/computeECV'
import { trackAPIRequest } from 'utils/middleware'

const equivalents = [
  ...boisson,
  ...deplacement,
  ...electromenager,
  ...habillement,
  ...mobilier,
  ...numerique,
  ...usagenumerique,
  ...repas,
  ...chauffage,
  ...fruitsetlegumes,
  ...divers,
]

const categoryValidation = z.object({
  id: z.string(),
})

/**
 * @swagger
 * /api/v1/categories/ecv/{id}:
 *   get:
 *     tags:
 *     - ECV
 *     description: Retourne les emissions pour une categorie donnée
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         oneOf:
 *         - type: string
 *         - type: integer
 *       required: true
 *       description: ID ou Slug de la categorie demandée
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
 *                     type: object
 *                     required:
 *                     - name
 *                     - ecv
 *                     - slug
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: Eau en bouteille
 *                       ecv:
 *                         type: number
 *                         example: 50.3
 *                       slug:
 *                         type: string
 *                         example: eauenbouteille
 *
 *
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: APIECVV1[]; warning?: string } | string | ZodError>
) {
  if (req.method !== 'GET') {
    return res.status(405).send('Only GET queries are allowed.')
  }
  const inputs = categoryValidation.safeParse(req.query)
  if (!inputs.success) {
    res.status(400).json(inputs.error)
    return
  }

  const { id } = inputs.data
  const hasAPIKey = await trackAPIRequest(req, 'category', id)

  const idNumber = Number.parseInt(id)
  const category = Number.isNaN(idNumber)
    ? categories.find((category) => category.slug === id)
    : categories.find((category) => category.id === idNumber)

  if (!category) {
    return res.status(404).send('Category not found.')
  }

  return res.status(200).json({
    data: equivalents
      .filter((equivalent) => equivalent.category === category.id)
      .map((equivalent) => ({
        name: equivalent.name,
        slug: equivalent.slug,
        ecv: computeECV(equivalent),
      })),
    warning: hasAPIKey
      ? undefined
      : `La requete n'est pas authentifée. Nous nous reservons le droit de couper cette API aux utilisateurs anonymes, veuillez nous contacter à ${process.env.CONTACT_EMAIL} pour obtenir une clé d'API gratuite.`,
  })
}
