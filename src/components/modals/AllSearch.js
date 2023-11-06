import AllSearchCategory from "./AllSearchCategory.js";
import TextInput from "components/base/TextInput";
import DataContext from "components/providers/DataProvider";
import Fuse from "fuse.js";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

export default function AllSearch(props) {
  /** */
  // eslint-disable-next-line no-unused-vars
  const { equivalents } = useContext(DataContext);

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
        placeholder={"Rechercher un objet ou un geste"}
      />
      {props.open && (
        <>
          <AllSearchCategory items={results} cat={"numerique"} singleton={results?.length === 1} />
          <AllSearchCategory items={results} cat={"usagenumerique"} singleton={results?.length === 1} />
          <AllSearchCategory items={results} cat={"fruitsetlegumes"} singleton={results?.length === 1} />
          <AllSearchCategory items={results} cat={"repas"} singleton={results?.length === 1} />
          <AllSearchCategory items={results} cat={"chauffage"} singleton={results?.length === 1} />
          <AllSearchCategory items={results} cat={"transport"} singleton={results?.length === 1} />
          <AllSearchCategory items={results} cat={"habillement"} singleton={results?.length === 1} />
          <AllSearchCategory items={results} cat={"electromenager"} singleton={results?.length === 1} />
          <AllSearchCategory items={results} cat={"boisson"} singleton={results?.length === 1} />
          <AllSearchCategory items={results} cat={"mobilier"} singleton={results?.length === 1} mb={"17rem"} />
        </>
      )}
    </Wrapper>
  );
}

const SearchInput = styled(TextInput)`
  background-image: url("data:image/svg+xml,%3Csvg width='72px' height='68px' viewBox='0 0 72 68' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='imgloop' transform='translate(5.000000, 5.000000)' stroke='%2326827C' stroke-width='10'%3E%3Ccircle id='Oval' cx='25.5' cy='25.5' r='25.5'%3E%3C/circle%3E%3Cpath d='M47.5,43.5 L59.5415946,55.5415946' id='Line' stroke-linecap='square'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-position: 98% 53%;
  background-repeat: no-repeat;
  background-size: 4%;
  input::placeholder {
    font-weight: 300;
  }
  ${(props) => props.theme.mq.medium} {
    background-size: 3%;
  }
  ${(props) => props.theme.mq.small} {
    background-size: 5%;
  }
  margin: 0.5rem 0.5rem 0.5rem 0;
`;

const Wrapper = styled.div`
  margin: 1rem 2rem 1rem 1rem;
  ${(props) => props.theme.mq.medium} {
    margin-left: 2.25rem;
  }
`;
