import React, { useContext, useMemo, useState } from 'react'
import styled from 'styled-components'
import { computeECV } from 'utils/computeECV'
import formatNumber from 'utils/formatNumber'
import DataContext from 'components/providers/DataProvider'
import Button from 'components/base/buttons/Button'
import Link from 'components/base/buttons/Link'
import Tile from 'components/misc/tiles/Tile'

const emailWeight = 0.0001 //ko

export const Title = styled.h3`
  font-weight: normal;
  margin-bottom: 1.5rem;
  text-align: center;
`
const TilesWrapper = styled.div`
  position: relative;
`
const Tiles = styled.div`
  display: flex;
  filter: blur(${(props) => (props.blur ? '1rem' : 0)});
  gap: 1.5rem;
  margin-bottom: 2.5rem;

  ${(props) => props.theme.mq.medium} {
    gap: 0.75rem;
  }
`
const ButtonResults = styled(Button)`
  font-size: 1.25rem;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -100%);
`
const Input = styled.input`
  background-color: transparent;
  border: 0.125rem solid ${(props) => props.theme.colors.main};
  border-radius: 0.75rem;
  color: ${(props) => props.theme.colors.text};
  font-size: 1.125rem;
  margin: 0 0.5rem 1rem;
  padding: 0.5rem;
  text-align: right;
  width: ${(props) => (props.mode === 'emails' ? 6 : 4.5)}rem;

  &:focus {
    box-shadow: 0 -0 0px 1px ${(props) => props.theme.colors.main};
    outline: none;
  }
`
const Text = styled.p`
  filter: blur(${(props) => (props.blur ? '1rem' : 0)});
  text-align: center;
`
const StyledButtonLink = styled(Button)`
  font-size: 0.75rem;
`
const More = styled.div`
  margin: 1rem auto 2rem;
`
export default function StockageEmails() {
  const [displayMore, setDisplayMore] = useState(false)

  const [displayResults, setDisplayResults] = useState(false)

  const { equivalents } = useContext(DataContext)
  const equivalentsToShow = useMemo(
    () =>
      equivalents.filter((equivalent) =>
        ['voiturethermique', 'repasavecduboeuf', 'cigarette'].includes(equivalent.slug)
      ),
    [equivalents]
  )
  const gigabyte = useMemo(
    () => equivalents.find((equivalent) => ['stockagedonnee'].includes(equivalent.slug)),
    [equivalents]
  )

  const [mode, setMode] = useState('emails')
  const [weight, setWeight] = useState(2)

  const totalWeight = useMemo(() => computeECV(gigabyte) * weight, [weight, gigabyte])
  return (
    <>
      <Title>Découvrez l'impact de votre boite mail sur le climat</Title>
      <Text>
        J'ai
        {mode === 'emails' ? (
          <Input
            key='1'
            mode={mode}
            type='number'
            value={weight / emailWeight}
            onChange={(e) => {
              setWeight(e.currentTarget.value * emailWeight)
              setDisplayResults(true)
            }}
            placeholder='XXXX'
          />
        ) : (
          <Input
            key='2'
            mode={mode}
            type='number'
            value={weight}
            onChange={(e) => {
              setWeight(e.currentTarget.value)
              setDisplayResults(true)
            }}
            placeholder='XX'
          />
        )}
        {mode === 'weight' ? `Go d'` : ''}emails stockés.{' '}
        <StyledButtonLink asLink onClick={() => setMode((prevMode) => (prevMode === 'weight' ? 'emails' : 'weight'))}>
          (Entrer le {mode === 'emails' ? <>poids en Go</> : <>nombre d'emails</>} plutôt)
        </StyledButtonLink>
      </Text>
      <Text blur={!displayResults}>
        Ma boite mail émet{' '}
        <strong>
          {formatNumber(totalWeight)} kg CO<sub>2</sub>e par an
        </strong>
        , soit l'équivalent de...
      </Text>
      <TilesWrapper>
        <Tiles blur={!displayResults}>
          {equivalentsToShow.map((equivalent) => (
            <Tile
              key={equivalent.slug}
              equivalent={equivalent}
              weight={totalWeight}
              background
              equivalentPage
              reference
            />
          ))}
        </Tiles>
        {!displayResults && <ButtonResults onClick={() => setDisplayResults(true)}>Découvrir l'impact</ButtonResults>}
      </TilesWrapper>
      <StyledButtonLink className='noscreenshot' onClick={() => setDisplayMore((prevDisplayMore) => !prevDisplayMore)}>
        En savoir plus
      </StyledButtonLink>
      {displayMore && (
        <More>
          Nous prenons comme hypothèse un poids moyen de 100ko par email.
          <br />
          Est compté seulement le stockage des emails dans les data-centers (et la fabrication des data-centers
          associée), via ce <Link href='/usagenumerique/stockagedonnee'>facteur d'émission</Link> (0,24 g CO
          <sub>2</sub>e / Go / année).
        </More>
      )}
    </>
  )
}
