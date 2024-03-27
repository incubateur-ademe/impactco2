import { ReactNode, useMemo, useState } from 'react'
import { Category } from 'types/category'
import Card from 'components/base/Card'
import { SectionWideContent } from 'components/base/Section'
import Button from 'components/base/buttons/Button'
import Co2eModal from 'components/modals/Co2eModal'
import { Cards, Informations, Strong, StyledSection } from './Learning.styles'

export default function Learning({
  category,
  from,
  fromLabel,
}: {
  category?: Category
  from?: string
  fromLabel?: string
}) {
  const [openModal, setOpenModal] = useState(false)

  const learnings = useMemo<Record<string, ReactNode>>(
    () => ({
      repas: (
        <>
          <p className='text-xl'>
            <b>Quel est l’impact sur le climat d'un repas&nbsp;?</b>
          </p>
          <Strong>
            Le quart des émissions de gaz à effet de serre en France provient de nos assiettes, c’est autant que le
            logement ou le transport&nbsp;!
          </Strong>
          <p>
            Un repas végétarien ou végétalien (0,5 et 0,4 kg{' '}
            <Button asLink onClick={() => setOpenModal(true)} priority='secondary'>
              CO<sub>2</sub>e
            </Button>
            ) a beacoup moins d'impact pour la planète qu’un repas avec du bœuf ou du poulet (7 kg{' '}
            <Button asLink onClick={() => setOpenModal(true)} priority='secondary'>
              CO<sub>2</sub>e
            </Button>{' '}
            et 1,6 kg{' '}
            <Button asLink onClick={() => setOpenModal(true)} priority='secondary'>
              CO<sub>2</sub>e
            </Button>
            ) ou encore avec du poisson (gras 1,1 kg{' '}
            <Button asLink onClick={() => setOpenModal(true)} priority='secondary'>
              CO<sub>2</sub>e
            </Button>{' '}
            et blanc 2 kg{' '}
            <Button asLink onClick={() => setOpenModal(true)} priority='secondary'>
              CO<sub>2</sub>e
            </Button>
            ). Il est donc préférable de manger des produits d'origine végétale pour protéger l’écosystème de la
            planète.
          </p>
        </>
      ),

      numerique: (
        <>
          <p className='text-xl'>
            <b>Quel est l’impact sur le climat des appareils numériques&nbsp;?</b>
          </p>
          <Strong>
            L’empreinte carbone du secteur du numérique représente aujourd’hui 3 à 4% des émissions de gaz à effet de
            serre dans le monde et 2% de l’empreinte carbone à l’échelle nationale.
          </Strong>
          <p>
            La grande majorité de l'impact du numérique provient de la fabrication des smartphones, ordinateurs, et tous
            les dispositifs que nous achetons. Pour limiter l'impact du numérique, il est donc primordial de garder le
            plus longtemps possible nos équipements et de privilégier les appareils reconditionnés : tous les métaux et
            matériaux utilisés pour la fabrication repartent ainsi pour une nouvelle vie.
          </p>
        </>
      ),

      mobilier: (
        <>
          <p className='text-xl'>
            <b>Quel est l'impact sur le climat du mobilier&nbsp;?</b>
          </p>
          <p>
            L'impact carbone d'un meuble comprenant la fabrication, la distribution et l’usage, peut aller de 19 kg
            d’émissions de{' '}
            <Button asLink onClick={() => setOpenModal(true)} priority='secondary'>
              CO<sub>2</sub>e
            </Button>{' '}
            avec la chaise en bois, jusqu’à 907 kg d’émissions de{' '}
            <Button asLink onClick={() => setOpenModal(true)} priority='secondary'>
              CO<sub>2</sub>e
            </Button>{' '}
            avec l’armoire.
          </p>
        </>
      ),

      habillement: (
        <>
          <p className='text-xl'>
            <b>Comment est calculé l’impact carbone des vêtements ?</b>
          </p>
          <p>
            Pour calculer l’impact carbone, on prend en compte les émissions de{' '}
            <Button asLink onClick={() => setOpenModal(true)} priority='secondary'>
              CO<sub>2</sub>e
            </Button>{' '}
            à toutes les étapes de la vie du vêtement : depuis la production de matières premières (coton, laine,
            polyester…), en passant par sa fabrication, sa distribution dans des magasins ou en ligne, son utilisation
            et son entretien (lavage, séchage en machine).
          </p>
        </>
      ),

      transport: (
        <>
          <p className='text-xl'>
            <b>Quel est l’impact sur le climat des déplacements&nbsp;?</b>
          </p>
          <Strong>
            Avec 30% des émissions de{' '}
            <Button asLink onClick={() => setOpenModal(true)} priority='secondary'>
              CO<sub>2</sub>e
            </Button>
            , le secteur des transports est le 1er secteur émetteur de gaz à effet de serre.
          </Strong>
          <p>
            L’impact carbone d'un déplacement d'une distance de 10km peut aller de 0 kg d’émission de{' '}
            <Button asLink onClick={() => setOpenModal(true)} priority='secondary'>
              CO<sub>2</sub>e
            </Button>{' '}
            avec la marche ou le vélo, jusqu’à 2,2 kg d’émissions de{' '}
            <Button asLink onClick={() => setOpenModal(true)} priority='secondary'>
              CO<sub>2</sub>e
            </Button>{' '}
            avec une voiture thermique.
          </p>
        </>
      ),

      electromenager: (
        <>
          <p className='text-xl'>
            <b>Quel est l'impact sur le climat d'un appareil électroménager&nbsp;?</b>
          </p>
          <p>
            L’impact carbone du secteur de l’électroménager comprenant la fabrication, la distribution et l’usage, peut
            aller de 41 kg d’émissions de{' '}
            <Button asLink onClick={() => setOpenModal(true)} priority='secondary'>
              CO<sub>2</sub>e
            </Button>{' '}
            avec une bouilloire, jusqu’à 513 kg d’émissions de{' '}
            <Button asLink onClick={() => setOpenModal(true)} priority='secondary'>
              CO<sub>2</sub>e
            </Button>{' '}
            avec le lave-linge.
          </p>
        </>
      ),

      chauffage: (
        <>
          <p className='text-xl'>
            <b>Quel est l’impact sur le climat du chauffage d'un logement&nbsp;?</b>
          </p>
          <p>
            Que ce soit pour une maison ou un appartement, l’impact carbone du chauffage domestique par m<sup>2</sup> et
            par année, peut aller de 3,7 kg d’émissions de{' '}
            <Button asLink onClick={() => setOpenModal(true)} priority='secondary'>
              CO<sub>2</sub>e
            </Button>{' '}
            avec le chauffage électrique, jusqu’à 53 kg d’émissions de{' '}
            <Button asLink onClick={() => setOpenModal(true)} priority='secondary'>
              CO<sub>2</sub>e
            </Button>{' '}
            avec le chauffage au fioul.
          </p>
        </>
      ),

      boisson: (
        <>
          <p className='text-xl'>
            <b>Quel est l’impact sur le climat des boissons&nbsp;?</b>
          </p>
          <p>
            L’impact carbone des boissons peut aller de 0,0001 kg d’émissions de{' '}
            <Button asLink onClick={() => setOpenModal(true)} priority='secondary'>
              CO<sub>2</sub>e
            </Button>{' '}
            avec l’eau du robinet, comprenant l'impact de toute la gestion du réseau d'eau potable, jusqu’à 1,5 kg
            d’émissions de{' '}
            <Button asLink onClick={() => setOpenModal(true)} priority='secondary'>
              CO<sub>2</sub>e
            </Button>{' '}
            avec le lait de vache. Pour les boissons embouteillées, les valeurs affichées comprennent l'impact de leur
            fabrication, de l'emballage, du transport, de toute la chaîne de distribution y compris les supermarchés.
          </p>
        </>
      ),

      usagenumerique: (
        <>
          <p className='text-xl'>
            <b>Quel est l’impact sur le climat des usages numériques du quotidien&nbsp;?</b>
          </p>
          <Strong>
            L’empreinte carbone du secteur du numérique représente aujourd’hui 3 à 4% des émissions de gaz à effet de
            serre dans le monde et 2% de l’empreinte carbone à l’échelle nationale.
          </Strong>
          <p>
            La grande majorité de l'impact du numérique provient de la fabrication des smartphones, ordinateurs, et tous
            les dispositifs que nous achetons. L'impact carbone des mails va grandement varier selon la taille des
            pièces jointes et le nombre de destinataires, quand l'impact du streaming ou d'une visioconférence va varier
            selon la qualité de l'image. Enfin, la vidéo via 4G peut être jusqu'à 2 fois plus émettrice qu'avec une
            connexion Wifi.
          </p>
        </>
      ),

      fruitsetlegumes: (
        <>
          <p className='text-xl'>
            <b>Quel est l’impact sur le climat des fruits et légumes&nbsp;?</b>
          </p>
          <Strong>
            Aujourd’hui 75% de Français déclarent consommer des tomates en hiver. Or une tomate produite hors saison
            présente une empreinte carbone bien plus élevée puisqu'elle génère 4 fois plus d’émissions de{' '}
            <Button asLink onClick={() => setOpenModal(true)} priority='secondary'>
              CO<sub>2</sub>e
            </Button>{' '}
            que la même tomate produite durant la bonne saison.
          </Strong>
          <p>
            Afin de limiter ces émissions de gaz à effet de serre responsable du changement climatique, il est donc
            important de consommer les fruits & légumes du mois. Manger au moins 5 fruits et légumes par jour c’est bien
            pour la santé, mais s’ils sont de saison c’est encore mieux pour la planète et pour vos papilles !
          </p>
        </>
      ),
    }),
    [setOpenModal]
  )

  return (
    <StyledSection $withoutPadding>
      {openModal && <Co2eModal setOpen={setOpenModal} />}
      <SectionWideContent $size='sm'>
        <SectionWideContent $size='xs' $noGutter>
          <Cards>
            <Card
              href='/guide-utilisation'
              title='Utiliser cette ressource'
              description='Vous souhaitez intégrer le simulateur à votre publication et découvrir des exemples concrets déjà créés par d’autres utilisateurs ?'
              link="Guide d'utilisation"
              image='/images/laptop.png'
              trackingCategory={fromLabel || category?.name}
              trackingAction='Blocs accompagnement'
            />
            <Card
              href='/api-doc'
              title="Accéder à l'API"
              description='Vous souhaitez aller plus loin dans l’intégration de nos données au sein de vos propres contenus ou applications ?'
              link='Voir la documentation'
              image='/images/lightning.png'
              trackingCategory={fromLabel || category?.name}
              trackingAction='Blocs accompagnement'
            />
            <Card
              href={`/rendez-vous?from=${from || category?.slug}&fromLabel=${fromLabel || category?.name}`}
              title='Obtenir un accompagnement'
              description='Vous avez besoin d’aide pour intégrer les ressources de notre site ou souhaitez obtenir des informations ?'
              link='Prendre rendez-vous'
              image='/images/envelop.png'
              trackingCategory={fromLabel || category?.name}
              trackingAction='Blocs accompagnement'
            />
            {category && <Informations>{learnings[category.slug]}</Informations>}
          </Cards>
        </SectionWideContent>
      </SectionWideContent>
    </StyledSection>
  )
}
