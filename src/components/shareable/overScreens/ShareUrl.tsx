import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share'
import useParamContext from 'src/providers/ParamProvider'
import { Category } from 'types/category'
import { track } from 'utils/matomo'
import { metaDescriptions, metaTitles } from 'utils/meta'
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
}: {
  category?: Pick<Category, 'slug' | 'name'>
  tracking?: string
  path?: string
  customImage?: string
  url: string
}) => {
  const t = useTranslations('overscreen')
  const trackingValue = (category ? category.name : tracking) || 'UNKNOWN'
  const trackingSlug = trackingValue.replace(/ /g, '_').toLowerCase()
  const { language, setLanguage } = useParamContext()
  return (
    <>
      <CustomParam
        tracking={trackingValue}
        slug='language'
        integration
        param={{ value: language, setter: setLanguage } as CustomParamValue}
        visible
      />
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
            <Image src={`/meta/${category.slug}-${language}.png`} width={728} height={382.2} alt='' />
          ) : (
            <img src={customImage} width={728} height={382.2} />
          )}
          <div className={styles.text}>
            <div className={styles.metaHeader}>{t('apercu')}</div>
            <p className={styles.metaTitle}>
              {category ? metaTitles[category.slug][language] : metaTitles.comparateur[language]}
            </p>
            <p className='text-sm'>
              {category ? metaDescriptions[category.slug][language] : metaDescriptions.comparateur[language]}
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default ShareUrl
