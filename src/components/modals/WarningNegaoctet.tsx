import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import Modal2 from 'components/base/Modal2'
import Link from 'components/base/buttons/Link'

export default function WarningNegaoctet({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
  const getTitle = () => {
    return <Title>Source des données</Title>
  }

  return (
    <Modal2 open setOpen={setOpen} getTitle={getTitle}>
      <p>
        Les données et les calculs sont issues du projet&nbsp;
        <Link
          priority='secondary'
          href='https://base-empreinte.ademe.fr/documentation/base-impact'
          title='Base impact, étude réalisée par Negaoctet'>
          NégaOctet (lauréat de l'appel à projet PERFECTO 2018)
        </Link>
        .
      </p>
      <p>
        ⚠️ <strong>Attention</strong> : aujourd’hui pour calculer l’impact carbone de Stocker un Go de données, nous ne
        prenons pas en compte dans nos calculs <strong>l’impact carbone de la transmission</strong>.
      </p>
      <p>
        Ces calculs expliquent la différence de résultat entre l'impact carbone que l'on a sur le site&nbsp;
        <Link priority='secondary' href={process.env.NEXT_PUBLIC_URL || ''} title='site Internet impact CO₂'>
          impactco2.fr
        </Link>{' '}
        et les données NO partagées sur la base Empreinte de l'ADEME.
      </p>
      <p>Nous mettrons prochainement à jour ces calculs pour intégrer la transmission.</p>
    </Modal2>
  )
}

const Title = styled.h1`
  margin: 0;
`
