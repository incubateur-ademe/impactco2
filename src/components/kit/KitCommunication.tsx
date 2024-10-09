import classNames from 'classnames'
import Image from 'next/image'
import React from 'react'
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
      <Block title='Kit de communication' as='h1' description='Tout ce qu’il faut pour communiquer sur Impact CO₂'>
        <Card className={outilStyles.card}>
          <div className={styles.logo}>
            <Marianne />
            <Ademe />
            <Logo />
          </div>
          <div className={outilStyles.content}>
            <h2>Logos</h2>
            <span>
              Si vous souhaitez utiliser le logo d’Impact CO₂ pour communiquer sur vos propres supports (par exemple,
              pour évoquer votre utilisation de nos outils), vous pouvez utiliser le bloc marque.
            </span>
            <span>
              Le bloc marque comprend les logos de la République Française, de l’Ademe et d’Impact CO₂, tels que nous
              les utilisons sur nos propres supports.
            </span>
          </div>
          <div className={outilStyles.link}>
            <Download name='logos' />
          </div>
        </Card>
      </Block>
      <Block>
        <Card className={outilStyles.card}>
          <div className={classNames(outilStyles.image, styles.image)}>
            <Image src='/images/banner-kit-images.jpg' width={748} height={180} alt='' />
          </div>
          <div className={outilStyles.content}>
            <h2>Collection d’images</h2>
            <span>
              Nous mettons à votre disposition une collection d’images dédiées à chacun des outils disponibles sur notre
              site web et présentant le concept du site en une image synthétique.
            </span>
            <span>
              Si vous souhaitez communiquer sur l’utilisation de nos ressources, nous avons prévu un emplacement sur
              chacune de ces images pour placer votre logo.
            </span>
            <span>Pour obtenir les images, cliquez sur le bouton ci-dessous :</span>
          </div>
          <div className={outilStyles.link}>
            <Download name='images' />
          </div>
        </Card>
      </Block>
      <Block>
        <Card className={outilStyles.card}>
          <div className={classNames(outilStyles.image, styles.image)}>
            <Image src='/images/banner-kit-illustrations.png' width={748} height={180} alt='' />
          </div>
          <div className={outilStyles.content}>
            <h2>Illustrations</h2>
            <span>
              Si vous le souhaitez, vous pouvez utiliser les icônes que nous avons créées dans vos propres infographies,
              pour illustrer l’impact sur le climat des gestes et objets du quotidien.
            </span>
            <span>
              En échange, nous vous demandons de bien vouloir créditer Impact CO₂ en tant qu’auteur des illustrations,
              avec un lien vers notre site web. Merci !
            </span>
            <span>
              Exemple de citation : "illustrations réalisées par{' '}
              <Link href='#' internal>
                Impact CO₂
              </Link>
              "
            </span>
          </div>
          <div className={outilStyles.link}>
            <Download name='illustrations' />
          </div>
        </Card>
      </Block>
      <Block>
        <Card className={outilStyles.card}>
          <div className={classNames(outilStyles.image, styles.image)}>
            <Image src='/images/banner-kit-plaquette.png' width={748} height={180} alt='' />
          </div>
          <div className={outilStyles.content}>
            <h2>Plaquette de présentation</h2>
            <span>
              Nous mettons à votre disposition une courte plaquette de présentation pour pouvoir partager facilement
              notre service public à votre entourage professionnel. N’hésitez pas à l’utiliser lors de vos prochains
              ateliers, ou à le diffuser dans vos canaux de communication !
            </span>
          </div>
          <div className={outilStyles.link}>
            <Download name='plaquette' customHref='/kit/plaquette.pdf' customLabel='Télécharger la plaquette (.pdf)' />
          </div>
        </Card>
      </Block>
    </>
  )
}

export default KitCommunication
