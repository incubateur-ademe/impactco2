import MagicLink from "components/base/MagicLink";
import Section from "components/base/Section";
import React from "react";
import styled from "styled-components";
import { formatName } from "utils/formatters";

const Wrapper = styled.div`
  font-size: 0.75rem;
  font-weight: 300;
  height: 1.05rem;
  margin-bottom: 1.75rem;
`;
export default function BreadCrumb(props) {
  return (
    <Section>
      <Section.Content>
        <Wrapper>
          {props.breadcrumb && props.breadcrumb.type === "equivalent" && (
            <>
              <nav aria-label="fil d'ariane">
                <MagicLink to="/categories">Catégories</MagicLink>
                {" > "}{" "}
                {props.breadcrumb.equivalent ? (
                  <>
                    <MagicLink to={`/${props.breadcrumb.category.slug}`}>{props.breadcrumb.category.name}</MagicLink>
                    {" > "}
                    {formatName(props.breadcrumb.equivalent.name, 1, true)}
                  </>
                ) : (
                  props.breadcrumb.category.name
                )}
              </nav>
            </>
          )}
        </Wrapper>
      </Section.Content>
    </Section>
  );
}
