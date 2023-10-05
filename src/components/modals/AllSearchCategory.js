import EquivalentSquare from "./tilesModal/EquivalentSquare";
import categories from "data/categories.json";
import React from "react";
import styled from "styled-components";
import useLocalStorage from "use-local-storage";

export default function AllSearchCategory(props) {
  const [eqvArray, setEqvArray] = useLocalStorage("ico2_eqv_array");

  const theCategory = categories.find((oneCat) => {
    return oneCat.slug === props.cat;
  });

  const items = props.items.filter((oneItem) => {
    return oneItem.item.category === theCategory.id;
  });

  return (
    <Wrapper>
      {items && items.length > 0 ? <>{theCategory.name}</> : <></>}
      <Equivalents>
        {items.map(({ item }) => (
          <EquivalentSquare
            key={item.slug}
            equivalent={item}
            checked={Array.isArray(eqvArray) && eqvArray.includes(item.slug)}
            setChecked={() => {
              let clonedArray = JSON.parse(JSON.stringify(eqvArray));
              console.log("clonedArray", clonedArray);
              console.log("item.slug", item.slug);
              setEqvArray(clonedArray.toString());
            }}
          />
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
