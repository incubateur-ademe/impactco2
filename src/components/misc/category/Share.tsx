import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share'
import { Category } from 'types/category'
import { track } from 'utils/matomo'
import { buildCurrentUrlFor } from 'utils/urls'
import ClipboardBox from 'components/base/ClipboardBox'
import { Icon } from 'components/osezchanger/icons'
import CustomParam from './CustomParam'
import { Buttons, Meta } from './Share.styles'

const Share = ({ category, params }: { category: Category; params?: Record<string, string> }) => {
  const [customValues, setCustomValues] = useState<Record<string, { value: string; visible: boolean }> | null>(null)

  useEffect(() => {
    if (params) {
      const values: Record<string, { value: string; visible: boolean }> = {}
      Object.entries(params).forEach(([key, value]) => {
        values[key] = {
          value,
          visible: customValues && customValues[key] ? customValues[key].visible : false,
        }
      })
      setCustomValues(values)
    }
  }, [params, setCustomValues])

  const url = buildCurrentUrlFor(
    `${category.slug}${
      customValues
        ? `?${Object.entries(customValues)
            .filter(([, { visible }]) => visible)
            .map(([key, { value }]) => `${key}=${value}`)
            .join('&')}`
        : ''
    }`
  )
  return (
    <>
      {customValues &&
        Object.entries(customValues).map(([key, { value, visible }]) => (
          <CustomParam
            key={key}
            slug={key}
            value={value}
            visible={visible}
            setValue={(newValue) =>
              setCustomValues({
                ...customValues,
                [key]: {
                  value: newValue,
                  visible: customValues[key].visible,
                },
              })
            }
            setVisible={(newVisibility) =>
              setCustomValues({
                ...customValues,
                [key]: {
                  visible: newVisibility,
                  value: customValues[key].value,
                },
              })
            }
          />
        ))}
      <ClipboardBox>{url}</ClipboardBox>
      <Meta>
        <Image src={`/meta/${category.slug}.png`} width={728} height={382.2} alt='' />
        <p>
          <b>{category.meta.title}</b>
        </p>
        <p className='text-sm'>{category.meta.description}</p>
      </Meta>
      <Buttons>
        <FacebookShareButton
          url={url}
          title='Partager sur facebook'
          onClick={() => track(category.name, 'Share Facebook', `${category.slug}_facebook`)}>
          <Icon iconId='facebook' />
        </FacebookShareButton>
        <TwitterShareButton
          url={url}
          title='Partager sur twitter'
          onClick={() => track(category.name, 'Share Twitter', `${category.slug}_twitter`)}>
          <Icon iconId='twitter' />
        </TwitterShareButton>
        <WhatsappShareButton
          url={url}
          title='Partager sur whatsapp'
          onClick={() => track(category.name, 'Share Whatsapp', `${category.slug}_whatsapp`)}>
          <Icon iconId='whatsapp' />
        </WhatsappShareButton>
        <LinkedinShareButton
          url={url}
          title='Partager sur linkedin'
          onClick={() => track(category.name, 'Share Linkedin', `${category.slug}_linkedin`)}>
          <Icon iconId='linkedin' />
        </LinkedinShareButton>
      </Buttons>
    </>
  )
}

export default Share
