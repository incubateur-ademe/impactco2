export const frequences = [
  { displayed: 'semaine', uid: 'par_semaine', mult: 52 },
  { displayed: 'mois', uid: 'par_mois', mult: 12 },
  { displayed: 'an', uid: 'par_an', mult: 1, isDefault: true },
]

export const produits = [
  {
    displayed: 'Produits de grande consommation (aliments, épicerie, boissons…)',
    uid: 'consommation',
    publicode: 'grande consommation',
  },
  {
    displayed: 'Habillement (vêtements, chaussures, accessoires…)',
    uid: 'habillement',
    publicode: 'habillement',
  },
  {
    displayed: 'Produits culturels (CD, livres, DVD…)',
    uid: 'culturel',
    publicode: 'culturel',
  },
  {
    displayed: 'Mobilier et gros électroménager',
    uid: 'volumineux',
    publicode: 'équipements volumineux',
  },
]

export const retraits = [
  { displayed: 'Livraison à domicile', uid: 'domicile', publicode: 'domicile' },
  { displayed: 'Point relais', uid: 'relais', publicode: 'point de retrait' },
  {
    displayed: 'Click & collect',
    uid: 'click',
    publicode: 'click and collect',
  },
]

export const relays = [
  { displayed: 'En voiture', uid: 'voiture_thermique', publicode: 'voiture thermique' },
  { displayed: 'En voiture électrique', uid: 'electricar', publicode: 'voiture électrique' },
  { displayed: 'Marche', uid: 'marche', publicode: 'marche' },
  { displayed: 'à vélo', uid: 'velo', publicode: 'vélo' },
  { displayed: 'à vélo électrique', uid: 'veloelectrique', publicode: 'petit véhicule électrique' },
  { displayed: 'En transport en commun', uid: 'transport', publicode: 'commun' },
]

export const trajs = [
  { displayed: 'Domicile-Travail', uid: 'dom_tra', publicode: '' },
  { displayed: 'Point de retrait-domicile', uid: 'ret_dom', publicode: '' },
  { displayed: 'Domicile-magasin de proximité ', uid: 'dom_mag', publicode: '' },
]
export const default_eqs = ['voiturethermique', 'repasavecduboeuf', 'streamingvideo']
export const default_eqs_ticked = [
  { slug: 'voiturethermique', name: 'Voiture thermique' },
  { slug: 'repasavecduboeuf', name: 'Repas avec du boeuf' },
  { slug: 'streamingvideo', name: 'Streaming vidéo' },
]
