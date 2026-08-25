import axios from 'axios'
import fs from 'fs'
import { deplacements } from '../data/categories/deplacement'
import { electromenager } from '../data/categories/electromenager'
import { habillements } from '../data/categories/habillement'
import { mobiliers } from '../data/categories/mobilier'
import { numeriques } from '../data/categories/numerique'
import { repas } from '../data/categories/repas'
import { Equivalent } from '../../types/equivalent'

type TransportSubEquivalent = {
  display?: { min?: number; max?: number }
  subtitle: string
  ecv?: { id: number; value: number }[]
}

type TransportEquivalent = Equivalent & {
  ecvs?: TransportSubEquivalent[]
}

type TransportEmpreinteId = number | Record<string, number>

const transportEmpreinteIds: Record<string, TransportEmpreinteId> = {
  avion: {
    courtcourrier: 43743,
    moyencourrier: 43741,
    moyenlongcourrier: 43747,
    longcourrier: 43749,
  },
  tgv: 43256,
  intercites: 43272,
  autocar: 43740,
  veloelectrique: {
    'Vélo à assistance électrique': 28331,
    'Trottinette à assistance électrique': 28329,
  },
  busthermique: 43739,
  tramway: 43257,
  metro: 43253,
  scooter: 27992,
  moto: 43782,
  rer: 43254,
  ter: 43255,
  buselectrique: 28003,
  busgnv: 28005,
}

const getTransportEmpreinteId = (slug: string, subtitle?: string) => {
  const entry = transportEmpreinteIds[slug]
  if (typeof entry === 'number') {
    return entry
  }
  if (!subtitle) {
    return undefined
  }
  return entry[subtitle]
}

const existingEquivalentsByCategory: Record<string, { file: string; exportName: string; values: Equivalent[] }> = {
  electromenager: { file: 'electromenager.ts', exportName: 'electromenager', values: electromenager },
  habillement: { file: 'habillement.ts', exportName: 'habillements', values: habillements },
  mobilier: { file: 'mobilier.ts', exportName: 'mobiliers', values: mobiliers },
  repas: { file: 'repas.ts', exportName: 'repas', values: repas },
  numerique: { file: 'numerique.ts', exportName: 'numeriques', values: numeriques },
}

const writeCategoryTs = (file: string, exportName: string, values: Equivalent[]) => {
  const content =
    "import { Equivalent } from 'types/equivalent'\n\n" +
    `export const ${exportName} = ${JSON.stringify(values, null, 2)} as Equivalent[]\n`

  fs.writeFileSync(`src/data/categories/${file}`, content)
}

const transportEquivalents = deplacements as TransportEquivalent[]

const empreinteValues = [
  "Identifiant_de_l'élément",
  'Total_poste_non_décomposé',
  'Nom_poste_français',
  'Type_poste',
  'Nom_base_français',
  'Type_Ligne',
  'Nom_frontière_français',
  'Nom_attribut_français',
]

const ecvs = [
  { id: 1, values: ['Matières premières'] },
  { id: 2, values: ['Approvisionnement'] },
  { id: 3, values: ['Mise en forme'] },
  { id: 4, values: ['Assemblage', 'Distribution'] },
  { id: 5, values: ['Fabrication', 'Fabrication du véhicule', 'Véhicule'] },
  { id: 6, values: ['Amont', 'Combustion', 'Carburant', 'Utilisation du véhicule'] },
  { id: 7, values: ['Trainées de condensation'] },
]

const updateEquivalents = (
  equivalents: Equivalent[],
  values: { "Identifiant_de_l'élément": string; Total_poste_non_décomposé: number; Nom_poste_français: string }[]
) => {
  return equivalents.map((equivalent) => {
    if (!('id' in equivalent) && !('ids' in equivalent)) {
      return equivalent
    }

    const ids = 'id' in equivalent ? [equivalent.id] : equivalent.ids
    if (!ids) {
      return equivalent
    }

    const elementValues = values.filter((value) => ids.includes(Number.parseInt(value["Identifiant_de_l'élément"])))
    const ecv = ecvs
      .map((ecv) => ({
        id: ecv.id,
        value: ecv.values.reduce((acc, current) => {
          const postes = elementValues.filter((value) => value.Nom_poste_français === current)
          return acc + postes.reduce((sum, poste) => sum + poste.Total_poste_non_décomposé, 0)
        }, 0),
      }))
      .filter((ecv) => ecv.value)

    const total = elementValues.find((value) => value.Nom_poste_français === undefined)
    return {
      ...equivalent,
      ecv: ecv.length > 0 ? ecv : undefined,
      total: total ? total.Total_poste_non_décomposé : undefined,
    }
  })
}

const getEquivalents = async (
  ids: (number | string | undefined | null)[]
): Promise<
  {
    "Identifiant_de_l'élément": string
    Total_poste_non_décomposé: number
    Nom_poste_français: string
    Type_poste: string
    Nom_base_français: string
    Type_Ligne: string
    Nom_attribut_français: string
    Nom_frontière_français: string
  }[]
