import React from 'react'
import useParamContext from 'src/providers/ParamProvider'
import NewTabIcon from 'components/base/NewTabIcon'
import Link from 'components/base/buttons/Link'
import styles from './Data.module.css'

const FRLivraisonData = () => {
  return (
    <>
      <div className={styles.content}>
        <div>
          <Link href='https://librairie.ademe.fr/mobilite-et-transport/6261-e-commerce-modelisation-des-impacts-et-recommandations-filieres-et-grand-public.html'>
            L’étude Commerce en ligne - 2023
          </Link>{' '}
          à destination des professionels du E-commerce. L'outil ECEL à l'origine des calculs de cette étude a été
          adapté au contexte des particuliers sous forme de simulateur.
        </div>
      </div>
      <div className={styles.title}>Les différents type de produits</div>
      <div className={styles.content}>
        <div>
          L'<b>habillement</b> correspond à un produit textile qui va de la paire de chaussures, au manteau en passant
          par le t-shirt. Par défaut, nous considérons une <b>boite à chaussures</b>.
        </div>
        <div>
          Les <b>produits culturels</b> correspondent aux livres, jeux de société, CD/vinyles, jeux vidéos, etc. Par
          défaut, nous considérons un <b>livre</b>.
        </div>
        <div>
          Les <b>équipements volumineux</b> correspondent aux gros électroménagers, l'ameublement, etc. Par défaut, nous
          considérons un <b>lave-vaisselle</b>.
        </div>
        <div>
          Pour <b>les produits de grande consommation</b>, nous avons considéré{' '}
          <b>une commande de produits alimentaires secs</b>.
        </div>
      </div>
      <div className={styles.title}>Les scénarios de livraison</div>
      <div className={styles.content}>
        <div>
          Dans cette première version, 3 scénarios sont proposés: la livraison{' '}
          <b>à domicile, en point relais ou en click & collect</b>, tous adaptables à l'option{' '}
          <b>"colis qui vient de loin"</b>.
        </div>
        <div>
          Pour chaque scénario, nous prenons en compte l'<b>ensemble des étapes d'un processus de livraison</b> :
          commande en ligne, emballage, entrepôt de stockage, plateformes de tri, transport inter-platerformes,
          infrastruture de collecte, et enfin, le déplacement consommateur dans le cas d'une livraison en point relais
          ou click & collect (<i>Voir ci-dessous pour le détail des processus de livraison</i>). Pour un article{' '}
          <b>"qui vient de loin"</b>, nous avons fait l'hypothèse que le colis arrive <b>par avion depuis la Chine</b>{' '}
          via une étape de transport supplémentaire (9000km parcourus par avion, mix électrique de l'entrepôt de départ
          adapté). Nous ne prenons pas en compte les trainées de condensation pour l’aérien.
        </div>
      </div>
      <div className={styles.title}>Des informations supplémentaires sur les paramètres...</div>
      <div className={styles.content}>
        <div>
          Pour le processus de <b>commande en ligne</b>, le type de produit impacte le temps de recherche web et donc
          l'empreinte de l'utilisation du terminal pour effectuer effectuer l'achat. On conserve donc une valeur unique
          (<b>5,4 gCO₂e</b>) par commande quel que soit le produit.
        </div>
        <div>
          Un <b>emballage carton</b> a été attribué à chaque type de colis selon sa taille.
        </div>
        <div>
          Pour les étapes de <b>stockage</b> en entrepôt, on considère un entrepôt de{' '}
          <b>
            10 000 m<sup>2</sup>
          </b>
          . Le nombre de jour de stockage dépend du type de produit.
        </div>
        <div>
          En ce qui concerne les <b>camions de livraison</b>, pour le <b>transport longue distance</b>, nous avons
          considéré un <b>poids lourd moyen</b> (type 44 tonnes) tandis que pour les <b>derniers kilomètres</b> de
          livraison, nous avons considéré un <b>véhicule utilitaire léger</b>.{' '}
        </div>
      </div>
      <div className={styles.title}>Fréquences de livraison</div>
      <div className={styles.content}>
        <div>
          Pour calculer l’impact annuel de la livraison de colis en fonction de votre fréquence de livraison nous
          faisons les calculs suivants :
        </div>
        <ul>
          <li>X colis x 1 si par an</li>
          <li>X colis x 12 si par mois</li>
          <li>X colis x 52 si par semaine</li>
        </ul>
      </div>
      <div className={styles.content}>
        <details>
          <summary>Livraison à domicile</summary>
          <ul>
            <li>Processus de commande en ligne</li>
            <li>Entrepôt initial de stockage et de préparation du colis</li>
            <li>
              Transport entrepôt - plateforme 1 : <b>400 km</b> (
              <i>
                poids lourd moyen, taux de remplissage de 15% et un taux de retour à vide de 20% roulant à une vitesse
                moyenne de 60 km/h
              </i>
              )
            </li>
            <li>Plateforme 1</li>
            <li>
              Transport plateforme 1 - plateforme 2 : <b>400 km</b> (
              <i>
                poids lourd moyen, taux de remplissage de 15% et un taux de retour à vide de 20% roulant à une vitesse
                moyenne de 60 km/h
              </i>
              )
            </li>
            <li>Plateforme 2</li>
            <li>
              Transport plateforme 2 - domicile : <b>70 km</b> (
              <i>
                VUL, taux de remplissage de 15% et un taux de retour à vide de 20% roulant à une vitesse moyenne de 30
                km/h
              </i>
              )
            </li>
          </ul>
        </details>
        <details>
          <summary>Livraison en point relais</summary>
          <ul>
            <li>Processus de commande en ligne</li>
            <li>Entrepôt initial de stockage et de préparation du colis</li>
            <li>
              Transport entrepôt - plateforme 1: <b>400 km</b> (
              <i>
                poids lourd moyen, taux de remplissage de 15% et un taux de retour à vide de 20% roulant à une vitesse
                moyenne de 60 km/h
              </i>
              )
            </li>
            <li>Plateforme 1</li>
            <li>
              Transport plateforme 1 - plateforme 2: <b>400 km</b> (
              <i>
                poids lourd moyen, taux de remplissage de 15% et un taux de retour à vide de 20% roulant à une vitesse
                moyenne de 60 km/h
              </i>
              )
            </li>
            <li>Plateforme 2</li>
            <li>
              Transport plateforme 2 - point de retrait: <b>70 km</b> (
              <i>
                VUL, taux de remplissage de 15% et un taux de retour à vide de 20% roulant à une vitesse moyenne de 30
                km/h
              </i>
              )
            </li>
            <li>Point de retrait</li>
            <li>Déplacement consommateur</li>
          </ul>
        </details>
        <details>
          <summary>Livraison en click & collect</summary>
          <ul>
            <li>Processus de commande en ligne</li>
            <li>Entrepôt initial de stockage et de préparation du colis</li>
            <li>
              Transport entrepôt - plateforme 1: <b>400 km</b> (
              <i>
                poids lourd moyen, taux de remplissage de 15% et un taux de retour à vide de 20% roulant à une vitesse
                moyenne de 60 km/h
              </i>
              )
            </li>
            <li>Plateforme 1</li>
            <li>
              Transport plateforme 1 - plateforme 2: <b>400 km</b> (
              <i>
                poids lourd moyen, taux de remplissage de 15% et un taux de retour à vide de 20% roulant à une vitesse
                moyenne de 60 km/h
              </i>
              )
            </li>
            <li>Plateforme 2</li>
            <li>
              Transport plateforme 2 - magasin: <b>70 km</b> (
              <i>
                VUL, taux de remplissage de 15% et un taux de retour à vide de 20% roulant à une vitesse moyenne de 30
                km/h
              </i>
              )
            </li>
            <li>Magasin</li>
            <li>Déplacement consommateur</li>
          </ul>
        </details>
      </div>
      <div className={styles.content}>
        <div>
          Pour plus de détails, consultez{' '}
          <Link href='/doc/livraison' title='Lien externe : documentation détaillée' target='_blank'>
            la documentation détaillée
            <NewTabIcon />
          </Link>
        </div>
      </div>
    </>
  )
}

