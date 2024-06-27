import React from 'react'
import useParamContext from 'src/providers/ParamProvider'
import styles from './Data.module.css'

const FRUsageData = () => {
  return (
    <>
      <div className={styles.title}>Durée de vie</div>
      <div className={styles.content}>
        <div>
          Lorsque la durée de vie de l'appareil s'allonge, l'impact de son utilisation augmente aussi. Mais cela veut
          surtout dire que l'impact de la production <b>s'amortie avec le temps</b>.
        </div>
        <div>
          Il reste tres important de <b>prendre soin de ses objets</b>, de <b>réparer</b> au lieu d'acheter et d'essayer
          de <b>prolonger au maximum la durée de vie</b> de ses appareils pour en diminuer l'impact carbone.
        </div>
      </div>
    </>
  )
}

const ENUsageData = () => {
  return (
    <>
      <div className={styles.title}>Lifespan</div>
      <div className={styles.content}>
        <div>
          Lifetime As the lifespan of the device increases, the impact of its use also increases. But above all this
          means that the impact of production is <b>amortized over time</b>.
        </div>
        <div>
          It remains very important to <b>take care</b> of your objects, to <b>repair</b> instead of buying and to try
          to <b>extend the lifespan</b> of your devices as much as possible to reduce their carbon impact.
        </div>
      </div>
    </>
  )
}

const UsageData = () => {
  const { language } = useParamContext()
  if (language === 'en') {
    return <ENUsageData />
  }

  return <FRUsageData />
}
export default UsageData
