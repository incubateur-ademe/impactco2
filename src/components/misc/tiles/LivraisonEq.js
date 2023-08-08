import Emoji from "components/base/Emoji";
import ModalContext from "components/providers/ModalProvider";
import React, { useContext } from "react";
import styled from "styled-components";
import { fullSentenceFormat } from "utils/formatters";

const first2WordsOnly = (sentence) => sentence.split(" ").slice(0, 2).join(" ");
const first2WordsRemoved = (sentence) => sentence.split(" ").slice(2).join(" ");

export default function LivraisonEq(props) {
  const { setEqv } = useContext(ModalContext);

  const changeClicked = () => {
    window?.please?.track(["trackEvent", "Interaction", "Modal", "livraison_modifier_equivalent"]);
    setEqv(props.slug);
  };

  return (
    <Wrapper background={props.background}>
      <EmojiWrapper>
        <Emoji>{props?.equivalent?.emoji}</Emoji>
      </EmojiWrapper>
      <Number>{first2WordsOnly(fullSentenceFormat(props))}</Number>
      <div></div>
      <OfWhat>{first2WordsRemoved(fullSentenceFormat(props))}</OfWhat>
      <div></div>
      <ButtonContainer>
        {props.modifyEq ? (
          <ButtonChange onClick={changeClicked}>Modifier les équivalences</ButtonChange>
        ) : (
          <EmptyButton>&nbsp;</EmptyButton>
        )}
      </ButtonContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  align-content: center;
  display: grid;
  grid-template-columns: 40px 1fr;
  ${(props) => props.theme.mq.large} {
    grid-template-columns: 1fr;
    > div {
      align-items: center;
      display: flex;
      justify-content: center;
    }
  }
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
`;

const EmojiWrapper = styled.div`
  > span > img.emoji {
    height: 32px;
    width: 32px;
  }
`;

const Number = styled.div`
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0em;
  line-height: 32px;
`;

const OfWhat = styled.div`
  color: #746770;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0em;
  line-height: 16px;
  margin-top: -8px;
`;

const ButtonChange = styled.button`
  background-color: white;
  border-color: #b5abb2;
  border-radius: 8px;
  border-style: solid;
  border-width: 1px;
  color: #564d53;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0em;
  line-height: 24px;
  margin-top: 1.25rem;
  padding: 4px 12px 4px 12px;
  text-align: center;
`;

const EmptyButton = styled.div``;

const ButtonContainer = styled.div`
  height: 3rem;
`;
