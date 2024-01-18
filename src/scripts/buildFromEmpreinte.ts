import axios from 'axios'
import fs from 'fs'
import electromenager from '../data/categories/electromenager.json'
import { UsableEquivalent } from '../../types/equivalent'

const existingEquivalentsByCategory: Record<string, { file: string; values: UsableEquivalent[] }> = {
  electromenager: { file: 'electromenager.json', values: electromenager },
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
  values: { "Identifiant_de_l'élément": number; Total_poste_non_décomposé: number; Nom_poste_français: string }[]
) => {
  return equivalents.map((equivalent) => {
    if (!('id' in equivalent)) {
      return equivalent
    }

    const elementValues = values.filter((value) => value["Identifiant_de_l'élément"] == equivalent.id)
    const ecv = ecvs.map((ecv) => ({
      id: ecv.id,
      value: ecv.values.reduce((acc, current) => {
        const poste = elementValues.find((value) => value.Nom_poste_français === current)
        return acc + (poste ? poste.Total_poste_non_décomposé : 0)
      }, 0),
    }))

    return {
      ...equivalent,
      ecv,
    }
  })
}

const buildFromEmpreinte = async (key: string) => {
  const existingEquivalents = existingEquivalentsByCategory[key]
  if (!existingEquivalents) {
    console.info('Type should be "electomenager"')
    process.exit(1)
  }

  const ids = existingEquivalents.values
    .map((equivalent) => ('id' in equivalent ? equivalent.id : ''))
    .filter((code) => !!code)
    .join(' | ')
  const remote_url = encodeURI(
    `https://data.ademe.fr/data-fair/api/v1/datasets/base-carboner/lines?q_fields=Identifiant_de_l'élément&size=${
      ids.length * 6
    }&select=${empreinteValues.join(',')}&q=${ids}`
  )

  console.log('remote_url ------------------------------- ', remote_url)

  const newEquivalents = await axios.get(remote_url).then((response) => response.data.results)

  console.log(newEquivalents)
  const finalResult = updateEquivalents(existingEquivalents.values, newEquivalents)
  //console.dir(finalResult, { depth: null })
  fs.writeFileSync(`src/data/categories/${existingEquivalents.file}`, JSON.stringify(finalResult, null, 2))
}

if (process.argv[2]) {
  buildFromEmpreinte(process.argv[2])
} else {
  buildFromEmpreinte('electromenager')
}
