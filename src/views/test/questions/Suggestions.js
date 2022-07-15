import React, { useMemo } from 'react'
import styled from 'styled-components'

import Button from 'components/base/Button'

const StyledButtonWrapper = styled(Button.Wrapper)`
  margin-bottom: 1.5rem;
`
const StyledButton = styled(Button)`
  &:focus {
    color: ${(props) => props.theme.colors.background};
    background-color: ${(props) => props.theme.colors.main};
  }
`
export default function Suggestions(props) {
  const suggestions = useMemo(
    () => props.rule.suggestions && Object.entries(props.rule.suggestions),
    [props.rule.suggestions]
  )

  return suggestions && suggestions.length ? (
    <StyledButtonWrapper left>
      {Object.entries(props.rule.suggestions).map((suggestion) => (
        <StyledButton
          onClick={() =>
            props.onChange({
              [props.rule.dottedName]: suggestion[1].rawNode,
            })
          }
          small
          hollow={
            props.evaluation.nodeValue !==
            (suggestion[1]?.explanation
              ? suggestion[1]?.explanation.nodeValue
              : suggestion[1].rawNode)
          }
        >
          {suggestion[0]}
        </StyledButton>
      ))}
    </StyledButtonWrapper>
  ) : null
}
