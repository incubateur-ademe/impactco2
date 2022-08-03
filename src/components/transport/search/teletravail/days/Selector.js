import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 0 1rem 1rem;
  padding: 1rem 1.5rem;
  background-color: ${(props) => props.theme.colors.footerLight};
  border-radius: 1rem;

  ${(props) => props.theme.mq.small} {
    margin: 0 0.75rem 1rem;
  }
`
const Title = styled.div`
  text-align: center;
`
const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Button = styled.button`
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;

  svg {
    display: block;
    width: 1.5rem;
    height: auto;

    path {
      fill: ${(props) => props.theme.colors.main};
    }
  }
`
const Value = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
`
const Text = styled.p`
  margin: 0;
  font-size: 0.875rem;
  font-weight: 300;
  text-align: center;
`
export default function Selector(props) {
  return (
    <Wrapper>
      <Title>{props.label}</Title>
      <Content>
        <Button
          onClick={() => props.value > 0 && props.onChange(props.value - 1)}
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
        <Value>{props.value}</Value>
        <Button
          onClick={() => props.value < 5 && props.onChange(props.value + 1)}
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
      </Content>
      <Text>jours par semaine</Text>
    </Wrapper>
  )
}
