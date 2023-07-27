import Saisons from "components/fruitsetlegumes/Saisons";
import Web from "components/layout/Web";
import Learning from "components/misc/Learning";
import categories from "data/categories.json";
import React from "react";
import { getMonth, slugs } from "utils/months";

export default function Transport(props) {
  const date = new Date();
  const month = {
    slug: slugs[date.getMonth()],
    index: date.getMonth(),
    ...getMonth(date.getMonth()),
  };

  return (
    <Web
      title={"Fruits et légumes"}
      description={props.category.meta.description}
      breadcrumb={{
        type: "equivalent",
        category: props.category,
      }}
    >
      <Saisons category={props.category} month={month} />
      <Learning category={props.category} />
    </Web>
  );
}
export async function getStaticProps() {
  return {
    props: {
      category: categories.find((item) => item.id === 9),
    },
  };
}
