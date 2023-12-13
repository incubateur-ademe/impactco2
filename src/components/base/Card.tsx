import Image from 'next/image'
import React from 'react'
import { Icon } from 'components/osezchanger/icons'
import { Container, Content, ImageContainer, LeftSide, LinkText } from './Card.styles'

const Card = ({
  href,
  title,
  description,
  link,
  image,
}: {
  href: string
  title: string
  description: string
  link: string
  image: string
}) => {
  return (
    <Container href={href}>
      <LeftSide>
        <ImageContainer>
          <Image src={image} width={42} height={42} alt='' />
        </ImageContainer>
      </LeftSide>
      <Content>
        <p className='text-xl'>
          <b>{title}</b>
        </p>
        <p> {description}</p>
        <LinkText>
          {link}
          <Icon iconId='full-arrow-right' />
        </LinkText>
      </Content>
    </Container>
  )
}

export default Card
