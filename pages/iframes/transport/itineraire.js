import Iframe from "components/layout/Iframe";
import Itinerary from "components/transport/Itinerary";
import { TransportProvider } from "components/transport/TransportProvider";
import categories from "data/categories.json";
import React, { useEffect, useState } from "react";

export default function Itineraire(props) {
  const [isFig, setIsFig] = useState(false);

  useEffect(() => {
    setIsFig(typeof window !== "undefined" && !new URL(window.location.href).searchParams.get("source"));
  }, []);

  return (
    <>
      {isFig ? (
        <>In the window... {window.location.search}</>
      ) : (
        <>
          <Iframe>
            <TransportProvider>
              <Itinerary category={props.category} iframe />
            </TransportProvider>
          </Iframe>
        </>
      )}
    </>
  );
}
export async function getStaticProps() {
  return {
    props: {
      category: categories.find((item) => item.id === 4),
    },
  };
}
