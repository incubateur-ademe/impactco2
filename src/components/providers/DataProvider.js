import categories from "data/categories.json";
import boisson from "data/categories/boisson.json";
import chauffage from "data/categories/chauffage.json";
import deplacement from "data/categories/deplacement.json";
import divers from "data/categories/divers.json";
import electromenager from "data/categories/electromenager.json";
import fruitsetlegumes from "data/categories/fruitsetlegumes.json";
import habillement from "data/categories/habillement.json";
import mobilier from "data/categories/mobilier.json";
import numerique from "data/categories/numerique.json";
import repas from "data/categories/repas.json";
import usagenumerique from "data/categories/usagenumerique.json";
import ecv from "data/ecv.json";
import useFruitsEtLegumes from "hooks/useFruitsEtLegumes";
import React, { useState } from "react";

const DataContext = React.createContext({});

let equivalents = [
  ...boisson,
  ...deplacement,
  ...electromenager,
  ...habillement,
  ...mobilier,
  ...numerique,
  ...usagenumerique,
  ...repas,
  ...chauffage,
  ...fruitsetlegumes,
  ...divers,
].map((equivalent) => ({ ...equivalent, id: equivalent.slug }));

export function DataProvider(props) {
  const [tiles, setTiles] = useState([]);

  const [eqv1, setEqv1] = useState({});
  const [eqv2, setEqv2] = useState({});
  const [eqv3, setEqv3] = useState({});
  const [eqvTarget, setEqvTarget] = useState("");

  const { data: fetchedFl } = useFruitsEtLegumes();
  console.log("fetchedFl", fetchedFl);

  if (Array.isArray(fetchedFl)) {
    console.log("fetchedFl is array, mehhhhhhhhhhh--------------");
    equivalents = [
      ...boisson,
      ...deplacement,
      ...electromenager,
      ...habillement,
      ...mobilier,
      ...numerique,
      ...usagenumerique,
      ...repas,
      ...chauffage,
      ...fetchedFl,
      ...divers,
    ].map((equivalent) => ({ ...equivalent, id: equivalent.slug }));
  } else {
    console.log("fetchedFl is bwaarf");
  }

  return (
    <DataContext.Provider
      value={{
        equivalents,
        categories,
        ecv,
        eqv1,
        setEqv1,
        eqv2,
        setEqv2,
        eqv3,
        setEqv3,
        eqvTarget,
        setEqvTarget,
        tiles,
        setTiles,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}

export default DataContext;
