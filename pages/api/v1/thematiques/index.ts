import type { NextApiRequest, NextApiResponse } from 'next'
import categories from 'data/categories.json'
import { trackAPIRequest } from 'utils/middleware'

/**
 * @swagger
 * components:
 *   schemas:
 *     Thématique:
 *       type: object
 *       required:
 *       - id
 *       - name
 *       - emoji
 *       - slug
 *       properties:
 *         id:
 *           type: integer
 *           example: 10
 *         name:
 *           type: string
 *           example: Usage numérique
 *         emoji:
 *           type: string
 *           example: ✉️
 *         slug:
 *           type: string
 *           example: usagenumerique
 */
type APICategoryV1 = {
  id: number
  name: string
  emoji: string
  slug: string
}

/**
 * @swagger
 * /thematiques:
 *   get:
 *     tags:
 *     - ECV
 *     summary: Récupérer les thématiques du site
 *     description: Retourne les thématiques gérées par Impact CO<sub>2</sub> ainsi que leurs metadata
 *     responses:
 *       405:
 *         description: Mauvais type de requete HTTP
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Only GET queries are allowed
 *       200:
 *         description: Les thématiques et leur metadata
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
 *                     $ref: '#/components/schemas/Thématique'
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: APICategoryV1[]; warning?: string } | string>
) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'GET')
    res.setHeader('Access-Control-Allow-Headers', 'Authorization')
    return res.status(204).send('Succes')
  }

  if (req.method !== 'GET') {
    return res.status(405).send('Only GET queries are allowed.')
  }

  const hasAPIKey = await trackAPIRequest(req, 'categories')
  return res.status(200).json({
    data: categories
      .filter((category) => category.slug !== 'livraison')
      .map(({ id, name, emoji, slug }) => ({
        id,
        name,
        emoji,
        slug,
      }))
      .sort((a, b) => a.id - b.id),
    warning: hasAPIKey
      ? undefined
      : `La requete n'est pas authentifée. Nous nous reservons le droit de couper cette API aux utilisateurs anonymes, veuillez nous contacter à ${process.env.NEXT_PUBLIC_CONTACT_EMAIL} pour obtenir une clé d'API gratuite.`,
  })
}