> => {
  const remote_url = encodeURI(
    `https://data.ademe.fr/data-fair/api/v1/datasets/base-carboner/lines?q_fields=Identifiant_de_l'élément&size=${
      ids.length * 10
    }&select=${empreinteValues.join(',')}&q=${ids.filter((code) => !!code).join(' | ')}`
  )

  return axios.get(remote_url).then((response) => response.data.results)
}

const buildTransportFromEmpreinte = async () => {
  const ids = transportEquivalents.flatMap((equivalent) => {
    const topLevelId = getTransportEmpreinteId(equivalent.slug)
    if (typeof topLevelId === 'number') {
      return [topLevelId]
    }
    if (equivalent.ecvs) {
      return (equivalent.ecvs as TransportSubEquivalent[])
        .map((ecv) => getTransportEmpreinteId(equivalent.slug, ecv.subtitle))
        .filter((id): id is number => typeof id === 'number')
    }
    return []
  })

  const newEquivalents = await getEquivalents(ids)
  console.log('transport')
  console.log(
    JSON.stringify(
      newEquivalents
        .filter((newEquivalents) => newEquivalents.Type_Ligne === 'Elément')
        .map(
          (e) =>
            `${e.Nom_base_français} ${e.Nom_poste_français || ''} ${e.Nom_frontière_français || ''} ${e.Nom_attribut_français || ''}`
        )
    )
  )
  const finalResult = transportEquivalents.map((equivalent) => {
    const topLevelId = getTransportEmpreinteId(equivalent.slug)
    if (typeof topLevelId === 'number') {
      const elementValues = newEquivalents.filter(
        (value) => Number.parseInt(value["Identifiant_de_l'élément"]) === topLevelId
      )
      if (elementValues) {
        const ecv = ecvs
          .map((ecv) => ({
            id: ecv.id,
            value: ecv.values.reduce((acc, current) => {
              const postes = elementValues.filter((value) =>
                value.Nom_poste_français ? value.Nom_poste_français === current : value.Type_poste === current
              )
              return acc + postes.reduce((sum, poste) => sum + poste.Total_poste_non_décomposé, 0)
            }, 0),
          }))
          .filter((ecv) => ecv.value)

        return {
          ...equivalent,
          ecv,
        }
      }
    }
    if ('ecvs' in equivalent && equivalent.ecvs) {
      const newEcvs = (equivalent.ecvs as TransportSubEquivalent[]).map((subEquivalent) => {
        const subEquivalentId = getTransportEmpreinteId(equivalent.slug, subEquivalent.subtitle)
        const elementValues = newEquivalents.filter(
          (value) => Number.parseInt(value["Identifiant_de_l'élément"]) === subEquivalentId
        )
        if (elementValues) {
          const ecv = ecvs
            .map((ecv) => ({
              id: ecv.id,
              value: ecv.values.reduce((acc, current) => {
                const postes = elementValues.filter((value) =>
                  value.Nom_poste_français ? value.Nom_poste_français === current : value.Type_poste === current
                )
                return acc + postes.reduce((sum, poste) => sum + poste.Total_poste_non_décomposé, 0)
              }, 0),
            }))
            .filter((ecv) => ecv.value)

          return {
            ...subEquivalent,
            ecv,
          }
        }
      })
      return {
        ...equivalent,
        ecvs: newEcvs,
      }
    }
    return equivalent
  })
  writeCategoryTs('deplacement.ts', 'deplacements', finalResult as Equivalent[])
}

const buildFromEmpreinte = async (key: string) => {
  if (key === 'transport') {
    buildTransportFromEmpreinte()
    return
  }
  const existingEquivalents = existingEquivalentsByCategory[key]
  if (!existingEquivalents || key === 'transport') {
    console.info('Type should be "transport", "electomenager", "habillement", "mobilier" or "repas"')
    process.exit(1)
  }

  const ids = existingEquivalents.values.flatMap((equivalent) => {
    if ('id' in equivalent) {
      return [equivalent.id]
    } else if ('ids' in equivalent) {
      return equivalent.ids
    }
    return null
  })

  const newEquivalents = await getEquivalents(ids)
  console.log(key)
  console.log(
    JSON.stringify(
      newEquivalents
        .filter((newEquivalents) => newEquivalents.Type_Ligne === 'Elément')
        .map(
          (e) =>
            `${e.Nom_base_français} ${e.Nom_poste_français || ''} ${e.Nom_frontière_français || ''} ${e.Nom_attribut_français || ''}`
        )
    )
  )
  const finalResult = updateEquivalents(existingEquivalents.values, newEquivalents)
  writeCategoryTs(existingEquivalents.file, existingEquivalents.exportName, finalResult)
}

if (process.argv[2]) {
  buildFromEmpreinte(process.argv[2])
} else {
  buildFromEmpreinte('electromenager')
  buildFromEmpreinte('habillement')
  buildFromEmpreinte('mobilier')
  buildFromEmpreinte('repas')
  buildFromEmpreinte('transport')
}
