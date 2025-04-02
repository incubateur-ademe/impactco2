import classNames from 'classnames'
import Image from 'next/image'
import outilStyles from '../outils/Outil.module.css'
import Ademe from 'components/base/Logo/Ademe'
import Logo from 'components/base/Logo/ImpactCO2'
import Marianne from 'components/base/Logo/Marianne'
import Link from 'components/base/buttons/Link'
import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import Card from 'components/cards/Card'
import Block from 'components/layout/Block'
import Download from './Download'
import styles from './KitCommunication.module.css'

const KitCommunication = () => {
  return (
    <>
      <Breadcrumbs
        current='Kit de communication'
        links={[
          { label: 'Accueil', link: '/' },
          { label: 'La doc', link: '/doc' },
        ]}
      />
      <Block
        title='Kit de communication'
        as='h1'
        description='Tout ce qu’il faut pour communiquer sur Impact CO₂'
        id='livraison'>
        <Card className={outilStyles.card}>
          <div className={classNames(outilStyles.image, styles.image)}>
            <Image src='/images/banner-kit-livraison.jpg' width={748} height={180} alt='' />
          </div>
          <div className={outilStyles.content}>
            <h2>Kit de com’ pour Impact Livraison</h2>
            <p>
              Afin de vous faciliter la tâche, nous avons concocté des visuels prêts à l’emploi pour communiquer autour
              d’Impact Livraison.
            </p>
            <p>
              Le kit inclut notamment des exemples de posts pour les réseaux sociaux, ainsi que des visuels
              personnalisables avec votre logo, ou non, à différents formats, ainsi qu’un flyer A5 et un sticker 8x6cm
              avec un QR Code qui dirige vers la page d’Impact Livraison.
            </p>
          </div>
          <div className={outilStyles.link}>
            <Download name='livraison' customLabel='Télécharger le kit' />
          </div>
        </Card>
      </Block>
      <Block id='alimentation'>
        <Card className={outilStyles.card}>
          <div className={classNames(outilStyles.image, styles.image)}>
            <Image src='/images/banner-kit-alimentation.jpg' width={748} height={180} alt='' />
          </div>
          <div className={outilStyles.content}>
            <h2>Kit de com’ pour Impact Alimentation</h2>
            <p>
              Nous avons préparé des visuels prêts à l’emploi pour vous permettre de communiquer facilement sur Impact
              Alimentation.
            </p>
            <p>
              Comme pour le Quiz, ce kit inclut des exemples de posts pour les réseaux sociaux, ainsi que des visuels
              personnalisables avec votre logo, ou non, à différents formats (horizontal, carré, vertical, bannière
              email).
            </p>
          </div>
          <div className={outilStyles.link}>
            <Download name='kit' customHref='/kit/alimentation.zip' customLabel='Télécharger le kit (.zip)' />
          </div>
        </Card>
      </Block>
      <Block id='quiz'>
        <Card className={outilStyles.card}>
          <div className={classNames(outilStyles.image, styles.image)}>
            <Image src='/images/banner-kit-quiz.png' width={748} height={180} alt='' />
          </div>
          <div className={outilStyles.content}>
            <h2>Kit de com’ pour le Quiz carbone</h2>
            <p>
              Afin de vous faciliter la tâche, nous avons concocté des visuels prêts à l’emploi pour communiquer autour
              du Quiz carbone.
            </p>
            <p>
              Le kit inclut des exemples de posts pour les réseaux sociaux, ainsi que des visuels personnalisables avec
              votre logo, ou non, à différents formats (horizontal, carré, vertical, bannière email).
            </p>
          </div>
          <div className={outilStyles.link}>
            <Download name='kit' customHref='/kit/quiz.zip' customLabel='Télécharger le kit (.zip)' />
          </div>
        </Card>
      </Block>
      <Block id='images'>
        <Card className={outilStyles.card}>
          <div className={classNames(outilStyles.image, styles.image)}>
            <Image src='/images/banner-kit-images.jpg' width={748} height={180} alt='' />
          </div>
          <div className={outilStyles.content}>
            <h2>Collection d’images</h2>
            <p>
              Nous mettons à votre disposition une collection d’images dédiées à chacun des outils disponibles sur notre
              site web et présentant le concept du site en une image synthétique.
            </p>
            <p>
              Si vous souhaitez communiquer sur l’utilisation de nos ressources, nous avons prévu un emplacement sur
              chacune de ces images pour placer votre logo.
            </p>
            <p>Pour obtenir les images, cliquez sur le bouton ci-dessous :</p>
          </div>
          <div className={outilStyles.link}>
            <Download name='images' />
          </div>
        </Card>
      </Block>
      <Block id='illustrations'>
        <Card className={outilStyles.card}>
          <div className={classNames(outilStyles.image, styles.image)}>
            <Image src='/images/banner-kit-illustrations.jpg' width={748} height={180} alt='' />
          </div>
          <div className={outilStyles.content}>
            <h2>Illustrations</h2>
            <p>
              Si vous le souhaitez, vous pouvez utiliser les icônes que nous avons créées dans vos propres infographies,
              pour illustrer l’impact sur le climat des gestes et objets du quotidien.
            </p>
            <p>
              En échange, nous vous demandons de bien vouloir créditer Impact CO₂ en tant qu’auteur des illustrations,
              avec un lien vers notre site web. Merci !
            </p>
            <p>
              Exemple de citation : "illustrations réalisées par{' '}
              <Link href='#' internal>
                Impact CO₂
              </Link>
              "
            </p>
          </div>
          <div className={outilStyles.link}>
            <Download name='illustrations' />
          </div>
        </Card>
      </Block>
      <Block id='logos'>
        <Card className={outilStyles.card}>
          <div className={styles.logo}>
            <Marianne />
            <Ademe />
            <Logo />
          </div>
          <div className={outilStyles.content}>
            <h2>Logos</h2>
            <p>
              Si vous souhaitez utiliser le logo d’Impact CO₂ pour communiquer sur vos propres supports (par exemple,
              pour évoquer votre utilisation de nos outils), vous pouvez utiliser le bloc marque.
            </p>
            <p>
              Le bloc marque comprend les logos de la République Française, de l’Ademe et d’Impact CO₂, tels que nous
              les utilisons sur nos propres supports.
            </p>
          </div>
          <div className={outilStyles.link}>
            <Download name='logos' />
          </div>
        </Card>
      </Block>
    </>
  )
}

export default KitCommunication
