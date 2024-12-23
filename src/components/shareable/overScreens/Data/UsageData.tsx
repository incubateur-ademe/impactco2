import { useGlobalStore } from 'src/providers/stores/global'
import styles from './Data.module.css'

const FRUsageData = () => {
  return (
    <>
      <h2 className={styles.title}>Durée de vie</h2>
      <div className={styles.content}>
        <p>
          Lorsque la durée de vie de l'appareil s'allonge, l'impact de son utilisation augmente aussi. Mais cela veut
          surtout dire que l'impact de la production <b>s'amortit avec le temps</b>.
        </p>
        <p>
          Il reste très important de <b>prendre soin de ses objets</b>, de <b>réparer</b> au lieu d'acheter et d'essayer
          de <b>prolonger au maximum la durée de vie</b> de ses appareils pour en diminuer l'impact carbone.
        </p>
      </div>
    </>
  )
}

const ESUsageData = () => {
  return (
    <>
      <h2 className={styles.title}>Vida útil</h2>
      <div className={styles.content}>
        <p>
          A medida que aumenta la vida útil de un aparato, también lo hace el impacto de su uso. Pero, sobre todo, esto
          significa que el impacto de la producción <b>se amortiza con el tiempo</b>.
        </p>
        <p>
          Sigue siendo muy importante <b>cuidar tus objetos</b>, <b>repararlos</b> en lugar de comprarlos y probarlos.
          <b>extender la vida útil</b> de sus dispositivos tanto como sea posible para reducir su impacto de carbono.
        </p>
      </div>
    </>
  )
}

const ENUsageData = () => {
  return (
    <>
      <h2 className={styles.title}>Lifespan</h2>
      <div className={styles.content}>
        <p>
          Lifetime As the lifespan of the device increases, the impact of its use also increases. But above all this
          means that the impact of production is <b>amortized over time</b>.
        </p>
        <p>
          It remains very important to <b>take care</b> of your objects, to <b>repair</b> instead of buying and to try
          to <b>extend the lifespan</b> of your devices as much as possible to reduce their carbon impact.
        </p>
      </div>
    </>
  )
}

const UsageData = () => {
  const { language } = useGlobalStore()
  if (language === 'en') {
    return <ENUsageData />
  }
  if (language === 'es') {
    return <ESUsageData />
  }

  return <FRUsageData />
}
export default UsageData
