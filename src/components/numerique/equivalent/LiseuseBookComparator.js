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
  font-size: 1.125rem;
  margin-bottom: 0;
  text-align: center;

  ${(props) => props.theme.mq.small} {
    font-size: 1rem;
  }
`
const Result = styled.p`
  font-size: 1.125rem;
  margin: 0 auto 2.5rem;
  text-align: center;

  ${(props) => props.theme.mq.small} {
    font-size: 1rem;
  }

  strong {
    display: block;
    font-size: 1.5rem;
    margin: 0.25rem auto;

    ${(props) => props.theme.mq.small} {
      font-size: 1.125rem;
    }
  }
`
const RangeWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 2.5rem;
  margin: 0.5rem auto;
  max-width: 100%;
  width: 30rem;
`
const Track = styled.div`
  flex: 1;
  height: 0.125rem;
  margin: 0 3.75rem;
  position: relative;

  &:before {
    background-color: ${(props) => props.theme.colors.mainLight};
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
  background-color: ${(props) => props.theme.colors.main};
  border-radius: 1.5rem;
  color: ${(props) => props.theme.colors.background};
  display: flex;
  font-size: 1.25rem;
  font-weight: 700;
  height: 2.5rem;
  justify-content: flex-end;
  padding: 0 1rem;
  text-align: center;
  width: 7.5rem;

  &:focus {
    box-shadow: 0 0 0 0.125rem ${(props) => props.theme.colors.mainLight};
    outline: none;
  }

  ${(props) => props.theme.mq.small} {
    font-size: 1rem;
    width: 6.5rem;
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
