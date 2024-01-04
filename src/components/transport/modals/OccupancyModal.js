import React, { useContext } from 'react'
import styled from 'styled-components'
import Modal from 'components/base/Modal'
import Link from 'components/base/buttons/Link'
import TransportContext from '../TransportProvider'

const Title = styled.h2``
const Text = styled.p``
export default function Occupancy() {
  const { occupancyModal: open, setOccupancyModal: setOpen } = useContext(TransportContext)
  return (
    <Modal open={open} setOpen={setOpen}>
      <Title>Taux de remplissage des véhicules</Title>
      <Text>
        L&apos;impact de chaque véhicule est donné &quot;par personne&quot;, et non pas pour l&apos;ensemble du
        véhicule.
      </Text>
      <Text>
        Les taux de remplissage utilisés dans Mon Impact Transport sont ceux retenus dans la{' '}
        <Link href='https://bilans-ges.ademe.fr/documentation/UPLOAD_DOC_FR/index.htm?transport_de_personnes.htm'>
          Base Carbone de l&apos;ADEME
        </Link>
        , sauf pour les voitures (thermiques et électriques) pour lesquelles nous ne comptons qu&apos;une seule personne
        dans le véhicule. Il est possible de moduler le nombre de personnes par voiture avec l&apos;option
        &quot;Afficher le covoiturage&quot;.
      </Text>
    </Modal>
  )
}
