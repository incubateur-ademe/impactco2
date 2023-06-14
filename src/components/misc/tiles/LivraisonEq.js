import { Wrapper, EmojiWrapper, Number, OfWhat } from "./LivraisonEq.styled";
import Emoji from "components/base/Emoji";
import { fullSentenceFormat } from "utils/formatters";

const first2WordsOnly = (sentence) => sentence.split(" ").slice(0, 2).join(" ");
const first2WordsRemoved = (sentence) => sentence.split(" ").slice(2).join(" ");

export default function LivraisonEq(props) {
  return (
    <Wrapper background={props.background}>
      <EmojiWrapper>
        <Emoji>{props.equivalent.emoji}</Emoji>
      </EmojiWrapper>
      <Number>{first2WordsOnly(fullSentenceFormat(props))}</Number>
      <div></div>
      <OfWhat>{first2WordsRemoved(fullSentenceFormat(props))}</OfWhat>
    </Wrapper>
  );
}
