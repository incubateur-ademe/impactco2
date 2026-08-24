import axios from 'axios'
import fs from 'fs'
import { alimentation } from '../data/categories/alimentation'
import { boissons } from '../data/categories/boisson'
import { fruitsEtLegumes } from '../data/categories/fruitsetlegumes'
import { Equivalent, EquivalentValue } from '../../types/equivalent'

enum AgrybalisePrefixEnum {
  ChangementClimatique = 'Changement_climatique_-_',
}

const existingEquivalentsByCategory: Record<string, { file: string; exportName: string; values: Equivalent[] }> = {
  boissons: { file: 'boisson.ts', exportName: 'boissons', values: boissons },
  fruitsetlegumes: { file: 'fruitsetlegumes.ts', exportName: 'fruitsEtLegumes', values: fruitsEtLegumes },
  alimentation: { file: 'alimentation.ts', exportName: 'alimentation', values: alimentation },
}

type MetadataCategory = 'boissons' | 'fruitsetlegumes' | 'alimentation'

type MetadataInfos = {
  Code_CIQUAL?: number
  Code_CIQUALs?: number[]
  Code_AGB?: string
}

const metaData = {
  boissons: {
    eauenbouteille: {
      Code_CIQUAL: 18430,
    },
    soda: {
      Code_CIQUAL: 18026,
    },
    biere: {
      Code_CIQUAL: 5001,
    },
    vin: {
      Code_CIQUAL: 5214,
    },
    laitdevache: {
      Code_CIQUAL: 19051,
    },
    laitdesoja: {
      Code_CIQUAL: 18900,
    },
    the: {
      Code_CIQUAL: 18020,
    },
    cafe: {
      Code_CIQUAL: 18004,
    },
  },
  fruitsetlegumes: {
    fraise: {
      Code_CIQUAL: 13014,
      Code_AGB: '13014_2',
    },
    pomme: {
      Code_CIQUAL: 13039,
    },
    orange: {
      Code_CIQUAL: 13034,
    },
    citron: {
      Code_CIQUAL: 13009,
    },
    ail: {
      Code_CIQUAL: 11000,
    },
    artichaut: {
      Code_CIQUAL: 20052,
    },
    asperge: {
      Code_CIQUAL: 20279,
    },
    betterave: {
      Code_CIQUAL: 20091,
    },
    blette: {
      Code_CIQUAL: 20004,
    },
    carotte: {
      Code_CIQUAL: 20009,
    },
    celeri: {
      Code_CIQUAL: 20023,
    },
    champignonmorille: {
      Code_CIQUAL: 20105,
    },
    chou: {
      Code_CIQUAL: 20069,
    },
    choudebruxelles: {
      Code_CIQUAL: 20058,
    },
    choufleur: {
      Code_CIQUAL: 20016,
    },
    concombre: {
      Code_CIQUAL: 20019,
    },
    courge: {
      Code_CIQUAL: 20139,
    },
    courgette: {
      Code_CIQUAL: 20020,
    },
    cresson: {
      Code_CIQUAL: 20199,
    },
    echalote: {
      Code_CIQUAL: 20097,
    },
    endive: {
      Code_CIQUAL: 20026,
    },
    epinard: {
      Code_CIQUAL: 20059,
    },
    mangue: {
      Code_CIQUAL: 13025,
      Code_AGB: '13025_1',
    },
    fenouil: {
      Code_CIQUAL: 20028,
    },
    haricotvert: {
      Code_CIQUAL: 20061,
      Code_AGB: '20061_1',
    },
    laitue: {
      Code_CIQUAL: 20031,
    },
    mache: {
      Code_CIQUAL: 20099,
    },
    navet: {
      Code_CIQUAL: 20064,
    },
    mais: {
      Code_CIQUAL: 9200,
    },
    oignon: {
      Code_CIQUAL: 20034,
    },
    panais: {
      Code_CIQUAL: 20181,
    },
    petitpois: {
      Code_CIQUAL: 20072,
    },
    poireau: {
      Code_CIQUAL: 20039,
    },
    poivron: {
      Code_CIQUAL: 20168,
    },
    potiron: {
      Code_CIQUAL: 20044,
    },
    radis: {
      Code_CIQUAL: 20045,
    },
    salsifis: {
      Code_CIQUAL: 20197,
    },
    topinambour: {
      Code_CIQUAL: 20196,
    },
    cassis: {
      Code_CIQUAL: 13007,
    },
    chataigne: {
      Code_CIQUAL: 15024,
    },
    clementine: {
      Code_CIQUAL: 13024,
      Code_AGB: '13024_2',
    },
    pamplemousse: {
      Code_CIQUAL: 13040,
    },
    coing: {
      Code_CIQUAL: 13010,
    },
    figue: {
      Code_CIQUAL: 13012,
    },
    groseille: {
      Code_CIQUAL: 13019,
    },
    kiwi: {
      Code_CIQUAL: 13021,
    },
    mandarine: {
      Code_CIQUAL: 13024,
      Code_AGB: '13024_1',
    },
    melon: {
      Code_CIQUAL: 13026,
    },
    mure: {
      Code_CIQUAL: 13071,
    },
    nectarine: {
      Code_CIQUAL: 13030,
    },
    myrtille: {
      Code_CIQUAL: 13028,
    },
    noisette: {
      Code_CIQUAL: 15004,
    },
    noix: {
      Code_CIQUAL: 15023,
    },
    prune: {
      Code_CIQUAL: 13100,
    },
    reineclaude: {
      Code_CIQUAL: 13041,
    },
    rhubarbe: {
      Code_CIQUAL: 13047,
    },
    peche: {
      Code_CIQUAL: 13043,
    },
    cerise: {
      Code_CIQUAL: 13008,
    },
    abricot: {
      Code_CIQUAL: 13000,
    },
    framboise: {
      Code_CIQUAL: 13015,
    },
    poire: {
      Code_CIQUAL: 13107,
    },
    raisin: {
      Code_CIQUAL: 13112,
    },
    aubergine: {
      Code_CIQUAL: 20053,
    },
    brocoli: {
      Code_CIQUAL: 20057,
    },
    tomate: {
      Code_CIQUAL: 20047,
      Code_AGB: '20047_2',
    },
    ananas: {
      Code_CIQUAL: 13002,
    },
    banane: {
      Code_CIQUAL: 13005,
    },
    avocat: {
      Code_CIQUAL: 13004,
    },
    carambole: {
      Code_CIQUAL: 13054,
    },
    datte: {
      Code_CIQUAL: 13011,
    },
    fruitdelapassion: {
      Code_CIQUAL: 13016,
    },
    grenade: {
      Code_CIQUAL: 13018,
    },
    kaki: {
      Code_CIQUAL: 13066,
    },
    noixdecoco: {
      Code_CIQUAL: 15006,
    },
    pasteque: {
      Code_CIQUAL: 13036,
    },
  },
  alimentation: {
    boeuf: {
      Code_CIQUALs: [6001, 6103, 40202, 6212, 6002, 6140],
    },
    veau: {
      Code_CIQUALs: [40304, 6560, 6521, 6510, 6540, 6522],
    },
    porc: {
      Code_CIQUALs: [28100, 28001, 28302, 28002],
    },
    canard: {
      Code_CIQUAL: 36201,
    },
    lapin: {
      Code_CIQUAL: 34001,
    },
    poulet: {
      Code_CIQUAL: 36003,
    },
    crevettes: {
      Code_CIQUAL: 10021,
    },
    moules: {
      Code_CIQUAL: 10026,
    },
    huitres: {
      Code_CIQUAL: 10035,
    },
    cabillaud: {
      Code_CIQUAL: 26043,
    },
    lieu: {
      Code_CIQUAL: 26129,
    },
    dorade: {
      Code_CIQUALs: [26080, 26088],
    },
    saumon: {
      Code_CIQUAL: 26036,
    },
    thon: {
      Code_CIQUAL: 26053,
    },
    sardines: {
      Code_CIQUAL: 26065,
    },
    beurre: {
      Code_CIQUALs: [16400, 16402],
    },
    fromagedure: {
      Code_CIQUALs: [12115, 12114, 12110, 12736],
    },
    feta: {
      Code_CIQUAL: 12061,
    },
    fromagemolle: {
      Code_CIQUALs: [12001, 12021, 12030, 12051],
    },
    mozarella: {
      Code_CIQUAL: 19590,
    },
    fromagebleu: {
      Code_CIQUALs: [12500, 12521, 12524],
    },
    oeuf: {
      Code_CIQUAL: 22000,
    },
    matieregrasse: {
      Code_CIQUAL: 16080,
    },
    yaourt: {
      Code_CIQUAL: 19860,
    },
    fromageblanc: {
      Code_CIQUAL: 19644,
    },
    riz: {
      Code_CIQUALs: [9100, 9102, 9109, 9108],
    },
    pates: {
      Code_CIQUAL: 9810,
    },
    ble: {
      Code_CIQUALs: [9060, 9080, 9010, 9610],
    },
    boulgour: {
      Code_CIQUAL: 9690,
    },
    poischiches: {
      Code_CIQUAL: 20516,
    },
    haricotsrouges: {
      Code_CIQUAL: 20525,
    },
    lentilles: {
      Code_CIQUAL: 20521,
    },
    mais: {
      Code_CIQUAL: 9200,
    },
    cheeseburger: {
      Code_CIQUAL: 25414,
    },
    kebab: {
      Code_CIQUAL: 25429,
    },
    burgerpoulet: {
      Code_CIQUAL: 25502,
    },
    pizza: {
      Code_CIQUAL: 25478,
    },
    sushis: {
      Code_CIQUAL: 25456,
    },
    burgervegetarien: {
      Code_CIQUAL: 25415,
      Code_AGB: '25415_2',
    },
    frites: {
      Code_CIQUAL: 4032,
    },
    tofu: {
      Code_CIQUAL: 20904,
    },
    boucheechocolat: {
      Code_CIQUAL: 31066,
    },
    pateatartiner: {
      Code_CIQUAL: 31032,
    },
    brownie: {
      Code_CIQUAL: 23032,
    },
    painauchocolat: {
      Code_CIQUAL: 7730,
    },
    cookie: {
      Code_CIQUAL: 24684,
    },
    madeleine: {
      Code_CIQUALs: [24632, 24630],
    },
    painauxraisins: {
      Code_CIQUAL: 7720,
    },
    chaussonauxpommes: {
      Code_CIQUAL: 23480,
    },
    croissant: {
      Code_CIQUAL: 7620,
    },
    paindemie: {
      Code_CIQUAL: 7200,
    },
    bonbons: {
      Code_CIQUAL: 31060,
    },
    baguette: {
      Code_CIQUAL: 7001,
    },
    pommedeterre: {
      Code_CIQUAL: 4023,
    },
    boulettesvegetales: {
      Code_CIQUAL: 25589,
      Code_AGB: '25589_2',
    },
    galettefromage: {
      Code_CIQUAL: 25597,
      Code_AGB: '25597_1',
    },
    galettevegetale: {
      Code_CIQUAL: 25592,
    },
    hachevegetal: {
      Code_CIQUAL: 30181,
    },
    nuggetsvegetaux: {
      Code_CIQUAL: 25227,
      Code_AGB: '25227_2',
    },
    saucissevegetale: {
      Code_CIQUAL: 25232,
      Code_AGB: '25232_2',
    },
  },
} as Record<MetadataCategory, Record<string, MetadataInfos>>