const ESLivraisonData = () => {
  return (
    <>
      <div className={styles.content}>
        <div>
          <Link href='https://librairie.ademe.fr/mobilite-et-transport/6261-e-commerce-modelisation-des-impacts-et-recommandations-filieres-et-grand-public.html'>
            El estudio Comercio en línea - 2023
          </Link>{' '}
          para profesionales del comercio electrónico. La herramienta ECEL utilizada para calcular este estudio se ha
          adaptado al contexto de los particulares en forma de simulador.
        </div>
      </div>
      <div className={styles.title}>Los diferentes tipos de producto</div>
      <div className={styles.content}>
        <div>
          La <b>ropa</b> corresponde a un producto textil que va desde un par de zapatos hasta un abrigo o una camiseta.
          Por defecto, consideramos una <b>caja de zapatos</b>.
        </div>
        <div>
          Los <b>productos culturales</b> incluyen libros, juegos de mesa, CD/vinilo, videojuegos, etc. Por defecto,
          consideramos un <b>libro</b>.
        </div>
        <div>
          El <b>equipamiento voluminoso</b> incluye grandes electrodomésticos, muebles, etc. Por defecto, consideramos
          un <b>lavavajillas</b>.
        </div>
        <div>
          Para <b>los bienes de consumo rápido</b>, consideramos <b>un pedido de productos alimenticios secos</b>.
        </div>
      </div>
      <div className={styles.title}>Escenarios de entrega</div>
      <div className={styles.content}>
        <div>
          <b>a domicilio, entrega en punto de relevo o click & collect</b>, todos ellos adaptables a la opción{' '}
          <b>"paquete a distancia"</b>.
        </div>
        <div>
          Para cada escenario, tenemos en cuenta <b>todas las etapas del proceso de entrega</b>: pedido en línea,
          embalaje, almacén de salida, plataformas de clasificación, transporte entre plataformas, infraestructura de
          recogida y, por último, el recorrido del consumidor en caso de entrega en un punto de relevo o click & collect
          (<i>véanse más abajo los detalles de los procesos de entrega</i>). Para un artículo{' '}
          <b>"procedente de lejos"</b>, hemos supuesto que el paquete llega <b>en avión desde China</b> a través de una
          etapa de transporte adicional (9.000 km recorridos en avión, mezcla de electricidad adaptada del almacén de
          salida). No hemos tenido en cuenta las estelas de condensación del transporte aéreo.
        </div>
      </div>
      <div className={styles.title}>Información adicional sobre los parámetros...</div>
      <div className={styles.content}>
        <div>
          En el proceso de <b>pedido en línea</b>, el tipo de producto influye en el tiempo de búsqueda en la web y, por
          tanto, en la huella del terminal utilizado para completar la compra. Por ello, hemos mantenido un valor único
          (<b>5,4 gCO₂e</b>) por pedido, sea cual sea el producto.
        </div>
        <div>
          Se ha asignado una <b>caja de cartón</b> a cada tipo de paquete en función de su tamaño.
        </div>
        <div>
          Para las etapas de <b>almacenamiento</b>, consideramos un almacén de{' '}
          <b>
            10.000 m<sup>2</sup>
          </b>
          . El número de días de almacenamiento depende del tipo de producto.
        </div>
        <div>
          En cuanto a los <b>camiones de reparto</b>, para el <b>transporte de larga distancia</b>, hemos considerado un{' '}
          <b>vehículo pesado medio</b> (tipo 44 toneladas), mientras que para los <b>últimos kilómetros</b> de reparto,
          hemos considerado un <b>vehículo comercial ligero</b>.
        </div>
      </div>
      <div className={styles.title}>Frecuencias de entrega</div>
      <div className={styles.content}>
        <div>
          Para calcular el impacto anual de la entrega de paquetes en función de su frecuencia de entrega, realizamos
          los siguientes cálculos:{' '}
        </div>
        <ul>
          <li>X paquetes x 1 si es anual</li>
          <li>X paquetes x 12 si es mensual</li>
          <li>X paquetes x 52 si es semanal</li>
        </ul>
      </div>
      <div className={styles.content}>
        <details>
          <summary>Entrega a domicilio</summary>
          <ul>
            <li>Proceso de pedido en línea</li>
            <li>Almacén inicial y almacén de preparación de paquetes</li>
            <li>
              Almacén de transporte - plataforma 1:<b>400 km</b> (
              <i>camión medio, 15% de factor de carga y 20% de retorno en vacío a una velocidad media de 60 km/h</i>)
            </li>
            <li>Plataforma 1</li>
            <li>
              Plataforma 1 - plataforma 2 : <b>400 km</b> (
              <i>camión medio, 15% de factor de carga y 20% de retorno en vacío a una velocidad media de 60 km/h</i>)
            </li>
            <li>Plataforma 2</li>
            <li>
              Plataforma 2 - domicilio : <b>70 km</b> (
              <i>camión ligero, factor de carga del 15% y 20% de retorno en vacío a una velocidad media de 30 km/h</i>)
            </li>
          </ul>
        </details>
        <details>
          <summary>Entrega en puntos de relevo</summary>
          <ul>
            <li>Proceso de pedido en línea</li>
            <li>Almacén inicial y almacén de preparación de paquetes</li>
            <li>
              Almacén de transporte - plataforma 1: <b>400 km</b> (
              <i>camión medio, 15% de factor de carga y 20% de retorno en vacío a una velocidad media de 60 km/h</i>)
            </li>
            <li>Plataforma 1</li>
            <li>
              Plataforma 1 - plataforma 2:: <b>400 km</b> (
              <i>camión medio, 15% de factor de carga y 20% de retorno en vacío a una velocidad media de 60 km/h</i>)
            </li>
            <li>Plateforme 2</li>
            <li>
              Transport plateforme 2 - punto de recogida: <b>70 km</b> (
              <i>camión ligero, factor de carga del 15% y 20% de retorno en vacío a una velocidad media de 30 km/h</i>)
            </li>
            <li>Punto de recogida</li>
            <li>Recorrido del consumidor</li>
          </ul>
        </details>
        <details>
          <summary>Entrega Click & collect</summary>
          <ul>
            <li>Proceso de pedido en línea</li>
            <li>Almacén inicial y almacén de preparación de paquetes</li>
            <li>
              Almacén de transporte - plataforma 1: <b>400 km</b> (
              <i>camión medio, 15% de factor de carga y 20% de retorno en vacío a una velocidad media de 60 km/h</i>)
            </li>
            <li>Plataforma 1</li>
            <li>
              Plataforma 1 - plataforma 2:: <b>400 km</b> (
              <i>camión medio, 15% de factor de carga y 20% de retorno en vacío a una velocidad media de 60 km/h</i>)
            </li>
            <li>Plataforma 2</li>
            <li>
              Plataforma 2 - tienda: <b>70 km</b> (
              <i>camión ligero, factor de carga del 15% y 20% de retorno en vacío a una velocidad media de 30 km/h</i>)
            </li>
            <li>tienda</li>
            <li>Recorrido del consumidor</li>
          </ul>
        </details>
      </div>
      <div className={styles.content}>
        <div>
          Para más detalles, consulte{' '}
          <Link href='/doc/livraison' title='Lien externe : documentation détaillée' target='_blank'>
            la documentación detallada <NewTabIcon />
          </Link>
        </div>
      </div>
    </>
  )
}

