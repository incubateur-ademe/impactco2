import React from 'react'
import styled from 'styled-components'
import { formatName } from 'utils/formatters'

const Wrapper = styled.button`
  align-items: center;
  background-color: transparent;
  &:hover {
    background-color: ${(props) => props.theme.colors[props.checked ? 'mainLight' : 'background']};
  }
  border: none;
  border-radius: 0.5rem;
  color: ${(props) => props.theme.colors.text};
  cursor: ${(props) => (props.disabled ? 'normal' : 'pointer')};
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
  position: relative;
  width: 100%;
`
const Label = styled.span`
  color: ${(props) => props.theme.colors.persistentText};
  &:hover {
    color: ${(props) => props.theme.colors.main};
  }
  display: block;
  font-size: ${(props) => (props.small ? 0.875 : 1)}rem;
  line-height: 1.2;
  text-align: left;
`
const Subtitle = styled.span`
  font-weight: 300;
`
const Left = styled.div`
  align-items: center;
  display: flex;
  gap: 0.75rem;
`
const GreenSquare = styled.div`
  background-color: #26827c;
  border: 1px solid #26827c;
  border-radius: 4px;
  height: 24px;
  width: 24px;
`
const Tick = styled.div`
  border-bottom: 2px solid white;
  border-right: 2px solid white;
  display: inline-block;
  height: 10px;
  margin-bottom: 0px;
  margin-left: 10%;
  transform: rotate(45deg);
  width: 5px;
`
export default function EquivalentSquareChecked(props) {
  return (
    <Wrapper
      type='checkbox'
      checked={props.checked}
      onClick={() => props.setChecked(!props.checked)}
      className='checked-eq'
      data-testid={props['data-testid']}>
      <Left>
        <GreenSquare>
          <Tick />
        </GreenSquare>
        <Label>
          {formatName(props.equivalent.name, 1, true)}{' '}
          {props.equivalent.subtitle && <Subtitle>({formatName(props.equivalent.subtitle, 1)})</Subtitle>}
        </Label>
      </Left>
    </Wrapper>
  )
}