const finalitiesId: Record<string, number> = {
  Agriculture: 30,
  Transformation: 31,
  Emballage: 32,
  Transport: 33,
  Supermarché_et_distribution: 34,
  Consommation: 35,
}

const agrybaliseValues = [
  'Code_CIQUAL',
  'Code_AGB',
  "Sous-groupe_d'aliment",
  ...Object.keys(finalitiesId).flatMap((finality) => [AgrybalisePrefixEnum.ChangementClimatique + finality]),
]

const updateEquivalents = (
  equivalents: (Equivalent & {
    Code_CIQUAL?: number
    Code_CIQUALs?: number[]
    Code_AGB?: string
  })[],
  values: (Record<string, number> & {
    Code_CIQUAL: number
    Code_AGB?: string
    "Sous-groupe_d'aliment": string
  })[]
) => {
  return equivalents.map((equivalent) => {
    if (!('Code_CIQUAL' in equivalent) && !('Code_CIQUALs' in equivalent)) {
      return equivalent
    }

    let value = values[0]
    const agbValue = values.find((v) => v.Code_AGB === equivalent.Code_AGB)
    if (agbValue) {
      value = agbValue
    } else if ('Code_CIQUALs' in equivalent && equivalent.Code_CIQUALs) {
      const ciqualValues = values.filter((v) => equivalent.Code_CIQUALs?.includes(v.Code_CIQUAL))
      if (ciqualValues.length !== equivalent.Code_CIQUALs.length) {
        throw new Error(
          'BUG! ' + equivalent.slug + ' has too much possible values, should use a Code_AGB to discriminate'
        )
      }
      value = {} as Record<string, number> & {
        Code_CIQUAL: number
        Code_AGB?: string
        "Sous-groupe_d'aliment": string
      }
      Object.entries(finalitiesId).forEach(([finality]) => {
        value[`${AgrybalisePrefixEnum.ChangementClimatique}${finality}`] =
          ciqualValues.reduce(
            (acc, current) => acc + current[`${AgrybalisePrefixEnum.ChangementClimatique}${finality}`],
            0
          ) / ciqualValues.length
      })
    } else {
      const ciqualValues = values.filter((v) => v.Code_CIQUAL === equivalent.Code_CIQUAL)
      if (ciqualValues.length === 1) {
        value = ciqualValues[0]
      } else if (ciqualValues.length === 0) {
        throw new Error('BUG! ' + equivalent.slug + ' is not defined...')
      } else {
        throw new Error(
          'BUG! ' + equivalent.slug + ' has too much possible values, should use a Code_AGB to discriminate'
        )
      }
    }
    console.log(`${equivalent.slug}: "${value["Sous-groupe_d'aliment"]}",`)

    const newEcvs: EquivalentValue[] = []
    Object.entries(finalitiesId).forEach(([finality, id]) => {
      const ecv = value[`${AgrybalisePrefixEnum.ChangementClimatique}${finality}`]
      if (ecv !== 0) {
        newEcvs.push({
          id,
          value: ecv,
        })
      }
    })
    return {
      ...equivalent,
      ecv: newEcvs,
      Code_CIQUAL: undefined,
      Code_CIQUALs: undefined,
      Code_AGB: undefined,
    }
  })
}

