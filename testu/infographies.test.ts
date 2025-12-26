import { computedEquivalents } from 'src/providers/equivalents'
import { ComputedEquivalent, EquivalentValue } from 'types/equivalent'
import { imageInfographies } from 'src/components/outils/equivalents/infographies/list'
import { livraisonData } from 'src/components/outils/livraison/LivraisonData'

type EquivalentWithECV = ComputedEquivalent & { ecv: EquivalentValue[]; total: number }

const round = (value: number) => Math.round(value * 100) / 100

const formatFr = (value: number) => {
  return round(value).toLocaleString('fr-FR')
}

describe('infographies', () => {
  test('Boeuf - Pomme - Mangue', () => {
    // agriculture-vs-transport
    const boeuf = computedEquivalents.find((v) => v.slug === 'boeuf') as EquivalentWithECV
    const pomme = computedEquivalents.find((v) => v.slug === 'pomme') as EquivalentWithECV
    const mangue = computedEquivalents.find((v) => v.slug === 'mangue') as EquivalentWithECV

    const boeufAgriculture = round(boeuf?.ecv.find((ecv) => ecv.id === 30)?.value as number)
    const boeufTransport = round(boeuf?.ecv.find((ecv) => ecv.id === 33)?.value as number)
    const boeufTotal = round(boeuf?.ecv.reduce((acc, ecv) => acc + ecv.value, 0) as number)

    expect(boeufAgriculture).toBe(27.32)
    expect(boeufTransport).toBe(0.31)
    expect(boeufTotal).toBe(28.01)

    const pommeTotal = round(pomme?.total as number)
    expect(pommeTotal).toBe(0.41)

    const mangueTotal = round(mangue?.total as number)
    expect(mangueTotal).toBe(11.66)

    const agricultureTransportAlt = imageInfographies.boeuf[0].alt

    const boeufAutres = round(boeufTotal - boeufAgriculture - boeufTransport)
    const pommeAgriculture = round(pomme?.ecv.find((ecv) => ecv.id === 30)?.value as number)
    const pommeTransport = 0.26
    const pommeAutres = round(pommeTotal - pommeAgriculture - pommeTransport)
    const mangueTransport = 11.4
    const mangueAgriculture = round(mangue?.ecv.find((ecv) => ecv.id === 30)?.value as number)
    const mangueAutres = round(mangueTotal - mangueAgriculture - mangueTransport)

    const expectedAlt =
      `Quel est l’impact de l’agriculture et du transport dans l’alimentation ? ` +
      `Pour 1 kg de boeuf, l’agriculture représente ${formatFr(boeufAgriculture)} kg CO2e, ` +
      `le transport représente ${formatFr(boeufTransport)} kg CO2e et les autres étapes représentent ${formatFr(boeufAutres)} kg CO2e. ` +
      `Le total pour 1 kg de boeuf est ${formatFr(boeufTotal)} kg CO2e. ` +
      `Pour 1 kg de pomme, l’agriculture représente ${formatFr(pommeAgriculture)} kg CO2e, ` +
      `le transport représente ${formatFr(pommeTransport)} kg CO2e et les autres étapes représentent ${formatFr(pommeAutres)} kg CO2e. ` +
      `Le total pour 1 kg de pomme est ${formatFr(pommeTotal)} kg CO2e. ` +
      `Pour 1 kg de mangue, l’agriculture représente ${formatFr(mangueAgriculture)} kg CO2e, ` +
      `le transport ${formatFr(mangueTransport)} kg CO2e et les autres étapes représentent ${formatFr(mangueAutres)} kg CO2e. ` +
      `Le total pour 1 kg de mangue est de ${formatFr(mangueTotal)} kg CO2e. ` +
      `Source : Agribalyse.`

    expect(agricultureTransportAlt).toBe(expectedAlt)
  })

  test('Frites - Pomme de terre', () => {
    // produit-transdo-vs-produit-brut
    const frites = computedEquivalents.find((v) => v.slug === 'frites') as EquivalentWithECV
    const pommedeterre = computedEquivalents.find((v) => v.slug === 'pommedeterre') as EquivalentWithECV

    const fritesPackagingTransport = round(
      (frites?.ecv.find((ecv) => ecv.id === 31)?.value as number) +
        (frites?.ecv.find((ecv) => ecv.id === 32)?.value as number)
    )
    const fritesTransport = round(frites?.ecv.find((ecv) => ecv.id === 33)?.value as number)
    const fritesTotal = round(frites?.ecv.reduce((acc, ecv) => acc + ecv.value, 0) as number)

    expect(fritesPackagingTransport).toBe(0.38)
    expect(fritesTransport).toBe(0.39)
    expect(fritesTotal).toBe(1.46)

    const pommedeterrePackagingTransport = round(
      (pommedeterre?.ecv.find((ecv) => ecv.id === 31)?.value as number) +
        (pommedeterre?.ecv.find((ecv) => ecv.id === 32)?.value as number)
    )
    const pommedeterreTransport = round(pommedeterre?.ecv.find((ecv) => ecv.id === 33)?.value as number)
    const pommedeterreTotal = round(pommedeterre?.ecv.reduce((acc, ecv) => acc + ecv.value, 0) as number)

    expect(pommedeterrePackagingTransport).toBe(0.41)
    expect(pommedeterreTransport).toBe(0.18)
    expect(pommedeterreTotal).toBe(0.71)

    const produitTransformeAlt = imageInfographies.frites[0].alt

    const fritesAutres = round(fritesTotal - fritesPackagingTransport - fritesTransport)
    const pommedeterreAutres = round(pommedeterreTotal - pommedeterrePackagingTransport - pommedeterreTransport)

    const expectedAlt =
      `Quel est l’impact des aliments transformés ? ` +
      `Pour 1 kg de frites (friteuse), l’emballage et transformation représente ${formatFr(fritesPackagingTransport)} kg CO2e, ` +
      `le transport représente ${formatFr(fritesTransport)} kg CO2e et les autres étapes représentent ${formatFr(fritesAutres)} kg CO2e. ` +
      `Le total pour 1 kg de frites est ${formatFr(fritesTotal)} kg CO2e. ` +
      `Pour 1 kg de pommes de terre nouvelles, l’emballage et transformation représente ${formatFr(pommedeterrePackagingTransport)} kg CO2e, ` +
      `le transport représente ${formatFr(pommedeterreTransport)} kg CO2e et les autres étapes représentent ${formatFr(pommedeterreAutres)} kg CO2e. ` +
      `Le total pour 1 kg de pommes de terre nouvelles est ${formatFr(pommedeterreTotal)} kg CO2e. ` +
      `Source : Agribalyse.`

    expect(produitTransformeAlt).toBe(expectedAlt)
  })

  test('Porc - Oeufs - Tofu', () => {
    // viandes-vs-alternatives
    const porc = computedEquivalents.find((v) => v.slug === 'porc') as EquivalentWithECV
    const oeuf = computedEquivalents.find((v) => v.slug === 'oeuf') as EquivalentWithECV
    const tofu = computedEquivalents.find((v) => v.slug === 'tofu') as EquivalentWithECV

    const porcAgriculture = round(porc?.ecv.find((ecv) => ecv.id === 30)?.value as number)
    const porcTransport = round(porc?.ecv.find((ecv) => ecv.id === 33)?.value as number)
    const porcTotal = round(porc?.ecv.reduce((acc, ecv) => acc + ecv.value, 0) as number)

    expect(porcAgriculture).toBe(6.07)
    expect(porcTransport).toBe(0.29)
    expect(porcTotal).toBe(6.67)

    const oeufAgriculture = round(oeuf?.ecv.find((ecv) => ecv.id === 30)?.value as number)
    const oeufTransport = round(oeuf?.ecv.find((ecv) => ecv.id === 33)?.value as number)
    const oeufTotal = round(oeuf?.ecv.reduce((acc, ecv) => acc + ecv.value, 0) as number)

    expect(oeufAgriculture).toBe(1.49)
    expect(oeufTransport).toBe(0.19)
    expect(oeufTotal).toBe(1.88)

    const tofuAgriculture = round(tofu?.ecv.find((ecv) => ecv.id === 30)?.value as number)
    const tofuTransport = round(tofu?.ecv.find((ecv) => ecv.id === 33)?.value as number)
    const tofuTotal = round(tofu?.ecv.reduce((acc, ecv) => acc + ecv.value, 0) as number)

    expect(tofuAgriculture).toBe(0.09)
    expect(tofuTransport).toBe(0.23)
    expect(tofuTotal).toBe(1.0)

    const viandesAlt = imageInfographies.porc[0].alt

    const porcAutres = round(porcTotal - porcAgriculture - porcTransport)
    const oeufAutres = round(oeufTotal - oeufAgriculture - oeufTransport)
    const tofuAutres = round(tofuTotal - tofuAgriculture - tofuTransport)

    const expectedAlt =
      `Quel est l’impact de la viande et de ses alternatives ? ` +
      `Pour 1 kg de porc, l’agriculture représente ${formatFr(porcAgriculture)} kg CO2e, ` +
      `le transport représente ${formatFr(porcTransport)} kg CO2e et les autres étapes représentent ${formatFr(porcAutres)} kg CO2e. ` +
      `Le total pour 1 kg de porc est ${formatFr(porcTotal)} Kg CO2e. ` +
      `Pour 1 kg d’oeufs, l’agriculture représente ${formatFr(oeufAgriculture)} kg CO2e, ` +
      `le transport représente ${formatFr(oeufTransport)} kg CO2e et les autres étapes représentent ${formatFr(oeufAutres)} kg CO2e. ` +
      `Le total pour 1 kg d’oeufs est ${formatFr(oeufTotal)} Kg CO2e. ` +
      `Pour 1 kg de tofu, l’agriculture représente ${formatFr(tofuAgriculture)} kg CO2e, ` +
      `le transport ${formatFr(tofuTransport)} kg CO2e et les autres étapes représentent ${formatFr(tofuAutres)} kg CO2e. ` +
      `Le total pour 1 kg de tofu est de ${formatFr(tofuTotal)} Kg CO2e. ` +
      `Source : Agribalyse.`

    expect(viandesAlt).toBe(expectedAlt)
  })

  test('Mangue par bateau - Mangue par avion', () => {
    // infographie-mangues
    const mangueAvion = computedEquivalents.find((v) => v.slug === 'mangue' && 'ecv' in v) as EquivalentWithECV
    const mangueBateau = computedEquivalents.find((v) => v.slug === 'manguebateau') as EquivalentWithECV

    const mangueAvionAgriculture = round(mangueAvion?.ecv.find((ecv) => ecv.id === 30)?.value as number)
    const mangueAvionTransport = round(mangueAvion?.ecv.find((ecv) => ecv.id === 33)?.value as number)
    const mangueAvionTotal = round(mangueAvion?.ecv.reduce((acc, ecv) => acc + ecv.value, 0) as number)

    expect(mangueAvionAgriculture).toBe(0.15)
    expect(mangueAvionTransport).toBe(11.4)
    expect(mangueAvionTotal).toBe(11.66)

    const mangueBateauAgriculture = round(mangueBateau?.ecv.find((ecv) => ecv.id === 30)?.value as number)
    const mangueBateauTransport = round(mangueBateau?.ecv.find((ecv) => ecv.id === 33)?.value as number)
    const mangueBateauTotal = round(mangueBateau?.ecv.reduce((acc, ecv) => acc + ecv.value, 0) as number)

    expect(mangueBateauAgriculture).toBe(0.15)
    expect(mangueBateauTransport).toBe(0.47)
    expect(mangueBateauTotal).toBe(0.73)

    const manguesAlt = imageInfographies.mangue[1].alt

    const mangueAvionAutres = round(mangueAvionTotal - mangueAvionAgriculture - mangueAvionTransport)
    const mangueBateauAutres = round(mangueBateauTotal - mangueBateauAgriculture - mangueBateauTransport)

    const expectedAlt =
      `Quelle est la différence entre ces deux mangues ? ` +
      `La mangue importée par bateau représente ${formatFr(mangueBateauTotal)} kg CO2e pour 1 kg de mangue ` +
      `(${formatFr(mangueBateauAgriculture)} kg CO2e pour l'agriculture, ${formatFr(mangueBateauTransport)} kg CO2e pour le transport et ${formatFr(mangueBateauAutres)} kg CO2e pour le reste). ` +
      `La mangue importée par avion représente ${formatFr(mangueAvionTotal)} kg CO2e pour 1 kg de mangue ` +
      `(${formatFr(mangueAvionAgriculture)} kg CO2e pour l'agriculture, ${formatFr(mangueAvionTransport)} kg CO2e pour le transport et ${formatFr(mangueAvionAutres)} kg CO2e pour le reste). ` +
      `Source : Agribalyse.`

    expect(manguesAlt).toBe(expectedAlt)
  })

  test('Résidence secondaire - Location - Hôtel - Camping', () => {
    // Impact-transport-cas-pratiques
    const residencesecondaire = computedEquivalents.find((v) => v.slug === 'residencesecondaire') as EquivalentWithECV
    const location = computedEquivalents.find((v) => v.slug === 'location') as EquivalentWithECV
    const hotel = computedEquivalents.find((v) => v.slug === 'hotel') as EquivalentWithECV
    const camping = computedEquivalents.find((v) => v.slug === 'camping') as EquivalentWithECV

    const residencesecondaireTotal = round(residencesecondaire?.ecv.reduce((acc, ecv) => acc + ecv.value, 0) as number)

    expect(residencesecondaireTotal).toBe(7.0)

    const locationTotal = round(location?.ecv.reduce((acc, ecv) => acc + ecv.value, 0) as number)

    expect(locationTotal).toBe(5.2)

    const hotelTotal = round(hotel?.ecv.reduce((acc, ecv) => acc + ecv.value, 0) as number)

    expect(hotelTotal).toBe(4.3)

    const campingTotal = round(camping?.total as number)

    expect(campingTotal).toBe(1.4)

    const hebergementAlt = imageInfographies.hotel[0].alt

    const expectedAlt =
      `Quel est l’impact de nos choix d’hébergement ? ` +
      `1 nuit en résidence secondaire représente ${formatFr(residencesecondaireTotal)} kg CO2e. ` +
      `1 nuit dans un hôtel représente ${formatFr(hotelTotal)} kg CO2e. ` +
      `1 nuit dans une location représente ${formatFr(locationTotal)} kg CO2e. ` +
      `1 nuit au camping représente ${formatFr(campingTotal)} kg CO2e. ` +
      `Source : ADEME.`

    expect(hebergementAlt).toBe(expectedAlt)
  })

  test('Avion - Voiture - TGV (1000km AR + 3 nuits hôtel)', () => {
    // Impact-transport-hotellerie-3-nuits-a-500km
    const avion = computedEquivalents.find((v) => v.slug === 'avion-courtcourrier') as EquivalentWithECV
    const voiture = computedEquivalents.find((v) => v.slug === 'voiturethermique') as EquivalentWithECV
    const tgv = computedEquivalents.find((v) => v.slug === 'tgv') as EquivalentWithECV
    const hotel = computedEquivalents.find((v) => v.slug === 'hotel') as EquivalentWithECV

    const distance = 1000
    const personne = 2
    const nuits = 3

    const avionTrajet = round((avion?.ecv.reduce((acc, ecv) => acc + ecv.value, 0) as number) * distance * personne)
    const voitureTrajet = round((voiture?.ecv.reduce((acc, ecv) => acc + ecv.value, 0) as number) * distance)
    const tgvTrajet = round((tgv?.ecv.reduce((acc, ecv) => acc + ecv.value, 0) as number) * distance * personne)

    expect(avionTrajet).toBe(449.14)
    expect(voitureTrajet).toBe(217.6)
    expect(tgvTrajet).toBe(5.86)

    const hotelNuits = round((hotel?.ecv.reduce((acc, ecv) => acc + ecv.value, 0) as number) * nuits * personne)

    expect(hotelNuits).toBe(25.8)

    const totalAvion = round(avionTrajet + hotelNuits)

    expect(totalAvion).toBe(474.94)

    const totalVoiture = round(voitureTrajet + hotelNuits)

    expect(totalVoiture).toBe(243.4)

    const totalTgv = round(tgvTrajet + hotelNuits)

    expect(totalTgv).toBe(31.66)

    const voyageAlt = imageInfographies.hotel[1].alt

    const expectedAlt =
      `Quel est l’impact du transport pour un voyage de 4 jours à 2 personnes ? (3 nuits à l’hôtel, à 500 km du domicile, soit un trajet à 2 personnes de 1000 km aller-retour). ` +
      `En avion (court courrier), le trajet Aller Retour représente ${formatFr(avionTrajet)} kg CO2e, l’hébergement ${formatFr(hotelNuits)} kg CO2e, soit un total de ${formatFr(totalAvion)} kg CO2e. ` +
      `En voiture (thermique), le trajet Aller Retour représente ${formatFr(voitureTrajet)} kg CO2e, l’hébergement ${formatFr(hotelNuits)} kg CO2e, soit un total de ${formatFr(totalVoiture)} kg CO2e. ` +
      `En TGV, le trajet Aller Retour représente ${formatFr(tgvTrajet)} kg CO2e, l’hébergement ${formatFr(hotelNuits)} kg CO2e, soit un total de ${formatFr(totalTgv)} kg CO2e. ` +
      `Source : ADEME.`

    expect(voyageAlt).toBe(expectedAlt)
  })

  test('Cafetière - Smartphone - Lit Complet (coût de fabrication et de livraison à domicile)', () => {
    // infographie-fabrication-vs-livraison
    expect(livraisonData.cafetiere.fabrication).toEqual(41)
    expect(livraisonData.smartphone.fabrication).toEqual(85)
    expect(livraisonData.lit.fabrication).toEqual(421)

    const cafetiereLivraison = round(
      livraisonData.cafetiere.ecv.livraisondomicile.reduce((acc, item) => acc + item.value, 0)
    )
    const smartphoneLivraison = round(
      livraisonData.smartphone.ecv.livraisondomicile.reduce((acc, item) => acc + item.value, 0)
    )
    const litLivraison = round(livraisonData.lit.ecv.livraisondomicile.reduce((acc, item) => acc + item.value, 0))

    expect(cafetiereLivraison).toBe(3.09)
    expect(smartphoneLivraison).toBe(0.25)
    expect(litLivraison).toBe(59.07)

    const cafetiereTotal = round(livraisonData.cafetiere.fabrication + cafetiereLivraison)
    const smartphoneTotal = round(livraisonData.smartphone.fabrication + smartphoneLivraison)
    const litTotal = round(livraisonData.lit.fabrication + litLivraison)

    expect(cafetiereTotal).toBe(44.09)
    expect(smartphoneTotal).toBe(85.25)
    expect(litTotal).toBe(480.07)

    const fabricationLivraisonAlt = imageInfographies.livraisondomicile[0].alt

    const expectedAlt =
      `Quel est l’impact de la fabrication de nos achats par rapport à leur livraison ? ` +
      `Pour la livraison à domicile d’une cafetière, la fabrication représente ${formatFr(livraisonData.cafetiere.fabrication)} kg CO2e, ` +
      `la logistique et livraison représente ${formatFr(cafetiereLivraison)} kg CO2e, soit un total de ${formatFr(cafetiereTotal)} kg CO2e. ` +
      `Pour la livraison à domicile d’un smartphone, la fabrication représente ${formatFr(livraisonData.smartphone.fabrication)} kg CO2e, ` +
      `la logistique et livraison représente ${formatFr(smartphoneLivraison)} kg CO2e, soit un total de ${formatFr(smartphoneTotal)} kg CO2e. ` +
      `Pour la livraison à domicile d’un lit complet, la fabrication représente ${formatFr(livraisonData.lit.fabrication)} kg CO2e, ` +
      `la logistique et livraison représente ${formatFr(litLivraison)} kg CO2e, soit un total de ${formatFr(litTotal)} kg CO2e. ` +
      `Source : Base Empreinte, ADEME.`

    expect(fabricationLivraisonAlt).toBe(expectedAlt)
  })

  test('Courses : Au magasin - En livraison - En drive', () => {
    // infographie-courses
    const voiture = computedEquivalents.find((v) => v.slug === 'voiturethermique') as EquivalentWithECV

    const voitureDrive = round((voiture.ecv.reduce((acc, ecv) => acc + ecv.value, 0) as number) * 30)

    expect(voitureDrive).toBe(6.53)

    const coursesMagasin = round(livraisonData.courses.ecv.magasin.reduce((acc, item) => acc + item.value, 0))
    const coursesLivraison = round(
      livraisonData.courses.ecv.livraisondomicile.reduce((acc, item) => acc + item.value, 0)
    )
    const coursesDrive = round(livraisonData.courses.ecv.clickcollect.reduce((acc, item) => acc + item.value, 0))

    expect(coursesMagasin).toBe(6.15)
    expect(coursesLivraison).toBe(7.99)
    expect(coursesDrive).toBe(6.68)

    const driveTotal = round(voitureDrive + coursesDrive)

    expect(driveTotal).toBe(13.21)

    const coursesAlt = imageInfographies.magasindouce[0].alt

    const expectedAlt =
      `Quel est l’impact carbone des différentes façons de faire ses courses ? ` +
      `Pour des courses au magasin (j’y vais à pieds, à proximité), mon déplacement représente 0 kg CO2e, la logistique et livraison représente ${formatFr(coursesMagasin)} kg CO2e, soit un total de ${formatFr(coursesMagasin)} kg CO2e. ` +
      `Pour des courses en livraison à domicile en véhicule utilitaire, mon déplacement représente 0 kg CO2e, la logistique et livraison représente ${formatFr(coursesLivraison)} kg CO2e, soit un total de ${formatFr(coursesLivraison)} kg CO2e. ` +
      `Pour des courses en drive (j’y vais en voiture thermique à 15 km), mon déplacement représente 6,64 kg CO2e, la logistique et livraison représente ${formatFr(coursesDrive)} kg CO2e, soit un total de 13,32 kg CO2e. ` +
      `Le panier de courses inclut une sélection d’aliments secs et boissons pour un poids d’environ 20 kg. ` +
      `Source : Base Empreinte, ADEME.`

    expect(coursesAlt).toBe(expectedAlt)
  })

  test('Smartphone : Point relais (à pied) - À domicile - Point relais (voiture)', () => {
    // infographie-livraison-smartphone
    const voiture = computedEquivalents.find((v) => v.slug === 'voiturethermique') as EquivalentWithECV

    const voiturePointRelais = round((voiture.ecv.reduce((acc, ecv) => acc + ecv.value, 0) as number) * 7)

    expect(voiturePointRelais).toBe(1.52)

    const smartphonePointRelaisDouce = round(
      livraisonData.smartphone.ecv.pointrelaisdouce.reduce((acc, item) => acc + item.value, 0)
    )
    const smartphoneDomicile = round(
      livraisonData.smartphone.ecv.livraisondomicile.reduce((acc, item) => acc + item.value, 0)
    )
    const smartphonePointRelais = round(
      livraisonData.smartphone.ecv.pointrelais.reduce((acc, item) => acc + item.value, 0)
    )

    expect(smartphonePointRelaisDouce).toBe(0.22)
    expect(smartphoneDomicile).toBe(0.25)
    expect(smartphonePointRelais).toBe(0.22)

    const pointRelaisVoitureTotal = round(voiturePointRelais + smartphonePointRelais)

    expect(pointRelaisVoitureTotal).toBe(1.74)

    const smartphoneAlt = imageInfographies.smartphone[1].alt

    const expectedAlt =
      `Quel est l’impact carbone de mes choix de livraison pour l’achat d’un smartphone ? ` +
      `Pour une livraison en point de retrait (j’y vais à pieds, à proximité), mon déplacement représente 0 kg CO2e, ` +
      `la logistique et livraison représente ${formatFr(smartphonePointRelaisDouce)} kg CO2e, soit un total de ${formatFr(smartphonePointRelaisDouce)} kg CO2e. ` +
      `Pour une livraison à domicile standard, mon déplacement représente 0 kg CO2e, ` +
      `la logistique et livraison représente ${formatFr(smartphoneDomicile)} kg CO2e, soit un total de ${formatFr(smartphoneDomicile)} kg CO2e. ` +
      `Pour une livraison en point de retrait (j’y vais en voiture thermique à 3,5 km), mon déplacement représente ${formatFr(voiturePointRelais)} kg CO2e, ` +
      `la logistique et livraison représente ${formatFr(smartphonePointRelais)} kg CO2e, soit un total de ${formatFr(pointRelaisVoitureTotal)} CO2e.  ` +
      `Source : Base Empreinte, ADEME.`

    expect(smartphoneAlt).toBe(expectedAlt)
  })
})
