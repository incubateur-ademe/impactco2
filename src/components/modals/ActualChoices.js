import styled from "styled-components";
import useLocalStorage from "use-local-storage";

export default function ActualChoices() {
  const [eqvArray, setEqvArray] = useLocalStorage("ico2_eqv_array");

  const choiceCliked = (slug) => {
    console.log("slug", slug);
    let clonedArray = JSON.parse(JSON.stringify(eqvArray));
    const filteredAndClonedArray = clonedArray.filter((e) => e !== slug);
    console.log("filteredAndClonedArray", filteredAndClonedArray);
    setEqvArray(filteredAndClonedArray);
  };

  return (
    <Wrapper>
      <UpperSide>3 / 3 équivalences sélectionnées</UpperSide>
      <Choices>
        {eqvArray.map((slug) => {
          return (
            <Choice key={slug}>
              <Button onClick={() => choiceCliked(slug)}>ClickHere</Button>
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
