import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { deplacements } from 'data/categories/deplacement'
import { getName, getNameWithoutSuffix } from 'utils/Equivalent/equivalent'
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
  occupencyRate: z.coerce.number().min(1).max(11).optional(),
  language: z.enum(['fr', 'en', 'es']).optional(),
})

export const computeTransportEmission = (
  km: number,
  activeTransportations?: number[],
  ignoreRadiativeForcing?: boolean,
  filter?: boolean,
  includeConstruction?: boolean,
  language?: string
) =>
  deplacements
    .filter((transportation) => filter || filterByDistance(transportation.display, km))
    .flatMap((transportation) =>
      transportation.withCarpool
        ? [
            ...Array.from({ length: 4 }).map((_, index) => ({
              ...transportation,
              carpool: index + 1,
              slug: `${transportation.slug}+${index + 1}`,
              id: transportation.id === 4 ? 22 + index : 26 + index,
            })),
            transportation,
          ]
        : [transportation]
    )
    .filter((transportation) => (activeTransportations ? activeTransportations.includes(transportation.id) : true))
    .map((transportation) => {
      let values = [{ id: 6, value: transportation.total || 0 }]
      let name = getName(language || 'fr', transportation)
      if ('ecvs' in transportation && transportation.ecvs) {
        const currentECV = transportation.ecvs.find((value) => (value.display.max ? value.display.max >= km : true))
        if (currentECV) {
          values = currentECV.ecv
          name = getNameWithoutSuffix(language || 'fr', {
            ...transportation,
            slug: `${transportation.slug}-${currentECV.subtitle}`,
          })
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

      // @ts-expect-error expected carpool
      const divider = transportation.carpool ? transportation.carpool + 1 : 1
      return {
        ...transportation,
        name,
        emissions: {
          gco2e: ((value * km) / divider) * 1000,
          kgco2e: (value * km) / divider,
          tco2e: (value * km) / divider / 1000,
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
 *           description: l'emission en kg de CO₂e pour la distance donnée
 *           example: 152.3
 */

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
 *         - 4 : Voiture thermique
 *         - 5 : Voiture électrique
 *         - 6 : Autocar
 *         - 7 : Vélo ou marche
 *         - 8 : Vélo à assistance électrique
 *         - 9 : Bus thermique
 *         - 10 : Tramway
 *         - 11 : Métro
 *         - 12 : Scooter ou moto légère
 *         - 13 : Moto
 *         - 14 : RER ou Transilien
 *         - 15 : TER
 *         - 16 : Bus électrique
 *         - 17 : Trottinette à assistance électrique
 *         - 21 : Bus (GNV)
 *         - 22 : Covoiturage thermique (1 passager)
 *         - 23 : Covoiturage thermique (2 passagers)
 *         - 24 : Covoiturage thermique (3 passagers)
 *         - 25 : Covoiturage thermique (4 passagers)
 *         - 26 : Covoiturage électrique (1 passager)
 *         - 27 : Covoiturage électrique (2 passagers)
 *         - 28 : Covoiturage électrique (3 passagers)
 *         - 29 : Covoiturage électrique (4 passagers)
 *     - in: query
 *       name: ignoreRadiativeForcing
 *       default: 0
 *       schema:
 *         type: integer
 *         enum: [0, 1]
 *       description: Si 1, ignore le forçage radiatif dans le calcul des émissions de l'avion. Sinon il est pris en compte
 *     - in: query
 *       name: occupencyRate
 *       default: 1
 *       schema:
 *         type: number
 *       description: Taux de remplissage moyen à prendre en compte pour les modes de transports de type voiture
 *     - in: query
 *       name: includeConstruction
 *       default: 0
 *       schema:
 *         type: integer
 *       description: Si 1, prend en compte l'emission lié à la construction. Sinon elle est ignorée
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
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const inputs = transportValidation.safeParse(Object.fromEntries(searchParams))
  if (!inputs.success) {
    return NextResponse.json(inputs.error, { status: 400 })
  }

  const hasAPIKey = await trackAPIRequest(req, 'transport', JSON.stringify(inputs.data))
  const emissions = computeTransportEmission(
    inputs.data.km,
    inputs.data.transports,
    inputs.data.ignoreRadiativeForcing,
    inputs.data.displayAll || !!inputs.data.transports,
    inputs.data.includeConstruction,
    inputs.data.language
  )

  const numberOfPassenger = inputs.data.occupencyRate
    ? inputs.data.occupencyRate - 1
    : inputs.data.numberOfPassenger || 0

  return NextResponse.json(
    {
      data: emissions
        // @ts-expect-error carpool expected
        .filter((emission) => !numberOfPassenger || !emission.carpool)
        .map((emission) => ({
          id: emission.id,
          name: emission.name,
          value: emission.emissions.kgco2e / (((emission.withCarpool && numberOfPassenger) || 0) + 1),
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
