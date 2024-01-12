import React from 'react'
import styled from 'styled-components'
import { track } from 'utils/matomo'
import Link from 'components/base/buttons/Link'
import { Sources } from './category/CategoryWrapper.styles'

const UpdatedAt = styled.span`
  color: #564d53;
`
export default function SourceAgribalyse({ tracking }: { tracking: string }) {
  return (
    <Sources>
      <span> Source : </span>
      <Link
        href='https://agribalyse.ademe.fr/app'
        data-testid='lien-agribalyse'
        priority='secondary'
        onClick={() => track(tracking, 'Source', 'https://agribalyse.ademe.fr/app')}>
        Agribalyse 3.1.1
      </Link>
      <span> - </span>
      <UpdatedAt>Mise à jour le 10/08/2023 </UpdatedAt>
    </Sources>
  )
}
