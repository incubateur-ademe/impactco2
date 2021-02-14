import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: fixed;
  z-index: 900;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: ${(props) => (props.open ? 'inherit' : 'none')};
`
const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, ${(props) => (props.open ? 0.6 : 0)});
  transition: background-color ${(props) => (props.open ? '300ms' : 0)}
    ease-in-out;
`
const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 30em;
  max-width: 90vw;
  max-height: 90vh;
  margin: 2em;
  padding: 2em;
  color: ${(props) =>
    props.textColor
      ? props.theme.colors[props.textColor]
      : props.theme.colors.text};
  background-color: ${(props) =>
    props.backgroundColor
      ? props.theme.colors[props.backgroundColor]
      : props.theme.colors.second};
  border-radius: 1em;
  box-shadow: 0px 0px 15px 10px rgba(0, 0, 0, 0.2);

  opacity: ${(props) => (props.open ? 1 : 0)};
  transform: scale(${(props) => (props.open ? 1 : 0.7)})
    translateY(${(props) => (props.open ? 0 : '10em')});
  transition: all ${(props) => (props.open ? '300ms' : 0)} ease-in-out;
`
const ButtonClose = styled.div`
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  font-size: 2em;
  font-weight: 700;
  transform: rotate(45deg);
  cursor: pointer;
  line-height: 0.5;
`

export default function Modal(props) {
  return (
    <Wrapper open={props.open}>
      <Background open={props.open} onClick={() => props.setOpen(false)} />
      <Content
        open={props.open}
        textColor={props.textColor}
        backgroundColor={props.backgroundColor}
      >
        <ButtonClose onClick={() => props.setOpen(false)}>+</ButtonClose>
        {props.children}
      </Content>
    </Wrapper>
  )
}