const buildFromAgribalyse = async (key: string) => {
  const existingEquivalents = existingEquivalentsByCategory[key]
  if (!existingEquivalents) {
    console.info('Type should be "boissons", "alimentation" or "fruitsetlegumes"')
    process.exit(1)
  }

  const enrichedEquivalents = existingEquivalents.values.map((equivalent) => ({
    ...equivalent,
    ...(metaData[key as MetadataCategory][equivalent.slug] || {}),
  }))

  const ciquals = enrichedEquivalents
    .flatMap((equivalent) =>
      'Code_CIQUAL' in equivalent
        ? [equivalent.Code_CIQUAL]
        : 'Code_CIQUALs' in equivalent && equivalent.Code_CIQUALs
          ? equivalent.Code_CIQUALs
          : []
    )
    .filter((code) => !!code)
    .join(',')
  const remote_url = encodeURI(
    `https://data.ademe.fr/data-fair/api/v1/datasets/agribalyse-31-detail-par-etape/lines?size=${
      ciquals.length
    }&select=${agrybaliseValues.join(',')}&Code_CIQUAL_in=${ciquals}`
  )

  const newEquivalents = await axios.get(remote_url).then((response) => response.data.results)
  const finalResult = updateEquivalents(enrichedEquivalents, newEquivalents)

  const content =
    "import { Equivalent } from 'types/equivalent'\n\n" +
    `export const ${existingEquivalents.exportName} = ${JSON.stringify(finalResult, null, 2)} as Equivalent[]\n`

  fs.writeFileSync(`src/data/categories/${existingEquivalents.file}`, content)
}

if (process.argv[2]) {
  buildFromAgribalyse(process.argv[2])
} else {
  buildFromAgribalyse('boissons')
  buildFromAgribalyse('fruitsetlegumes')
  buildFromAgribalyse('alimentation')
}
