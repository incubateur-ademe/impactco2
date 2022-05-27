import React, { useState, useCallback, useRef } from 'react'
import styled from 'styled-components'
import { toPng } from 'html-to-image'

import Section from 'components/base/Section'
import Button from 'components/base/Button'
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
const DownloadButton = styled(Button)`
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  padding: 0.375rem 1rem;
`
const Svg = styled.svg`
  display: block;
  width: 1.125rem;
  height: auto;
`
export default function Visualization(props) {
  const ref = useRef(null)

  const [screenshot, setScreenshot] = useState(false)
  console.log(screenshot)
  return visualizations[props.equivalent.slug] ? (
    <Section>
      <Section.Content>
        <Wrapper ref={ref}>
          {visualizations[props.equivalent.slug]}
          <DownloadButton
            small
            hollow
            onClick={() => {
              setScreenshot(true)
              setTimeout(() => {
                if (ref.current === null) {
                  return
                }
                toPng(ref.current, {
                  cacheBust: true,
                  filter: (node) =>
                    !node.classList
                      ? true
                      : !node.classList[0]?.includes('Button'),
                })
                  .then((dataUrl) => {
                    const link = document.createElement('a')
                    link.download = `${props.equivalent.slug}.png`
                    link.href = dataUrl
                    link.click()

                    setScreenshot(false)
                  })
                  .catch((err) => {
                    console.log(err)
                  })
              }, 20)
            }}
          >
            <Svg
              height='512'
              viewBox='0 0 512 512'
              width='512'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='m512 480c0 17.673-14.327 32-32 32h-448c-17.673 0-32-14.327-32-32s14.327-32 32-32h448c17.673 0 32 14.327 32 32zm-278.627-101.372c6.249 6.249 14.437 9.373 22.627 9.373 8.188 0 16.38-3.125 22.627-9.373l113.378-113.377c12.497-12.497 12.497-32.758 0-45.255s-32.758-12.497-45.255 0l-58.75 58.75v-246.746c0-17.673-14.327-32-32-32s-32 14.327-32 32v246.746l-58.75-58.75c-12.497-12.497-32.758-12.497-45.255 0s-12.497 32.758 0 45.255z' />
            </Svg>
            Télécharger
          </DownloadButton>
          {screenshot && <Signature />}
        </Wrapper>
      </Section.Content>
    </Section>
  ) : null
}
