import { useState } from "react";
import styled from "styled-components";
import useLocalStorage from "use-local-storage";

export default function ActualChoices() {
  const [eqvArray, setEqvArray] = useLocalStorage("ico2_eqv_array");

  const MAX_CHOICES = 3;
  const [counter, setCounter] = useState(MAX_CHOICES);

  const removeChoice = (slug) => {
    let clonedArray = JSON.parse(JSON.stringify(eqvArray));
    const filteredAndClonedArray = clonedArray.filter((e) => e !== slug);
    setCounter(filteredAndClonedArray.length);
    setEqvArray(filteredAndClonedArray);
  };

  return (
    <Wrapper>
      <UpperSide>
        {counter} / {MAX_CHOICES} équivalences sélectionnées
      </UpperSide>
      <Choices>
        {eqvArray.map((slug) => {
          return (
            <Choice key={slug}>
              <Button onClick={() => removeChoice(slug)}>ClickHere</Button>
              {slug}
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

const Choice = styled.div``;

const Button = styled.button`
  cursor: pointer;
`;
