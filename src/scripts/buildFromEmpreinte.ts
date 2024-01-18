import axios from 'axios'
import fs from 'fs'
import divers from '../data/categories/divers.json'
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
  divers: { file: 'divers.json', values: divers },
  numerique: { file: 'numerique.json', values: numerique },
}

const empreinteValues = ["Identifiant_de_l'élément", 'Total_poste_non_décomposé', 'Nom_poste_français']

const ecvs = [
  { id: 1, values: ['Matières premières'] },
  { id: 2, values: ['Approvisionnement'] },
  { id: 3, values: ['Mise en forme'] },
  { id: 4, values: ['Assemblage', 'Distribution'] },
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

const buildFromEmpreinte = async (key: string) => {
  const existingEquivalents = existingEquivalentsByCategory[key]
  if (!existingEquivalents) {
    console.info('Type should be "electomenager", "habillement", "mobilier", "repas", "divers" or "numerique"')
    process.exit(1)
  }

  const ids = existingEquivalents.values
    .flatMap((equivalent) => {
      if ('id' in equivalent) {
        return [equivalent.id]
      } else if ('ids' in equivalent) {
        return equivalent.ids
      }
      return null
    })
    .filter((code) => !!code)
    .join(' | ')
  const remote_url = encodeURI(
    `https://data.ademe.fr/data-fair/api/v1/datasets/base-carboner/lines?q_fields=Identifiant_de_l'élément&size=${
      ids.length * 6
    }&select=${empreinteValues.join(',')}&q=${ids}`
  )

  const newEquivalents = await axios.get(remote_url).then((response) => response.data.results)
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
