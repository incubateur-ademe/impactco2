export const calculateResultFunction = (values, produits, retraits, relays, engine, setDiffs, setCO2eq) => {
  let produitCode = produits.find((p) => p.uid === values.produit).publicode;
  let retraitCode = retraits.find((r) => r.uid === values.retrait).publicode;
  let relayCode = relays.find((r) => r.uid === values.relay).publicode;

  const zeroAddendumProps = getProps(produitCode, retraitCode, "marche", "0");

  let newSituationWithKm = {
    ...zeroAddendumProps,
    "livraison colis . déplacement consommateur . distance": `'${values.km}'`,
  };
  let newSituationWithRelay = {
    ...zeroAddendumProps,
    "livraison colis . déplacement consommateur": `'${relayCode}'`,
  };

  engine.setSituation(zeroAddendumProps);
  let zeroAddendumValue = engine.evaluate("livraison colis").nodeValue;

  engine.setSituation(newSituationWithKm);
  let actualKmCO2 = engine.evaluate("livraison colis").nodeValue;

  engine.setSituation(newSituationWithRelay);
  let actualRelayCO2 = engine.evaluate("livraison colis").nodeValue;

  setDiffs({ diffRelay: actualRelayCO2 - zeroAddendumValue, diffKm0: actualKmCO2 - zeroAddendumValue });

  let fullAddendumProps = getProps(produitCode, retraitCode, relayCode, values.km);

  engine.setSituation(fullAddendumProps);
  setCO2eq(engine.evaluate("livraison colis").nodeValue);
};

const getProps = (produitCode, retraitCode, relay, km) => {
  return {
    "livraison colis . informations . catégorie": `'${produitCode}'`,
    "livraison colis . scénario": `'${retraitCode}'`,
    "livraison colis . déplacement consommateur": `'${relay}'`,
    "livraison colis . déplacement consommateur . distance": `'${km}'`,
  };
};
