export const calculateResultFunction = (
  values,
  produits,
  retraits,
  relays,
  engine,
  diffs,
  setDiffs,
  setCO2eq,
  isHabit
) => {
  let produitCode = produits.find((p) => p.uid === values.produit).publicode;
  let retraitCode = retraits.find((r) => r.uid === values.retrait).publicode;
  let relayCode = relays.find((r) => r.uid === values.relay).publicode;

  const baseCodes = getPublicodes(produitCode, retraitCode, relayCode, "0");
  engine.setSituation(baseCodes);
  let zeroKmCO2 = engine.evaluate("livraison colis").nodeValue;

  const kmCodes = getPublicodes(produitCode, retraitCode, relayCode, values.km);
  engine.setSituation(kmCodes);
  let actualKmCO2 = engine.evaluate("livraison colis").nodeValue;

  if (isHabit) {
    setDiffs({ ...diffs, diffKm0: 0 });
    setCO2eq(zeroKmCO2);
  } else {
    setDiffs({ ...diffs, diffKm0: actualKmCO2 - zeroKmCO2 });
    setCO2eq(actualKmCO2);
  }
};

const getPublicodes = (produitCode, retraitCode, relayCode, km) => {
  return {
    "livraison colis . informations . catégorie": `'${produitCode}'`,
    "livraison colis . scénario": `'${retraitCode}'`,
    "livraison colis . déplacement consommateur . mode de déplacement": `'${relayCode}'`,
    "livraison colis . déplacement consommateur . distance": `'${km}'`,
  };
};
