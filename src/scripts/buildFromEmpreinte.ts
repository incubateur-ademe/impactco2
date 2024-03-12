import axios from 'axios'
import fs from 'fs'
import deplacement from '../data/categories/deplacement.json'
import electromenager from '../data/categories/electromenager.json'
import habillement from '../data/categories/habillement.json'
import mobilier from '../data/categories/mobilier.json'
import numerique from '../data/categories/numerique.json'
import repas from '../data/categories/repas.json'
import { UsableEquivalent } from '../../types/equivalent'

const existingEquivalentsByCategory: Record<string, { file: string; values: UsableEquivalent[] }> = {
  electromenager: { file: 'electromenager.json', values: electromenager },
  habillement: { file: 'habillement.json', values: habillement },
  mobilier: { file: 'mobilier.json', values: mobilier },
  repas: { file: 'repas.json', values: repas },
  numerique: { file: 'numerique.json', values: numerique },
}

const empreinteValues = ["Identifiant_de_l'élément", 'Total_poste_non_décomposé', 'Nom_poste_français', 'Type_poste']

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
  equivalents: UsableEquivalent[],
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
  }[]
> => {
  const remote_url = encodeURI(
    `https://data.ademe.fr/data-fair/api/v1/datasets/base-carboner/lines?q_fields=Identifiant_de_l'élément&size=${
      ids.length * 6
    }&select=${empreinteValues.join(',')}&q=${ids.filter((code) => !!code).join(' | ')}`
  )

  return axios.get(remote_url).then((response) => response.data.results)
}

const buildTransportFromEmpreinte = async () => {
  const ids = deplacement.flatMap((equivalent) => {
    if ('empreinteId' in equivalent && equivalent.empreinteId) {
      return [equivalent.empreinteId]
    }
    if ('ecvs' in equivalent && equivalent.ecvs) {
      return equivalent.ecvs.map((ecv) => ecv.empreinteId)
    }
    return 0
  })

  const newEquivalents = await getEquivalents(ids)
  console.log(newEquivalents)
  const finalResult = deplacement.map((equivalent) => {
    if ('empreinteId' in equivalent && equivalent.empreinteId) {
      const elementValues = newEquivalents.filter(
        (value) => Number.parseInt(value["Identifiant_de_l'élément"]) === equivalent.empreinteId
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
      const newEcvs = equivalent.ecvs.map((subEquivalent) => {
        const elementValues = newEquivalents.filter(
          (value) => Number.parseInt(value["Identifiant_de_l'élément"]) === subEquivalent.empreinteId
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
    return { ...equivalent }
  })
  fs.writeFileSync(`src/data/categories/deplacement.json`, JSON.stringify(finalResult, null, 2))
}

const buildFromEmpreinte = async (key: string) => {
  if (key === 'transport') {
    buildTransportFromEmpreinte()
    return
  }
  const existingEquivalents = existingEquivalentsByCategory[key]
  if (!existingEquivalents) {
    console.info('Type should be "electomenager", "habillement", "mobilier", "repas" or "numerique"')
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
  const finalResult = updateEquivalents(existingEquivalents.values, newEquivalents)
  fs.writeFileSync(`src/data/categories/${existingEquivalents.file}`, JSON.stringify(finalResult, null, 2))
}

if (process.argv[2]) {
  buildFromEmpreinte(process.argv[2])
} else {
  buildFromEmpreinte('electromenager')
  buildFromEmpreinte('habillement')
  buildFromEmpreinte('mobilier')
  buildFromEmpreinte('repas')
  buildFromEmpreinte('divers')
  buildFromEmpreinte('numerique')
}
