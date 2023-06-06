import Emoji from "components/base/Emoji";
import styled from "styled-components";
import { formatName, formatNumber, formatTotalByMultiplier } from "utils/formatters";

const Wrapper = styled.div``;

const EmojiWrapper = styled.div``;
const Title = styled.p``;
const Number = styled.span``;
const Name = styled.span``;

export default function LivraisonEq(props) {
  return (
    <Wrapper background={props.background}>
      <EmojiWrapper>
        <Emoji>{props.equivalent.emoji}</Emoji>
      </EmojiWrapper>
      <Title>
        <Number>{formatNumber(props.weight / formatTotalByMultiplier(props.equivalent))}</Number>
        <Name>
          {formatName(
            (props.equivalent.prefix || "") + props.equivalent.name,
            props.weight / formatTotalByMultiplier(props.equivalent)
          )}
        </Name>
      </Title>
    </Wrapper>
  );
}
