declare module "@incubateur-ademe/impactco2-react" {
    import React from 'react';
    const Etiquette: ({ comparisons, value, animated }: {
        comparisons: (
                "random" |
                "abricot" |
                "ail" |
                "alimentationordinateur" |
                "alimentationsmartphone" |
                "ananas" |
                "armoire" |
                "artichaut" |
                "asperge" |
                "aspirateur" |
                "aubergine" |
                "autocar" |
                "avion-courtcourrier" |
                "avion-longcourrier" |
                "avion-moyencourrier" |
                "avion-pny" |
                "avocat" |
                "banane" |
                "betterave" |
                "biere" |
                "blette" |
                "bouilloire" |
                "box" |
                "brocoli" |
                "buselectrique" |
                "busgnv" |
                "busthermique" |
                "cafe" |
                "cafetieredosette" |
                "cafetiereexpresso" |
                "cafetierefiltre" |
                "canapeconvertible" |
                "canapetextile" |
                "carambole" |
                "carotte" |
                "casquevr" |
                "cassis" |
                "celeri" |
                "cerise" |
                "chaiseenbois" |
                "champignonmorille" |
                "chataigne" |
                "chauffageelectrique" |
                "chauffagefioul" |
                "chauffagegaz" |
                "chaussuresdesport" |
                "chaussuresencuir" |
                "chaussuresentissu" |
                "chemiseencoton" |
                "chemiseenviscose" |
                "chou" |
                "choudebruxelles" |
                "choufleur" |
                "citron" |
                "clefusb" |
                "clementine" |
                "climatiseur" |
                "coing" |
                "concombre" |
                "courge" |
                "courgette" |
                "cresson" |
                "datte" |
                "disquedur" |
                "eaudurobinet" |
                "eauenbouteille" |
                "echalote" |
                "ecran" |
                "email" |
                "enceintebluetooth" |
                "endive" |
                "epinard" |
                "fenouil" |
                "figue" |
                "fourelectrique" |
                "fraise" |
                "framboise" |
                "francais" |
                "friends" |
                "fruitdelapassion" |
                "game-of-thrones" |
                "grenade" |
                "groseille" |
                "haricotvert" |
                "intercites" |
                "jeans" |
                "kaki" |
                "kiwi" |
                "laitdevache" |
                "laitue" |
                "lavelinge" |
                "lavevaisselle" |
                "lit" |
                "mache" |
                "mais" |
                "mandarine" |
                "mangue" |
                "manteau" |
                "melon" |
                "metro" |
                "moto" |
                "mure" |
                "myrtille" |
                "navet" |
                "nectarine" |
                "noisette" |
                "noix" |
                "noixdecoco" |
                "oignon" |
                "orange" |
                "ordinateurfixeparticulier" |
                "ordinateurfixeprofessionnel" |
                "ordinateurportable" |
                "pamplemousse" |
                "panais" |
                "pasteque" |
                "peche" |
                "petitpois" |
                "poeleabois" |
                "poeleagranule" |
                "poire" |
                "poireau" |
                "poivron" |
                "polo" |
                "pomme" |
                "pompeachaleur" |
                "potiron" |
                "prune" |
                "pullenacrylique" |
                "pullencotonrecycle" |
                "pullenlaine" |
                "radis" |
                "raisin" |
                "rechercheweb" |
                "refrigirateur" |
                "reineclaude" |
                "repasavecduboeuf" |
                "repasavecdupoissonblanc" |
                "repasavecdupoissongras" |
                "repasavecdupoulet" |
                "repasvegetalien" |
                "repasvegetarien" |
                "rer" |
                "reseaudechaleur" |
                "rhubarbe" |
                "robeencoton" |
                "robeenpolyester" |
                "robeenviscose" |
                "salsifis" |
                "scooter" |
                "smartphone" |
                "soda" |
                "soja" |
                "spam" |
                "stockagedonnee" |
                "streamingvideo" |
                "sweatencoton" |
                "tableenbois" |
                "tabletteclassique" |
                "telechargement" |
                "telephonebasique" |
                "television" |
                "ter" |
                "tgv" |
                "tgv-paris-berlin" |
                "tgv-paris-marseille" |
                "the" |
                "tomate" |
                "topinambour" |
                "tramway" |
                "trottinette" |
                "tshirtencoton" |
                "tshirtenpolyester" |
                "velo" |
                "veloelectrique" |
                "vesteimpermeable" |
                "vestesimilicuir" |
                "vin" |
                "visioconference" |
                "voiture-lille-nimes" |
                "voitureelectrique" |
                "voitureelectrique+1" |
                "voitureelectrique+2" |
                "voitureelectrique+3" |
                "voitureelectrique+4" |
                "voiturethermique"|
                "voiturethermique+1" |
                "voiturethermique+2" |
                "voiturethermique+3" |
                "voiturethermique+4" |
                "hotel" |
                "camping" |
                "location"|
                "boeuf" |
                "veau" |
                "porc" |
                "canard" |
                "lapin" |
                "poulet" |
                "crevettes" |
                "moules" |
                "huitres" |
                "cabillaud" |
                "lieu" |
                "dorade" |
                "saumon" |
                "thon" |
                "sardines" |
                "beurre" |
                "fromagedure" |
                "feta" |
                "fromagemolle" |
                "mozarella" |
                "fromagebleu" |
                "oeuf" |
                "matieregrasse" |
                "yaourt" |
                "fromageblanc" |
                "quinoa" |
                "riz" |
                "pates" |
                "ble" |
                "boulgour" |
                "poischiches" |
                "haricotsrouges" |
                "lentilles" |
                "cheeseburger" |
                "kebab" |
                "burgerpoulet" |
                "pizza" |
                "sushis" |
                "burgervegetarien" |
                "frites" |
                "tofu" |
                "boucheechocolat" |
                "pateatartiner" |
                "brownie" |
                "painauchocolat" |
                "cookie" |
                "madeleine" |
                "painauxraisins" |
                "chaussonauxpommes" |
                "croissant" |
                "paindemie" |
                "bonbons" |
                "baguette" |
                "pommedeterre" 
        )[];
        value: number;
        animated?: boolean | undefined;
        language?: 'en' | 'fr' | 'de' | 'es'
    }) => React.JSX.Element;
    export { Etiquette };
}
