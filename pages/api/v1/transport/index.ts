import type { NextApiRequest, NextApiResponse } from 'next'
import { ZodError, z } from 'zod'
import { trackAPIRequest } from 'utils/middleware'
import { filterByDistance } from 'utils/transport'
import transportations from './transportations.json'

const transportValidation = z.object({
  km: z.coerce.number(),
  displayAll: z.coerce.number().int().min(0).max(1).optional().transform(Boolean),
  ignoreRadiativeForcing: z.coerce.number().int().min(0).max(1).optional().transform(Boolean),
  transports: z
    .string()
    .transform((value) => value.split(',').map(Number))
    .optional(),
  numberOfPassenger: z.coerce.number().min(0).max(10).optional(),
})

export const computeTransportEmission = (
  km: number,
  activeTransportations?: number[],
  ignoreRadiativeForcing?: boolean,
  filter?: boolean
) =>
  transportations
    // Filter transportations via filter parameter
    .filter((transportation) => filter || filterByDistance(transportation.display, km))
    // Filter transportations via transportations parameter
    .filter((transportation) => (activeTransportations ? activeTransportations.includes(transportation.id) : true))
    // Calculate emissions
    .map((transportation) => {
      // @ts-expect-error: create proper type
      const values = transportation.values.find((value) => ('max' in value ? value.max >= km : true)) as {
        value: number
        uncertainty?: number
      }
      const value = !ignoreRadiativeForcing && values.uncertainty ? values.uncertainty : values.value
      return {
        ...transportation,
        emissions: {
          gco2e: value * km,
          kgco2e: (value * km) / 1000,
          tco2e: (value * km) / 1000000,
        },
      }
    })

/**
 * @swagger
 * components:
 *   schemas:
 *     Transport:
 *       type: object
 *       required:
 *       - id
 *       - name
 *       - value
 *       properties:
 *         id:
 *           type: integer
 *           example: 11
 *         name:
 *           type: string
 *           example: Métro
 *         value:
 *           type: number
 *           description: l'emission en Kg de CO2e pour la distance donnée
 *           example: 152.3
 */
type TransportEmissionV1 = {
  id: number
  name: string
  value: number
}

/**
 * @swagger
 * /api/v1/transport:
 *   get:
 *     tags:
 *     - Transport
 *     description: Retourne les emissions pour un nombre de km donnée par type de transport
 *     parameters:
 *     - in: query
 *       name: km
 *       schema:
 *         type: integer
 *       required: true
 *       description: Nombre de km sur lequel calculer les emissions
 *     - in: query
 *       name: displayAll
 *       default: 0
 *       schema:
 *         type: integer
 *         enum: [0, 1]
 *       description: Si 0, retourne uniquement les transports qui ont du sens pour la distance donnée. Sinon retourne toutes les valeurs
 *     - in: query
 *       name: transports
 *       schema:
 *         type: string
 *       description: Liste des id de transport à retourner, séparés par des ','
 *     - in: query
 *       name: ignoreRadiativeForcing
 *       default: 0
 *       schema:
 *         type: integer
 *         enum: [0, 1]
 *       description: Si 0, prend en compte le forçage radiatif dans le calcul des émissions de l'avion. Sinon il est ignoré
 *     - in: query
 *       name: numberOfPassenger
 *       default: 0
 *       schema:
 *         type: integer
 *       description: Nombre de passager moyen à prendre en compte pour les modes de transports de type voiture ou moto
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
 *                     $ref: '#/components/schemas/Transport'
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: TransportEmissionV1[]; warning?: string } | string | ZodError>
) {
  if (req.method !== 'GET') {
    return res.status(405).send('Only GET queries are allowed.')
  }

  const inputs = transportValidation.safeParse(req.query)
  if (!inputs.success) {
    res.status(400).json(inputs.error)
    return
  }

  const hasAPIKey = await trackAPIRequest(req, 'transport', JSON.stringify(inputs.data))
  const emissions = computeTransportEmission(
    inputs.data.km,
    inputs.data.transports,
    inputs.data.ignoreRadiativeForcing,
    inputs.data.displayAll
  )
  return res.status(200).json({
    data: emissions.map((emission) => ({
      id: emission.id,
      name: emission.label.fr,
      value: emission.emissions.kgco2e / (((emission.carpool && inputs.data.numberOfPassenger) || 0) + 1),
    })),
    warning: hasAPIKey
      ? undefined
      : `La requete n'est pas authentifée. Nous nous reservons le droit de couper cette API aux utilisateurs anonymes, veuillez nous contacter à ${process.env.CONTACT_EMAIL} pour obtenir une clé d'API gratuite.`,
  })
}
