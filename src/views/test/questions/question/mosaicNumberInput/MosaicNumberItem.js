import React from 'react'
import styled from 'styled-components'

import Emoji from 'components/base/Emoji'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(33.3333% - 1rem);
  padding: 1.125rem 0.25rem;
  font-size: 1.25rem;
  background-color: ${(props) => props.theme.colors.textLight};
  border-radius: 1rem;

  ${(props) => props.theme.mq.medium} {
    width: calc(33.3333% - 0.5rem);
  }
  ${(props) => props.theme.mq.small} {
    width: calc(50% - 0.375rem);
    font-size: 1.125rem;
  }
`
const Label = styled.label`
  margin-bottom: 1rem;
  text-align: center;
`
const InputWrapper = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.colors.main};
  border: 0.125rem solid
    ${(props) => props.theme.colors[props.error ? 'error' : 'main']};
  border-radius: 1.5rem;
  overflow: hidden;
`
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  background-color: ${(props) => props.theme.colors.main};
  border: none;
  cursor: pointer;

  svg {
    width: 1.375rem;
    height: auto;
    path {
      fill: ${(props) => props.theme.colors.background};
    }

    ${(props) => props.theme.mq.small} {
      width: 1.125rem;
    }
  }

  ${(props) => props.theme.mq.small} {
    width: 2rem;
  }
`
const Input = styled.input`
  flex: 1;
  width: 3rem;
  padding: 0.5rem 0;
  color: ${(props) => props.theme.colors.text};
  text-align: center;
  background-color: ${(props) => props.theme.colors.background};
  border: 0.125rem solid
    ${(props) => props.theme.colors[props.error ? 'error' : 'main']};
  border-radius: 0.25rem;
  transition: box-shadow 300ms ease-out;

  &:focus {
    outline: none;
    box-shadow: 0 -0 0px 1px ${(props) => props.theme.colors.main};
  }
`
export default function MosaicNumberItem(props) {
  return (
    <Wrapper className={props.className}>
      <Label>
        <Emoji>{props.parent.rawNode['icônes']}</Emoji>
        <br />
        {props.parent.title}
      </Label>
      <InputWrapper>
        <Button
          onClick={() =>
            props.onChange({ [props.rule.dottedName]: props.value - 1 })
          }
          disabled={!props.value}
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M0 12C0 9.79086 1.79086 8 4 8H20C22.2091 8 24 9.79086 24 12C24 14.2091 22.2091 16 20 16H4C1.79086 16 0 14.2091 0 12Z'
              fill='#DE0244'
            />
          </svg>
        </Button>
        <Input
          type={'text'}
          inputmode='numeric'
          id={props.rule.dottedName}
          name={props.rule.dottedName}
          value={props.value || 0}
          onChange={(e) => {
            props.onChange({
              [props.rule.dottedName]: Number(e.currentTarget.value) || 0,
            })
          }}
        />
        <Button
          onClick={() =>
            props.onChange({ [props.rule.dottedName]: props.value + 1 })
          }
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M0 12C0 9.79086 1.79086 8 4 8H20C22.2091 8 24 9.79086 24 12C24 14.2091 22.2091 16 20 16H4C1.79086 16 0 14.2091 0 12Z'
              fill='#DE0244'
            />
            <path
              d='M12 24C9.79086 24 8 22.2091 8 20L8 4C8 1.79086 9.79086 9.65645e-08 12 0C14.2091 -9.65645e-08 16 1.79086 16 4L16 20C16 22.2091 14.2091 24 12 24Z'
              fill='#DE0244'
            />
          </svg>
        </Button>
      </InputWrapper>
    </Wrapper>
  )
}
