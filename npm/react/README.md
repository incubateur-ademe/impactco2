# Impact CO₂

Découvrir Impact CO2 la boîte à outil de l’ADEME, et ses ressources ludiques,
fiables et faciles à utiliser sur l’impact carbone des gestes et objets du
quotidien. Intégrer gratuitement les outils dans vos contenus site ou
application, afin de communiquer les bons ordres de grandeur et sensibiliser vos
communautés aux enjeux environnementaux.

## Installation

Installer la paquet avec votre gestionnaire favori :

    npm i @incubateur-ademe/impactco2-react

Ou

    yarn add @incubateur-ademe/impactco2-react

## Utilisation

Pour l'instant seulement l'étiquette d'équivalent carbone est disponible.
D'autres modules seront rajoutés au fur et à mesure.

### L'étiquette équivalent carbone

#### Utilisation

L'étiquette permet à votre communauté de mesurer l’impact carbone des gestes et
objets du quotidien et de se représenter les bons ordres de grandeur.

    import { Etiquette } from '@incubateur-ademe/impactco2-react'

    export const MyComponent = () => {
      return (
        <>
          <Etiquette value={10000} comparisons={['ananas']} />
        </>
      )
    }

#### Personnalisation

Un dark mode est disponible en entourant le widget de la class `night`

    import { Etiquette } from '@incubateur-ademe/impactco2-react'

    export const MyComponent = () => {
      return (
        <div className='night'>
          <Etiquette value={10000} comparisons={['ananas']} />
        </div>
      )
    }

#### API

#### value : number

Impact carbone (en grammes) à comparer

#### animated : boolean

Affiche les comparaisons une à une, avec animation de transition, plutot que
toutes d'un coup.

Default: `false`

#### language : 'en' | 'fr' | 'es'

Langue utilisée pour les étiquettes

Default: `'fr'`

#### comparisons : string[]

Liste des équivalents à comparer parmis la liste suivante :

- Transport
  - avioncourtcourrier : km en avion court courrier
  - avionmoyencourrier : km en avion moyen courrier
  - avionlongcourrier : km en avion long courrier
  - tgv : km en TGV
  - intercites : km en intercités
  - voiturethermique : km en voiture thermique
  - voiturethermique+1 : km en voiture thermique avec 1 passager
  - voiturethermique+2 : km en voiture thermique avec 2 passagers
  - voiturethermique+3 : km en voiture thermique avec 3 passagers
  - voiturethermique+4 : km en voiture thermique avec 4 passagers
  - voitureelectrique : km en voiture électrique
  - voitureelectrique+1 : km en voiture électrique avec 1 passager
  - voitureelectrique+2 : km en voiture électrique avec 2 passagers
  - voitureelectrique+3 : km en voiture électrique avec 3 passagers
  - voitureelectrique+4 : km en voiture électrique avec 4 passagers
  - autocar : km en autocar thermique
  - velo : vélo mécanique
  - marche : marche
  - veloelectrique : km en vélo à assistance électrique
  - trottinette : km en trottinette à assistance électrique
  - busthermique : km en bus thermique
  - tramway : km en tramway
  - metro : km en métro
  - scooter : km en scooter ou moto légère thermique
  - moto : km en moto thermique
  - rer : km en RER ou Transilien
  - ter : km en TER
  - buselectrique : km en bus électrique
  - busgnv : km en bus (GNV)
- Boisson
  - eaudurobinet : Litre d'eau du robinet
  - eauenbouteille : Litre d'eau en bouteille
  - soda : Litre de soda
  - biere : Litre de bière
  - vin : Litre de vin
  - laitdevache : Litre de lait de vache
  - soja : Litre de boisson au soja
  - the : Litre de thé
  - cafe : Litre de café
