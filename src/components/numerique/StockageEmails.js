import React, { useState, useContext, useMemo } from 'react'
import styled from 'styled-components'

import { formatNumber, formatTotal } from 'utils/formatters'
import DataContext from 'components/providers/DataProvider'
import TextInput from 'components/base/TextInput'
import Tile from 'components/misc/tiles/Tile'

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
  width: 6rem;
  margin: 0 0.5rem 1rem;
  font-size: 1.125rem;
`
const Text = styled.p`
  text-align: center;
  filter: blur(${(props) => (props.blur ? '1rem' : 0)});
  transition: filter 500ms ease-out;
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
  const [emails, setEmails] = useState(null)
  const emailWeight = useMemo(
    () =>
      equivalents.find((equivalent) =>
        ['stockageemail'].includes(equivalent.slug)
      ),
    [equivalents]
  )

  const totalWeight = useMemo(
    () => formatTotal(emailWeight) * emails,
    [emailWeight, emails]
  )
  return (
    <>
      <Title>Découvrez l'impact de votre boite mail sur le climat</Title>
      <Text>
        J'ai
        <StyledTextInput
          value={emails}
          onChange={({ value }) => setEmails(value)}
          placeholder={`10 000`}
        />
        emails stockés.
      </Text>
      <Text blur={!emails}>
        Ma boite mail émet{' '}
        <strong>
          {formatNumber(totalWeight)} kg CO<sub>2</sub>e
        </strong>{' '}
        sur 10 ans, soit l'équivalent de...
      </Text>
      <Tiles blur={!emails}>
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
