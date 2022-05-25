import React from 'react'
import styled from 'styled-components'

import { formatName } from 'utils/formatters'
import Glass from './textInput/Glass'
import Submit from './textInput/Submit'

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
`
const Input = styled.input`
  width: 100%;
  padding: 0.5em 2.5em;
  font-size: 1em;
  font-weight: normal;
  line-height: 1.25;
  color: ${(props) => props.theme.colors.text};
  background: transparent;
  border: none;

  &::placeholder {
    color: ${(props) => props.theme.colors.text};
    opacity: 0.5;
  }
  &:focus {
    outline: none;
  }
`
const Suggestion = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  white-space: nowrap;
  opacity: ${(props) => (props.visible ? 0.75 : 0)};
  pointer-events: none;
  transition: opacity ${(props) => (props.visible ? 200 : 0)}ms;
`
const Invisible = styled.div`
  opacity: 0;
  padding: 0.5em 0.5em 0.5em 2.5em;
  font-size: 1em;
  line-height: 1.25;
`
const Visible = styled.div`
  position: relative;
  margin-top: 0em;
  padding-left: 1.25em;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-150%);
    width: 0.75em;
    height: 0.05em;
    background-color: ${(props) => props.theme.colors.text};
  }
`
const Name = styled.span``
const Subtitle = styled.span`
  font-weight: 300;
`

export default React.forwardRef(function TextInput(props, ref) {
  return (
    <Wrapper>
      <Glass />
      <Input
        ref={ref}
        type='text'
        placeholder='Rechercher'
        value={props.search}
        onChange={(e) => props.setSearch(e.target.value)}
        onFocus={() => props.setFocus(true)}
        onBlur={() => props.setFocus(false)}
      />
      <Suggestion
        visible={props.suggestion && props.suggestionVisible && props.search}
      >
        <Invisible>{props.search}</Invisible>
        {props.suggestion && (
          <Visible>
            <Name>{formatName(props.suggestion.item.name.fr, 1)}</Name>
            {props.suggestion.item.subtitle && (
              <Subtitle>
                {' '}
                ({formatName(props.suggestion.item.subtitle.fr, 1)})
              </Subtitle>
            )}
          </Visible>
        )}
      </Suggestion>

      <Submit
        visible={props.suggestion && props.suggestionVisible && props.search}
        setFocus={props.setFocus}
      />
    </Wrapper>
  )
})
