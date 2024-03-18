import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  pointer-events: inherit;
  position: fixed;
  top: 0;
  transform: translate3d(0, 0, 1em);
  width: 100%;
  z-index: 900;
`
const Background = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`
const Content = styled.div<{ $width?: string }>`
  background-color: var(--neutral-00);
  border-radius: 1em;
  box-shadow: 0px 0px 15px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  margin: 1rem;
  max-height: 90vh;
  max-width: 90vw;
  opacity: 1;
  position: relative;
  transform: scale(1) translateY(0);
  visibility: visible;
  width: ${({ $width }) => $width || '40em'};
`
const ButtonClose = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 2rem;
  font-weight: bold;
  line-height: 0.5;
  position: absolute;
  right: 0.5em;
  top: 0.5em;
  transform: rotate(45deg);
  z-index: 12;
`
const Scroll = styled.div`
  overflow-y: auto;
  padding: 2rem 1.5rem;
`
export default function Modal({
  setOpen,
  width,
  children,
  className,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>
  width?: string
  children: ReactNode
  className?: string
}) {
  return (
    <Wrapper>
      <Background onClick={() => setOpen(false)} />
      <Content $width={width}>
        <ButtonClose onClick={() => setOpen(false)}> +</ButtonClose>
        <Scroll className={className}> {children} </Scroll>
      </Content>
    </Wrapper>
  )
}
