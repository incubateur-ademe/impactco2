'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share'
import { Category } from 'types/category'
import { track } from 'utils/matomo'
import { buildCurrentUrlFor } from 'utils/urls'
import useParamContext from 'components/providers/ParamProvider'
import ClipboardBox from 'components/base/ClipboardBox'
import FacebookIcon from 'components/osezchanger/icons/facebook'
import LinkedinIcon from 'components/osezchanger/icons/linkedin'
import TwitterIcon from 'components/osezchanger/icons/twitter'
import WhatsappIcon from 'components/osezchanger/icons/whatsapp'
import CustomParams from './CustomParams'
import { getCustomParams } from './CustomParamsValues'
import styles from './Share.module.css'
import { buildCustomParamsUrl } from './customParamsUrl'

const Share = ({ category, path, tracking }: { category?: Category; path?: string; tracking?: string }) => {
  const allParams = useParamContext()
  const [visibility, setVisibility] = useState<Record<string, boolean> | null>(null)

  const params = useMemo(() => (category ? getCustomParams(category.slug, allParams) : {}), [allParams, category])

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
          url={url}
          title='Partager sur facebook'
          aria-label='Partager sur facebook'
          onClick={() => track(trackingValue, 'Share Facebook', `${trackingSlug}_facebook`)}>
          <FacebookIcon />
        </FacebookShareButton>
        <TwitterShareButton
          url={url}
          title='Partager sur twitter'
          aria-label='Partager sur twitter'
          onClick={() => track(trackingValue, 'Share Twitter', `${trackingSlug}_twitter`)}>
          <TwitterIcon />
        </TwitterShareButton>
        <WhatsappShareButton
          url={url}
          title='Partager sur whatsapp'
          aria-label='Partager sur whatsapp'
          onClick={() => track(trackingValue, 'Share Whatsapp', `${trackingSlug}_whatsapp`)}>
          <WhatsappIcon />
        </WhatsappShareButton>
        <LinkedinShareButton
          url={url}
          title='Partager sur linkedin'
          aria-label='Partager sur linkedin'
          onClick={() => track(trackingValue, 'Share Linkedin', `${trackingSlug}_linkedin`)}>
          <LinkedinIcon />
        </LinkedinShareButton>
      </div>
      {(category || path === 'comparateur') && (
        <div className={styles.meta}>
          <img
            src={
              category
                ? `/meta/${category.slug}.png`
                : `${process.env.NEXT_PUBLIC_IMAGE_URL}/api/dynamics/${path}?${buildCustomParamsUrl(params, visibility)}`
            }
            width={728}
            height={382.2}
            alt=''
          />
          <div>
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
