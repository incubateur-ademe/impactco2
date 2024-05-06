'use client'

import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share'
import useParamContext from 'src/providers/ParamProvider'
import { Category } from 'types/category'
import { track } from 'utils/matomo'
import { buildCurrentUrlFor } from 'utils/urls'
import ClipboardBox from 'components/base/ClipboardBox'
import buttonStyles from 'components/base/buttons/Button.module.css'
import FacebookIcon from 'components/base/icons/facebook'
import LinkedinIcon from 'components/base/icons/linkedin'
import TwitterIcon from 'components/base/icons/twitter'
import WhatsappIcon from 'components/base/icons/whatsapp'
import CustomParams from './CustomParams'
import { getComparateurParams, getCustomParams } from './CustomParamsValues'
import styles from './Share.module.css'
import { buildCustomParamsUrl } from './customParamsUrl'

const Share = ({
  category,
  path,
  tracking,
}: {
  category?: Pick<Category, 'slug' | 'name' | 'meta'>
  path?: string
  tracking?: string
}) => {
  const allParams = useParamContext()
  const [visibility, setVisibility] = useState<Record<string, boolean> | null>(null)

  const params = useMemo(
    () =>
      category
        ? getCustomParams(category.slug, allParams)
        : path === 'comparateur'
          ? getComparateurParams(allParams)
          : {},
    [allParams, category]
  )

  useEffect(() => {
    if (params) {
      const values: Record<string, boolean> = {}
      Object.keys(params).forEach((key) => {
        values[key] = visibility ? visibility[key] : true
      })
      setVisibility(values)
    }
  }, [params, setVisibility])

  const url = buildCurrentUrlFor(`${path || category?.slug}?${buildCustomParamsUrl(params, visibility)}`).replace(
    /\?$/,
    ''
  )
  const trackingValue = (category ? category.name : tracking) || 'UNKNOWN'
  const trackingSlug = trackingValue.replace(/ /g, '_').toLowerCase()

  return (
    <>
      {params && visibility && (
        <CustomParams
          tracking={trackingValue}
          trackingType='Partager'
          params={params}
          visibility={visibility}
          setVisibility={setVisibility}
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
      {(category || path === 'comparateur') && (
        <div className={styles.meta}>
          <Image
            src={
              category
                ? `/meta/${category.slug}.png`
                : `${process.env.NEXT_PUBLIC_IMAGE_URL}/api/dynamics/${path}?${buildCustomParamsUrl(params, visibility)}`
            }
            width={728}
            height={382.2}
            alt=''
          />
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

export default Share
