import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { track } from 'utils/matomo'
import { Icon } from 'components/osezchanger/icons'
import { Arrow, Container, Content, ImageContainer, LeftSide, LinkText } from './Card.styles'

const Card = ({
  href,
  title,
  description,
  link,
  image,
  small,
  onClick,
  color,
  trackingCategory,
  trackingAction,
}: {
  href?: string
  title: string
  description?: string
  link?: string
  image: string
  small?: boolean
  onClick?: () => void
  color?: 'secondary'
  trackingCategory?: string
  trackingAction?: string
}) => {
  const inside = (
    <>
      <LeftSide $small={small} $color={color}>
        <ImageContainer $small={small}>
          <Image src={image} width={small ? 24 : 42} height={small ? 24 : 42} alt='' />
        </ImageContainer>
      </LeftSide>
      <Content $small={small}>
        <div>
          <p className={small ? '' : 'text-xl'}>
            <b>{title}</b>
          </p>
          <p>{description}</p>
        </div>
        {small ? (
          <Arrow>
            <Icon iconId='full-arrow-right' />
          </Arrow>
        ) : (
          <LinkText>
            {link}
            <Arrow>
              <Icon iconId='full-arrow-right' />
            </Arrow>
          </LinkText>
        )}
      </Content>
    </>
  )
  return (
    <Container $small={small} $color={color}>
      {href ? (
        <Link
          href={href}
          target='_blank'
          rel='noreferrer noopener'
          onClick={() => {
            if (trackingCategory && trackingAction) {
              track(trackingCategory, trackingAction, href)
            }
          }}>
          {inside}
        </Link>
      ) : (
        <button
          onClick={() => {
            if (trackingCategory && trackingAction) {
              track(trackingCategory, trackingAction, title)
            }
            if (onClick) {
              onClick()
            }
          }}>
          {inside}
        </button>
      )}
    </Container>
  )
}

export default Card
