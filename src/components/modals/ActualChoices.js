import styled from "styled-components";

export default function ActualChoices() {
  return (
    <Wrapper>
      <UpperSide>3 / 3 équivalences sélectionnées</UpperSide>
      <Choices>
        <Choice>Streaming</Choice>
        <Choice>Voiture</Choice>
        <Choice>Repas au boeuf</Choice>
      </Choices>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const UpperSide = styled.div``;
const Choices = styled.div``;

const Choice = styled.div``;
