import React, { useMemo, useRef, useState } from 'react'
import { Range } from 'react-range'
import styled from 'styled-components'
import { computeECV } from 'utils/computeECV'
import { track } from 'utils/matomo'
import { MEDIA } from 'utils/styles'
import useDataContext from 'components/providers/DataProvider'
import useModalContext from 'components/providers/ModalProvider'
import Button from 'components/base/buttons/Button'
import Link from 'components/base/buttons/Link'
import { Title } from 'components/visualizations/Visualization.styles'

const Question = styled.div`
  margin-bottom: 1rem;
`

const Text = styled.p`
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
  text-align: center;

  ${MEDIA.LT.SMALL} {
    font-size: 1rem;
  }
`

const Result = styled.p`
  font-size: 1.125rem;
  text-align: center;

  ${MEDIA.LT.SMALL} {
    font-size: 1rem;
  }

  strong {
    display: block;
    font-size: 1.5rem;

    ${MEDIA.LT.SMALL} {
      font-size: 1.125rem;
    }
  }
`

const RangeWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 2.5rem;
  margin: auto;
  max-width: 100%;
  width: 30rem;
`

const Track = styled.div`
  flex: 1;
  height: 0.125rem;
  margin: 0 3.75rem;
  position: relative;

  &:before {
    background-color: var(--primary-10);
    bottom: 0;
    content: '';
    left: -2.75rem;
    position: absolute;
    right: -2.75rem;
    top: 0;
  }
`

const Thumb = styled.div`
  align-items: center;
  background-color: var(--primary-50);
  border-radius: 1.5rem;
  color: var(--neutral-00);
  display: flex;
  font-size: 1.25rem;
  font-weight: 700;
  height: 2.5rem;
  justify-content: flex-end;
  padding: 0 1rem;
  text-align: center;
  width: 7.5rem;

  &:focus {
    box-shadow: 0 0 0 0.125rem var(--primary-10);
    outline: none;
  }

  ${MEDIA.LT.SMALL} {
    font-size: 1rem;
    width: 6.5rem;
  }
`

const LIVRE_ECV = 1.1
export default function LiseuseBookComparator() {
  const { setCo2e } = useModalContext()

  const { equivalents } = useDataContext()
  const liseuse = useMemo(() => equivalents.find((equivalent) => ['liseuse'].includes(equivalent.slug)), [equivalents])
  const [numBookPerYear, setNumBookPerYear] = useState(10)
  const tracked = useRef(false)

  return (
    <>
      <Title>
        Livres papier ou liseuse ?<br />
        Comparez leur impact sur le climat !
      </Title>
      <Question>
        <Text>Je lis en moyenne</Text>
        <RangeWrapper onMouseDown={(e) => e.stopPropagation()} onTouchStart={(e) => e.stopPropagation()}>
          <Range
            step={1}
            min={0}
            max={50}
            values={[numBookPerYear]}
            onChange={(values) => {
              if (!tracked.current) {
                tracked.current = true
                track('Liseuse', 'Slider', 'slider-liseuse')
              }
              setNumBookPerYear(values[0])
            }}
            renderTrack={({ props, children }) => <Track {...props}>{children}</Track>}
            renderThumb={({ props }) => (
              <Thumb {...props} aria-label='Nombre de livres'>
                {numBookPerYear} livre{numBookPerYear > 1 ? 's' : ''}
              </Thumb>
            )}
          />
        </RangeWrapper>
        <Text>par an</Text>
      </Question>
      <div>
        {numBookPerYear ? (
          <Result>
            Il faudrait que j'utilise ma liseuse pendant au moins{' '}
            <strong>
              {Math.ceil(computeECV(liseuse) / (LIVRE_ECV * numBookPerYear))} an
              {Math.ceil(computeECV(liseuse) / (LIVRE_ECV * numBookPerYear)) > 1 ? 's' : ''}
              <br />
            </strong>{' '}
            avant qu'elle émette moins de{' '}
            <Button asLink onClick={() => setCo2e(true)}>
              CO<sub>2</sub>e
            </Button>{' '}
            que l'équivalent en livres papier.
          </Result>
        ) : (
          <Result>
            Vous ne devriez probablement pas acheter de liseuse.
            <br />
            Si vous en possédez déjà une, vous pouvez lui donner une seconde vie. Découvrez comment avec notre site{' '}
            <Link href='https://longuevieauxobjets.gouv.fr/'>Longue Vie Aux Objets</Link>
          </Result>
        )}
      </div>
    </>
  )
}
