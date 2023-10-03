import EquivalentSquare from "./tilesModal/EquivalentSquare";
import categories from "data/categories.json";
import React from "react";
import styled from "styled-components";

export default function AllSearchCategory(props) {
  const theCategory = categories.find((oneCat) => {
    return oneCat.slug === props.cat;
  });
  console.log("theCategory", theCategory);
  const items = props.items.filter((oneItem) => {
    return oneItem.item.category === theCategory.id;
  });
  return (
    <Wrapper>
      {theCategory.name}
      <Equivalents>
        {items.map(({ item }) => (
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
