import React from 'react'
import styled from 'styled-components'
import formatName from 'utils/formatName'
import Emoji from 'components/base/Emoji'

const Wrapper = styled.button`
  align-items: center;
  background-color: ${(props) => (props.checked ? 'var(--primary-10)' : 'var(--neutral-00)')};
  border: none;
  border-radius: 0.5rem;
  color: var(--neutral-70);
  cursor: ${(props) => (props.disabled ? 'normal' : 'pointer')};
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
  padding: 0.75rem 1.5rem 0.75rem 1rem;
  position: relative;
  width: 100%;
  &:hover {
    background-color: var(--primary-10);
  }
`
const Label = styled.span`
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
const StyledEmoji = styled(Emoji)`
  font-size: 1.25rem;
`
export default function EquivalentSquare(props) {
  return (
    <Wrapper
      type='checkbox'
      checked={props.checked}
      onClick={() => props.setChecked(!props.checked)}
      className='equivalent-unchecked'
      data-testid={`unchecked-eq-${props.equivalent.slug}`}>
      <Left>
        <GreenSquare>&nbsp;</GreenSquare>
        <Label>
          {formatName(props.equivalent.name, 1, true)}{' '}
          {props.equivalent.subtitle && <Subtitle>({formatName(props.equivalent.subtitle, 1)})</Subtitle>}
        </Label>
      </Left>
      <StyledEmoji>{props.equivalent.emoji}</StyledEmoji>
    </Wrapper>
  )
}

const GreenSquare = styled.div`
  border: 1px solid #26827c;
  border-radius: 4px;
  height: 24px;
  width: 24px;
`
