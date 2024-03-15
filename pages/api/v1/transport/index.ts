import type { NextApiRequest, NextApiResponse } from 'next'
import { ZodError, z } from 'zod'
import deplacements from 'data/categories/deplacement.json'
import { trackAPIRequest } from 'utils/middleware'
import { filterByDistance } from 'utils/transport'

const transportValidation = z.object({
  km: z.coerce.number(),
  displayAll: z.coerce.number().int().min(0).max(1).optional().transform(Boolean),
  ignoreRadiativeForcing: z.coerce.number().int().min(0).max(1).optional().transform(Boolean),
  includeConstruction: z.coerce.number().int().min(0).max(1).optional().transform(Boolean),
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
  filter?: boolean,
  includeConstruction?: boolean
) =>
  deplacements
    .filter((transportation) => filter || filterByDistance(transportation.display, km))
    .filter((transportation) => !transportation.contexted)
    .filter((transportation) => (activeTransportations ? activeTransportations.includes(transportation.id) : true))
    .map((transportation) => {
      let values = [{ id: 6, value: transportation.total || 0 }]
      let name = transportation.name
      if ('ecvs' in transportation && transportation.ecvs) {
        const currentECV = transportation.ecvs.find((value) => (value.display.max ? value.display.max >= km : true))
        if (currentECV) {
          values = currentECV.ecv
          name = `${name} (${currentECV.subtitle.toLowerCase()})`
        }
      } else if (transportation.ecv) {
        values = transportation.ecv
      }

      const value = values
        .filter((ecv) => {
          if (ignoreRadiativeForcing && ecv.id === 7) {
            return false
          }

          if (!includeConstruction && ecv.id === 5) {
            return false
          }

          return true
        })
        .reduce((sum, current) => sum + current.value, 0)
      return {
        ...transportation,
        name,
        emissions: {
          gco2e: value * km * 1000,
          kgco2e: value * km,
          tco2e: (value * km) / 1000,
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
 *           description: l'emission en Kg de CO<sub>2</sub>e pour la distance donnée
 *           example: 152.3
 */
type TransportEmissionV1 = {
  id: number
  name: string
  value: number
}

/**
 * @swagger
 * /transport:
 *   get:
 *     tags:
 *     - Transport
 *     summary: Récupérer les données pour le transport
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
 *       description: |-
 *         Si 1, retourne le calcul d'emission pour tout les transports disponibles. Sinon retourne seulement ceux qui ont du sens pour la distance donnée
 *
 *         *Exemple : en dessous de 500km les données de l’avion ne seront pas visibles.*
 *     - in: query
 *       name: transports
 *       schema:
 *         type: string
 *       description: |-
 *         Liste des id de transport à retourner, séparés par des ','
 *         - 1 : Avion
 *         - 2 : TGV
 *         - 3 : Intercités
 *         - 4 : Voiture (Moteur thermique)
 *         - 5 : Voiture (Moteur électrique)
 *         - 6 : Autocar
 *         - 7 : Vélo ou marche
 *         - 8 : Vélo (ou trottinette) à assistance électrique
 *         - 9 : Bus (Moteur thermique)
 *         - 10 : Tramway
 *         - 11 : Métro
 *         - 12 : Scooter ou moto légère
 *         - 13 : Moto
 *         - 14 : RER ou Transilien
 *         - 15 : TER
 *         - 16 : Bus (Moteur électrique)
 *         - 21 : Bus (GNV)
 *     - in: query
 *       name: ignoreRadiativeForcing
 *       default: 0
 *       schema:
 *         type: integer
 *         enum: [0, 1]
 *       description: Si 1, ignore le forçage radiatif dans le calcul des émissions de l'avion. Sinon il est pris en compte
 *     - in: query
 *       name: numberOfPassenger
 *       default: 0
 *       schema:
 *         type: integer
 *       description: Nombre de passager moyen à prendre en compte pour les modes de transports de type voiture ou moto
 *     - in: query
 *       name: includeConstruction
 *       default: 0
 *       schema:
 *         type: integer
 *       description: Si 1, prend en compte l'emission lié à la construction. Sinon elle est ignorée
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

  const hasAPIKey = await trackAPIRequest(req, 'transport', JSON.stringify(inputs.data))
  const emissions = computeTransportEmission(
    inputs.data.km,
    inputs.data.transports,
    inputs.data.ignoreRadiativeForcing,
    inputs.data.displayAll || !!inputs.data.transports,
    inputs.data.includeConstruction
  )
  return res.status(200).json({
    data: emissions.map((emission) => ({
      id: emission.id,
      name: `${emission.name}${emission.subtitle ? ` (${emission.subtitle})` : ''}`,
      value: emission.emissions.kgco2e / (((emission.carpool && inputs.data.numberOfPassenger) || 0) + 1),
    })),
    warning: hasAPIKey
      ? undefined
      : `La requete n'est pas authentifée. Nous nous reservons le droit de couper cette API aux utilisateurs anonymes, veuillez nous contacter à ${process.env.NEXT_PUBLIC_CONTACT_EMAIL} pour obtenir une clé d'API gratuite.`,
  })
}
