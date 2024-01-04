import Image from 'next/image'
import React from 'react'
import { track } from 'utils/matomo'
import NewTabIcon from './NewTabIcon'
import { Content, FakeLink, LinkContainer, Text } from './Resource.styles'

const Resource = ({
  image,
  text,
  href,
  tracking,
  withLink,
  color,
}: {
  image: string
  text: string
  href: string
  tracking: string
  withLink?: string
  color?: 'secondary'
}) => {
  return (
    <LinkContainer
      $color={color}
      href={href}
      target='_blank'
      rel='noreferrer noopener'
      onClick={() => {
        track(tracking, `Ressource-${href}`, `${tracking.toLowerCase()}_ressource_${href}`)
      }}>
      <Image src={image} alt='' width={100} height={86} />
      <Content>
        <Text>{text}</Text>
        {withLink && (
          <FakeLink>
            <span className='text-sm'>{withLink}</span>
            <NewTabIcon />
          </FakeLink>
        )}
      </Content>
    </LinkContainer>
  )
}

export default Resource
