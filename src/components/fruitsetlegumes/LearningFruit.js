import React, { useContext, useRef } from 'react'
import styled from 'styled-components'
import { track } from 'utils/matomo'
import useOnScreen from 'hooks/useOnScreen'
import ModalContext from 'components/providers/ModalProvider'
import Button from 'components/base/Button'
import { Section, SectionWideContent } from 'components/base/Section'
import BarChart from './learning/BarChart'

const StyledSection = styled(Section)`
  margin-top: 5rem;
`
const Statistic = styled.div`
  color: ${(props) => props.theme.colors.main};
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1em;
`
const Number = styled.div`
  font-size: 21em;
  font-weight: 900;
  line-height: 0.71;
  opacity: ${(props) => (props.$isOnScreen ? 1 : 0)};

  ${(props) => props.theme.mq.small} {
    font-size: 49vw;
  }
`
const BigText = styled.div`
  font-size: 9.5em;
  font-weight: 900;
  line-height: 0.8;
  text-transform: uppercase;

  ${(props) => props.theme.mq.small} {
    font-size: 22vw;
  }
`
const Line = styled.div`
  opacity: ${(props) => (props.$isOnScreen ? 1 : 0)};
`
const StrongWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`
const Strong = styled.p`
  font-size: 1.25em;
  font-style: italic;
  font-weight: 700;
  margin-right: 1em;
  max-width: 23.75em;
  text-align: right;

  ${(props) => props.theme.mq.small} {
    margin-right: 0;
    text-align: left;
  }
`
const Text = styled.p``
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`
const StyledLink = styled.span`
  color: ${(props) => props.theme.colors.main};
  cursor: pointer;
`
export default function LearningFruit() {
  const { setCo2e } = useContext(ModalContext)

  const ref = useRef()
  const isOnScreen = useOnScreen(ref, '-100px')

  return (
    <StyledSection>
      <SectionWideContent>
        <Statistic ref={ref}>
          <Number $isOnScreen={isOnScreen}>4</Number>
          <BigText>
            <Line $isOnScreen={isOnScreen}>fois</Line>
            <Line $isOnScreen={isOnScreen}>plus</Line>
          </BigText>
        </Statistic>
        <StrongWrapper>
          <Strong>
            de{' '}
            <StyledLink onClick={() => setCo2e(true)}>
              kgCO<sub>2</sub>e
            </StyledLink>{' '}
            générés par une tomate produite hors saison par rapport à la même tomate produite à la bonne saison.
          </Strong>
        </StrongWrapper>
        <Text>
          Or, nous sommes environ 75% de Français à déclarer consommer des tomates en hiver. De même pour les fraises, 1
          kg consommé en hiver génère 40% d'émissions de gaz à effet de serre de plus que la même quantité produite en
          saison. Bénéfiques pour le climat et la santé, les fruits et légumes de saison sont également meilleurs au
          goût.
        </Text>
        <BarChart />
        <ButtonWrapper>
          <Button
            to={'https://librairie.ademe.fr/consommer-autrement/5784-a-chaque-mois-ses-fruits-et-legumes-.html'}
            onClick={() => track('Fruits et légumes', 'Calendrier', 'fruits_et_legumes_calendrier')}>
            Je télécharge le calendrier des fruits et légumes de saison
          </Button>
        </ButtonWrapper>
        <Text>
          25% des émissions de gaz à effet de serre d'un Français sont liées à l'alimentation, devant les transports et
          le logement. Or, c’est un domaine dans lequel chacun dispose d’une capacité d’action. Il existe de nombreuses
          solutions simples et concrètes pour limiter ces émissions, responsables du changement climatique.
        </Text>
        <Text>
          Si vous souhaitez aller plus loin dans votre démarche, vous pouvez calculer votre empreinte sur le climat
          grace à notre simulateur{' '}
          <a href={'https://nosgestesclimat.fr/'} target='_blank' rel='noopener noreferrer'>
            Nos Gestes Climat
          </a>
        </Text>
        <ButtonWrapper>
          <Button to={'https://nosgestesclimat.fr/'}>Je calcule mon empreinte carbone</Button>
        </ButtonWrapper>
      </SectionWideContent>
    </StyledSection>
  )
}
