import React, { ReactNode } from 'react'
import { Text, Wrapper } from './Simulator.styles'

const Simulator = ({ text, children }: { text: ReactNode; children: ReactNode }) => {
  return (
    <Wrapper>
      <Text>{text}</Text>
      {children}
    </Wrapper>
  )
}

export default Simulator
