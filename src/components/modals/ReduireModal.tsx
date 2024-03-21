import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { MEDIA } from 'utils/styles'
import { buildCurrentUrlFor } from 'utils/urls'
import ClipboardBox from 'components/base/ClipboardBox'
import Modal3 from 'components/base/Modal3'
import ReuseBulb from 'components/livraison/ReuseBulb'
import Facebook2 from './shareModal/Facebook2'
import Linkedin2 from './shareModal/Linkedin2'
import Twitter2 from './shareModal/Twitter2'
import Whatsapp2 from './shareModal/Whatsapp2'

const href = buildCurrentUrlFor('/livraison#ressource')

const getTitle = () => {
  return (
    <Title>
      Partager <GreenText>la ressource</GreenText>
    </Title>
  )
}

export default function ReduireModal({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
  return (
    <Modal3 setOpen={setOpen} getTitle={getTitle} dismiss={() => setOpen(false)} width='45rem'>
      <br />
      <ClipboardBox tracking='Livraison'>{href}</ClipboardBox>
      <br />
      <Alternative>- ou -</Alternative>
      <WrapperSocial>
        <Facebook2
          className='item1'
          quote={'Découvrez l’impact carbone de la livraison d’un colis grâce au simulateur d’#impactCO2'}
          url={href}
        />
        <Twitter2
          title={'Découvrez l’impact carbone de la livraison d’un colis grâce au simulateur d’#impactCO2'}
          url={href}
        />
        <Whatsapp2
          title={'Découvrez l’impact carbone de la livraison d’un colis grâce au simulateur d’#impactCO2'}
          url={href}
        />
        <Linkedin2 url={href} />
      </WrapperSocial>
      <br />
      <ReuseBulb />
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

const WrapperSocial = styled.div`
  align-items: center;
  display: flex;
  ${MEDIA.LT.SMALL} {
    flex-direction: column;
  }
  flex-wrap: wrap;
  justify-content: center;
  button + button {
    margin-left: 1rem;
    ${MEDIA.LT.SMALL} {
      margin-left: 0rem;
    }
  }
`

const Alternative = styled.div`
  color: #746770;
  margin-bottom: 1rem;
  text-align: center;
  text-transform: uppercase;
`
