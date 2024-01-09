import React from 'react'
import styled from 'styled-components'
import formatName from 'utils/formatName'
import Glass from './textInput/Glass'
import Submit from './textInput/Submit'

const Wrapper = styled.div`
  overflow: hidden;
  position: relative;
`
const Input = styled.input`
  background: transparent;
  border: none;
  color: var(--neutral-70);
  font-size: 1em;
  font-weight: normal;
  line-height: 1.25;
  padding: 0.5em 2.5em;
  width: 100%;

  &::placeholder {
    color: var(--neutral-70);
    opacity: 0.5;
  }
  &:focus {
    outline: none;
  }
`
const Suggestion = styled.div`
  align-items: center;
  display: flex;
  left: 0;
  opacity: ${(props) => (props.$visible ? 0.75 : 0)};
  pointer-events: none;
  position: absolute;
  top: 0;
  white-space: nowrap;
`
const Invisible = styled.div`
  font-size: 1em;
  line-height: 1.25;
  opacity: 0;
  padding: 0.5em 0.5em 0.5em 2.5em;
`
const Visible = styled.div`
  margin-top: 0em;
  padding-left: 1.25em;
  position: relative;

  &:before {
    background-color: var(--neutral-70);
    content: '';
    height: 0.05em;
    left: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-150%);
    width: 0.75em;
  }
`
const Name = styled.span``
const Subtitle = styled.span`
  font-weight: 300;
`

export default React.forwardRef(function TextInput(props, ref) {
  return (
    <Wrapper>
      <Glass onClick={() => ref.current.focus()} />
      <Input
        ref={ref}
        type='text'
        placeholder={props.placeholder}
        value={props.search}
        onChange={(e) => props.setSearch(e.target.value)}
        onFocus={() => props.setFocus(true)}
        onBlur={() => props.setFocus(false)}
      />
      <Suggestion $visible={props.suggestion && props.suggestionVisible && props.search}>
        <Invisible>{props.search}</Invisible>
        {props.suggestion && (
          <Visible>
            <Name>{formatName(props.suggestion.item.name, 1)}</Name>
            {props.suggestion.item.subtitle && <Subtitle> ({formatName(props.suggestion.item.subtitle, 1)})</Subtitle>}
          </Visible>
        )}
      </Suggestion>

      <Submit visible={props.suggestion && props.suggestionVisible && props.search} setFocus={props.setFocus} />
    </Wrapper>
  )
})
