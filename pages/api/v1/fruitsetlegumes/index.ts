import type { NextApiRequest, NextApiResponse } from 'next'
import { ZodError, z } from 'zod'
import values from 'data/categories/fruitsetlegumes.json'
import { computeECV } from 'utils/computeECV'
import { trackAPIRequest } from 'utils/middleware'
import { APIECVV1 } from '../thematiques/ecv/[id]'

const validation = z.object({
  month: z.coerce.number().min(1).max(12).optional(),
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
 *                         description: l'emission totale en g de CO<sub>2</sub>e
 *                         example: 1.559309081
 *                       slug:
 *                         type: string
 *                         example: asperge
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: (APIECVV1 & { months: number[] })[]; warning?: string } | string | ZodError>
) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'GET')
    res.setHeader('Access-Control-Allow-Headers', 'Authorization')
    return res.status(204).send('Succes')
  }

  if (req.method !== 'GET') {
    return res.status(405).send('Only GET queries are allowed.')
  }

  const inputs = validation.safeParse(req.query)
  if (!inputs.success) {
    res.status(400).json(inputs.error)
    return
  }

  const hasAPIKey = await trackAPIRequest(req, 'fruitsetlegumes', JSON.stringify(inputs.data))

  const month = inputs.data.month ? inputs.data.month - 1 : new Date().getMonth()
  return res.status(200).json({
    data: values
      .filter((value) => value.months.includes(month))
      .map((value) => {
        return {
          name: value.name,
          slug: value.slug,
          months: value.months.map((month) => month + 1),
          ecv: computeECV(value),
        }
      }),
    warning: hasAPIKey
      ? undefined
      : `La requete n'est pas authentifée. Nous nous reservons le droit de couper cette API aux utilisateurs anonymes, veuillez nous contacter à ${process.env.NEXT_PUBLIC_CONTACT_EMAIL} pour obtenir une clé d'API gratuite.`,
  })
}
