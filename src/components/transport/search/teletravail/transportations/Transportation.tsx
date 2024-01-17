import React from 'react'
import styled from 'styled-components'
import { DeplacementEquivalent } from 'types/equivalent'
import { track } from 'utils/matomo'
import useParamContext from 'components/providers/ParamProvider'
import Emoji from 'components/base/Emoji'

const Wrapper = styled.button<{ $active: boolean }>`
  background-color: ${(props) => (props.$active ? 'var(--primary-50)' : 'transparent')};
  border: 0.125rem solid var(--primary-50);
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1.5rem;
  height: 2.5rem;
  margin: 0.375rem;
  padding: 0;
  position: relative;
  width: 2.5rem;
`
const Second = styled.span`
  bottom: 0;
  font-size: 0.75em;
  position: absolute;
  right: 0;
  transform: translate(30%, 50%);
`
export default function Transportation({ transportation }: { transportation: DeplacementEquivalent }) {
  const {
    teletravail: { transport, setTransport },
  } = useParamContext()

  return (
    <Wrapper
      aria-label={`Transport par ${transportation.name}`}
      onClick={() => {
        track('Transport télétravail', 'Mode de transport', transportation.slug)
        setTransport(transportation.slug)
      }}
      data-testid={`transport-${transportation.slug}`}
      $active={transport === transportation.slug}>
      <Emoji>{transportation.emoji}</Emoji>
      {transportation.secondEmoji && (
        <Second>
          <Emoji>{transportation.secondEmoji}</Emoji>
        </Second>
      )}
    </Wrapper>
  )
}
