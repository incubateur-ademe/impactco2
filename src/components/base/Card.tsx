import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { track } from 'utils/matomo'
import { Icon } from 'components/osezchanger/icons'
import { Container, Content, ImageContainer, LeftSide, LinkText } from './Card.styles'

const Card = ({
  href,
  title,
  description,
  link,
  image,
  small,
  onClick,
  color,
  tracking,
}: {
  href?: string
  title: string
  description?: string
  link?: string
  image: string
  small?: boolean
  onClick?: () => void
  color?: 'blue'
  tracking: string
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
          <Icon iconId='full-arrow-right' />
        ) : (
          <LinkText>
            {link}
            <Icon iconId='full-arrow-right' />
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
            track(tracking, 'Ressource', href)
          }}>
          {inside}
        </Link>
      ) : (
        <button
          onClick={() => {
            track(tracking, 'Ressource', title)
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
