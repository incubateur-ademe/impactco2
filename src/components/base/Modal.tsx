import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div<{ $open: boolean }>`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  pointer-events: ${({ $open }) => ($open ? 'inherit' : 'none')};
  position: fixed;
  top: 0;
  transform: translate3d(0, 0, 1em);
  width: 100%;
  z-index: 900;
`
const Background = styled.div<{ $open: boolean }>`
  background-color: rgba(0, 0, 0, ${({ $open }) => ($open ? 0.6 : 0)});
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`
const Content = styled.div<{ $open: boolean; $width?: string }>`
  background-color: ${(props) => props.theme.colors.background};
  border-radius: 1em;
  box-shadow: 0px 0px 15px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  margin: 1rem;
  max-height: 90vh;
  max-width: 90vw;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  position: relative;
  transform: scale(${({ $open }) => ($open ? 1 : 0.7)}) translateY(${({ $open }) => ($open ? 0 : '10em')});
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  width: ${({ $width }) => $width || '40em'};
`
const ButtonClose = styled.div`
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
  open,
  setOpen,
  width,
  children,
  className,
}: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  width?: string
  children: ReactNode
  className?: string
}) {
  return (
    <Wrapper $open={open}>
      <Background $open={open} onClick={() => setOpen(false)} />
      <Content $open={open} $width={width}>
        <ButtonClose onClick={() => setOpen(false)}> +</ButtonClose>
        <Scroll className={className}> {children} </Scroll>
      </Content>
    </Wrapper>
  )
}
