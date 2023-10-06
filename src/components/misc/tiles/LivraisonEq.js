import Emoji from "components/base/Emoji";
import { Media, MediaBody, MediaFigure } from "components/base/Media";
import styled from "styled-components";
import { fullSentenceFormat } from "utils/formatters";

const first2WordsOnly = (sentence) => sentence.split(" ").slice(0, 2).join(" ");
const first2WordsRemoved = (sentence) => sentence.split(" ").slice(2).join(" ");

export default function LivraisonEq(props) {
  return (
    <Wrapper background={props.background}>
      <Media>
        <MediaFigure>
          <EmojiWrapper>
            <Emoji>{props?.equivalent?.emoji}</Emoji>
          </EmojiWrapper>
        </MediaFigure>
        <MediaBody>
          <Number id={`eq_nb_${props.position}`}>{first2WordsOnly(fullSentenceFormat(props))}</Number>
          <div></div>
          <OfWhat id={`eq_what_${props.position}`}>
            {first2WordsRemoved(fullSentenceFormat(props)) || <span>&nbsp;</span>}
          </OfWhat>
          <div></div>
          <div></div>
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
