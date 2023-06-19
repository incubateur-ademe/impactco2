import Fuse from "../../../node_modules/fuse.js/dist/fuse.basic.esm.min.js";
import Equivalent from "./tilesModal/Equivalent";
import TextInput from "components/base/TextInput";
import DataContext from "components/providers/DataProvider";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

export default function OtherSearch(props) {
  /** */
  const { equivalents, tiles, setTiles } = useContext(DataContext);

  const NUMERIQUE_CATEGORY = 10;
  const FRUIT_CATEGORY = 7;

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
    <Wrapper>
      <SearchInput
        value={search}
        onChange={({ value }) => setSearch(value)}
        placeholder={"Recherchez un objet ou un usage"}
      />
      {props.open && (
        <Equivalents>
          {results
            .filter((r) => r.item.category !== NUMERIQUE_CATEGORY && r.item.category !== FRUIT_CATEGORY)
            .slice(0, 3)
            .map(({ item }) => (
              <Equivalent
                key={item.slug}
                equivalent={item}
                checked={tiles.find((tile) => tile === item)}
                setChecked={(checked) => {
                  setTiles((prevTiles) => {
                    return checked ? [...prevTiles, item] : prevTiles.filter((tile) => tile.id !== item.slug);
                  });
                  window?._paq?.push(["trackEvent", "Interaction", "Ajouter tuile", item.slug]);
                }}
              />
            ))}
        </Equivalents>
      )}
    </Wrapper>
  );
}

const SearchInput = styled(TextInput)`
  margin: 0.5rem;
`;

const Equivalents = styled.div`
  margin-bottom: 3rem;
  > button {
    padding: 0;
  }
`;

const Wrapper = styled.div``;
