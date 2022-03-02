import React from 'react'
import styled from 'styled-components'

import useWindowSize from 'hooks/useWindowSize'
import EmbedButton from './panel/EmbedButton'
import ShareButton from './panel/ShareButton'
import ContactButton from './panel/ContactButton'

const Wrapper = styled.div`
  position: relative;
  width: ${(props) => (props.open ? '30rem' : 0)};
  transition: width 400ms ease-out;

  ${(props) => props.theme.mq.medium} {
    display: ${(props) => (props.open && props.small ? 'block' : 'none')};
    width: auto;
    border-left: none;
    transition: none;
  }
`
const Content = styled.div`
  position: fixed;
  z-index: 12;
  top: 0;
  right: 0;
  width: 30rem;
  height: 100%;
  padding: 2rem;
  background-color: ${(props) =>
    props.small ? 'transparent' : props.theme.colors.background};
  border-left: 5px solid ${(props) => props.theme.colors.main};
  overflow-y: auto;
  overflow-x: visible;
  transform: translateX(${(props) => (props.open ? 0 : '100%')});
  transition: transform 400ms ease-out;

  ${(props) => props.theme.mq.medium} {
    position: relative;
    width: auto;
    height: auto;
    transform: none;
    margin-bottom: 2rem;
    padding: 0;
    border-left: none;
    overflow: visible;
    transition: none;
  }

  h2 {
    font-size: 2em;
    margin: 0 2rem 2rem 0;
  }
  h3 {
    font-size: 1.3em;
    margin-bottom: 1rem;
  }
`
const ButtonClose = styled.div`
  position: absolute;
  top: 0.25em;
  right: 0.1em;
  font-size: 3em;
  font-weight: bold;
  transform: rotate(45deg);
  cursor: pointer;
  line-height: 0.5;
`
export default function Panel(props) {
  const { width } = useWindowSize()
  return (width > 1200 && !props.small) || (width <= 1200 && props.small) ? (
    <Wrapper open={props.open} small={props.small} id={props.id}>
      {!props.small &&
        (props.index === 0 ? (
          <EmbedButton
            open={props.open}
            onClick={props.toggleClose}
            index={props.index}
          />
        ) : props.index === 1 ? (
          <ShareButton
            open={props.open}
            onClick={props.toggleClose}
            index={props.index}
          />
        ) : (
          <ContactButton
            open={props.open}
            onClick={props.toggleClose}
            index={props.index}
          />
        ))}
      <Content open={props.open} small={props.small}>
        <ButtonClose onClick={props.toggleClose}>+</ButtonClose>
        {props.children}
      </Content>
    </Wrapper>
  ) : null
}
