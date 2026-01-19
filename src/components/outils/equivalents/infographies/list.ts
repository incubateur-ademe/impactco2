export const infographies: Record<string, string[]> = {
  smartphone: ['smartphone', 'repasavecduboeuf', 'tshirtencoton'],
  ordinateurportable: ['television', 'ordinateurportable', 'smartphone'],
  television: ['television', 'ordinateurportable', 'smartphone'],
  ordinateurfixeparticulier: ['ordinateurfixeparticulier', 'ordinateurportable', 'tabletteclassique'],
  repasvegetalien: ['repasavecduboeuf', 'repasavecdupoulet', 'repasvegetalien'],
  repasvegetarien: ['repasavecduboeuf', 'repasavecdupoulet', 'repasvegetarien'],
  repasavecduboeuf: ['repasavecduboeuf', 'repasavecdupoulet', 'repasvegetarien'],
  repasavecdupoulet: ['repasavecduboeuf', 'repasavecdupoulet', 'repasvegetarien'],
  repasavecdupoissongras: ['repasavecduboeuf', 'repasavecdupoissongras', 'repasvegetarien'],
  repasavecdupoissonblanc: ['repasavecduboeuf', 'repasavecdupoissonblanc', 'repasvegetarien'],
  eaudurobinet: ['eauenbouteille', 'eaudurobinet'],
  eauenbouteille: ['eauenbouteille', 'eaudurobinet'],
  laitdevache: ['laitdevache', 'soja'],
  soja: ['laitdevache', 'soja'],
  voiturethermique: ['voiturethermique', 'busthermique', 'tgv'],
  bus: ['voiturethermique', 'busthermique', 'tgv'],
  tgv: ['voiturethermique', 'busthermique', 'tgv'],
  metro: ['voiturethermique', 'busthermique', 'metro'],
  avioncourtcourrier: ['avioncourtcourrier', 'busthermique', 'tgv'],
  avionmoyencourrier: ['avionmoyencourrier', 'busthermique', 'tgv'],
  avionlongcourrier: ['avionlongcourrier', 'busthermique', 'tgv'],
  tshirtencoton: ['smartphone', 'repasavecduboeuf', 'tshirtencoton'],
  jeans: ['jeans', 'smartphone', 'repasavecduboeuf'],
  pullenlaine: ['pullenlaine', 'smartphone', 'enceintebluetooth'],
  manteau: ['manteau', 'voiturethermique'],
  chauffageelectrique: ['poeleabois', 'chauffageelectrique', 'poeleagranule'],
  chauffagefioul: ['chauffagefioul', 'poeleagranule', 'chauffageelectrique'],
  chauffagegaz: ['chauffagegaz', 'chauffageelectrique', 'pompeachaleur'],
  pompeachaleur: ['chauffagefioul', 'poeleagranule', 'pompeachaleur'],
  poeleagranule: ['chauffagegaz', 'poeleagranule', 'chauffageelectrique'],
  poeleabois: ['poeleabois', 'poeleagranule', 'chauffageelectrique'],
  reseaudechaleur: ['reseaudechaleur', 'poeleagranule', 'pompeachaleur'],
  crevettes: ['crevettes', 'saumon', 'fromagedure', 'tofu'],
  saumon: ['crevettes', 'saumon', 'fromagedure', 'tofu'],
  fromagedure: ['crevettes', 'saumon', 'fromagedure', 'tofu'],
  tofu: ['crevettes', 'saumon', 'fromagepatedure', 'tofu'],
  boeuf: ['boeuf', 'porc', 'poulet', 'haricotsrouges', 'tofu'],
  porc: ['boeuf', 'porc', 'poulet', 'haricotsrouges', 'tofu'],
  poulet: ['boeuf', 'porc', 'poulet', 'haricotsrouges', 'tofu'],
  haricotsrouges: ['boeuf', 'porc', 'poulet', 'haricotsrouges', 'tofu'],
  cheeseburger: ['cheeseburger', 'burgerpoulet', 'burgervegetarien'],
  burgerpoulet: ['cheeseburger', 'burgerpoulet', 'burgervegetarien'],
  burgervegetarien: ['cheeseburger', 'burgerpoulet', 'burgervegetarien'],
  beurre: ['beurre', 'matieregrasse'],
  matieregrasse: ['beurre', 'matieregrasse'],
  painauchocolat: ['painauchocolat', 'croissant', 'pomme'],
  croissant: ['painauchocolat', 'croissant', 'pomme'],
  pomme: ['painauchocolat', 'croissant', 'pomme'],
}

