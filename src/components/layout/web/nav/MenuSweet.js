import DropdownSweet from "./menu/DropdownSweet";
import Emoji from "components/base/Emoji";
import DataContext from "components/providers/DataProvider";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import styled from "styled-components";

const Wrapper = styled.nav`
  display: flex;
`;
const StyledEmoji = styled(Emoji)`
  font-size: 1.25rem;
  margin: 0 0.25rem 0.25rem 0;
`;
export default function MenuSweet(props) {
  const { categories } = useContext(DataContext);

  const router = useRouter();
  const slugs = router.asPath.split("/").filter((slug) => slug);

  return (
    <Wrapper shouldDisplay={props.shouldDisplay}>
      <DropdownSweet
        label={"Par thématique"}
        current={categories.find((category) => slugs.includes(category.slug))}
        hideon={"never"}
      >
        {categories
          ?.filter((category) => category.display)
          .map((category) => (
            <DropdownSweet.Item key={category.id} to={`/${category.slug}`} current={slugs.includes(category.slug)}>
              <StyledEmoji>{category.emoji}</StyledEmoji> {category.name}
            </DropdownSweet.Item>
          ))}
      </DropdownSweet>
    </Wrapper>
  );
}
