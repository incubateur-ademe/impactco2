import Wrapper from "components/misc/category/Wrapper";
import React from "react";
import styled from "styled-components";

export default function ShortList() {
  let textObjs = [
    { slug: "streamingvideo", text: "Streaming vidéo" },
    { slug: "voiturethermique", text: "Voiture thermique" },
    { slug: "boeuf", text: "Repas au boeuf" },
  ];
  return (
    <Wrapper>
      <Intro>
        <CounterNb>
          <strong>3</strong> / 3
        </CounterNb>
        <CounterText>
          <strong>équivalences</strong>sélectionnées
        </CounterText>
      </Intro>
      <List>
        {textObjs.map((textObj) => (
          <div key={textObj.slug}>{textObj.text}</div>
        ))}
      </List>
    </Wrapper>
  );
}

const Intro = styled.div`
  display: flex;
`;

const CounterNb = styled.div``;

const CounterText = styled.div``;

const List = styled.div``;