export const imageInfographies: Record<string, { image: string; alt: string }[]> = {
  boeuf: [
    {
      image: 'agriculture-vs-transport.png',
      alt: 'Quel est l’impact de l’agriculture et du transport dans l’alimentation ? Pour 1 kg de boeuf, l’agriculture représente 27,3 kg CO2e, le transport représente 0,31 kg CO2e et les autres étapes représentent 0,39 kg CO2e. Le total pour 1 kg de boeuf est 28 Kg CO2e. Pour 1 kg de pomme, l’agriculture représente 0,09 kg CO2e, le transport représente 0,26 kg CO2e et les autres étapes représentent 0,05 kg CO2e. Le total pour 1 kg de pomme est 0,4 kg CO2e. Pour 1 kg de mangue, l’agriculture représente 0,15 kg CO2e, le transport 11,4 kg CO2e et les autres étapes représentent 0,15 kg CO2e. Le total pour 1 kg de mangue est de 11,7 Kg CO2e. Source : Agribalyse.',
    },
  ],
  pomme: [
    {
      image: 'agriculture-vs-transport.png',
      alt: 'Quel est l’impact de l’agriculture et du transport dans l’alimentation ? Pour 1 kg de boeuf, l’agriculture représente 27,3 kg CO2e, le transport représente 0,31 kg CO2e et les autres étapes représentent 0,39 kg CO2e. Le total pour 1 kg de boeuf est 28 Kg CO2e. Pour 1 kg de pomme, l’agriculture représente 0,09 kg CO2e, le transport représente 0,26 kg CO2e et les autres étapes représentent 0,05 kg CO2e. Le total pour 1 kg de pomme est 0,4 kg CO2e. Pour 1 kg de mangue, l’agriculture représente 0,15 kg CO2e, le transport 11,4 kg CO2e et les autres étapes représentent 0,15 kg CO2e. Le total pour 1 kg de mangue est de 11,7 Kg CO2e. Source : Agribalyse.',
    },
  ],
  mangue: [
    {
      image: 'agriculture-vs-transport.png',
      alt: 'Quel est l’impact de l’agriculture et du transport dans l’alimentation ? Pour 1 kg de boeuf, l’agriculture représente 27,3 kg CO2e, le transport représente 0,31 kg CO2e et les autres étapes représentent 0,39 kg CO2e. Le total pour 1 kg de boeuf est 28 Kg CO2e. Pour 1 kg de pomme, l’agriculture représente 0,09 kg CO2e, le transport représente 0,26 kg CO2e et les autres étapes représentent 0,05 kg CO2e. Le total pour 1 kg de pomme est 0,4 kg CO2e. Pour 1 kg de mangue, l’agriculture représente 0,15 kg CO2e, le transport 11,4 kg CO2e et les autres étapes représentent 0,15 kg CO2e. Le total pour 1 kg de mangue est de 11,7 Kg CO2e. Source : Agribalyse.',
    },
    {
      image: 'infographie-mangues.png',
      alt: "Quelle est la différence entre ces deux mangues ? La mangue importée par bateau représente 0,73 kg CO2e pour 1 kg de mangue (0,15 kg CO2e pour l'agriculture, 0,47 kg CO2e pour le transport et 0,11 kg CO2e pour le reste). La mangue importée par avion représente 11,7 kg CO2e pour 1 kg de mangue (0,15 kg CO2e pour l'agriculture, 11,4 kg CO2e pour le transport et 0,15 kg CO2e pour le reste). Source : Agribalyse.",
    },
  ],
  manguebateau: [
    {
      image: 'infographie-mangues.png',
      alt: "Quelle est la différence entre ces deux mangues ? La mangue importée par bateau représente 0,73 kg CO2e pour 1 kg de mangue (0,15 kg CO2e pour l'agriculture, 0,47 kg CO2e pour le transport et 0,11 kg CO2e pour le reste). La mangue importée par avion représente 11,7 kg CO2e pour 1 kg de mangue (0,15 kg CO2e pour l'agriculture, 11,4 kg CO2e pour le transport et 0,15 kg CO2e pour le reste). Source : Agribalyse.",
    },
  ],
  frites: [
    {
      image: 'produit-transdo-vs-produit-brut.png',
      alt: 'Quel est l’impact des aliments transformés ? Pour 1 kg de frites (friteuse), l’emballage et transformation représente 0,39 kg CO2e, le transport représente 0,39 kg CO2e et les autres étapes représentent 0,68 kg CO2e. Le total pour 1 kg de frites est 1,46 kg CO2e. Pour 1 kg de pommes de terre nouvelles, l’emballage et transformation représente 0,42 kg CO2e, le transport représente 0,18 kg CO2e et les autres étapes représentent 0,11 kg CO2e. Le total pour 1 kg de pommes de terre nouvelles est 0,71 kg CO2e. Source : Agribalyse.',
    },
  ],
  pommedeterre: [
    {
      image: 'produit-transdo-vs-produit-brut.png',
      alt: 'Quel est l’impact des aliments transformés ? Pour 1 kg de frites (friteuse), l’emballage et transformation représente 0,39 kg CO2e, le transport représente 0,39 kg CO2e et les autres étapes représentent 0,68 kg CO2e. Le total pour 1 kg de frites est 1,46 kg CO2e. Pour 1 kg de pommes de terre nouvelles, l’emballage et transformation représente 0,42 kg CO2e, le transport représente 0,18 kg CO2e et les autres étapes représentent 0,11 kg CO2e. Le total pour 1 kg de pommes de terre nouvelles est 0,71 kg CO2e. Source : Agribalyse.',
    },
  ],
  porc: [
    {
      image: 'viandes-vs-alternatives.png',
      alt: 'Quel est l’impact de la viande et de ses alternatives ? Pour 1 kg de porc, l’agriculture représente 6,07 kg CO2e, le transport représente 0,29 kg CO2e et les autres étapes représentent 0,31 kg CO2e. Le total pour 1 kg de porc est 6,67 Kg CO2e. Pour 1 kg d’oeufs, l’agriculture représente 1,49 kg CO2e, le transport représente 0,19 kg CO2e et les autres étapes représentent 0,2 kg CO2e. Le total pour 1 kg d’oeufs est 1,88 Kg CO2e. Pour 1 kg de tofu, l’agriculture représente 0,09 kg CO2e, le transport 0,23 kg CO2e et les autres étapes représentent 0,68 kg CO2e. Le total pour 1 kg de tofu est de 1 Kg CO2e. Source : Agribalyse.',
    },
  ],
  oeuf: [
    {
      image: 'viandes-vs-alternatives.png',
      alt: 'Quel est l’impact de la viande et de ses alternatives ? Pour 1 kg de porc, l’agriculture représente 6,07 kg CO2e, le transport représente 0,29 kg CO2e et les autres étapes représentent 0,31 kg CO2e. Le total pour 1 kg de porc est 6,67 Kg CO2e. Pour 1 kg d’oeufs, l’agriculture représente 1,49 kg CO2e, le transport représente 0,19 kg CO2e et les autres étapes représentent 0,2 kg CO2e. Le total pour 1 kg d’oeufs est 1,88 Kg CO2e. Pour 1 kg de tofu, l’agriculture représente 0,09 kg CO2e, le transport 0,23 kg CO2e et les autres étapes représentent 0,68 kg CO2e. Le total pour 1 kg de tofu est de 1 Kg CO2e. Source : Agribalyse.',
    },
  ],
  tofu: [
    {
      image: 'viandes-vs-alternatives.png',
      alt: 'Quel est l’impact de la viande et de ses alternatives ? Pour 1 kg de porc, l’agriculture représente 6,07 kg CO2e, le transport représente 0,29 kg CO2e et les autres étapes représentent 0,31 kg CO2e. Le total pour 1 kg de porc est 6,67 Kg CO2e. Pour 1 kg d’oeufs, l’agriculture représente 1,49 kg CO2e, le transport représente 0,19 kg CO2e et les autres étapes représentent 0,2 kg CO2e. Le total pour 1 kg d’oeufs est 1,88 Kg CO2e. Pour 1 kg de tofu, l’agriculture représente 0,09 kg CO2e, le transport 0,23 kg CO2e et les autres étapes représentent 0,68 kg CO2e. Le total pour 1 kg de tofu est de 1 Kg CO2e. Source : Agribalyse.',
    },
  ],
  hotel: [
    {
      image: 'Impact-transport-cas-pratiques.png',
      alt: 'Quel est l’impact de nos choix d’hébergement ? 1 nuit en résidence secondaire représente 7 kg CO2e. 1 nuit dans un hôtel représente 5,3 kg CO2e. 1 nuit dans une location représente 5,2 kg CO2e. 1 nuit au camping représente 1,4 kg CO2e. Source : ADEME.',
    },
    {
      image: 'Impact-transport-hotellerie-3-nuits-a-500km.png',
      alt: 'Quel est l’impact du transport pour un voyage de 4 jours à 2 personnes ? (3 nuits à l’hôtel, à 500 km du domicile, soit un trajet à 2 personnes de 1000 km aller-retour). En avion (court courrier), le trajet Aller Retour représente 450 kg CO2e, l’hébergement 31,8 kg CO2e, soit un total de 481,8 kg CO2e. En voiture (thermique), le trajet Aller Retour représente 218 kg CO2e, l’hébergement 31,8 kg CO2e, soit un total de 249,8 kg CO2e. En TGV, le trajet Aller Retour représente 5,8 kg CO2e, l’hébergement 31,8 kg CO2e, soit un total de 37,6 kg CO2e. Source : ADEME.',
    },
  ],
  camping: [
    {
      image: 'Impact-transport-cas-pratiques.png',
      alt: 'Quel est l’impact de nos choix d’hébergement ? 1 nuit en résidence secondaire représente 7 kg CO2e. 1 nuit dans un hôtel représente 5,3 kg CO2e. 1 nuit dans une location représente 5,2 kg CO2e. 1 nuit au camping représente 1,4 kg CO2e. Source : ADEME.',
    },
    {
      image: 'Impact-transport-hotellerie-3-nuits-a-500km.png',
      alt: 'Quel est l’impact du transport pour un voyage de 4 jours à 2 personnes ? (3 nuits à l’hôtel, à 500 km du domicile, soit un trajet à 2 personnes de 1000 km aller-retour). En avion (court courrier), le trajet Aller Retour représente 450 kg CO2e, l’hébergement 31,8 kg CO2e, soit un total de 481,8 kg CO2e. En voiture (thermique), le trajet Aller Retour représente 218 kg CO2e, l’hébergement 31,8 kg CO2e, soit un total de 249,8 kg CO2e. En TGV, le trajet Aller Retour représente 5,8 kg CO2e, l’hébergement 31,8 kg CO2e, soit un total de 37,6 kg CO2e. Source : ADEME.',
    },
  ],
  location: [
    {
      image: 'Impact-transport-cas-pratiques.png',
      alt: 'Quel est l’impact de nos choix d’hébergement ? 1 nuit en résidence secondaire représente 7 kg CO2e. 1 nuit dans un hôtel représente 5,3 kg CO2e. 1 nuit dans une location représente 5,2 kg CO2e. 1 nuit au camping représente 1,4 kg CO2e. Source : ADEME.',
    },
    {
      image: 'Impact-transport-hotellerie-3-nuits-a-500km.png',
      alt: 'Quel est l’impact du transport pour un voyage de 4 jours à 2 personnes ? (3 nuits à l’hôtel, à 500 km du domicile, soit un trajet à 2 personnes de 1000 km aller-retour). En avion (court courrier), le trajet Aller Retour représente 450 kg CO2e, l’hébergement 31,8 kg CO2e, soit un total de 481,8 kg CO2e. En voiture (thermique), le trajet Aller Retour représente 218 kg CO2e, l’hébergement 31,8 kg CO2e, soit un total de 249,8 kg CO2e. En TGV, le trajet Aller Retour représente 5,8 kg CO2e, l’hébergement 31,8 kg CO2e, soit un total de 37,6 kg CO2e. Source : ADEME.',
    },
  ],
  residencesecondaire: [
    {
      image: 'Impact-transport-cas-pratiques.png',
      alt: 'Quel est l’impact de nos choix d’hébergement ? 1 nuit en résidence secondaire représente 7 kg CO2e. 1 nuit dans un hôtel représente 5,3 kg CO2e. 1 nuit dans une location représente 5,2 kg CO2e. 1 nuit au camping représente 1,4 kg CO2e. Source : ADEME.',
    },
    {
      image: 'Impact-transport-hotellerie-3-nuits-a-500km.png',
      alt: 'Quel est l’impact du transport pour un voyage de 4 jours à 2 personnes ? (3 nuits à l’hôtel, à 500 km du domicile, soit un trajet à 2 personnes de 1000 km aller-retour). En avion (court courrier), le trajet Aller Retour représente 450 kg CO2e, l’hébergement 31,8 kg CO2e, soit un total de 481,8 kg CO2e. En voiture (thermique), le trajet Aller Retour représente 218 kg CO2e, l’hébergement 31,8 kg CO2e, soit un total de 249,8 kg CO2e. En TGV, le trajet Aller Retour représente 5,8 kg CO2e, l’hébergement 31,8 kg CO2e, soit un total de 37,6 kg CO2e. Source : ADEME.',
    },
  ],
  livraisondomicile: [
    {
      image: 'infographie-fabrication-vs-livraison.png',
      alt: 'Quel est l’impact de la fabrication de nos achats par rapport à leur livraison ? Pour la livraison à domicile d’une cafetière, la fabrication représente 41 kg CO2e, la logistique et livraison représente 3,09 kg CO2e, soit un total de 44,09 kg CO2e. Pour la livraison à domicile d’un smartphone, la fabrication représente 85 kg CO2e, la logistique et livraison représente 0,26 kg CO2E, soit un total de 85,26 kg CO2e. Pour la livraison à domicile d’un lit complet, la fabrication représente 421 kg CO2e, la logistique et livraison représente 59,02 kgCO2e, soit un total de 480,02 kg CO2e. Source : Base Empreinte, ADEME.',
    },
  ],
  smartphone: [
    {
      image: 'infographie-fabrication-vs-livraison.png',
      alt: 'Quel est l’impact de la fabrication de nos achats par rapport à leur livraison ? Pour la livraison à domicile d’une cafetière, la fabrication représente 41 kg CO2e, la logistique et livraison représente 3,09 kg CO2e, soit un total de 44,09 kg CO2e. Pour la livraison à domicile d’un smartphone, la fabrication représente 85 kg CO2e, la logistique et livraison représente 0,26 kg CO2E, soit un total de 85,26 kg CO2e. Pour la livraison à domicile d’un lit complet, la fabrication représente 421 kg CO2e, la logistique et livraison représente 59,02 kgCO2e, soit un total de 480,02 kg CO2e. Source : Base Empreinte, ADEME.',
    },
    {
      image: 'infographie-livraison-smartphone.png',
      alt: 'Quel est l’impact carbone de mes choix de livraison pour l’achat d’un smartphone ? Pour une livraison en point de retrait (j’y vais à pieds, à proximité), mon déplacement représente 0 kg CO2e, la logistique et livraison représente 0,22 kg CO2e, soit un total de 0,22 kg CO2e. Pour une livraison à domicile standard, mon déplacement représente 0 kg CO2e, la logistique et livraison représente 0,26 kg CO2e, soit un total de 0,26 kg CO2e. Pour une livraison en point de retrait (j’y vais en voiture thermique à 3,5 km), mon déplacement représente 1,52 kg CO2e, la logistique et livraison représente 0,22 kg CO2e, soit un total de 1,74 CO2e.  Source : Base Empreinte, ADEME.',
    },
  ],
  lit: [
    {
      image: 'infographie-fabrication-vs-livraison.png',
      alt: 'Quel est l’impact de la fabrication de nos achats par rapport à leur livraison ? Pour la livraison à domicile d’une cafetière, la fabrication représente 41 kg CO2e, la logistique et livraison représente 3,09 kg CO2e, soit un total de 44,09 kg CO2e. Pour la livraison à domicile d’un smartphone, la fabrication représente 85 kg CO2e, la logistique et livraison représente 0,26 kg CO2E, soit un total de 85,26 kg CO2e. Pour la livraison à domicile d’un lit complet, la fabrication représente 421 kg CO2e, la logistique et livraison représente 59,02 kgCO2e, soit un total de 480,02 kg CO2e. Source : Base Empreinte, ADEME.',
    },
  ],
  magasindouce: [
    {
      image: 'infographie-courses.png',
      alt: 'Quel est l’impact carbone des différentes façons de faire ses courses ? Pour des courses au magasin (j’y vais à pieds, à proximité), mon déplacement représente 0 kg CO2e, la logistique et livraison représente 6,15 kg CO2e, soit un total de 6,15 kg CO2e. Pour des courses en livraison à domicile en véhicule utilitaire, mon déplacement représente 0 kg CO2e, la logistique et livraison représente 7,99 kg CO2e, soit un total de 7,99 kg CO2e. Pour des courses en drive (j’y vais en voiture thermique à 15 km), mon déplacement représente 6,64 kg CO2e, la logistique et livraison représente 6,68 kg CO2e, soit un total de 13,32 kg CO2e. Le panier de courses inclut une sélection d’aliments secs et boissons pour un poids d’environ 20 kg. Source : Base Empreinte, ADEME.',
    },
  ],
}
