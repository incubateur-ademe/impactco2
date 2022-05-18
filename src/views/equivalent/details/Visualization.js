import React from 'react'
import styled from 'styled-components'

import Section from 'components/base/Section'
import Boeuf from './visualization/Boeuf'
import BoeufTemp from './visualization/BoeufTemp'
import Smartphone from './visualization/Smartphone'
import Eau from './visualization/Eau'
import Voiture from './visualization/Voiture'

const visualizations = {
  20689: <Boeuf />,
  20683: <Boeuf />,
  20684: <BoeufTemp />,
  20685: <BoeufTemp />,
  20686: <BoeufTemp />,
  20688: <Boeuf />,
  24283: <Eau />,
  31000: <Eau />,
  31001: <Eau />,
  31002: <Eau />,
  31003: <Eau />,
  31004: <Eau />,
  27012: <Smartphone />,
  27977: <Voiture />,
  27976: <Voiture />,
  27978: <Voiture />,
  27979: <Voiture />,
  206589: <Voiture />,
  28081: <Voiture />,
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
