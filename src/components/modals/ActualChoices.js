import { useState } from "react";
import styled from "styled-components";
import useLocalStorage from "use-local-storage";

export default function ActualChoices() {
  const [eqvArray, setEqvArray] = useLocalStorage("ico2_eqv_array");

  const MAX_CHOICES = 3;
  const [counter, setCounter] = useState(eqvArray?.length || 0);

  const removeChoice = (slug) => {
    const newArray = eqvArray.filter((ticked) => ticked.slug !== slug);
    setCounter(newArray.length);
    setEqvArray(newArray);
  };

  return (
    <Wrapper>
      <UpperSide>
        {counter} / {MAX_CHOICES} équivalences sélectionnées
      </UpperSide>
      <Choices>
        {eqvArray.map((ticked) => {
          return (
            <Choice key={ticked.slug}>
              <ChoiceTick onClick={() => removeChoice(ticked.slug)}>
                <Tick></Tick>
              </ChoiceTick>
              <div>{ticked.name}</div>
            </Choice>
          );
        })}
      </Choices>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const UpperSide = styled.div``;
const Choices = styled.div``;

const ChoiceTick = styled.div`
  background-color: #26827c;
  border: 1px solid #26827c;
  border-radius: 4px;
  height: 24px;
  width: 24px;
`;

const Choice = styled.div`
  display: flex;
`;
const Tick = styled.div`
  border-bottom: 2px solid white;
  border-right: 2px solid white;
  display: inline-block;
  height: 10px;
  margin-bottom: 2px;
  margin-left: 35%;
  transform: rotate(45deg);
  width: 5px;
`;
