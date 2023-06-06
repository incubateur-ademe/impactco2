import { Wrapper, EmojiWrapper, Number, OfWhat } from "./LivraisonEq.styled";
import Emoji from "components/base/Emoji";
import { formatName, formatNumber, formatTotalByMultiplier } from "utils/formatters";

export default function LivraisonEq(props) {
  const fullSentence =
    formatNumber(props.weight / formatTotalByMultiplier(props.equivalent)) +
    " " +
    formatName(
      (props.equivalent.prefix || "") + props.equivalent.name,
      props.weight / formatTotalByMultiplier(props.equivalent)
    );
  const first2WordsOnly = (sentence) => sentence.split(" ").slice(0, 2).join(" ");
  const first2WordsRemoved = (sentence) => sentence.split(" ").slice(2).join(" ");

  return (
    <Wrapper background={props.background}>
      <EmojiWrapper>
        <Emoji>{props.equivalent.emoji}</Emoji>
      </EmojiWrapper>
      <Number>{first2WordsOnly(fullSentence)}</Number>
      <div></div>
      <OfWhat>{first2WordsRemoved(fullSentence)}</OfWhat>
    </Wrapper>
  );
}
