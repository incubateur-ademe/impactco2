export const convertGramsToKilograms = (grams) => {
  const kilograms = grams / 1000; // Convert grams to kilograms
  const formattedKilograms = kilograms.toLocaleString("fr", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }); // Format kilograms with two decimal places and comma as separator
  return formattedKilograms;
};

const metaNamed = (name) => {
  return document.head.children.namedItem(name);
};

export const setAdvicesInOgTags = () => {
  if (typeof window !== "undefined") {
    metaNamed("twitter:description").content =
      "Découvrez les conseils de l’ADEME pour réduire l’impact de la livraison grâce à #impactCO2";
  }
};

export const removeAdvicesFromOgTags = () => {
  metaNamed("twitter:description").content =
    "Découvrez l’impact carbone de la livraison d’un colis sur le climat et les conseils pour la réduire";
};
