export const calculateResultFunction = (
  values,
  produits,
  retraits,
  relays,
  engine,
  diffs,
  setDiffs,
  setCO2eq,
  isHabit,
  isPlane
) => {
  let produitCode = produits.find((p) => p.uid === values.produit).publicode
  let retraitCode = retraits.find((r) => r.uid === values.retrait).publicode
  let relayCode = relays.find((r) => r.uid === values.relay).publicode

  const baseCodes = getPublicodes(produitCode, retraitCode, relayCode, '0')
  engine.setSituation(baseCodes)
  let zeroKmCO2 = engine.evaluate('livraison colis').nodeValue

  const kmCodes = getPublicodes(produitCode, retraitCode, relayCode, values.km)
  engine.setSituation(kmCodes)
  let actualKmCO2 = engine.evaluate('livraison colis').nodeValue
  let diffKm0 = isHabit ? 0 : actualKmCO2 - zeroKmCO2

  const kmPlane = getPublicodes(produitCode, retraitCode, relayCode, '0')
  engine.setSituation(kmPlane)
  let kmCO2Plane = engine.evaluate('livraison colis par avion').nodeValue
  let diffPlane = isPlane ? kmCO2Plane - zeroKmCO2 : 0

  setDiffs({ ...diffs, diffPlane: diffPlane, diffKm0: diffKm0 })
  setCO2eq(zeroKmCO2 + diffPlane + diffKm0)
}

const getPublicodes = (produitCode, retraitCode, relayCode, km) => {
  return {
    'livraison colis . informations . catégorie': `'${produitCode}'`,
    'livraison colis . scénario': `'${retraitCode}'`,
    'livraison colis . déplacement consommateur . mode de déplacement': `'${relayCode}'`,
    'livraison colis . déplacement consommateur . distance': `'${km}'`,
  }
}