- Alimentation
  - repasavecduboeuf : repas avec du boeuf
  - repasvegetarien : repas végétarien
  - repasvegetalien : repas végétalien
  - repasavecdupoissonblanc : repas avec du poisson blanc
  - repasavecdupoissongras : repas avec du poisson gras
  - repasavecdupoulet : repas avec du poulet
  - boeuf : kg de boeuf
  - veau : kg de veau
  - porc : kg de porc
  - canard : kg de canard
  - lapin : kg de lapin
  - poulet : kg de poulet
  - crevettes : kg de crevettes
  - moules : kg de moules
  - huitres : kg de huitres
  - cabillaud : kg de cabillaud (cru)
  - lieu : kg de lieu jaune ou colin (cru)
  - dorade : kg de dorade royale
  - saumon : kg de saumon ou truite d'élevage (cru)
  - thon : kg de thon (cru)
  - sardines : kg de sardines
  - beurre : kg de beurre
  - fromagedure : kg de fromage à pâte dure
  - feta : kg de fêta (brebis)
  - fromagemolle : kg de fromage à pâte molle
  - mozarella : kg de mozarella
  - fromagebleu : kg de fromage bleu
  - oeuf : kg de oeufs
  - matieregrasse : kg de matière grasse végétale
  - yaourt : kg de yaourt nature ou yaourt à la grecque
  - fromageblanc : kg de fromage blanc 0%
  - riz : kg de riz
  - pates : kg de pâtes (sèches)
  - ble : kg de blé
  - boulgour : kg de boulgour
  - poischiches : kg de pois chiches
  - haricotsrouges : kg de haricots rouges
  - lentilles : kg de lentilles (blondes, vertes, corail)
  - cheeseburger : kg de cheeseburger
  - kebab : kg de kebab
  - burgerpoulet : kg de burger au poulet
  - pizza : kg de pizza quatre fromages
  - sushis : kg de sushis ou makis
  - burgervegetarien : kg de burger végétarien
  - frites : kg de frites (friteuse)
  - tofu : kg de tofu nature
  - boucheechocolat : kg de rocher au chocolat
  - pateatartiner : kg de pâte à tartiner à la noisette
  - brownie : kg de brownie au chocolat
  - painauchocolat : kg de pain au chocolat ou chocolatine
  - cookie : kg de cookie au pépites de chocolat
  - madeleine : kg de madeleine
  - painauxraisins : kg de pain aux raisins
  - chaussonauxpommes : kg de chausson aux pommes
  - croissant : kg de croissant au beurre
  - paindemie : kg de pain de mie
  - bonbons : kg de bonbons gélifiés
  - baguette : kg de baguette tradition
  - pommedeterre : kg de pomme de terre nouvelle
- Fruits et légumes
  - fraise : kg de fraise
  - pomme : kg de pomme
  - orange : kg d'orange
  - citron : kg de citron
  - ail : kg d'ail
  - artichaut : kg d'artichaut
  - asperge : kg d'asperge
  - betterave : kg de betterave
  - blette : kg de blette
  - carotte : kg de carotte
  - celeri : kg de céleri
  - champignonmorille : kg de champignon (morille crue)
  - chou : kg de chou
  - choudebruxelles : kg de chou de Bruxelles
  - choufleur : kg de chou-fleur
  - concombre : kg de concombre
  - courge : kg de courge
  - courgette : kg de courgette
  - cresson : kg de cresson
  - echalote : kg d'échalote
  - endive : kg d'endive
  - epinard : kg d'épinard
  - mangue : kg de mangue (importée par avion)
  - manguebateau : kg de mangue (importée par bateau)
  - fenouil : kg de fenouil
  - haricotvert : kg d'haricot vert (cru)
  - laitue : kg de laitue
  - mache : kg de mâche
  - navet : kg de navet
  - mais : kg de maïs
  - oignon : kg d'oignon
  - panais : kg de panais
  - petitpois : kg de petit pois
  - poireau : kg de poireau
  - poivron : kg de poivron
  - potiron : kg de potiron
  - radis : kg de radis
  - salsifis : kg de salsifis
  - topinambour : kg de topinambour
  - cassis : kg de cassis
  - chataigne : kg de châtaigne
  - clementine : kg de clémentine
  - pamplemousse : kg de pamplemousse
  - coing : kg de coing
  - figue : kg de figue
  - groseille : kg de groseille
  - kiwi : kg de kiwi
  - mandarine : kg de mandarine
  - melon : kg de melon
  - mure : kg de mûre
  - nectarine : kg de nectarine
  - myrtille : kg de myrtille
  - noisette : kg de noisette
  - noix : kg de noix
  - prune : kg de prune
  - reineclaude : kg de reine claude
  - rhubarbe : kg de rhubarbe
  - peche : kg de pêche
  - cerise : kg de cerise
  - abricot : kg d'abricot
  - framboise : kg de framboise
  - poire : kg de poire
  - raisin : kg de raisin
  - aubergine : kg d'aubergine
  - brocoli : kg de brocoli
  - tomate : kg de tomate
  - ananas : kg d'ananas
  - banane : kg de banane
  - avocat : kg d'avocat
  - carambole : kg de carambole
  - datte : kg de datte
  - fruitdelapassion : kg de fruit de la passion
  - grenade : kg de grenade
  - kaki : kg de kaki
  - noixdecoco : kg de noix de coco
  - pasteque : kg de pastèque
- Électroménager
  - bouilloire : bouilloire
  - cafetieredosette : cafetière à dosettes
  - cafetierefiltre : cafetière filtre
  - cafetiereexpresso : cafetière expresso
  - fourelectrique : four électrique
  - lavevaisselle : lave-vaisselle
  - lavelinge : lave-linge
  - refrigirateur : réfrigérateur
  - aspirateur : aspirateur
  - climatiseur : climatiseur
