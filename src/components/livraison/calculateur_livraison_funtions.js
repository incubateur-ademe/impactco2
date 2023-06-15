export const calculateResultFunction = (values, produits, retraits, engine, diffs, setDiffs, setCO2eq) => {
  let produitCode = produits.find((p) => p.uid === values.produit).publicode;
  let retraitCode = retraits.find((r) => r.uid === values.retrait).publicode;

  const produitsEtRetraits = {
    "livraison colis . informations . catégorie": `'${produitCode}'`,
    "livraison colis . scénario": `'${retraitCode}'`,
  };

  let newSituation0km = {
    ...produitsEtRetraits,
    "livraison colis . déplacement consommateur . distance": `'0'`,
  };

  let newSituationWithKm = {
    ...produitsEtRetraits,
    "livraison colis . déplacement consommateur . distance": `'${values.km}'`,
  };

  engine.setSituation(newSituation0km);
  let zeroKmCO2 = engine.evaluate("livraison colis").nodeValue;

  engine.setSituation(newSituationWithKm);
  let actualKmCO2 = engine.evaluate("livraison colis").nodeValue;

  setDiffs({ ...diffs, diffKm0: actualKmCO2 - zeroKmCO2 });
  setCO2eq(engine.evaluate("livraison colis").nodeValue);
};
