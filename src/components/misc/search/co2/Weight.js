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
export default function Weight() {
  const { weight, setWeight } = useContext(DataContext)

  return (
    <Wrapper>
      <TextInput value={weight} onChange={(e) => setWeight(e.value)} />
    </Wrapper>
  )
}