- Habillement
  - jeans : jeans
  - polo : polo
  - tshirtencoton : t-shirt en coton
  - tshirtenpolyester : t-shirt en polyester
  - sweatencoton : sweat en coton
  - chemiseencoton : chemise en coton
  - chemiseenviscose : chemise en viscose
  - chaussuresencuir : paire de chaussures en cuir
  - chaussuresentissu : paire de chaussures en tissu
  - chaussuresdesport : paire de chaussures de sport
  - robeencoton : robe en coton
  - robeenpolyester : robe en polyester
  - robeenviscose : robe en viscose
  - pullenlaine : pull en laine
  - pullenacrylique : pull en acrylique
  - pullencotonrecycle : pull en coton recyclé
  - manteau : manteau
  - vesteimpermeable : veste imperméable
  - vestesimilicuir : veste simili-cuir
- Mobilier
  - canapeconvertible : canapé convertible
  - chaiseenbois : chaise en bois
  - tableenbois : table en bois
  - canapetextile : canapé en textile
  - armoire : armoire
  - lit : lit
- Chauffage
  - chauffagegaz : année de chauffage au gaz par m²
  - chauffagefioul : année de chauffage au fioul par m²
  - chauffageelectrique : année de chauffage électrique par m²
  - pompeachaleur : année de chauffage avec une pompe à chaleur par m²
  - poeleagranule : année de chauffage avec un poêle à granulés par m²
  - poeleabois : année de chauffage avec un poêle à bois par m²
  - reseaudechaleur : année de chauffage via un réseau de chaleur par m²
- Numérique
  - smartphone : smartphone
  - ordinateurfixeparticulier : ordinateur fixe sans écran (particulier)
  - ordinateurfixeprofessionnel : ordinateur fixe sans écran (professionnel)
  - ecran : écran d'ordinateur
  - tabletteclassique : tablette
  - television : télévision
  - ordinateurportable : ordinateur portable
  - enceintebluetooth : enceinte connectée
  - telephonebasique : téléphone basique
  - casquevr : casque de réalité virtuelle
  - alimentationordinateur : alimentation externe pour ordinateur portable
  - alimentationsmartphone : alimentation externe pour smartphone ou tablette
  - disquedur : disque dur externe
  - clefusb : clef usb
  - box : box
- Usage du numérique
  - email : email
  - spam : spam
  - stockagedonnee : Go de données (1 an de stockage dans le cloud)
  - rechercheweb : recherche sur le web
  - streamingvideo : Heure de streaming vidéo
  - visioconference : Heure de visioconférence
  - telechargement : Go de données (téléchargement)
- Cas pratique
  - avion-pny : A/R paris - New-York en avion
  - tgv-paris-berlin" : A/R Paris - Berlin en TGV
  - tgv-paris-marseille" : A/R Paris - Marseille en TGV
  - voiture-lille-nimes" : A/R Lille - Nîmes en voiture
  - francais : % de l'empreinte carbone d'un citoyen français
  - game-of-thrones : épisode de Game of Thrones en streaming
  - friends : intégrale de Friends en streaming
  - ski : journée au ski
  - piscine : remplissage de piscine
  - terre-voiture : tour de la terre en voiture
  - harry-potter : marathon des films Harry Potter en streaming
  - hotel : nuit à l'hotel
  - camping : nuit au camping
  - location : nuit dans une location saisonnière
  - residencesecondaire : nuit dans une résidence secondaire
  - 2050 : % de l'objectif citoyen pour 2050
  - magasin : achat en magasin
  - magasindouce : achat en magasin
  - pointrelais : livraison en point de retrait
  - pointrelaisdouce : livraison en point de retrait
  - clickcollect : Click & Collect
  - clickcollectdouce : Click & Collect
  - livraisondomicile : livraison à domicile
  - voiturefrancaisejour : jour de circulation des voitures particulières en France
  - voiturefrancaisean : annés d’émissions des voitures particulières en France
  - populationfrancaise : annés d’émissions de la population en France
  - parcbovin : annés d’émissions du parc bovin en France
  - chauffageenfrance : annés d’émissions du chauffage domestique en France
  - numeriqueenfrance : annés d’émissions du numérique en France
  - aviationcivileenfrance : annés d’émissions de l’aviation civile en France
  - agricoleenfrancejour : jour d'activité agricole en France
  - chauffageenfrancejour : jour d'utilisation du chauffage domestique en France
  - foretenfrancejour : jour d’absorption de CO2e par les forêts et les prairies en France
  - climatisationenfrancejour : jour d'utilisation des climatisations domestiques en France
  - voiturefrancaiseheure : heure de circulation des voitures particulières en France
  - numeriqueenfrancejour : jour de fonctionnement du numérique en France
  - traitementdechetsjour : jour de traitement des déchets et eaux usées domestiques
  - trainenfrancejour : jour de circulation des trains en France
  - datacenterjour : jour de fonctionnement d’un campus de data center en France
  - avion-johannesburg-paris-rugby : A/R Johannesburg-Paris d’une équipe de rugby
  - maisonneuve : Construction d’une maison neuve
