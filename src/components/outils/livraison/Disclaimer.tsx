import classNames from 'classnames'
import IframeableLink from 'components/base/IframeableLink'
import styles from './Disclaimer.module.css'

const weights: Record<string, string> = {
  '1': '162g',
  '2': '273g',
  '15': '1,2kg',
  '30': '2kg',
}

const Disclaimer = ({
  animated,
  id,
  className,
  mode,
}: {
  animated?: boolean
  id: string
  className?: string
  mode: string
}) => {
  return (
    <div className={classNames(styles.container, className)} id={`etiquette-${id}-disclaimer`}>
      <div className={styles.content}>
        {animated ? (
          <div>
            <p>
              Scénarios moyens, basés sur la livraison d’un colis de 1 kg, commandé en 54 minutes et emballé dans un
              carton de 468 g.
            </p>
            <IframeableLink className={styles.link} href='/outils/livraison'>
              Accéder au simulateur Impact Livraison{' '}
            </IframeableLink>
          </div>
        ) : (
          <div>
            <p>
              Le calcul de l’impact de la logistique / livraison est ici basé sur des moyennes, mais il n’existe pas de
              colis standard en termes de poids ou de dimensions. Le poids, le volume, l’emballage utilisé, le mode de
              transport et la distance parcourue par le colis influencent son impact carbone.
            </p>
            <br />
            <p>
              Les résultats présentés sont basés sur la livraison d’un colis de <b>{mode || 1} kg</b>, commandé en{' '}
              <b>54 minutes</b> et emballé dans <b>un carton de {weights[mode] || weights['1']}</b>.
            </p>
            <br />
            <p>
              Ce colis suit plusieurs étapes d’acheminement : le transport en poids lourd moyen entre les lieux de
              stockage et de transit, puis la livraison finale en véhicule utilitaire moyen. Ces étapes ainsi que le
              déplacement du consommateur pour récupérer le colis détermineront son impact final.
            </p>
            <br />
            <p>
              Afin d’ajuster les paramètres et explorer les données plus en détail, vous pouvez{' '}
              <IframeableLink className={styles.link} href='/outils/livraison'>
                utiliser le simulateur Impact Livraison
              </IframeableLink>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Disclaimer
