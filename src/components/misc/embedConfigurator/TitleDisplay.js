import React, { useContext } from 'react'
import styled from 'styled-components'

import StyleContext from 'utils/StyleContext'

const Wrapper = styled.div`
  position: relative;
  margin: 0 0 1rem 0.5rem;
  font-size: 1.2em;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 1.2em;
    width: 1.2em;
    background-color: ${(props) =>
      props.checked ? props.theme.colors.main : props.theme.colors.second};
    border: 2px solid ${(props) => props.theme.colors.main};
    transform: rotate3d(1, -1, 0, 33deg) rotate(5.1deg);
    cursor: pointer;
  }
`
const Checkbox = styled.input`
  margin-right: 1em;
  opacity: 0;
  pointer-events: none;
`
const Label = styled.label``
export default function TitleDisplay() {
  const { displayTitle, setDisplayTitle } = useContext(StyleContext)

  return (
    <Wrapper
      checked={displayTitle}
      onClick={(e) => setDisplayTitle((prev) => !prev)}
    >
      <Checkbox
        type='checkbox'
        checked={displayTitle}
        onChange={(e) => setDisplayTitle(e.currentTarget.checked)}
      />
      <Label>Afficher le titre</Label>
    </Wrapper>
  )
}
