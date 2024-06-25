import classNames from 'classnames'
import React from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { getName } from 'utils/Equivalent/equivalent'
import EquivalentIcon from 'components/base/EquivalentIcon'
import Link from 'components/base/buttons/Link'
import styles from './Data.module.css'

const data = {
  pompeachaleur: {
    values: [
      {
        fr: 'Intensité carbone',
        en: 'Carbon intensity',
        value: '0,079 kgCO₂e/kWh (2022) *',
      },
      {
        fr: 'Besoin d’énergie par m²',
        en: 'Energy requirement per m²',
        value: '150 kWh/m²',
      },
      {
        fr: 'Rendement',
        en: 'Yield',
        value: '3',
      },
      {
        fr: 'Empreinte carbone par m²',
        en: 'Carbon footprint per m²',
        value: '150 kWh/m² / 3 × 0,079 kgCO₂e/kWh = 3,95 kgCO₂e/m²',
      },
    ],
    hypothesis: {
      fr: '* Donnée issue de l’accord de la réglementation <a href="https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000043938727/2022-01-01" target="_blank" rel="noopener norefferer">RE 2020</a>',
      en: '* Data from regulatory agreement <a href="https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000043938727/2022-01-01" target="_blank" rel="noopener norefferer">RE 2020</a>',
    },
  },
  poeleagranule: {
    values: [
      {
        fr: 'Intensité carbone',
        en: 'Carbon intensity',
        value: '0,0320 kg CO₂e/kWh',
      },
      {
        fr: 'Besoin d’énergie par m²',
        en: 'Energy requirement per m²',
        value: '150 kWh/m²',
      },
      {
        fr: 'Rendement',
        en: 'Yield',
        value: '0,85',
      },
      {
        fr: 'Empreinte carbone par m²',
        en: 'Carbon footprint per m²',
        value: '150 kWh/m² / 0,85 × 0,0320 kgCO₂e/kWh = 5,64 kgCO₂e/m²',
      },
    ],
    hypothesis: {
      fr: "Attention : les facteurs d'émissions E+/C- suivent des règles d'élaboration parfois différentes des règles de calcul de la Base Carbone. Il est donc probable que ce facteur d'émission sous-estime légèrement l'impact GES de la consommation d'un kWh de bois bûche en ne prenant pas en compte les émissions de méthane imbrulé.",
      en: 'Please note: the E+/C- emissions factors follow development rules that are sometimes different from the Carbon Base calculation rules. It is therefore likely that this emission factor slightly underestimates the GHG impact of consuming one kWh of wood by not taking into account unburned methane emissions.',
    },
  },
  poeleabois: {
    values: [
      {
        fr: 'Intensité carbone',
        en: 'Carbon intensity',
        value: '0,046 kg CO₂e/kWh',
      },
      {
        fr: 'Besoin d’énergie par m²',
        en: 'Energy requirement per m²',
        value: '150 kWh/m²',
      },
      {
        fr: 'Rendement',
        en: 'Yield',
        value: '0.75',
      },
      {
        fr: 'Empreinte carbone par m²',
        en: 'Carbon footprint per m²',
        value: '150 kWh/m²  / 0,75 × 0,046 kgCO₂e/kWh = 9,2 kgCO₂e/m²',
      },
    ],
    hypothesis: {
      fr: "Attention : les facteurs d'émissions E+/C- suivent des règles d'élaboration parfois différentes des règles de calcul de la Base Carbone. Il est donc probable que ce facteur d'émission sous-estime légèrement l'impact GES de la consommation d'un kWh de bois bûche en ne prenant pas en compte les émissions de méthane imbrulé.",
      en: 'ntion: the E+/C- emissions factors follow development rules that are sometimes different from the Carbon Base calculation rules. It is therefore likely that this emission factor slightly underestimates the GHG impact of consuming one kWh of wood by not taking into account unburned methane emissions.',
    },
  },
  chauffageelectrique: {
    values: [
      {
        fr: 'Intensité carbone',
        en: 'Carbon intensity',
        value: '0,079 kgCO₂e/kWh (2022) *',
      },
      {
        fr: 'Besoin d’énergie par m²',
        en: 'Energy requirement per m²',
        value: '150 kWh/m²',
      },
      {
        fr: 'Rendement',
        en: 'Yield',
        value: '1',
      },
      {
        fr: 'Empreinte carbone par m²',
        en: 'Carbon footprint per m²',
        value: '150 kWh/m² / 1 × 0,079 kgCO₂e/kWh = 11,85 kgCO₂e/m²',
      },
    ],
    hypothesis: {
      fr: '* Donnée issue de l’accord de la réglementation <a href="https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000043938727/2022-01-01" target="_blank" rel="noopener norefferer">RE 2020</a>',
      en: '* Data from regulatory agreement <a href="https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000043938727/2022-01-01" target="_blank" rel="noopener norefferer">RE 2020</a>',
    },
  },
  reseaudechaleur: {
    values: [
      {
        fr: 'Intensité carbone',
        en: 'Carbon intensity',
        value: '0,112 kg CO₂e/kWh',
        withSource: {
          label: 'Étude Fedene 2023',
          href: 'https://www.fedene.fr/wp-content/uploads/sites/2/2023/11/Fedene_enquete_version-numerique.pdf',
        },
      },
      {
        fr: 'Besoin d’énergie par m²',
        en: 'Energy requirement per m²',
        value: '150 kWh/m²',
      },
      {
        fr: 'Rendement',
        en: 'Yield',
        value: '0,9',
      },
      {
        fr: 'Empreinte carbone par m²',
        en: 'Carbon footprint per m²',
        value: '150 kWh/m² / 0,9 × 0,112 kgCO₂e/kWh = 18,67 kgCO₂e/m²',
      },
    ],
    hypothesis: undefined,
  },
  chauffagegaz: {
    values: [
      {
        fr: 'Intensité carbone',
        en: 'Carbon intensity',
        value: '0,221 kg CO₂e /kWh PCS *',
      },
      {
        fr: 'Besoin d’énergie par m²',
        en: 'Energy requirement per m²',
        value: '150 kWh/m²',
      },
      {
        fr: 'Rendement',
        en: 'Yield',
        value: '0,85',
      },
      {
        fr: 'Empreinte carbone par m²',
        en: 'Carbon footprint per m²',
        value: '150 kWh/m² / 0,85 × 0,221 kgCO₂e/kWh = 39 kgCO₂e/m²',
      },
    ],
    hypothesis: {
      fr: "* On raisonne en PCS (Pouvoir Calorifique Supérieur) et non en PCI (Pouvoir Calorifique Inférieur), car le PCS est utilisé en tant que coefficient de conversion dans les factures pour convertir le volume de gaz utilisé en kWh : on fait l'hypothèse que la chaudière gaz récupère bien la chaleur latente de condensation.",
      en: '* We reason in HCV (Higher Calorific Value) and not in LCV (Lower Calorific Value), because the HCV is used as a conversion coefficient in invoices to convert the volume of gas used into kWh: we make the hypothesis that the gas boiler recovers latent condensation heat well.',
    },
  },
  chauffagefioul: {
    values: [
      {
        fr: 'Intensité carbone',
        en: 'Carbon intensity',
        value: '0,324 kgCO₂e/kWh',
      },
      {
        fr: 'Besoin d’énergie par m²',
        en: 'Energy requirement per m²',
        value: '150 kWh/m²',
      },
      {
        fr: 'Rendement',
        en: 'Yield',
        value: '0,85',
      },
      {
        fr: 'Empreinte carbone par m²',
        en: 'Carbon footprint per m²',
        value: '150 kWh/m² / 0,85 × 0,324 kgCO₂e/kWh = 57,17 kgCO₂e/m²',
      },
    ],
    hypothesis: undefined,
  },
}

