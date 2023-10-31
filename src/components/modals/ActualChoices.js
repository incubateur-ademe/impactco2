import EquivalentSquareChecked from "./tilesModal/EquivalentSquareChecked";
import DataContext from "components/providers/DataProvider";
import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import useLocalStorage from "use-local-storage";

export default function ActualChoices() {
  const [eqvArray, setEqvArray] = useLocalStorage("ico2_eqv_array");
  const { equivalents } = useContext(DataContext);
  const [, setEqvError] = useLocalStorage("eqvError");

  useEffect(() => {
    if (eqvArray && eqvArray.length >= 2) {
      setEqvError("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eqvArray]);

  const removeChoice = (slug) => {
    const newArray = eqvArray.filter((ticked) => ticked !== slug);
    setEqvArray(newArray);
  };

  const getPluralOf = (word) => {
    let res = word;
    if (eqvArray.length > 1) {
      res += "s";
    }
    return res;
  };

  const eqOf = (ticked) => {
    return equivalents.find((e) => e.slug === ticked);
  };

  return (
    <Wrapper>
      <SelectionBox>
        <UpperSide data-testid="eqs-title">
          <UpperSideCounting>
            <Count>{eqvArray.length}</Count>/<MaxCount>3</MaxCount>
          </UpperSideCounting>{" "}
          <strong>{getPluralOf("équivalence")}</strong> {getPluralOf("sélectionnée")}
        </UpperSide>
        <Choices>
          {eqvArray.length > 0 ? (
            <>
              {eqvArray.map((ticked) => {
                return (
                  <EquivalentSquareChecked
                    key={ticked}
                    equivalent={eqOf(ticked)}
                    checked={false}
                    data-testid={`eq-${ticked}`}
                    setChecked={() => removeChoice(ticked)}
                  />
                );
              })}
            </>
          ) : (
            <>
              <EmptyChoice data-testid="emptyChoice">
                Veuillez choisir au moins 2 items ci-
                <ShowMobile>dessous</ShowMobile>
                <ShowDesktop>contre</ShowDesktop>.
              </EmptyChoice>
            </>
          )}
        </Choices>
      </SelectionBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-left: 1.5rem;
  margin-right: 1rem;
`;

const SelectionBox = styled.div`
  background-color: #ebfffe;
  border-radius: 1rem;
  padding: 1rem;
`;

const Choices = styled.div`
  margin-top: 1.25rem;
`;

const UpperSide = styled.div`
  border-bottom: 1px solid #a0f5ee;
  color: ${(props) => props.theme.colors.persistentText};
  padding-bottom: 1rem;
`;

const UpperSideCounting = styled.div`
  background-color: #a0f5ee;
  border-radius: 0.25rem;
  display: inline-block;
  padding: 0.125rem 0.5rem;
`;

const Count = styled.strong`
  margin-right: 0.1rem;
`;

const MaxCount = styled.span`
  margin-left: 0.1rem;
`;

const EmptyChoice = styled.div`
  font-style: italic;
  margin-top: 1rem;
  ${(props) => props.theme.mq.large} {
    font-size: 0.9rem;
  }
`;

const ShowMobile = styled.span`
  display: none;
  ${(props) => props.theme.mq.medium} {
    display: inline;
  }
`;
const ShowDesktop = styled.span`
  display: inline;
  ${(props) => props.theme.mq.medium} {
    display: none;
  }
`;
