import Fuse from "../../../node_modules/fuse.js/dist/fuse.basic.esm.min.js";
// import useLocalStorage from "use-local-storage";
import AllSearchCategory from "./AllSearchCategory.js";
// import EquivalentSquare from "./tilesModal/EquivalentSquare";
import TextInput from "components/base/TextInput";
import DataContext from "components/providers/DataProvider";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

export default function AllSearch(props) {
  /** */
  // eslint-disable-next-line no-unused-vars
  const { equivalents } = useContext(DataContext);

  // const [eqv1L, setEqv1L] = useLocalStorage("ico2_eqv1L");
  // const [eqv2L, setEqv2L] = useLocalStorage("ico2_eqv2L");
  // const [eqv3L, setEqv3L] = useLocalStorage("ico2_eqv3L");

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

  return (
    <Wrapper>
      <SearchInput
        value={search}
        onChange={({ value }) => setSearch(value)}
        placeholder={"Recherchez un objet ou un geste"}
      />
      {props.open && (
        <>
          <AllSearchCategory items={results} cat={"fruitsetlegumes"} />
          <AllSearchCategory items={results} cat={"usagenumerique"} />
        </>
      )}
    </Wrapper>
  );
}

const SearchInput = styled(TextInput)`
  margin: 0.5rem;
`;

const Wrapper = styled.div`
  margin-bottom: 2rem;
  margin-top: 1rem;
`;
