import React from 'react'
import styled from 'styled-components'

import Section from 'components/base/Section'
import Boeuf from './visualization/Boeuf'
import BoeufTemp from './visualization/BoeufTemp'
import Smartphone from './visualization/Smartphone'
import Eau from './visualization/Eau'
import Voiture from './visualization/Voiture'

const visualizations = {
  repasavecduboeuf: <Boeuf />,
  repasvegetarien: <Boeuf />,
  repasvegetalien: <BoeufTemp />,
  repasavecdupoissonblanc: <BoeufTemp />,
  repasavecdupoissongras: <BoeufTemp />,
  repasavecdupoulet: <Boeuf />,
  eaudurobinet: <Eau />,
  eauenbouteille: <Eau />,
  soda: <Eau />,
  biere: <Eau />,
  vin: <Eau />,
  lait: <Eau />,
  smartphone: <Smartphone />,
  metro: <Voiture />,
  voiturethermique: <Voiture />,
  voitureelectrique: <Voiture />,
  bus: <Voiture />,
  tgv: <Voiture />,
  avion: <Voiture />,
}
const Wrapper = styled.div`
  margin-bottom: 4rem;
  padding: 1.5rem;
  background-color: ${(props) => props.theme.colors.second};
  border-radius: 1rem;
`
export default function Visualization(props) {
  return visualizations[props.equivalent.slug] ? (
    <Section>
      <Section.Content>
        <Wrapper>{visualizations[props.equivalent.slug]}</Wrapper>
      </Section.Content>
    </Section>
  ) : null
}
