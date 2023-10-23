import React from "react";
import styled from "styled-components";
import { formatName } from "utils/formatters";

const Wrapper = styled.div`
  overflow: hidden;
  position: relative;
`;
const Input = styled.input`
  background-image: url("data:image/svg+xml,%3Csvg width='72px' height='68px' viewBox='0 0 72 68' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='imgloop' transform='translate(5.000000, 5.000000)' stroke='%23B5ABB2' stroke-width='10'%3E%3Ccircle id='Oval' cx='25.5' cy='25.5' r='25.5'%3E%3C/circle%3E%3Cpath d='M47.5,43.5 L59.5415946,55.5415946' id='Line' stroke-linecap='square'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-position: 96% 53%;
  background-repeat: no-repeat;
  background-size: 6%;
  ${(props) => props.theme.mq.small} {
    background-size: 4%;
  }
  ${(props) => props.theme.mq.xsmall} {
    background-size: 6%;
  }
  border: none;
  color: ${(props) => props.theme.colors.text};
  font-size: 1em;
  font-weight: normal;
  line-height: 1.25;
  padding: 0.5em 1em;
  width: 100%;

  &::placeholder {
    color: ${(props) => props.theme.colors.text};
    opacity: 0.5;
  }
  &:focus {
    outline: none;
  }
`;
const Suggestion = styled.div`
  align-items: center;
  display: flex;
  left: 0;
  opacity: ${(props) => (props.visible ? 0.75 : 0)};
  pointer-events: none;
  position: absolute;
  top: 0;
  white-space: nowrap;
`;
const Invisible = styled.div`
  font-size: 1em;
  line-height: 1.25;
  opacity: 0;
  padding: 0.5em 0.5em 0.5em 2.5em;
`;
const Visible = styled.div`
  margin-top: 0em;
  padding-left: 1.25em;
  position: relative;

  &:before {
    background-color: ${(props) => props.theme.colors.text};
    content: "";
    height: 0.05em;
    left: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-150%);
    width: 0.75em;
  }
`;
const Name = styled.span``;
const Subtitle = styled.span`
  font-weight: 300;
`;

export default React.forwardRef(function TextInput(props, ref) {
  return (
    <Wrapper>
      <Input
        ref={ref}
        type="text"
        placeholder={props.placeholder}
        value={props.search}
        onChange={(e) => props.setSearch(e.target.value)}
        onFocus={() => props.setFocus(true)}
        onBlur={() => props.setFocus(false)}
      />
      <Suggestion visible={props.suggestion && props.suggestionVisible && props.search}>
        <Invisible>{props.search}</Invisible>
        {props.suggestion && (
          <Visible>
            <Name>{formatName(props.suggestion.item.name, 1)}</Name>
            {props.suggestion.item.subtitle && <Subtitle> ({formatName(props.suggestion.item.subtitle, 1)})</Subtitle>}
          </Visible>
        )}
      </Suggestion>
    </Wrapper>
  );
});
