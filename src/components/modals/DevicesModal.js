import React, { useContext } from 'react'
import styled from 'styled-components'
import ModalContext from 'components/providers/ModalProvider'
import MagicLink from 'components/base/MagicLink'
import Modal from 'components/base/Modal'

const Title = styled.h2``
const Text = styled.p``
export default function DevicesModal() {
  const { devices: open, setDevices: setOpen } = useContext(ModalContext)
  return (
    <Modal open={open} setOpen={setOpen}>
      <Title>Moyenne des terminaux</Title>
      <Text>Nous utilisons pour la valeur par défaut un agrégat de terminaux spécifique à chaque usage :</Text>
      <Text>
        <strong>Emails :</strong>
        <br />
        Ordinateur fixe + écran : 24 %
        <br />
        Ordinateur portable : 24 %
        <br /> Tablette : 8 %
        <br />
        Smartphone : 45 %
        <br />
      </Text>
      <Text>
        <strong>Recherche web :</strong>
        <br />
        Ordinateur fixe + écran : 24 %
        <br />
        Ordinateur portable : 24 %
        <br /> Tablette : 8 %
        <br />
        Smartphone : 45 %
        <br />
      </Text>
      <Text>
        <strong>Visioconférence :</strong>
        <br />
        Ordinateur fixe + écran : 0 %
        <br />
        Ordinateur portable : 100 %
        <br /> Tablette : 0 %
        <br />
        Smartphone : 0 %
        <br />
      </Text>
      <Text>
        <strong>Streaming vidéo :</strong>
        <br />
        Ordinateur fixe + écran : 0 %
        <br />
        Ordinateur portable : 15%
        <br /> Tablette : 10 %
        <br />
        Smartphone : 5 %
        <br />
        Télévision : 70 %
        <br />
      </Text>
      <Text>
        Ces chiffres sont basés sur ces deux études :<br />-{' '}
        <MagicLink to='https://www.arcep.fr/uploads/tx_gspublication/rapport-barometre-numerique-edition-2021.pdf'>
          rapport-barometre-numerique-edition-2021.pdf
        </MagicLink>
        <br />-{' '}
        <MagicLink to='https://www.carbonbrief.org/factcheck-what-is-the-carbon-footprint-of-streaming-video-on-netflix/'>
          factcheck-what-is-the-carbon-footprint-of-streaming-video-on-netflix
        </MagicLink>
      </Text>
    </Modal>
  )
}
