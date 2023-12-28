import React from 'react'
import styled from 'styled-components'
import { track } from 'utils/matomo'
import MagicLink from 'components/base/MagicLink'

const UpdatedAt = styled.span`
  color: #564d53;
`
export default function SourceAgribalyse({ tracking }: { tracking: string }) {
  return (
    <>
      <span> Source : </span>
      <MagicLink
        to='https://agribalyse.ademe.fr/app'
        data-testid='lien-agribalyse'
        color='secondary'
        onClick={() => track(tracking, 'Source', 'https://agribalyse.ademe.fr/app')}>
        Agribalyse 3.1.1
      </MagicLink>
      <span> - </span>
      <UpdatedAt>Mise à jour le 10/08/2023 </UpdatedAt>
    </>
  )
}
