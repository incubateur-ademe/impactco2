import React, { useState, useContext, useMemo } from 'react'
import styled from 'styled-components'
import { Range } from 'react-range'

import { formatTotal } from 'utils/formatters'
import DataContext from 'components/providers/DataProvider'
import ModalContext from 'components/providers/ModalProvider'
import { Title } from 'components/misc/Visualization'
import ButtonLink from 'components/base/ButtonLink'
import MagicLink from 'components/base/MagicLink'

const Wrapper = styled.div`
  height: 100%;
  margin: 0 0 2rem;
`
const Question = styled.div`
  margin-bottom: 2.5rem;
`
const Text = styled.p`
  margin-bottom: 0;
  font-size: 1.125rem;
  text-align: center;

  ${(props) => props.theme.mq.small} {
    font-size: 1rem;
  }
`
const Result = styled.p`
  margin: 0 auto 2.5rem;
  font-size: 1.125rem;
  text-align: center;

  ${(props) => props.theme.mq.small} {
    font-size: 1rem;
  }

  strong {
    display: block;
    margin: 0.25rem auto;
    font-size: 1.5rem;

    ${(props) => props.theme.mq.small} {
      font-size: 1.125rem;
    }
  }
`
const RangeWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 30rem;
  max-width: 100%;
  height: 2.5rem;
  margin: 0.5rem auto;
`
const Track = styled.div`
  position: relative;
  flex: 1;
  height: 0.125rem;
  margin: 0 3.75rem;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: -2.75rem;
    right: -2.75rem;
    background-color: ${(props) => props.theme.colors.mainLight};
  }
`
const Thumb = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 7.5rem;
  height: 2.5rem;
  padding: 0 1rem;
  font-size: 1.25rem;
  font-weight: 700;
  text-align: center;
  color: ${(props) => props.theme.colors.background};
  background-color: ${(props) => props.theme.colors.main};
  border-radius: 1.5rem;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.125rem ${(props) => props.theme.colors.mainLight};
  }

  ${(props) => props.theme.mq.small} {
    width: 6.5rem;
    font-size: 1rem;
  }
`
export default function LiseuseBookComparator() {
  const { setCo2e } = useContext(ModalContext)

  const { equivalents } = useContext(DataContext)
  const liseuse = useMemo(
    () =>
      equivalents.find((equivalent) => ['liseuse'].includes(equivalent.slug)),
    [equivalents]
  )
  const livre = useMemo(
    () =>
      equivalents.find((equivalent) =>
        ['livredepoche'].includes(equivalent.slug)
      ),
    [equivalents]
  )
  const [numBookPerYear, setNumBookPerYear] = useState(10)

  return (
    <Wrapper>
      <Title>
        Livres papier ou liseuse ?<br />
        Comparez leur impact sur le climat !
      </Title>
      <Question>
        <Text>Je lis en moyenne</Text>
        <RangeWrapper
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          <Range
            step={1}
            min={0}
            max={50}
            values={[numBookPerYear]}
            onChange={(values) => {
              setNumBookPerYear(values[0])
            }}
            renderTrack={({ props, children }) => (
              <Track {...props}>{children}</Track>
            )}
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
              {Math.ceil(
                formatTotal(liseuse) / (formatTotal(livre) * numBookPerYear)
              )}{' '}
              an
              {Math.ceil(
                formatTotal(liseuse) / (formatTotal(livre) * numBookPerYear)
              ) > 1
                ? 's'
                : ''}
              <br />
            </strong>{' '}
            avant qu'elle émette moins de{' '}
            <ButtonLink onClick={() => setCo2e(true)}>
              CO<sub>2</sub>e
            </ButtonLink>{' '}
            que l'équivalent en livres papier.
          </Result>
        ) : (
          <Result>
            Vous ne devriez probablement pas acheter de liseuse.
            <br />
            Si vous en possédez déjà une, vous pouvez lui donner une seconde
            vie. Découvrez comment avec notre site{' '}
            <MagicLink to='https://longuevieauxobjets.gouv.fr/'>
              Longue Vie Aux Objets
            </MagicLink>
          </Result>
        )}
      </div>
    </Wrapper>
  )
}
