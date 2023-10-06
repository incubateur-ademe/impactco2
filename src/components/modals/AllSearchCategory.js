import EquivalentSquare from "./tilesModal/EquivalentSquare";
import categories from "data/categories.json";
import React from "react";
import styled from "styled-components";
import useLocalStorage from "use-local-storage";
import { pick } from "utils/utils";

export default function AllSearchCategory(props) {
  const [eqvArray, setEqvArray] = useLocalStorage("ico2_eqv_array");

  const theCategory = categories.find((oneCat) => {
    return oneCat.slug === props.cat;
  });

  const items = props.items.filter((oneItem) => {
    return oneItem.item.category === theCategory.id && !eqvArray.find((e) => e.slug === oneItem.item.slug);
  });

  const itemChosen = (newArray, ticked) => {
    if (newArray.length > 2) {
      newArray[newArray.length - 1] = ticked;
    } else {
      newArray.push(ticked);
    }
    setEqvArray(newArray);
  };

  return (
    <Wrapper>
      {items && items.length > 0 ? (
        <>
          <TheCategoryName>{theCategory.name}</TheCategoryName>
        </>
      ) : (
        <></>
      )}
      <Equivalents>
        {items.map(({ item }) => (
          <EquivalentSquare
            key={item.slug}
            equivalent={item}
            checked={false}
            setChecked={() => {
              let ticked = pick(item, "slug", "name");
              itemChosen(JSON.parse(JSON.stringify(eqvArray)), ticked);
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

const TheCategoryName = styled.div`
  color: #26827c;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;
