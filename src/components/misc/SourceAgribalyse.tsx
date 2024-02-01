import React from 'react'
import styled from 'styled-components'
import styles from './SourceAgribalyse.module.css'
import Sources from './category/Sources'

const UpdatedAt = styled.span`
  color: #564d53;
`
export default function SourceAgribalyse({ tracking }: { tracking: string }) {
  return (
    <div className={styles.agribalyse}>
      <Sources
        tracking={tracking}
        priority='secondary'
        sources={[{ label: 'Agribalyse 3.1.1', href: 'https://agribalyse.ademe.fr/app' }]}
      />
      <span> - </span>
      <UpdatedAt>Mise à jour le 10/08/2023 </UpdatedAt>
    </div>
  )
}
