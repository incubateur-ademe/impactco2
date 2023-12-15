import { Category } from 'types/category'
import Card from 'components/base/Card'
import MagicLink from 'components/base/MagicLink'
import { OverScreenInfo } from 'components/base/OverScreen'
import Resource from 'components/base/Resource'
import Integrate from '../Integrate'
import Share from '../Share'
import { OverScreenCategory } from './Type'
import { ResourcesContainer, Space, StyledEmoji } from './Values.styles'

export const overScreenCategoryValues: (
  category: Category,
  params: Record<string, string>
) => Record<OverScreenCategory, OverScreenInfo> = (category, params) => ({
  partager: { title: 'Partager', children: <Share category={category} params={params} /> },
  integrer: {
    title: 'Intégrer',
    children: (
      <>
        <Integrate category={category} params={params} />
        <Space />
        <Card
          href='https://accelerateur-transition-ecologique-ademe.notion.site/Kit-de-diffusion-Impact-CO2-b9d08930a49a4346830b7a12fd7cb733?pvs=4'
          title='Utiliser cette ressource'
          description='Consultez le kit de diffusion impact C02 pour vous emparer facilement du simulateur et l’intégrer à votre publication.'
          link='Kit de diffusion'
          image='/images/ressources.png'
        />
      </>
    ),
  },
  hypothesis: {
    title: (
      <div>
        <StyledEmoji>💡</StyledEmoji>Aller plus loin
      </div>
    ),
    noScroll: true,
    children: (
      <ResourcesContainer>
        <Resource
          image='/images/osez-changer-tri.jpeg'
          text='Chauffer à l’électrique : simuler la consommation électrique de son logement avec Wattris'
          href='https://wattris.ademe.fr/'
          withLink='Wattris'
          tracking={category.name}
        />
        <Resource
          image='/images/osez-changer-tri.jpeg'
          text='Découvrir comment mieux chauffer son logement'
          href='https://multimedia.ademe.fr/infographies/infographie_mieux_se_chauffer/'
          withLink='ADEME'
          tracking={category.name}
        />
        <Resource
          image='/images/osez-changer-tri.jpeg'
          text='Rénover et changer son système de chauffage'
          href='https://librairie.ademe.fr/cadic/6566/guide-changer-son-chauffage-0423.pdf'
          withLink='ADEME'
          tracking={category.name}
        />
      </ResourcesContainer>
    ),
  },
  data: {
    title: (
      <div>
        <StyledEmoji>🔎</StyledEmoji>Comprendre les données
      </div>
    ),
    children: (
      <>
        L'ensemble des calculs et des hypothèses sont issus de{' '}
        <MagicLink to='https://www.statistiques.developpement-durable.gouv.fr/consommation-denergie-par-usage-du-residentiel'>
          l’étude Consommation d'énergie par usage du résidentiel 2023
        </MagicLink>{' '}
        et <MagicLink to='https://nosgestesclimat.fr/documentation/logement/chauffage'>des modèles de calcul</MagicLink>{' '}
        du simulateur citoyen de l’ADEME Nos Gestes Climat. Nous utilisons également les facteurs d’émission de la{' '}
        <MagicLink to='https://base-empreinte.ademe.fr/donnees/jeu-donnees'>Base Empreinte</MagicLink> dans nos calculs,
        qui sont exprimés kgCO2e/kWh.
        <br />
        <br />
        <b>Pompe à chaleur</b>
        <br />
        La plupart des pompes à chaleur fonctionnent aujourd’hui en grande partie avec de l’électricité. Pour une
        première version nous reprenons les mêmes hypothèses que pour le calcul de l’elec.
        <br />
        <br />
        <b>Chauffage électrique</b>
        <br />
        L’intensité carbone de l’électricité est de 0,052 kgCO2e/kWh (2022)
        <br />
        La{' '}
        <MagicLink to='https://nosgestesclimat.fr/documentation/parc-fran%C3%A7ais/chauffage/consommation-%C3%A9lectricit%C3%A9-par-m2'>
          consommation de l'électricité
        </MagicLink>{' '}
        par m2 est de 75,06 kWh/m2
        <br />
        L’empreinte carbone des réseaux de chaleur / m2 = 75,06 kWh/m2 × 0,05 kgCO2e/kWh = 3,9 kgCO2e/m2
        <br />
        <br />
        <b>Poêle à granulé</b>
        <br />
        L’empreinte carbone du granulé est de 0,013 kg CO2e/kWh PCI
        <br />
        La{' '}
        <MagicLink to='https://nosgestesclimat.fr/documentation/parc-fran%C3%A7ais/chauffage/consommation-bois-par-m2'>
          consommation de bois
        </MagicLink>{' '}
        par m2 est de 455,95 kWh/m2
        <br />
        L’empreinte carbone du granulés / m2 = 455,95 kWh/m2 × 0,013 kgCO2e/kWh = 5,15 kgCO2e / m2
        <br />
        <br />
        <b>Poêle à bois</b>
        <br />
        L’empreinte carbone du bois buche est de 0,046 kg CO2e/kWh
        <br />
        La{' '}
        <MagicLink to='https://nosgestesclimat.fr/documentation/parc-fran%C3%A7ais/chauffage/consommation-bois-par-m2'>
          consommation de bois
        </MagicLink>{' '}
        est de 455,95 kWh/m2
        <br />
        L’empreinte carbone du bois buche / m2 = 455,95 kWh/m2 × 0,046 kgCO2e/kWh = 20,97 kgCO2e / m2
        <br />
        Attention toutefois les facteurs d'émissions E+/C- suivent des règles d'élaboration parfois différentes des
        règles de calcul de la Base Carbone. Il est donc probable que ce facteur d'émission sous-estime légèrement
        l'impact GES de la consommation d'un kWh de bois bûche en ne prenant pas en compte les émissions de méthane
        imbrulé.
        <br />
        <br />
        <b>Réseaux de chaleur</b>
        <br />
        L’empreinte carbone moyenne du réseau de chaleur est aujourd’hui de 0,112 kg CO2e /kWh.*
        <br />
        La{' '}
        <MagicLink to='https://nosgestesclimat.fr/documentation/parc-fran%C3%A7ais/chauffage/consommation-r%C3%A9seau-de-chaleur-par-m2'>
          consommation réseau
        </MagicLink>{' '}
        par m2 est de 167,93 kWh/m2
        <br />
        L’empreinte carbone des réseaux de chaleur / m2 = 167,93 kWh/m2 × 0,112 kgCO2e/kWh = 18,80 kgCO2e/m2
        <br />
        *Pour récupérer cette donnée nous nous basons sur{' '}
        <MagicLink to='https://www.fedene.fr/wp-content/uploads/sites/2/2023/11/Fedene_enquete_version-numerique.pdf'>
          l’étude de la Fedene de 2023
        </MagicLink>
        .
        <br />
        <br />
        <b>Chauffage au gaz</b>
        <br />
        L’intensité carbone du gaz est de 0,213 kg CO2e /kWh PCS*
        <br />
        La{' '}
        <MagicLink to='https://nosgestesclimat.fr/documentation/parc-fran%C3%A7ais/chauffage/consommation-gaz-par-m2'>
          consommation gaz
        </MagicLink>{' '}
        par m2 est de 126,83 kWh/m2
        <br />
        L’empreinte carbone des réseaux de chaleur/m2 = 126,83 kWh/m2 × 0,22 kgCO2e/kWh = 28,03 kgCO2e/m2
        <br />
        * On raisonne en PCS (Pouvoir Calorifique Supérieur) et non en PCI (Pouvoir Calorifique Inférieur), car le PCS
        est utilisé en tant que coefficient de conversion dans les factures pour convertir le volume de gaz utilisé en
        kWh : on fait l'hypothèse que la chaudière gaz récupère bien la chaleur latente de condensatio
        <br />
        <br />
        <b>Chauffage au fioul</b>
        <br />
        L’intensité carbone du fioul est de 0,32 kgCO2e /kWh
        <br />
        La{' '}
        <MagicLink to='https://nosgestesclimat.fr/documentation/parc-fran%C3%A7ais/chauffage/consommation-fioul-par-m2'>
          consommation fioul
        </MagicLink>{' '}
        par m2 est de 106,84 kWh/m2
        <br />
        L’empreinte carbone des réseaux de chaleur/m2 = 106,84 kWh/m2 × 0,32 kgCO2e /kWh = 34,62 kgCO2e /m2
      </>
    ),
  },
})
