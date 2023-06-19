import Fuse from "../../../node_modules/fuse.js/dist/fuse.basic.esm.min.js";
import Equivalent from "./tilesModal/Equivalent";
import Modal3 from "components/base/Modal3";
import TextInput from "components/base/TextInput";
import DataContext from "components/providers/DataProvider";
import ModalContext from "components/providers/ModalProvider";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const getTitle = () => {
  return (
    <Title>
      Choisir <GreenText>d&apos;autres équivalences</GreenText>
    </Title>
  );
};

export default function EqModal3() {
  const { eqv: open, setEqv: setOpen } = useContext(ModalContext);

  /** */
  const { equivalents, tiles, setTiles } = useContext(DataContext);

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [fuse, setFuse] = useState(null);

  useEffect(() => {
    if (equivalents) {
      setFuse(
        new Fuse(equivalents, {
          keys: [
            {
              name: "name",
              weight: 1,
            },
            {
              name: "slug",
              weight: 0.7,
            },
            {
              name: "subtitle",
              weight: 0.4,
            },
            {
              name: "synonyms",
              weight: 0.2,
            },
          ],
          threshold: 0.3,
          ignoreLocation: true,
        })
      );
    }
  }, [equivalents]);
  useEffect(() => {
    setResults(
      fuse && search.length > 0
        ? fuse.search(search.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
        : equivalents.map((equivalent) => ({ item: equivalent })).sort((a, b) => (a.item.slug > b.item.slug ? 1 : -1))
    );
  }, [search, fuse, equivalents]);
  /** */

  return (
    <Modal3 open={open} setOpen={setOpen} getTitle={getTitle} width="45rem">
      <Intro>Sélectionnez (ou désélectionnez) des équivalents pour créer votre infographie personnalisée.</Intro>
      <H2Title>Fruits et légumes</H2Title>

      <SearchInput
        value={search}
        onChange={({ value }) => setSearch(value)}
        placeholder={"Entrez un objet, un geste..."}
      />
      {open && (
        <Equivalents>
          {results.map(({ item }) => (
            <Equivalent
              key={item.slug}
              equivalent={item}
              checked={tiles.find((tile) => tile === item)}
              setChecked={(checked) => {
                setTiles((prevTiles) =>
                  checked ? [...prevTiles, item] : prevTiles.filter((tile) => tile.id !== item.slug)
                );
                window?._paq?.push(["trackEvent", "Interaction", "Ajouter tuile", item.slug]);
              }}
            />
          ))}
        </Equivalents>
      )}

      <H2Title>Usages du numérique</H2Title>
    </Modal3>
  );
}

const Title = styled.h2`
  font-size: 22px;
  margin: 1rem 0;
`;

const GreenText = styled.span`
  color: #1c9b93;
`;

const Intro = styled.div`
  font-size: 16px;
  font-weight: 300;
  letter-spacing: 0em;
  line-height: 24px;
`;

const H2Title = styled.div`
  color: #1c9b93;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0em;
  line-height: 24px;
`;

const SearchInput = styled(TextInput)`
  margin: 0.5rem;
`;

const Equivalents = styled.div`
  margin-bottom: 3rem;
`;
