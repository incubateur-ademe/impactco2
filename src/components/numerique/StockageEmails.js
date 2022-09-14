import React, { useState, useContext, useMemo } from 'react'
import styled from 'styled-components'

import { formatNumber, formatTotal } from 'utils/formatters'
import DataContext from 'components/providers/DataProvider'
import TextInput from 'components/base/TextInput'
import Tile from 'components/misc/tiles/Tile'
import ButtonLink from 'components/base/ButtonLink'

export const Title = styled.h3`
  font-weight: normal;
  text-align: center;
  margin-bottom: 1.5rem;
`
const Tiles = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  filter: blur(${(props) => (props.blur ? '1rem' : 0)});
  transition: filter 500ms ease-out;

  ${(props) => props.theme.mq.medium} {
    gap: 0.75rem;
  }
`
const StyledTextInput = styled(TextInput)`
  display: inline-block;
  width: ${(props) => (props.mode === 'emails' ? 6 : 4.5)}rem;
  margin: 0 0.5rem 1rem;
  font-size: 1.125rem;

  input {
    text-align: right;
  }
`
const Text = styled.p`
  text-align: center;
  filter: blur(${(props) => (props.blur ? '1rem' : 0)});
  transition: filter 500ms ease-out;
`
const StyledButtonLink = styled(ButtonLink)`
  font-size: 0.75rem;
`
export default function StockageEmails() {
  const { equivalents } = useContext(DataContext)
  const equivalentsToShow = useMemo(
    () =>
      equivalents.filter((equivalent) =>
        ['voiturethermique', 'biere', 'repasavecduboeuf'].includes(
          equivalent.slug
        )
      ),
    [equivalents]
  )
  const emailWeight = useMemo(
    () =>
      equivalents.find((equivalent) =>
        ['stockageemail'].includes(equivalent.slug)
      ),
    [equivalents]
  )
  const gigabyteWeight = useMemo(
    () =>
      equivalents.find((equivalent) =>
        ['stockagedonnée'].includes(equivalent.slug)
      ),
    [equivalents]
  )

  const [mode, setMode] = useState('emails')
  const [emails, setEmails] = useState(null)
  const [gigabytes, setGigabytes] = useState(null)

  const totalWeight = useMemo(
    () =>
      mode === 'emails'
        ? formatTotal(emailWeight) * emails
        : formatTotal(gigabyteWeight) * gigabytes,
    [emailWeight, gigabyteWeight, emails, gigabytes, mode]
  )
  return (
    <>
      <Title>Découvrez l'impact de votre boite mail sur le climat</Title>
      <Text>
        J'ai
        {mode === 'emails' ? (
          <StyledTextInput
            key='1'
            mode={mode}
            type='number'
            value={emails}
            onChange={({ value }) => setEmails(value)}
            placeholder='10000'
          />
        ) : (
          <StyledTextInput
            key='2'
            mode={mode}
            type='number'
            value={gigabytes}
            onChange={({ value }) => setGigabytes(value)}
            placeholder='5'
          />
        )}
        {mode === 'weight' ? `Go d'` : ''}emails stockés.{' '}
        <StyledButtonLink
          onClick={() =>
            setMode((prevMode) => (prevMode === 'weight' ? 'emails' : 'weight'))
          }
        >
          (Entrer le{' '}
          {mode === 'emails' ? <>poids en Go</> : <>nombre d'emails</>} plutôt)
        </StyledButtonLink>
      </Text>
      <Text blur={!totalWeight}>
        Ma boite mail émet{' '}
        <strong>
          {formatNumber(totalWeight)} kg CO<sub>2</sub>e sur 10 ans
        </strong>
        , soit l'équivalent de...
      </Text>
      <Tiles blur={!totalWeight}>
        {equivalentsToShow.map((equivalent) => (
          <Tile
            key={equivalent.slug}
            equivalent={equivalent}
            weight={totalWeight}
            background={true}
            equivalentPage={true}
            reference
          />
        ))}
      </Tiles>
    </>
  )
}
