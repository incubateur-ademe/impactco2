import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  pointer-events: ${(props) => (props.open ? 'inherit' : 'none')};
  position: fixed;
  top: 0;
  transform: translate3d(0, 0, 1em);
  width: 100%;
  z-index: 900;
`
const Background = styled.div`
  background-color: rgba(0, 0, 0, ${(props) => (props.open ? 0.6 : 0)});
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transition: background-color ${(props) => (props.open ? '300ms' : '1ms')}
    ease-in-out;
  width: 100%;
`
const Content = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  border-radius: 1em;
  box-shadow: 0px 0px 15px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  margin: 1rem;
  max-height: 90vh;
  max-width: 90vw;
  opacity: ${(props) => (props.open ? 1 : 0)};
  position: relative;
  transform: scale(${(props) => (props.open ? 1 : 0.7)})
    translateY(${(props) => (props.open ? 0 : '10em')});
  transition: all
    ${(props) => (props.open && !props.noAnimation ? '300ms' : '1ms')}
    ease-in-out;
  visibility: ${(props) => (props.open ? 'visible' : 'hidden')};
  width: ${(props) => props.width || '40em'};
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
export default function Modal(props) {
  return (
    <Wrapper open={props.open}>
      <Background open={props.open} onClick={() => props.setOpen(false)} />
      <Content
        open={props.open}
        width={props.width}
        textColor={props.textColor}
        backgroundColor={props.backgroundColor}
        noAnimation={props.noAnimation}
      >
        <ButtonClose onClick={() => props.setOpen(false)}>+</ButtonClose>
        <Scroll className={props.className}>{props.children}</Scroll>
      </Content>
    </Wrapper>
  )
}
