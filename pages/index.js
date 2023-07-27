import Web from "components/layout/Web";
import Tiles from "components/misc/Tiles";
import Heading from "components/views/home/Heading";
import Visualization from "components/views/home/Visualizations";
import React from "react";

export default function Home() {
  return (
    <Web title={"Accueil"}>
      <Heading />
      <Visualization />
      <Tiles background title />
    </Web>
  );
}
