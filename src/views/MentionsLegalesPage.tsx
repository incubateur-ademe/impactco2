import classNames from 'classnames'
import React from 'react'
import Link from 'components/base/buttons/Link'
import styles from './Page.module.css'

const MentionsLegalesPage = () => {
  return (
    <div className={classNames(styles.container, 'main-container')}>
      <h1>Mentions légales</h1>
      <p>Mis à jour le 29/05/2024</p>
      <h2>1. Présentation du site</h2>
      <p>
        Il est précisé aux utilisateurs du site l'identité des différents intervenants dans le cadre de sa réalisation
        et de son suivi.
      </p>
      <h3>1.1. Propriétaire et éditeur</h3>
      <p>
        Conformément aux dispositions de l’article 6-I 1° de la loi n°2004-575 du 21 juin 2004 relative à la confiance
        dans l’économie numérique, le site <Link href='https://impactco2.fr'>https://impactco2.fr</Link> (et autres
        sites en ademe.fr, ci-après les “Sites”) est édité par l’ADEME, ayant son siège social au :
        <br />
        20, avenue du Grésillé
        <br />
        BP 90406
        <br />
        49004 Angers Cedex 01
        <br />
        <Link href='tel:0241204120'>02 41 20 41 20</Link>
        <br />
        inscrit au registre du commerce d'Angers sous le n° 385 290 309, représentée par Sylvain Waserman, agissant en
        qualité de Président du conseil d'administration.
      </p>
      <h3>1.2. Publication</h3>
      <p>Le directeur de la publication est Monsieur Sylvain Waserman, en qualité de représentant légal de l’ADEME.</p>
      <p>
        La personne responsable de l'accès aux documents administratifs et des questions relatives à la réutilisation
        des informations est Monsieur Luc Morinière en qualité de Chef du service juridique.
      </p>
      <h3>1.3. Hébergement</h3>
      <p>
        Le prestataire assurant le stockage direct du site <Link href='https://impactco2.fr'>https://impactco2.fr</Link>{' '}
        est Scalingo, dont le siège social est situé :
        <br />
        13 rue Jacques Peirotes 67000 Strasbourg, France
      </p>
      <h3>1.4. Utilisateur</h3>
      <p>
        L’utilisateur est l’internaute qui navigue, lit, visionne, et utilise le site{' '}
        <Link href='https://impactco2.fr'>https://impactco2.fr</Link> et ses services.
      </p>
      <h3>1.5. Attribution tierce</h3>
      <p>
        Les calculs de distance sont effectués via l'API{' '}
        <Link href='https://developers.google.com/maps/documentation/distance-matrix/overview'>google maps</Link>.
      </p>
      <p>
        La recherche d'adresse est effectuée via l'API <Link href='https://photon.komoot.io/'>Photon</Link>.
      </p>
      <h2>2. Acceptation des conditions d’utilisation du site et des services proposés</h2>
      <p>
        L’utilisation des Sites de l’ADEME implique l’acceptation pleine et entière des conditions générales
        d’utilisation ci-après décrites. Ces conditions d’utilisation sont susceptibles d’être modifiées ou complétées à
        tout moment, les utilisateurs des Sites de l’ADEME sont donc invités à les consulter de manière régulière.
      </p>
      <p>
        L’utilisateur reconnaît avoir pris connaissance des conditions d’utilisation, au moment de sa connexion sur les
        sites de l’ADEME, et déclare expressément les accepter sans réserve.
      </p>
      <h2>3. Description des services fournis</h2>
      <p>
        Les Sites de l’ADEME ont pour objet de fournir des informations concernant l’ensemble des éléments liés aux
        services de l’ADEME, en particulier une information sur l’actualité de la transition écologique, l’expertise de
        l’ADEME, les actions mises en œuvre au sein des territoires, l’action internationale de l’ADEME, les programmes
        de recherche et d’innovation.
      </p>
      <p>L’ADEME s’efforce de fournir sur les Sites des informations aussi précises que possible.</p>
      <p>
        Toutefois, elle ne pourra être tenue responsable des omissions, des inexactitudes des carences dans la mise à
        jour ou de tout autres manquements qu’ils soient de son fait ou du fait des tiers partenaires qui lui
        fournissent ces informations.
      </p>
      <p>
        Toutes les informations indiquées sur les Sites de l’ADEME sont données à titre indicatif, et sont susceptibles
        d’évoluer. Par ailleurs, les renseignements figurant sur les Sites de l’ADEME ne sont pas exhaustifs. Ils sont
        donnés sous réserve de modifications ayant été apportées depuis leur mise en ligne.
      </p>
      <h2>4. Disponibilité du site</h2>
      <p>
        L’ADEME s’efforce de permettre l’accès au site 24 heures sur 24, 7 jours sur 7, sauf en cas de force majeure ou
        d’un événement hors du contrôle de l’ADEME, et sous réserve des éventuelles pannes et interventions de
        maintenance nécessaires au bon fonctionnement du site et des services.
      </p>
      <p>
        Par conséquent, l’ADEME ne peut garantir une disponibilité du site et/ou des services, une fiabilité des
        transmissions et des performances en termes de temps de réponse ou de qualité. Il n’est prévu aucune assistance
        technique vis-à-vis de l’utilisateur que ce soit par des moyens électroniques ou téléphoniques.
      </p>
      <p>
        La responsabilité de l’ADEME ne saurait être engagée en cas d’impossibilité d’accès à ce site et/ou
        d’utilisation des services.
      </p>
      <p>
        L’ADEME peut être amenée à interrompre le site ou une partie des services, à tout moment sans préavis, le tout
        sans droit à indemnités. L’utilisateur reconnaît et accepte que l’ADEME ne soit pas responsable des
        interruptions, et des conséquences qui peuvent en découler pour l’utilisateur ou tout tiers.
      </p>
      <h2>5. Liens hypertextes</h2>
      <p>L’ADEME décline toute responsabilité quant au contenu des sites proposés en liens.</p>
      <p>
        Tout site public ou privé est autorisé à établir, sans information ni autorisation préalable, un lien vers les
        informations diffusées par l’ATE. En revanche et sauf mentions contraires (ex. iframes), les pages des Sites ne
        doivent pas être imbriquées à l’intérieur des pages d’un autre site.
      </p>
      <p>
        La mise en place d’un lien est valable pour tout site à l’exception de ceux diffusant des informations à
        caractère polémique, pornographique, xénophobe ou pouvant, dans une plus large mesure, porter atteinte à la
        sensibilité du plus grand nombre.
      </p>
      <h2>6. Cookies de navigation</h2>
      <p>
        Des cookies sont utilisés sur les Sites pour différentes finalités : pour faciliter votre navigation, pour vous
        proposer des contenus personnalisés ou pour réaliser des statistiques de visites.
      </p>
      <h2>7. Propriété intellectuelle</h2>
      <p>
        Sauf mention contraire précisée sur le fichier{' '}
        <Link href='https://github.com/incubateur-ademe/impactco2'>https://github.com/incubateur-ademe/impactco2</Link>{' '}
        l’ADEME est propriétaire des droits de propriété intellectuelle ou détient les droits d’usage sur tous les
        éléments accessibles sur le site, notamment les textes, images, graphismes, logos, icônes, sons, logiciels et
        marques déposées.
      </p>
      <p>
        Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site
        ainsi que des logos de l’ADEME, quel que soit le moyen ou le procédé utilisé, est interdite, sauf acceptation
        écrite et préalable de l’ADEME d’une demande d’autorisation de reproduction et de représentation formulée à
        l’adresse suivante : https://agirpourlatransition.ademe.fr/entreprises/form/contact.
      </p>
      <p>
        Toute exploitation non autorisée du site ou de l’un quelconque des éléments qu’il contient sera considérée comme
        constitutive d’une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du
        Code de Propriété Intellectuelle.
      </p>
      <p>
        L’ADEME ne pourra en revanche interdire la réutilisation de discours, dossiers de presse et communiqués, les
        circulaires, directives et autres documents règlementaires.
      </p>
      <p>
        L’ADEME autorise la réutilisation non commerciale et pédagogique des informations disponibles sur ses Sites, à
        la condition de respecter l’intégrité des informations et de n’en altérer ni le sens, ni la portée, ni
        l’application et de faire mention du nom de l’ADEME ou d’en préciser l’origine et la date de publication avec la
        mention du crédit photo si tel est le cas.
      </p>
      <p>
        L’ADEME pourra autoriser la réutilisation d’informations à des fins commerciales ou promotionnelles par le biais
        d’une licence de réutilisation de ses informations. Est considérée comme réutilisation à des fins commerciales
        ou promotionnelles, l’élaboration à partir des informations publiques, d’un produit ou d’un service destiné à
        être mis à disposition de tiers, à titre gratuit ou onéreux.
      </p>
      <h2>8. Gestion des données personnelles</h2>
      <p>
        Conformément à la Règlementation relative à la protection des données à caractère personnel, l'utilisateur est
        informé que l’ADEME, en tant que responsable du traitement, met en œuvre un traitement de données à caractère
        personnel.
      </p>
      <p>
        L’ADEME est attachée au respect des règles de protection de la vie privée des utilisateurs de son site internet
        et de ses services. L’ensemble des traitements de données personnelles mis en œuvre dans le cadre des services
        accessibles respecte la réglementation applicable en matière de protection des données personnelles et notamment
        les dispositions de la loi « Informatique et libertés » du 6 janvier 1978 modifiée et le Règlement général sur
        la Protection des données (Règlement UE 2016/679) désigné par « RGPD ».
      </p>
      <p>
        Pour en savoir plus sur ce traitement de données à caractère personnel et sur l’étendue de leurs droits, cliquez
        sur <Link href='/politique-de-confidentialite'>politique-de-confidentialite</Link>
      </p>
      <h2>9. Accessibilité</h2>
      <p>
        La conformité aux normes d'accessibilité numérique est un objectif ultérieur mais l’ADEME tâche de rendre ce
        site accessible à toutes et tous, conformément à l'article 47 de la loi n°2005-102 du 11 février 2005.
      </p>
      <h3>9.1. Signaler un dysfonctionnement</h3>
      <p>
        Si vous rencontrez un défaut d’accessibilité vous empêchant d’accéder à un contenu ou une fonctionnalité du
        site, merci de nous en <Link href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}>faire part</Link>. Si vous
        n’obtenez pas de réponse rapide de notre part, vous êtes en droit de faire parvenir vos doléances ou une demande
        de saisine au Défenseur des droits.
      </p>
      <p>
        Pour en savoir plus sur la politique d’accessibilité numérique de l’État :{' '}
        <Link href=' http://references.modernisation.gouv.fr/accessibilite-numerique'>
          http://references.modernisation.gouv.fr/accessibilite-numerique
        </Link>
      </p>
      <h2>10. Sécurité</h2>
      <p>
        Le site est protégé par un certificat électronique, matérialisé pour la grande majorité des navigateurs par un
        cadenas. Cette protection participe à la confidentialité des échanges. En aucun cas les services associés à la
        plateforme ne seront à l’origine d’envoi d'emails pour demander la saisie d’informations personnelles.
      </p>
      <h2>11. Votre attention</h2>
      <p>
        Nous vous rappelons qu’il n’est pas possible de garantir la confidentialité des messages transmis sur le réseau
        Internet. Aussi, si vous souhaitez transmettre un message dans de meilleures conditions de sécurité, nous vous
        recommandons d’utiliser la voie postale. L’ADEME dégage toute responsabilité quant aux difficultés techniques
        que vous pourriez rencontrer sur les Sites qu’elles qu’en soient la cause et l’origine.
      </p>
      <h2>12. Modifications</h2>
      <p>L’ADEME se réserve le droit d’adapter les présentes mentions légales.</p>
      <p>
        Si l’ADEME apporte une modification aux présentes mentions légales, elle publiera la nouvelle version sur les
        supports concernés et actualisera la date de « dernière mise à jour » figurant en haut des présentes mentions
        légales.
      </p>
      <p>
        L’ADEME vous invite donc à consulter régulièrement les supports concernés où sont publiées les mentions légales.
      </p>
    </div>
  )
}

export default MentionsLegalesPage
