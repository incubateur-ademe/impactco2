import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { deplacements } from 'data/categories/deplacement'
import { getName } from 'utils/Equivalent/equivalent'
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
              id:
                transportation.id === 4
                  ? 22 + index
                  : transportation.id === 5
                    ? 26 + index
                    : transportation.id + index + 1,
            })),
            transportation,
          ]
        : [transportation]
    )
    .filter((transportation) => (activeTransportations ? activeTransportations.includes(transportation.id) : true))
    .map((transportation) => {
      let values = [{ id: 6, value: transportation.total || 0 }]
      let name = getName(language || 'fr', transportation, false, 1, false, true)
      if ('ecvs' in transportation && transportation.ecvs) {
        const currentECV = transportation.ecvs.find((value) => (value.display.max ? value.display.max >= km : true))
        if (currentECV) {
          values = currentECV.ecv
          name = getName(
            language || 'fr',
            {
              ...transportation,
              slug: `${transportation.slug}-${currentECV.subtitle}`,
            },
            false,
            1,
            false,
            true
          )
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
 *         - 6 : Autocar thermique
 *         - 7 : Vélo
 *         - 8 : Vélo à assistance électrique
 *         - 9 : Bus thermique
 *         - 10 : Tramway
 *         - 11 : Métro
 *         - 12 : Scooter ou moto légère thermique
 *         - 13 : Moto thermique
 *         - 14 : RER ou Transilien
 *         - 15 : TER
 *         - 16 : Bus électrique
 *         - 17 : Trottinette à assistance électrique
 *         - 21 : Bus (GNV)
 *         - 22 : Covoiturage thermique (2 personnes)
 *         - 23 : Covoiturage thermique (3 personnes)
 *         - 24 : Covoiturage thermique (4 personnes)
 *         - 25 : Covoiturage thermique (5 personnes)
 *         - 26 : Covoiturage électrique (2 personnes)
 *         - 27 : Covoiturage électrique (3 personnes)
 *         - 28 : Covoiturage électrique (4 personnes)
 *         - 29 : Covoiturage électrique (5 personnes)
 *         - 30 : Marche
 *         - 100 : Voiture - Petite - Essence
 *         - 101 : Voiture - Petite - Essence (2 personnes)
 *         - 102 : Voiture - Petite - Essence (3 personnes)
 *         - 103 : Voiture - Petite - Essence (4 personnes)
 *         - 104 : Voiture - Petite - Essence (5 personnes)
 *         - 105 : Voiture - Petite - Diesel
 *         - 106 : Voiture - Petite - Diesel (2 personnes)
 *         - 107 : Voiture - Petite - Diesel (3 personnes)
 *         - 108 : Voiture - Petite - Diesel (4 personnes)
 *         - 109 : Voiture - Petite - Diesel (5 personnes)
 *         - 110 : Voiture - Petite - Électrique
 *         - 111 : Voiture - Petite - Électrique (2 personnes)
 *         - 112 : Voiture - Petite - Électrique (3 personnes)
 *         - 113 : Voiture - Petite - Électrique (4 personnes)
 *         - 114 : Voiture - Petite - Électrique (5 personnes)
 *         - 115 : Voiture - Petite - Hybride non rechargeable
 *         - 116 : Voiture - Petite - Hybride non rechargeable (2 personnes)
 *         - 117 : Voiture - Petite - Hybride non rechargeable (3 personnes)
 *         - 118 : Voiture - Petite - Hybride non rechargeable (4 personnes)
 *         - 119 : Voiture - Petite - Hybride non rechargeable (5 personnes)
 *         - 120 : Voiture - Petite - Hybride rechargeable
 *         - 121 : Voiture - Petite - Hybride rechargeable (2 personnes)
 *         - 122 : Voiture - Petite - Hybride rechargeable (3 personnes)
 *         - 123 : Voiture - Petite - Hybride rechargeable (4 personnes)
 *         - 124 : Voiture - Petite - Hybride rechargeable (5 personnes)
 *         - 125 : Voiture - Moyenne - Essence
 *         - 126 : Voiture - Moyenne - Essence (2 personnes)
 *         - 127 : Voiture - Moyenne - Essence (3 personnes)
 *         - 128 : Voiture - Moyenne - Essence (4 personnes)
 *         - 129 : Voiture - Moyenne - Essence (5 personnes)
 *         - 130 : Voiture - Moyenne - Diesel
 *         - 131 : Voiture - Moyenne - Diesel (2 personnes)
 *         - 132 : Voiture - Moyenne - Diesel (3 personnes)
 *         - 133 : Voiture - Moyenne - Diesel (4 personnes)
 *         - 134 : Voiture - Moyenne - Diesel (5 personnes)
 *         - 135 : Voiture - Moyenne - Électrique
 *         - 136 : Voiture - Moyenne - Électrique (2 personnes)
 *         - 137 : Voiture - Moyenne - Électrique (3 personnes)
 *         - 138 : Voiture - Moyenne - Électrique (4 personnes)
 *         - 139 : Voiture - Moyenne - Électrique (5 personnes)
 *         - 140 : Voiture - Moyenne - Hybride non rechargeable
 *         - 141 : Voiture - Moyenne - Hybride non rechargeable (2 personnes)
 *         - 142 : Voiture - Moyenne - Hybride non rechargeable (3 personnes)
 *         - 143 : Voiture - Moyenne - Hybride non rechargeable (4 personnes)
 *         - 144 : Voiture - Moyenne - Hybride non rechargeable (5 personnes)
 *         - 145 : Voiture - Moyenne - Hybride rechargeable
 *         - 146 : Voiture - Moyenne - Hybride rechargeable (2 personnes)
 *         - 147 : Voiture - Moyenne - Hybride rechargeable (3 personnes)
 *         - 148 : Voiture - Moyenne - Hybride rechargeable (4 personnes)
 *         - 149 : Voiture - Moyenne - Hybride rechargeable (5 personnes)
 *         - 150 : Voiture - Berline - Essence
 *         - 151 : Voiture - Berline - Essence (2 personnes)
 *         - 152 : Voiture - Berline - Essence (3 personnes)
 *         - 153 : Voiture - Berline - Essence (4 personnes)
 *         - 154 : Voiture - Berline - Essence (5 personnes)
 *         - 155 : Voiture - Berline - Diesel
 *         - 156 : Voiture - Berline - Diesel (2 personnes)
 *         - 157 : Voiture - Berline - Diesel (3 personnes)
 *         - 158 : Voiture - Berline - Diesel (4 personnes)
 *         - 159 : Voiture - Berline - Diesel (5 personnes)
 *         - 160 : Voiture - Berline - Électrique
 *         - 161 : Voiture - Berline - Électrique (2 personnes)
 *         - 162 : Voiture - Berline - Électrique (3 personnes)
 *         - 163 : Voiture - Berline - Électrique (4 personnes)
 *         - 164 : Voiture - Berline - Électrique (5 personnes)
 *         - 165 : Voiture - Berline - Hybride non rechargeable
 *         - 166 : Voiture - Berline - Hybride non rechargeable (2 personnes)
 *         - 167 : Voiture - Berline - Hybride non rechargeable (3 personnes)
 *         - 168 : Voiture - Berline - Hybride non rechargeable (4 personnes)
 *         - 169 : Voiture - Berline - Hybride non rechargeable (5 personnes)
 *         - 170 : Voiture - Berline - Hybride rechargeable
 *         - 171 : Voiture - Berline - Hybride rechargeable (2 personnes)
 *         - 172 : Voiture - Berline - Hybride rechargeable (3 personnes)
 *         - 173 : Voiture - Berline - Hybride rechargeable (4 personnes)
 *         - 174 : Voiture - Berline - Hybride rechargeable (5 personnes)
 *         - 175 : Voiture - SUV - Essence
 *         - 176 : Voiture - SUV - Essence (2 personnes)
 *         - 177 : Voiture - SUV - Essence (3 personnes)
 *         - 178 : Voiture - SUV - Essence (4 personnes)
 *         - 179 : Voiture - SUV - Essence (5 personnes)
 *         - 180 : Voiture - SUV - Diesel
 *         - 181 : Voiture - SUV - Diesel (2 personnes)
 *         - 182 : Voiture - SUV - Diesel (3 personnes)
 *         - 183 : Voiture - SUV - Diesel (4 personnes)
 *         - 184 : Voiture - SUV - Diesel (5 personnes)
 *         - 185 : Voiture - SUV - Électrique
 *         - 186 : Voiture - SUV - Électrique (2 personnes)
 *         - 187 : Voiture - SUV - Électrique (3 personnes)
 *         - 188 : Voiture - SUV - Électrique (4 personnes)
 *         - 189 : Voiture - SUV - Électrique (5 personnes)
 *         - 190 : Voiture - SUV - Hybride non rechargeable
 *         - 191 : Voiture - SUV - Hybride non rechargeable (2 personnes)
 *         - 192 : Voiture - SUV - Hybride non rechargeable (3 personnes)
 *         - 193 : Voiture - SUV - Hybride non rechargeable (4 personnes)
 *         - 194 : Voiture - SUV - Hybride non rechargeable (5 personnes)
 *         - 195 : Voiture - SUV - Hybride rechargeable
 *         - 196 : Voiture - SUV - Hybride rechargeable (2 personnes)
 *         - 197 : Voiture - SUV - Hybride rechargeable (3 personnes)
 *         - 198 : Voiture - SUV - Hybride rechargeable (4 personnes)
 *         - 199 : Voiture - SUV - Hybride rechargeable (5 personnes)
 *         - 200 : Voiture hybride
 *         - 201 : Voiture hybride (2 personnes)
 *         - 202 : Voiture hybride (3 personnes)
 *         - 203 : Voiture hybride (4 personnes)
 *         - 204 : Voiture hybride (5 personnes)
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
 *                   example: La requete n'est pas authentifiée.
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Transport'
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const inputs = transportValidation.safeParse(Object.fromEntries(searchParams))
  if (!inputs.success) {
    return NextResponse.json(z.treeifyError(inputs.error), { status: 400 })
  }

  const hasAPIKey = await trackAPIRequest(req, 'transport')
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
        : `La requete n'est pas authentifiée. Nous nous reservons le droit de couper cette API aux utilisateurs anonymes, veuillez nous contacter à ${process.env.NEXT_PUBLIC_CONTACT_EMAIL} pour obtenir une clé d'API gratuite.`,
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
