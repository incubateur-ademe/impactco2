import { useGlobalStore } from 'src/providers/stores/global'
import NewTabIcon from 'components/base/NewTabIcon'
import Link from 'components/base/buttons/Link'
import styles from './Data.module.css'

const FRUsageNumeriqueData = () => {
  return (
    <>
      <div className={styles.content}>
        <p>
          L'ensemble des calculs est issu d'une{' '}
          <Link href='https://base-empreinte.ademe.fr/documentation/base-impact'>étude réalisée par NégaOctet</Link>
        </p>
      </div>
      <h2 className={styles.title}>Hypothèses pour l’email</h2>
      <p className={styles.content}>
        On considère un temps de rédaction de 3 minutes, et un seul destinataire par email qui lirait le message en 10
        secondes sur un appareil et un réseau équivalent à celui de l'expéditeur. L'email est considéré stocké pendant
        10 ans côté expéditeur et destinataire. Un poids de 75 ko a été retenu pour un email sans pièce-jointe.
        L'ensemble de l'impact (expéditeur et destinataire) est attribué à l'expéditeur.
      </p>
      <h2 className={styles.title}>Hypothèses pour le streaming</h2>
      <p className={styles.content}>
        On considère que les qualités "basse définition", "haute définition" et "4K" correspondent respectivement à des
        tailles de vidéos de 700 Mo, 3 Go et 7 Go par heure. Les facteurs d'émission correspondants à la transmission
        des données au sein du réseau ont été fournis par NégaOctet. Les calculs relatifs aux data-centers ont été
        réalisés à partir de données qui concernent la plateforme Netflix.
      </p>
      <h2 className={styles.title}>Hypothèses pour le visioconférence</h2>
      <p className={styles.content}>
        On considère 2 personnes par défaut dans la visioconférence et que son impact est seulement celui associé à son
        emplacement dans la visioconférence. Les qualités "audio", "basse définition", "haute définition" correspondent
        respectivement à des tailles de vidéos de 164 Mo, 700 Mo et 3 Go par heure. Concernant la transmission des
        données et les data-centers, les hypothèses utilisées pour le streaming ont été appliquées à la visioconférence.
      </p>
      <div className={styles.content}>
        <p>
          Pour plus de détails, consultez{' '}
          <Link href='/doc/usage-numerique/acv' title='Lien externe : documentation détaillée' target='_blank'>
            la documentation détaillée
            <NewTabIcon />
          </Link>
        </p>
      </div>
    </>
  )
}

const ESUsageNumeriqueData = () => {
  return (
    <>
      <div className={styles.content}>
        <p>
          Todos los cálculos se basan en un{' '}
          <Link href='https://base-empreinte.ademe.fr/documentation/base-impact'>estudio realizado por NegaOctet</Link>
        </p>
      </div>
      <h2 className={styles.title}>Supuestos para el correo electrónico</h2>
      <p className={styles.content}>
        Suponemos un tiempo de escritura de 3 minutos y un único destinatario por correo electrónico que lee el mensaje
        en 10 segundos en un dispositivo y una red equivalentes a los del remitente. Se considera que el correo
        electrónico se almacena durante 10 años por parte del remitente y del destinatario. Se supone que un correo
        electrónico sin archivos adjuntos tiene un tamaño de 75kb. El impacto total (remitente y destinatario) se
        atribuye al remitente.
      </p>
      <h2 className={styles.title}>Supuestos de streaming</h2>
      <p className={styles.content}>
        Suponemos que las calidades "baja definición", "alta definición" y "4K" corresponden a tamaños de vídeo de 700
        MB, 3 GB y 7 GB por hora, respectivamente. Los factores de emisión correspondientes a la transmisión de datos
        dentro de la red fueron facilitados por NegaOctet. Los cálculos para los centros de datos se basaron en los
        datos de la plataforma Netflix.
      </p>
      <h2 className={styles.title}>Supuestos para la videoconferencia</h2>
      <p className={styles.content}>
        Asumimos que hay 2 personas en la videoconferencia por defecto y que su impacto es sólo el asociado a su
        ubicación en la videoconferencia. Las calidades "audio", "baja definición" y "alta definición" corresponden
        respectivamente a tamaños de vídeo de 164 MB, 700 MB y 3 GB por hora. En cuanto a la transmisión de datos y los
        centros de datos, se han aplicado a la videoconferencia las hipótesis utilizadas para el streaming.
      </p>
      <div className={styles.content}>
        <p>
          Para más detalles, consulte{' '}
          <Link href='/doc/usage-numerique/acv' title='Lien externe : documentation détaillée' target='_blank'>
            la documentación detallada <NewTabIcon />
          </Link>
        </p>
      </div>
    </>
  )
}

const ENUsageNumeriqueData = () => {
  return (
    <>
      <div className={styles.content}>
        <p>
          All calculations come from a{' '}
          <Link href='https://base-empreinte.ademe.fr/documentation/base-impact'>study carried out by NégaOctet</Link>
        </p>
      </div>
      <h2 className={styles.title}>Assumptions for email</h2>
      <p className={styles.content}>
        We consider a writing time of 3 minutes, and a single recipient per email who would read the message in 10
        seconds on a device and a network equivalent to that of the sender. The email is considered stored for 10 years
        on the sender and recipient sides. A weight of 75 kb was retained for an email without attachment. The entire
        impact (sender and recipient) is attributed to the sender.
      </p>
      <h2 className={styles.title}>Assumptions for streaming</h2>
      <p className={styles.content}>
        We consider that the “low definition”, “high definition” and “4K” qualities correspond respectively to video
        sizes of 700 MB, 3 GB and 7 GB per hour. The emission factors corresponding to data transmission within the
        network were provided by NégaOctet. The calculations relating to data centers were carried out using data
        relating to the Netflix platform.
      </p>
      <h2 className={styles.title}>Assumptions for videoconferencing</h2>
      <p className={styles.content}>
        We consider 2 people by default in the videoconference and that its impact is only that associated with their
        location in the videoconference. The “audio”, “low definition”, “high definition” qualities correspond
        respectively to video sizes of 164 MB, 700 MB and 3 GB per hour. Concerning data transmission and data centers,
        the assumptions used for streaming were applied to videoconferencing.
      </p>
      <div className={styles.content}>
        <p>
          For more details, see{' '}
          <Link href='/doc/usage-numerique/acv' title='Lien externe : documentation détaillée' target='_blank'>
            the detailed documentation
            <NewTabIcon />
          </Link>
        </p>
      </div>
    </>
  )
}

const UsageNumeriqueData = () => {
  const { language } = useGlobalStore()
  if (language === 'en') {
    return <ENUsageNumeriqueData />
  }
  if (language === 'es') {
    return <ESUsageNumeriqueData />
  }

  return <FRUsageNumeriqueData />
}

export default UsageNumeriqueData
