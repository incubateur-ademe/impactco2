import React, { Dispatch, SetStateAction, useState } from 'react'
import styled from 'styled-components'
import Modal3 from 'components/base/Modal3'
import IflConfigurator from 'components/modals/iflModal/IflConfigurator'

const getTitle = () => {
  return (
    <Title>
      Intégrer <GreenText>le simulateur</GreenText>
    </Title>
  )
}

export default function IFrameLivraisonModal({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
  const [theme, setTheme] = useState('default')

  return (
    <Modal3 setOpen={setOpen} getTitle={getTitle} dismiss={() => setOpen(false)} width='45rem'>
      <IflConfigurator theme={theme} setTheme={setTheme} />
    </Modal3>
  )
}

const Title = styled.h2`
  font-size: 22px;
  margin: 1rem 0;
`

const GreenText = styled.span`
  color: var(--primary-50);
`
