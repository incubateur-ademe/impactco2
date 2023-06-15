export const calculateResultFunction = (values, produits, retraits, relays, engine, diffs, setDiffs, setCO2eq) => {
  let produitCode = produits.find((p) => p.uid === values.produit).publicode;
  let retraitCode = retraits.find((r) => r.uid === values.retrait).publicode;
  let relayCode = relays.find((r) => r.uid === values.relay).publicode;

  const baseSituation = {
    "livraison colis . informations . catégorie": `'${produitCode}'`,
    "livraison colis . scénario": `'${retraitCode}'`,
    "livraison colis . déplacement consommateur . distance": `'0'`,
    "livraison colis . déplacement consommateur . mode de déplacement": `'marche'`,
  };
  let baseCO2 = engine.evaluate("livraison colis").nodeValue;

  let newSituationWithKm = {
    ...baseSituation,
    "livraison colis . déplacement consommateur . distance": `'${values.km}'`,
  };
  engine.setSituation(newSituationWithKm);
  let addedCO2 = engine.evaluate("livraison colis").nodeValue;

  let newSituationWithRelay = {
    ...baseSituation,
    "livraison colis . déplacement consommateur . mode de déplacement": `'${relayCode}'`,
  };
  engine.setSituation(newSituationWithRelay);
  let addedRelay = engine.evaluate("livraison colis").nodeValue;

  setDiffs({ ...diffs, diffRelay: addedRelay - baseCO2, diffKm0: addedCO2 - baseCO2 });

  const fullSituation = {
    "livraison colis . informations . catégorie": `'${produitCode}'`,
    "livraison colis . scénario": `'${retraitCode}'`,
    "livraison colis . déplacement consommateur . distance": `'${values.km}'`,
    "livraison colis . déplacement consommateur . mode de déplacement": `'${relayCode}'`,
  };

  engine.setSituation(fullSituation);
  console.log("fullSituation", fullSituation);
  setCO2eq(engine.evaluate("livraison colis").nodeValue);
};
