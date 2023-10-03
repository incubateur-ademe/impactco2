import EquivalentSquare from "./tilesModal/EquivalentSquare";
import React from "react";
import styled from "styled-components";

export default function AllSearchCategory(props) {
  return (
    <Wrapper>
      <Equivalents>
        {props.items.map(({ item }) => (
          <EquivalentSquare key={item.slug} checked={false} equivalent={item} />
        ))}
      </Equivalents>
    </Wrapper>
  );
}

const Equivalents = styled.div`
  margin-bottom: 0;
  > button {
    padding: 0;
  }
`;

const Wrapper = styled.div`
  margin-bottom: 2rem;
  margin-top: 1rem;
`;
