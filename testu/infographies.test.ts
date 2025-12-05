import { computedEquivalents } from 'src/providers/equivalents'
import { ComputedEquivalent, EquivalentValue } from 'types/equivalent'
import { livraisonData } from 'src/components/outils/livraison/LivraisonData'

type EquivalentWithECV = ComputedEquivalent & { ecv: EquivalentValue[]; total: number }

describe('infographies', () => {
  test('Boeuf - Pomme - Mangue', () => {
    const boeuf = computedEquivalents.find((v) => v.slug === 'boeuf') as EquivalentWithECV
    const pomme = computedEquivalents.find((v) => v.slug === 'pomme') as EquivalentWithECV
    const mangue = computedEquivalents.find((v) => v.slug === 'mangue') as EquivalentWithECV

    expect(boeuf?.ecv.find((ecv) => ecv.id === 30)?.value).toEqual(27.316666666666666)
    expect(boeuf?.ecv.find((ecv) => ecv.id === 33)?.value).toEqual(0.3083333333333333)
    expect(boeuf?.ecv.reduce((acc, ecv) => acc + ecv.value, 0)).toEqual(28.009169999999997)

    expect(pomme?.total).toEqual(0.408195)

    expect(mangue?.total).toEqual(11.65551)
  })

  test('Frites - Pomme de terre', () => {
    const frites = computedEquivalents.find((v) => v.slug === 'frites') as EquivalentWithECV
    const pommedeterre = computedEquivalents.find((v) => v.slug === 'pommedeterre') as EquivalentWithECV

    expect(frites?.ecv.find((ecv) => ecv.id === 31)?.value).toEqual(0.137)
    expect(frites?.ecv.find((ecv) => ecv.id === 32)?.value).toEqual(0.247)
    expect(frites?.ecv.find((ecv) => ecv.id === 33)?.value).toEqual(0.389)
    expect(frites?.ecv.reduce((acc, ecv) => acc + ecv.value, 0)).toEqual(1.4569999999999999)

    expect(pommedeterre?.ecv.find((ecv) => ecv.id === 31)?.value).toEqual(0.0000605)
    expect(pommedeterre?.ecv.find((ecv) => ecv.id === 32)?.value).toEqual(0.412)
    expect(pommedeterre?.ecv.find((ecv) => ecv.id === 33)?.value).toEqual(0.175)
    expect(pommedeterre?.ecv.reduce((acc, ecv) => acc + ecv.value, 0)).toEqual(0.7062605000000001)
  })

  test('Porc - Oeufs - Tofu', () => {
    const porc = computedEquivalents.find((v) => v.slug === 'porc') as EquivalentWithECV
    const oeuf = computedEquivalents.find((v) => v.slug === 'oeuf') as EquivalentWithECV
    const tofu = computedEquivalents.find((v) => v.slug === 'tofu') as EquivalentWithECV

    expect(porc?.ecv.find((ecv) => ecv.id === 30)?.value).toEqual(6.0649999999999995)
    expect(porc?.ecv.find((ecv) => ecv.id === 33)?.value).toEqual(0.2875)
    expect(porc?.ecv.reduce((acc, ecv) => acc + ecv.value, 0)).toEqual(6.671304949999999)

    expect(oeuf?.ecv.find((ecv) => ecv.id === 30)?.value).toEqual(1.49)
    expect(oeuf?.ecv.find((ecv) => ecv.id === 33)?.value).toEqual(0.189)
    expect(oeuf?.ecv.reduce((acc, ecv) => acc + ecv.value, 0)).toEqual(1.8780103000000001)

    expect(tofu?.ecv.find((ecv) => ecv.id === 30)?.value).toEqual(0.0864)
    expect(tofu?.ecv.find((ecv) => ecv.id === 33)?.value).toEqual(0.23)
    expect(tofu?.ecv.reduce((acc, ecv) => acc + ecv.value, 0)).toEqual(1.0042999999999997)
  })

  test('Mangue par bateau - Mangue par avion', () => {
    const mangueAvion = computedEquivalents.find((v) => v.slug === 'mangue' && 'ecv' in v) as EquivalentWithECV
    const mangueBateau = computedEquivalents.find((v) => v.slug === 'manguebateau') as EquivalentWithECV

    expect(mangueAvion?.ecv.find((ecv) => ecv.id === 30)?.value).toEqual(0.15)
    expect(mangueAvion?.ecv.find((ecv) => ecv.id === 33)?.value).toEqual(11.4)
    expect(mangueAvion?.ecv.reduce((acc, ecv) => acc + ecv.value, 0)).toEqual(11.655508000000001)

    expect(mangueBateau?.ecv.find((ecv) => ecv.id === 30)?.value).toEqual(0.15)
    expect(mangueBateau?.ecv.find((ecv) => ecv.id === 33)?.value).toEqual(0.472)
    expect(mangueBateau?.ecv.reduce((acc, ecv) => acc + ecv.value, 0)).toEqual(0.727508)
  })

  test('Résidence secondaire - Location - Hôtel - Camping', () => {
    const residencesecondaire = computedEquivalents.find((v) => v.slug === 'residencesecondaire') as EquivalentWithECV
    const location = computedEquivalents.find((v) => v.slug === 'location') as EquivalentWithECV
    const hotel = computedEquivalents.find((v) => v.slug === 'hotel') as EquivalentWithECV
    const camping = computedEquivalents.find((v) => v.slug === 'camping') as EquivalentWithECV

    expect(residencesecondaire?.ecv.reduce((acc, ecv) => acc + ecv.value, 0)).toEqual(7)

    expect(location?.ecv.reduce((acc, ecv) => acc + ecv.value, 0)).toEqual(5.2)

    expect(hotel?.ecv.reduce((acc, ecv) => acc + ecv.value, 0)).toEqual(4.3)

    expect(camping?.total).toEqual(1.4)
  })

  test('Avion - Voiture - TGV (1000km AR + 3 nuits hôtel)', () => {
    const avion = computedEquivalents.find((v) => v.slug === 'avion-courtcourrier') as EquivalentWithECV
    const voiture = computedEquivalents.find((v) => v.slug === 'voiturethermique') as EquivalentWithECV
    const tgv = computedEquivalents.find((v) => v.slug === 'tgv') as EquivalentWithECV
    const hotel = computedEquivalents.find((v) => v.slug === 'hotel') as EquivalentWithECV

    const distance = 1000
    const personne = 2
    const nuits = 3

    expect(avion?.ecv.reduce((acc, ecv) => acc + ecv.value, 0) * distance * personne).toEqual(517.16)
    expect(voiture?.ecv.reduce((acc, ecv) => acc + ecv.value, 0) * distance).toEqual(217.60000000000002)
    expect(tgv?.ecv.reduce((acc, ecv) => acc + ecv.value, 0) * distance * personne).toEqual(5.859999999999999)

    // expect(hotel?.ecv.reduce((acc, ecv) => acc + ecv.value, 0) * nuits * personne).toEqual(12.9)

    expect(
      avion?.ecv.reduce((acc, ecv) => acc + ecv.value, 0) * distance * personne +
        hotel?.ecv.reduce((acc, ecv) => acc + ecv.value, 0) * nuits
    ).toEqual(530.06)

    expect(
      voiture?.ecv.reduce((acc, ecv) => acc + ecv.value, 0) * distance +
        hotel?.ecv.reduce((acc, ecv) => acc + ecv.value, 0) * nuits
    ).toEqual(230.50000000000003)

    expect(
      tgv?.ecv.reduce((acc, ecv) => acc + ecv.value, 0) * distance * personne +
        hotel?.ecv.reduce((acc, ecv) => acc + ecv.value, 0) * nuits
    ).toEqual(18.759999999999998)
  })

  test('Cafetière - Smartphone - Lit Complet (coût de fabrication et de livraison à domicile)', () => {
    expect(livraisonData.cafetiere.fabrication).toEqual(41)
    expect(livraisonData.smartphone.fabrication).toEqual(85)
    expect(livraisonData.lit.fabrication).toEqual(421)

    expect(livraisonData.cafetiere.ecv.livraisondomicile.reduce((acc, item) => acc + item.value, 0)).toEqual(
      3.0869999999999997
    )
    expect(livraisonData.smartphone.ecv.livraisondomicile.reduce((acc, item) => acc + item.value, 0)).toEqual(0.25)
    expect(livraisonData.lit.ecv.livraisondomicile.reduce((acc, item) => acc + item.value, 0)).toEqual(59.069)

    expect(
      livraisonData.cafetiere.fabrication +
        livraisonData.cafetiere.ecv.livraisondomicile.reduce((acc, item) => acc + item.value, 0)
    ).toEqual(44.087)
    expect(
      livraisonData.smartphone.fabrication +
        livraisonData.smartphone.ecv.livraisondomicile.reduce((acc, item) => acc + item.value, 0)
    ).toEqual(85.25)
    expect(
      livraisonData.lit.fabrication + livraisonData.lit.ecv.livraisondomicile.reduce((acc, item) => acc + item.value, 0)
    ).toEqual(480.069)
  })

  test('Courses : Au magasin - En livraison - En drive', () => {
    const voiture = computedEquivalents.find((v) => v.slug === 'voiturethermique') as EquivalentWithECV

    expect(voiture.ecv.reduce((acc, ecv) => acc + ecv.value, 0) * 30).toEqual(6.5280000000000005)

    expect(livraisonData.courses.ecv.magasin.reduce((acc, item) => acc + item.value, 0)).toEqual(6.149)
    expect(livraisonData.courses.ecv.livraisondomicile.reduce((acc, item) => acc + item.value, 0)).toEqual(
      7.9879999999999995
    )
    expect(livraisonData.courses.ecv.clickcollect.reduce((acc, item) => acc + item.value, 0)).toEqual(6.679)
  })

  test('Smartphone : Point relais (à pied) - À domicile - Point relais (voiture)', () => {
    const voiture = computedEquivalents.find((v) => v.slug === 'voiturethermique') as EquivalentWithECV

    expect(voiture.ecv.reduce((acc, ecv) => acc + ecv.value, 0) * 7).toEqual(1.5232)
    expect(livraisonData.smartphone.ecv.pointrelaisdouce.reduce((acc, item) => acc + item.value, 0)).toEqual(
      0.21599999999999997
    )
    expect(livraisonData.smartphone.ecv.livraisondomicile.reduce((acc, item) => acc + item.value, 0)).toEqual(0.25)
    expect(livraisonData.smartphone.ecv.pointrelais.reduce((acc, item) => acc + item.value, 0)).toEqual(
      0.21599999999999997
    )
  })
})
