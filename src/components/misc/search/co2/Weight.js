import React, { useContext } from 'react'
import styled from 'styled-components'

import DataContext from 'utils/DataContext'
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
const StyledTextInput = styled(TextInput)`
  position: relative;

  &:before {
    content: 'kgCO2e';
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
  }
  input {
    font-size: 1.5rem;
    font-weight: bold;
    padding-right: 5rem;
    text-align: right;
  }
`
export default function Weight() {
  const { weight, setWeight } = useContext(DataContext)

  return (
    <Wrapper>
      <StyledTextInput
        type='number'
        value={weight}
        onChange={(e) => setWeight(e.value)}
      />
    </Wrapper>
  )
}
