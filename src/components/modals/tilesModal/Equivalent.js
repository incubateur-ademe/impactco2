import React from 'react'
import styled from 'styled-components'

import { formatName } from 'utils/formatters'
import Emoji from 'components/base/Emoji'
import Checkbox from './equivalent/Checkbox'

const Wrapper = styled.button`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.75rem 1.5rem 0.75rem 1rem;
  margin-bottom: 0.25rem;
  border: none;
  border-radius: 0.5rem;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) =>
    props.theme.colors[props.checked ? 'mainLight' : 'background']};
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
  cursor: ${(props) => (props.disabled ? 'normal' : 'pointer')};
  transition: background-color 200ms ease-out;

  &:hover {
    background-color: ${(props) => props.theme.colors.mainLight};
  }
`
const Label = styled.span`
  display: block;
  font-size: ${(props) => (props.small ? 0.875 : 1)}rem;
  text-align: center;
  line-height: 1.2;
`
const Subtitle = styled.span`
  font-weight: 300;
`
const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`
const StyledEmoji = styled(Emoji)`
  font-size: 1.25rem;
`
export default function Option(props) {
  return (
    <Wrapper
      checked={props.checked}
      onClick={() => props.setChecked(!props.checked)}
    >
      <Left>
        <Checkbox checked={props.checked} />

        <Label>
          {formatName(props.equivalent.name.fr, 1)}{' '}
          {props.equivalent.subtitle && (
            <Subtitle>({formatName(props.equivalent.subtitle.fr, 1)})</Subtitle>
          )}
        </Label>
      </Left>
      <StyledEmoji>{props.equivalent.emoji}</StyledEmoji>
    </Wrapper>
  )
}
