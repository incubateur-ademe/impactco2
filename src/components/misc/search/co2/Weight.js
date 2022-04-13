import React, { useContext } from 'react'
import styled from 'styled-components'

import DataContext from 'utils/DataContext'
import Emoji from 'components/base/Emoji'
import TextInput from 'components/base/TextInput'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0.5rem;
  padding: 1rem;
  text-align: center;
  background-color: ${(props) => props.theme.colors.footerLight};
  border-radius: 1rem;
`
const StyledEmoji = styled(Emoji)`
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`
const StyledTextInput = styled(TextInput)`
  position: relative;
  max-width: 10rem;
  margin: 0 auto 1rem;

  &:before {
    content: 'kgCO2e';
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
  }
  input {
    font-size: 1.25rem;
    font-weight: bold;
    padding-right: 5rem;
    text-align: right;
  }
`
export default function Weight() {
  const { weight, setWeight } = useContext(DataContext)

  return (
    <Wrapper>
      <StyledEmoji>⚖️</StyledEmoji>
      <StyledTextInput
        type='number'
        value={weight}
        onChange={(e) => setWeight(e.value)}
      />
    </Wrapper>
  )
}
