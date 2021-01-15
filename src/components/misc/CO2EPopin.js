import React, { useContext } from 'react'
import styled from 'styled-components'

import CO2NumberContext from 'utils/CO2NumberContext'

import Popin from 'components/base/Popin'

const Title = styled.h2``
const Text = styled.p``
export default function CO2EPopin(props) {
  const { CO2EPopin, setCO2EPopin } = useContext(CO2NumberContext)

  return (
    <Popin open={CO2EPopin} setOpen={setCO2EPopin}>
      <Title>
        L'équivalent CO2 ou CO2 équivalent (CO2<sub>e</sub>)
      </Title>
      <Text>
        Les différents GES anthropiques ont un impact plus ou moins important
        sur le climat. Afin d’être comparés, les émissions des différents GES
        peuvent être exprimés en CO2<sub>e</sub> (équivalent CO2). Pour cela, le
        PRG (potentiel de réchauffement global) à 100 ans est l'indicateur
        classique retenu dans la plupart des rapports et traités internationaux.
        Par exemple, 1 kg de méthane (CH4) réchauffera autant l’atmosphère que
        28 à 30 kg de CO2 au cours du siècle qui suit leur émission.
      </Text>
    </Popin>
  )
}