const FRChauffageData = () => {
  const { language } = useParamContext()

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        L'ensemble des calculs et des hypothèses sont issus de{' '}
        <Link href='https://www.statistiques.developpement-durable.gouv.fr/consommation-denergie-par-usage-du-residentiel'>
          l’étude Consommation d'énergie par usage du résidentiel 2023
        </Link>{' '}
        et{' '}
        <Link href='https://www.legifrance.gouv.fr/download/pdf?id=doxMrRr0wbfJVvtWjfDP4rj1eH6w-xJoB6-2bmLS9gg='>
          de la méthode 3CL du DPE
        </Link>
        . Nous utilisons également les facteurs d’émission de la{' '}
        <Link href='https://base-empreinte.ademe.fr/donnees/jeu-donnees'>Base Empreinte</Link> dans nos calculs, qui
        sont exprimés kgCO₂e/kWh.
        <br />
        <br />
        Afin de comparer les différents modes de chauffage entre eux, nous partons d’un foyer moyen avec un besoin en
        énergie de 150 kWh/m².
      </div>
      {Object.entries(data).map(([slug, { values, hypothesis }]) => (
        <div key={slug}>
          <div>
            <div className={styles.emoji}>
              <EquivalentIcon equivalent={{ slug }} />
            </div>
            <b>{getName(language, { slug, category: 8 })}</b>
          </div>
          {values.map((value, index) => (
            <div
              className={classNames(styles.values, { [styles.border]: index !== values.length - 1 })}
              key={slug + value.fr}>
              <div>
                {value.fr}
                {'withSource' in value && value.withSource && (
                  <span>
                    {' '}
                    • <Link href={value.withSource.href}>{value.withSource.label}</Link>
                  </span>
                )}
              </div>
              <div className={styles.value}>{value.value}</div>
            </div>
          ))}
          {hypothesis && (
            <div
              className={classNames(styles.hypothesis, 'text-sm')}
              dangerouslySetInnerHTML={{
                __html: hypothesis.fr,
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

const ENChauffageData = () => {
  const { language } = useParamContext()
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        All calculations and assumptions come from{' '}
        <Link href='https://www.statistiques.developpement-durable.gouv.fr/consommation-denergie-par-usage-du-residentiel'>
          the Energy consumption by residential use 2023 study
        </Link>{' '}
        and{' '}
        <Link href='https://www.legifrance.gouv.fr/download/pdf?id=doxMrRr0wbfJVvtWjfDP4rj1eH6w-xJoB6-2bmLS9gg='>
          the DPE 3CL method
        </Link>
        . We also use the <Link href='https://base-empreinte.ademe.fr/donnees/jeu-donnees'>Base Empreinte</Link>{' '}
        emission factors in our calculations, which are expressed kgCO₂e/kWh.
        <br />
        <br />
        In order to compare the different heating methods with each other, we start from an average household with an
        energy requirement of 150 kWh/m².
      </div>
      {Object.entries(data).map(([slug, { values, hypothesis }]) => (
        <div key={slug}>
          <div>
            <div className={styles.emoji}>
              <EquivalentIcon equivalent={{ slug }} />
            </div>
            <b>{getName(language, { slug, category: 8 })}</b>
          </div>
          {values.map((value, index) => (
            <div
              className={classNames(styles.values, { [styles.border]: index !== values.length - 1 })}
              key={slug + value.en}>
              <div>
                {value.en}
                {'withSource' in value && value.withSource && (
                  <span>
                    {' '}
                    • <Link href={value.withSource.href}>{value.withSource.label}</Link>
                  </span>
                )}
              </div>
              <div className={styles.value}>{value.value}</div>
            </div>
          ))}
          {hypothesis && (
            <div
              className={classNames(styles.hypothesis, 'text-sm')}
              dangerouslySetInnerHTML={{
                __html: hypothesis.en,
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

const ChauffageData = () => {
  const { language } = useParamContext()
  if (language === 'en') {
    return <ENChauffageData />
  }

  return <FRChauffageData />
}

export default ChauffageData
