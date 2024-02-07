import React, { ReactNode } from 'react'
import { Container, Description } from './PageTitle.styles'

const PageTitle = ({ title, description }: { title: ReactNode; description?: ReactNode }) => {
  return (
    <Container>
      <h1>{title}</h1>
      {description && <Description className='text-xl'>{description}</Description>}
    </Container>
  )
}

export default PageTitle
