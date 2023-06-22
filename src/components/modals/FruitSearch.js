import Fuse from "../../../node_modules/fuse.js/dist/fuse.basic.esm.min.js";
import EquivalentRadio from "./tilesModal/EquivalentRadio";
import TextInput from "components/base/TextInput";
import DataContext from "components/providers/DataProvider";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import useLocalStorage from "use-local-storage";

export default function FruitSearch(props) {
  /** */
  // eslint-disable-next-line no-unused-vars
  const { equivalents, tiles, setTiles } = useContext(DataContext);

  const [eqv1L, setEqv1L] = useLocalStorage("ico2_eqv1L");
  const [eqv2L, setEqv2L] = useLocalStorage("ico2_eqv2L");
  const [eqv3L, setEqv3L] = useLocalStorage("ico2_eqv3L");

  const FRUIT_CATEGORY = 9;

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
        placeholder={"Recherchez un fruit ou un légume"}
      />
      {props.open && (
        <Equivalents>
          {results
            .filter((r) => r.item.category === FRUIT_CATEGORY)
            .slice(0, 3)
            .map(({ item }) => (
              <EquivalentRadio
                key={item.slug}
                equivalent={item}
                checked={(() => {
                  if (props.open === 1) return eqv1L === item.slug;
                  if (props.open === 2) return eqv2L === item.slug;
                  if (props.open === 3) return eqv3L === item.slug;
                })(props.open)}
                setChecked={() => {
                  if (props.open === 1) setEqv1L(item.slug);
                  if (props.open === 2) setEqv2L(item.slug);
                  if (props.open === 3) setEqv3L(item.slug);
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
  margin-bottom: 0;
  > button {
    padding: 0;
  }
`;

const Wrapper = styled.div``;
