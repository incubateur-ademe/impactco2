import useParamContext from 'src/providers/ParamProvider'
import NewTabIcon from 'components/base/NewTabIcon'
import Link from 'components/base/buttons/Link'
import styles from './Data.module.css'

const FRNumeriqueData = () => {
  return (
    <>
      <div className={styles.content}>
        <p>
          L'ensemble des calculs est issu d'une{' '}
          <Link href='https://librairie.ademe.fr/changement-climatique/7880-evaluation-de-l-impact-environnemental-du-numerique-en-france.html'>
            étude réalisée et mise à jour en 2025 par ADEME/ARCEP
          </Link>
        </p>
      </div>
      <h2 className={styles.title}>Hypothèses</h2>
      <p className={styles.content}>
        La plus grande part de l’impact environnemental du numérique se joue au moment de la fabrication des appareils.
        Les entretenir c’est leur offrir des années d’usage supplémentaires.
      </p>
      <p className={styles.content}>
        L’impact du numérique vient aussi des usages. Environ 53% des usages numériques français sont hébergés à
        l’étranger. Ces impacts délocalisés sont pris en compte.
      </p>
      <p className={styles.content}>
        Le recyclage et la valorisation des matériaux en fin de cycle de vie sont aussi considérés mais restent
        variables selon l’appareil.
      </p>
      <div className={styles.content}>
        <p>
          Pour plus de détails et mieux comprendre les données, consultez{' '}
          <Link href='/doc/usage-numerique/acv' title='Lien externe : documentation détaillée' target='_blank'>
            la documentation détaillée
            <NewTabIcon />
          </Link>
        </p>
      </div>
    </>
  )
}

const ESNumeriqueData = () => {
  return (
    <>
      <div className={styles.content}>
        <p>
          Todos los cálculos provienen de un{' '}
          <Link href='https://librairie.ademe.fr/changement-climatique/7880-evaluation-de-l-impact-environnemental-du-numerique-en-france.html'>
            estudio realizado y actualizado en 2025 por ADEME/ARCEP
          </Link>
        </p>
      </div>
      <h2 className={styles.title}>Hipótesis</h2>
      <p className={styles.content}>
        La mayor parte del impacto ambiental del mundo digital se produce durante la fabricación de los dispositivos.
        Mantenerlos significa ofrecerles años adicionales de uso.
      </p>
      <p className={styles.content}>
        El impacto del mundo digital también proviene de los usos. Aproximadamente el 53% de los usos digitales
        franceses están alojados en el extranjero. Estos impactos deslocalizados se tienen en cuenta.
      </p>
      <p className={styles.content}>
        El reciclaje y la valorización de materiales al final del ciclo de vida también se consideran, pero varían según
        el dispositivo.
      </p>
      <div className={styles.content}>
        <p>
          Para más detalles y comprender mejor los datos, consulte{' '}
          <Link href='/doc/usage-numerique/acv' title='Enlace externo: documentación detallada' target='_blank'>
            la documentación detallada
            <NewTabIcon />
          </Link>
        </p>
      </div>
    </>
  )
}

const ENNumeriqueData = () => {
  return (
    <>
      <div className={styles.content}>
        <p>
          All calculations come from a{' '}
          <Link href='https://librairie.ademe.fr/changement-climatique/7880-evaluation-de-l-impact-environnemental-du-numerique-en-france.html'>
            study conducted and updated in 2025 by ADEME/ARCEP
          </Link>
        </p>
      </div>
      <h2 className={styles.title}>Assumptions</h2>
      <p className={styles.content}>
        The largest part of the environmental impact of digital technology occurs during device manufacturing.
        Maintaining them means offering them additional years of use.
      </p>
      <p className={styles.content}>
        The impact of digital technology also comes from usage. About 53% of French digital usage is hosted abroad.
        These relocated impacts are taken into account.
      </p>
      <p className={styles.content}>
        Recycling and material recovery at the end of the life cycle are also considered but remain variable depending
        on the device.
      </p>
      <div className={styles.content}>
        <p>
          For more details and to better understand the data, see{' '}
          <Link href='/doc/usage-numerique/acv' title='External link: detailed documentation' target='_blank'>
            the detailed documentation
            <NewTabIcon />
          </Link>
        </p>
      </div>
    </>
  )
}

const NumeriqueData = () => {
  const { language } = useParamContext()
  if (language === 'en') {
    return <ENNumeriqueData />
  }
  if (language === 'es') {
    return <ESNumeriqueData />
  }

  return <FRNumeriqueData />
}

export default NumeriqueData
