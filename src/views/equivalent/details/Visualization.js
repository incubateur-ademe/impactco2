import React from 'react'
import styled from 'styled-components'

import useScreenshot from 'hooks/useScreenshot'
import Section from 'components/base/Section'
import DownloadButton from './visualization/DownloadButton'
import Boeuf from './visualization/Boeuf'
import BoeufTemp from './visualization/BoeufTemp'
import Smartphone from './visualization/Smartphone'
import Eau from './visualization/Eau'
import Voiture from './visualization/Voiture'
import Signature from './visualization/Signature'

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
  position: relative;
  margin-bottom: 4rem;
  padding: 1.5rem;
  background-color: ${(props) => props.theme.colors.second};
  border-radius: 1rem;
`
export default function Visualization(props) {
  const { ref, takeScreenshot, isScreenshotting } = useScreenshot(
    props.equivalent.slug
  )

  return visualizations[props.equivalent.slug] ? (
    <Section>
      <Section.Content>
        <Wrapper ref={ref}>
          {visualizations[props.equivalent.slug]}
          <DownloadButton onClick={takeScreenshot} />
          {isScreenshotting && <Signature />}
        </Wrapper>
      </Section.Content>
    </Section>
  ) : null
}
