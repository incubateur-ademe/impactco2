export const convertGramsToKilograms = (grams) => {
  const kilograms = grams / 1000; // Convert grams to kilograms
  const formattedKilograms = kilograms.toLocaleString("fr", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }); // Format kilograms with two decimal places and comma as separator
  return formattedKilograms;
};

const metaOf = (name) => {
  let res = {};
  if (typeof window !== "undefined") {
    res = document.querySelector(`meta[property="${name}"]`);
    if (!res) {
      res = document.querySelector(`meta[name="${name}"]`);
    }
  }
  return res;
};

const adviceDescription = "Découvrez les conseils de l’ADEME pour réduire l’impact de la livraison grâce à #impactCO2";
const originalDescription =
  "Découvrez l’impact carbone de la livraison d’un colis sur le climat et les conseils pour la réduire";

export const setAdvicesInOgTags = () => {
  metaOf("twitter:description").content = adviceDescription;
  metaOf("og:description").content = adviceDescription;
  metaOf("description").content = adviceDescription;
};

export const removeAdvicesFromOgTags = () => {
  metaOf("twitter:description").content = originalDescription;
  metaOf("og:description").content = originalDescription;
  metaOf("description").content = originalDescription;
};
