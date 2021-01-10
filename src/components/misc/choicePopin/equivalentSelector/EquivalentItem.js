import React from 'react'
import { SortableElement, sortableHandle } from 'react-sortable-hoc'
import styled from 'styled-components'

const Wrapper = styled.li`
  position: relative;
  z-index: 920;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7em 1.2em 0.7em 1.8em;
  margin: 0.35em 0;
  color: ${(props) =>
    props.active ? props.theme.colors.second : props.theme.colors.main};
  list-style: none;
  cursor: pointer;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -6%;
    width: 112%;
    height: 100%;
    background-color: ${(props) =>
      props.active ? props.theme.colors.main : props.theme.colors.second};
    border: 1px solid ${(props) => props.theme.colors.main};
    transform: rotate3d(1, -1, 0, 42deg) rotate(8.3deg);
  }
`
const Label = styled.div`
  position: relative;
`
const Handle = styled.div`
  position: relative;
  width: 1.5em;
  height: 1em;
  cursor: move;
`
const Bar = styled.div`
  width: 100%;
  position: absolute;
  top: ${(props) => (props.top ? 0 : props.bottom ? 'auto' : '50%')};
  bottom: ${(props) => (props.bottom ? 0 : 'auto')};
  transform: translateY(
    ${(props) => (props.top || props.bottom ? '0' : '-50%')}
  );
  left: ${(props) => (props.top ? '2px' : props.bottom ? '-2px' : 0)};
  width: 100%;
  height: 3px;
  background-color: ${(props) =>
    props.active ? props.theme.colors.text : props.theme.colors.main};
`

const DragHandle = sortableHandle((props) => (
  <Handle>
    <Bar top active={props.active} />
    <Bar active={props.active} />
    <Bar bottom active={props.active} />
  </Handle>
))

const EquivalentItem = SortableElement(({ equivalent, onClick }) => (
  <Wrapper active={equivalent.active} onClick={onClick}>
    <Label>{equivalent.name.fr.replaceAll('[s]', '')}</Label>
    <DragHandle active={equivalent.active} />
  </Wrapper>
))

export default EquivalentItem
