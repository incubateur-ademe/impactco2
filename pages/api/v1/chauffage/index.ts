import type { NextApiRequest, NextApiResponse } from 'next'
import { ZodError, z } from 'zod'
import chauffages from 'data/categories/chauffage.json'
import { trackAPIRequest } from 'utils/middleware'
import { APIECVV1 } from '../thematiques/ecv/[id]'

const transportValidation = z.object({
  m2: z.coerce.number().min(1).optional(),
  chauffages: z
    .string()
    .transform((value) => value.split(',').map(Number))
    .optional(),
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
 *                         description: l'emission totale en g de CO<sub>2</sub>e
 *                         example: 50.3
 *                       slug:
 *                         type: string
 *                         example: chauffagegaz
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: APIECVV1[]; warning?: string } | string | ZodError>
) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'GET')
    res.setHeader('Access-Control-Allow-Headers', 'Authorization')
    return res.status(204).send('Succes')
  }

  if (req.method !== 'GET') {
    return res.status(405).send('Only GET queries are allowed.')
  }

  const inputs = transportValidation.safeParse(req.query)
  if (!inputs.success) {
    res.status(400).json(inputs.error)
    return
  }

  const hasAPIKey = await trackAPIRequest(req, 'chauffage', JSON.stringify(inputs.data))

  return res.status(200).json({
    data: chauffages
      .filter((chauffage) => (inputs.data.chauffages ? inputs.data.chauffages.includes(chauffage.id) : true))
      .map((chauffage) => {
        return {
          name: chauffage.name,
          slug: chauffage.slug,
          ecv: chauffage.total * (inputs.data.m2 || 63),
        }
      }),
    warning: hasAPIKey
      ? undefined
      : `La requete n'est pas authentifée. Nous nous reservons le droit de couper cette API aux utilisateurs anonymes, veuillez nous contacter à ${process.env.NEXT_PUBLIC_CONTACT_EMAIL} pour obtenir une clé d'API gratuite.`,
  })
}
