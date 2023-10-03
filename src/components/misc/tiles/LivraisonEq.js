import Emoji from "components/base/Emoji";
import { Media, MediaBody, MediaFigure } from "components/base/Media";
// import ModalContext from "components/providers/ModalProvider";
// import React, { useContext } from "react";
import styled from "styled-components";
import { fullSentenceFormat } from "utils/formatters";

const first2WordsOnly = (sentence) => sentence.split(" ").slice(0, 2).join(" ");
const first2WordsRemoved = (sentence) => sentence.split(" ").slice(2).join(" ");

export default function LivraisonEq(props) {
  // const { setEqv } = useContext(ModalContext);

  // const changeClicked = () => {
  //   window?.please?.track(["trackEvent", "Interaction", "Modal", "livraison_modifier_equivalent"]);
  //   setEqv(props.slug);
  // };

  return (
    <Wrapper background={props.background}>
      <Media>
        <MediaFigure>
          <EmojiWrapper>
            <Emoji>{props?.equivalent?.emoji}</Emoji>
          </EmojiWrapper>
        </MediaFigure>
        <MediaBody>
          <Number id={`eq_nb_${props.slug}`}>{first2WordsOnly(fullSentenceFormat(props))}</Number>
          <div></div>
          <OfWhat id={`eq_what_${props.slug}`}>
            {first2WordsRemoved(fullSentenceFormat(props)) || <span>&nbsp;</span>}
          </OfWhat>
          <div></div>
          <div>
            {/* <ButtonChange onClick={changeClicked} id={`button_change_eq_${props.slug}`}>
              Modifier l'équivalence
            </ButtonChange> */}
          </div>
        </MediaBody>
      </Media>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border-bottom: 1px solid #eae5e8;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const EmojiWrapper = styled.div`
  > span > img.emoji {
    height: 32px;
    width: 32px;
  }
`;

const Number = styled.div`
  font-size: 1.125rem;
  ${(props) => props.theme.mq.large} {
    font-size: 1rem;
  }
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