const ENLivraisonData = () => {
  return (
    <>
      <div className={styles.content}>
        <div>
          <Link href='https://librairie.ademe.fr/mobilite-et-transport/6261-e-commerce-modelisation-des-impacts-et-recommandations-filieres-et-grand-public.html'>
            The Online Commerce - 2023 study
          </Link>{' '}
          for E-commerce professionals. The ECEL tool at the origin of the calculations in this study has been adapted
          to the context of individuals in the form of a simulator.{' '}
        </div>
      </div>
      <div className={styles.title}>The different types of products</div>
      <div className={styles.content}>
        <div>
          <b>Clothing</b> corresponds to a textile product that ranges from a pair of shoes to a coat to a t-shirt. By
          default, we consider a <b>shoebox</b>.
        </div>
        <div>
          <b>Cultural products</b> correspond to books, board games, CDs/vinyls, video games, etc. By default, we
          consider a <b>book</b>.
        </div>
        <div>
          <b>Large equipment</b> corresponds to large household appliances, furniture, etc. By default, we consider a{' '}
          <b>dishwasher</b>.
        </div>
        <div>
          For <b>consumer products</b>, we considered an <b>order for dry food products</b>.
        </div>
      </div>
      <div className={styles.title}>Delivery scenarios</div>
      <div className={styles.content}>
        <div>
          In this first version, 3 scenarios are offered: <b>home delivery, relay point or click & collect</b>, all
          adaptable to the <b>"parcel that comes from far away"</b> option.
        </div>
        <div>
          For each scenario, we take into account <b>all the stages of a delivery process</b>: online ordering,
          packaging, storage warehouse, sorting platforms, inter-platform transport, collection infrastructure, and
          finally, consumer movement in the case of delivery to a relay point or click & collect (
          <i>See below for details of the delivery processes</i>). For an item <b>"that comes from far away"</b>, we
          have made the assumption that the package arrives <b>by plane from China</b> via an additional transport stage
          (9000km traveled by plane, electrical mix of the departure warehouse adapted). We do not take condensation
          trails into account for air travel.
        </div>
      </div>
      <div className={styles.title}>Additional information about settings...</div>
      <div className={styles.content}>
        <div>
          For the <b>online ordering process</b>, the type of product impacts the web search time and therefore the
          footprint of using the terminal to make the purchase. We therefore maintain a single value (<b>5.4 gCO₂e</b>)
          per order regardless of the product.
        </div>
        <div>
          A <b>cardboard packaging</b> has been assigned to each type of package according to its size.
        </div>
        <div>
          For the warehouse <b>storage</b> stages, we consider a warehouse of{' '}
          <b>
            10,000 m<sup>2</sup>
          </b>
          . The number of days of storage depends on the type of product.
        </div>
        <div>
          Regarding <b>delivery trucks</b>, for <b>long distance transport</b> we considered a{' '}
          <b>medium heavy duty vehicle</b> (typically 44 tonnes) while for the <b>last few kilometers</b> of delivery we
          considered a <b>light commercial vehicle</b>.
        </div>
      </div>
      <div className={styles.title}>Delivery frequencies</div>
      <div className={styles.content}>
        <div>
          To calculate the annual impact of parcel delivery based on your delivery frequency, we make the following
          calculations:
        </div>
        <ul>
          <li>X package x 1 if per year </li>
          <li>X package x 12 if per month</li>
          <li>X package x 52 if per week</li>
        </ul>
      </div>
      <div className={styles.content}>
        <details>
          <summary>Home delivery</summary>
          <ul>
            <li>Online ordering process</li>
            <li>Initial warehouse for storage and preparation of the package</li>
            <li>
              Warehouse transport - platform 1: <b>400 km</b> (
              <i>
                average heavy weight, filling rate of 15% and an empty return rate of 20% traveling at an average speed
                of 60 km/h
              </i>
              )
            </li>
            <li>Platform 1</li>
            <li>
              Transport platform 1 - platform 2: <b>400 km</b> (
              <i>
                average heavy weight, filling rate of 15% and an empty return rate of 20% traveling at an average speed
                of 60 km/h
              </i>
              )
            </li>
            <li>Plateform 2</li>
            <li>
              Transport platform 2 - home: <b>70 km</b> (
              <i>LCV, filling rate of 15% and an empty return rate of 20% traveling at an average speed of 30 km/h</i>)
            </li>
          </ul>
        </details>
        <details>
          <summary>Click & collect delivery</summary>
          <ul>
            <li>Online ordering process</li>
            <li>Initial warehouse for storage and preparation of the package</li>
            <li>
              Warehouse transport - platform 1: <b>400 km</b> (
              <i>
                average heavy weight, filling rate of 15% and an empty return rate of 20% traveling at an average speed
                of 60 km/h
              </i>
              )
            </li>
            <li>Platform 1</li>
            <li>
              Transport platform 1 - platform 2: <b>400 km</b> (
              <i>
                average heavy weight, filling rate of 15% and an empty return rate of 20% traveling at an average speed
                of 60 km/h
              </i>
              )
            </li>
            <li>Plateform 2</li>
            <li>
              Transport platform 2 - collection point: <b>70 km</b> (
              <i>LCV, filling rate of 15% and an empty return rate of 20% traveling at an average speed of 30 km/h</i>)
            </li>
            <li>Withdrawal point</li>
            <li>Consumer travel</li>
          </ul>
        </details>
        <details>
          <summary>Livraison en click & collect</summary>
          <ul>
            <li>Online ordering process</li>
            <li>Initial warehouse for storage and preparation of the package</li>
            <li>
              Warehouse transport - platform 1: <b>400 km</b> (
              <i>
                average heavy weight, filling rate of 15% and an empty return rate of 20% traveling at an average speed
                of 60 km/h
              </i>
              )
            </li>
            <li>Platform 1</li>
            <li>
              Transport platform 1 - platform 2: <b>400 km</b> (
              <i>
                average heavy weight, filling rate of 15% and an empty return rate of 20% traveling at an average speed
                of 60 km/h
              </i>
              )
            </li>
            <li>Plateform 2</li>
            <li>
              Transport platform 2 - store: <b>70 km</b> (
              <i>LCV, filling rate of 15% and an empty return rate of 20% traveling at an average speed of 30 km/h</i>)
            </li>
            <li>Store</li>
            <li>Consumer travel</li>
          </ul>
        </details>
      </div>
      <div className={styles.content}>
        <div>
          For more details, see{' '}
          <Link href='/doc/livraison' title='Lien externe : documentation détaillée' target='_blank'>
            the detailed documentation
            <NewTabIcon />
          </Link>
        </div>
      </div>
    </>
  )
}

const LivraisonData = () => {
  const { language } = useParamContext()
  if (language === 'en') {
    return <ENLivraisonData />
  }
  if (language === 'es') {
    return <ESLivraisonData />
  }

  return <FRLivraisonData />
}
export default LivraisonData
