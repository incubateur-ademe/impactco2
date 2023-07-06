import Web from "components/layout/Web";
import About from "components/layout/web/footer/About";
import Contact from "components/layout/web/footer/Contact";
import Tiles from "components/misc/Tiles";
import Heading from "components/views/home/Heading";
import Visualization from "components/views/home/Visualizations";
import React from "react";

export default function Home() {
  return (
    <Web>
      <Heading />
      <Visualization />
      <Tiles background title />
      <Contact />
      <About />
    </Web>
  );
}
