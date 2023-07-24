import MagicLink from "components/base/MagicLink";
import Section2 from "components/base/Section2";
import React from "react";
import styled from "styled-components";
import { formatName } from "utils/formatters";

const Wrapper = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  height: 3.05rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  padding: 1rem;
`;
export default function BreadCrumb2(props) {
  const naming = props.breadcrumb.category.breadcrumb || props.breadcrumb.category.name;

  return (
    <Section2>
      <Section2.InnerMargin>
        <nav aria-label="fil d'ariane">
          <Wrapper>
            {props.breadcrumb && props.breadcrumb.type === "equivalent" && (
              <>
                <MagicLink to="/categories">Catégories</MagicLink>
                {" > "}{" "}
                {props.breadcrumb.equivalent ? (
                  <>
                    <MagicLink to={`/${props.breadcrumb.category.slug}`}>{naming}</MagicLink>
                    {" > "}
                    {formatName(naming, 1, true)}
                  </>
                ) : (
                  naming
                )}
              </>
            )}
          </Wrapper>
        </nav>
      </Section2.InnerMargin>
    </Section2>
  );
}
