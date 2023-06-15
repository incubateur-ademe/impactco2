export const calculateResultFunction = (values, produits, retraits, relays, engine, diffs, setDiffs, setCO2eq) => {
  let produitCode = produits.find((p) => p.uid === values.produit).publicode;
  let retraitCode = retraits.find((r) => r.uid === values.retrait).publicode;
  let relayCode = relays.find((r) => r.uid === values.relay).publicode;
  console.log("relayCode", relayCode);

  const produitsEtRetraits = {
    "livraison colis . informations . catégorie": `'${produitCode}'`,
    "livraison colis . scénario": `'${retraitCode}'`,
    "livraison colis . déplacement consommateur . mode de déplacement": `'marche'`,
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
  console.log("zeroKmCO2", zeroKmCO2);

  engine.setSituation(newSituationWithKm);
  let actualKmCO2 = engine.evaluate("livraison colis").nodeValue;
  console.log("actualKmCO2", actualKmCO2);

  let newSituationRelay = {
    ...produitsEtRetraits,
    "livraison colis . déplacement consommateur . distance": `'${values.km}'`,
    "livraison colis . déplacement consommateur . mode de déplacement": `'${relayCode}'`,
  };
  engine.setSituation(newSituationRelay);
  let actualRelay = engine.evaluate("livraison colis").nodeValue;
  console.log("actualRelay", actualRelay);

  setDiffs({ ...diffs, diffKm0: actualKmCO2 - zeroKmCO2 });
  setCO2eq(engine.evaluate("livraison colis").nodeValue);
};
