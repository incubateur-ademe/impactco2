import styled from "styled-components";

export const Wrapper = styled.div`
  align-content: center;
  display: grid;
  grid-template-columns: 40px 1fr;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
`;

export const EmojiWrapper = styled.div`
  > span > img.emoji {
    height: 32px;
    width: 32px;
  }
`;

export const Title = styled.p``;

export const Number = styled.div`
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0em;
  line-height: 32px;
`;

export const OfWhat = styled.div`
  color: #746770;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0em;
  line-height: 16px;
`;
