import Image from 'next/image'
import React from 'react'
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share'
import useParamContext from 'src/providers/ParamProvider'
import { Category } from 'types/category'
import { track } from 'utils/matomo'
import ClipboardBox from 'components/base/ClipboardBox'
import buttonStyles from 'components/base/buttons/Button.module.css'
import FacebookIcon from 'components/base/icons/facebook'
import LinkedinIcon from 'components/base/icons/linkedin'
import TwitterIcon from 'components/base/icons/twitter'
import WhatsappIcon from 'components/base/icons/whatsapp'
import CustomParam, { CustomParamValue } from './CustomParam'
import styles from './Share.module.css'

const ShareUrl = ({
  category,
  path,
  url,
  tracking,
  customImage,
  noLanguage,
}: {
  category?: Pick<Category, 'slug' | 'name' | 'meta'>
  tracking?: string
  path?: string
  customImage?: string
  url: string
  noLanguage?: boolean
}) => {
  const trackingValue = (category ? category.name : tracking) || 'UNKNOWN'
  const trackingSlug = trackingValue.replace(/ /g, '_').toLowerCase()
  const { language, setLanguage } = useParamContext()
  return (
    <>
      {!noLanguage && (
        <CustomParam
          tracking={trackingValue}
          slug='language'
          integration
          param={{ value: language, setter: setLanguage } as CustomParamValue}
          visible
        />
      )}
      <ClipboardBox tracking={trackingValue}>{url}</ClipboardBox>
      <div className={styles.buttons}>
        <FacebookShareButton
          className={buttonStyles.roundButton}
          url={url}
          title='Partager sur facebook'
          aria-label='Partager sur facebook'
          onClick={() => track(trackingValue, 'Share Facebook', `${trackingSlug}_facebook`)}>
          <FacebookIcon />
        </FacebookShareButton>
        <TwitterShareButton
          className={buttonStyles.roundButton}
          url={url}
          title='Partager sur twitter'
          aria-label='Partager sur twitter'
          onClick={() => track(trackingValue, 'Share Twitter', `${trackingSlug}_twitter`)}>
          <TwitterIcon />
        </TwitterShareButton>
        <WhatsappShareButton
          className={buttonStyles.roundButton}
          url={url}
          title='Partager sur whatsapp'
          aria-label='Partager sur whatsapp'
          onClick={() => track(trackingValue, 'Share Whatsapp', `${trackingSlug}_whatsapp`)}>
          <WhatsappIcon />
        </WhatsappShareButton>
        <LinkedinShareButton
          className={buttonStyles.roundButton}
          url={url}
          title='Partager sur linkedin'
          aria-label='Partager sur linkedin'
          onClick={() => track(trackingValue, 'Share Linkedin', `${trackingSlug}_linkedin`)}>
          <LinkedinIcon />
        </LinkedinShareButton>
      </div>
      {(category || path?.startsWith('outils/comparateur')) && (
        <div className={styles.meta}>
          {category ? (
            <Image src={`/meta/${category.slug}.png`} width={728} height={382.2} alt='' />
          ) : (
            <img src={customImage} width={728} height={382.2} />
          )}
          <div className={styles.text}>
            <div className={styles.metaHeader}>APERÇU DU PARTAGE</div>
            <p>
              <b>{category ? category.meta.title : 'Comparateur'}</b>
            </p>
            <p className='text-sm'>
              {category
                ? category.meta.description
                : 'Comparer et visualiser facilement une quantité de CO₂e grâce au comparateur d’Impact CO₂ et à ses équivalents pour avoir en tête les bons ordres de grandeur.'}
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default ShareUrl
