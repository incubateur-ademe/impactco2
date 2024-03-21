import dynamic from 'next/dynamic'
import React, { useEffect, useMemo, useState } from 'react'
import Switch from 'react-switch'
import styled from 'styled-components'
import { MEDIA } from 'utils/styles'
import useScreenshot from 'hooks/useScreenshot'
import useParamContext from 'components/providers/ParamProvider'
import { Section, SectionWideContent } from 'components/base/Section'
import Button from 'components/base/buttons/Button'
import useRulesContextLivraison from 'components/livraison/RulesProviderLivraison'
import ScreenshotWrapper2 from 'components/misc/ScreenshotWrapper2'
import IFrameLivraisonModal from 'components/modals/IFrameLivraisonModal'
import SocialModal from 'components/modals/SocialModal'
import OptionalRelay from './OptionalRelay'
import OptionalTraj from './OptionalTraj'
import SelectProduits from './SelectProduits'
import SelectRetraits from './SelectRetraits'
import YearlyLivraison from './YearlyLivraison'
import { calculateResultFunction } from './calculateur_livraison_functions.js'
import { produits, relays, retraits } from './data.js'
import { convertGramsToKilograms } from './utils'

const ResultatsLivraison = dynamic(() => import('./ResultatsLivraison'), {
  ssr: false,
})

const Svg = styled.svg`
  display: block;
  height: auto;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 1.2rem;
`

export default function CalculateurLivraison(props) {
  const { engine } = useRulesContextLivraison()
  const {
    livraison: { values, setValues, isHabit, setIsHabit, isPlane, setIsPlane },
  } = useParamContext()
  const [livraisonModal, setLivraisonModal] = useState(false)
  const [socialModal, setSocialModal] = useState(false)

  const [cO2eq, setCO2eq] = useState(0)

  const [showToggleContainer, setShowToggleContainer] = useState(true)

  const [diffs, setDiffs] = useState({
    diffKm0: 0,
    diffPlane: 0,
  })

  useEffect(() => {
    calculateResultFunction(values, produits, retraits, relays, engine, diffs, setDiffs, setCO2eq, isHabit, isPlane)
  }, [values, isHabit, isPlane])

  useEffect(() => {
    setShowToggleContainer(['relais', 'click'].includes(values.retrait))
  }, [values])

  const point = useMemo(
    () => (values.retrait === 'click' ? 'magasin' : values.retrait === 'relais' ? 'point relais' : ''),
    [values]
  )

  const changeProduit = (produit) => setValues({ ...values, produit: produit.uid })
  const changeRetrait = (retrait) => {
    setValues({ ...values, retrait: retrait.uid })
  }
  const changeRelay = (relay) => {
    setValues({ ...values, relay: relay.uid })
  }

  const changeTraj = (traj) => setValues({ ...values, traj: traj.uid })
  const changeKm = (km) => setValues({ ...values, km: km })

  const { ref, takeScreenshot, isScreenshotting } = useScreenshot('impactco2_livraison_calculateur', 'Livraison', 'jpg')

  return (
    <Section data-testid='calculateurLivraison' $withoutPadding>
      {socialModal && <SocialModal setOpen={setSocialModal} />}
      {livraisonModal && <IFrameLivraisonModal setOpen={setLivraisonModal} />}
      <SectionWideContent $embedded={props.embedded}>
        <ScreenshotWrapper2 innerRef={ref} isScreenshotting={isScreenshotting}>
          <Flex>
            <H2Title data-testid='calculateurTitleH2'>Estimez l'impact de votre livraison</H2Title>
            <div className='buttons'>
              <Button
                priority='secondary'
                size='sm'
                onClick={() => setSocialModal(true)}
                className='noscreenshot'
                id='shareUp'
                aria-label='Partarger'>
                <svg xmlns='http://www.w3.org/2000/svg' width='16px' height='16px' viewBox='0 -2 24 24'>
                  <path
                    fill='currentcolor'
                    d='M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z'
                  />
                </svg>
                <HideableSpan>Partager</HideableSpan>
              </Button>
              <Button
                priority='secondary'
                size='sm'
                onClick={() => setLivraisonModal(true)}
                className='noscreenshot'
                aria-label='Intégrer'>
                <svg width='16px' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 16'>
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M5 4 1 8l4 4m10-8 4 4-4 4M11 1 9 15'
                  />
                </svg>
                <HideableSpan>Intégrer le simulateur</HideableSpan>
              </Button>
              <Button
                priority='secondary'
                size='sm'
                onClick={takeScreenshot}
                className='noscreenshot'
                aria-label='Télécharger'>
                <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
                  <path d='M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z' />
                  <path d='M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z' />
                </svg>
                <HideableSpan>Télécharger</HideableSpan>
              </Button>
            </div>
          </Flex>

          <DropList>
            <SelectProduits changeProduit={changeProduit} value={values.produit} />
            <SelectRetraits changeRetrait={changeRetrait} value={values.retrait} />
          </DropList>
          <ToggleContainer $show={showToggleContainer} data-testid='partieMagasin'>
            <ToggleHabitContainer>
              <FlexHabit>
                <div className='item1'>
                  <Switch
                    className='toggle'
                    checked={isHabit}
                    onChange={() => setIsHabit(!isHabit)}
                    offColor='var(--neutral-00)'
                    onColor='var(--primary-50)'
                    aria-label='Changer de thème'
                    uncheckedHandleIcon={<Svg x='0px' y='0px' width='16' height='16' viewBox='0 0 16 16' />}
                    checkedHandleIcon={
                      <Svg x='0px' y='0px' width='16' height='16' viewBox='0 0 16 16'>
                        <path
                          fill='#39a69e'
                          d='M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z'
                        />
                      </Svg>
                    }
                  />
                </div>
                <div className='item2'>Le {point} est sur votre trajet habituel</div>
                <div className='item3'>
                  <Addendum>
                    <span className='plus'>+</span>
                    <span className='txt' data-testid='bcTrajet'>
                      {convertGramsToKilograms(diffs.diffKm0)} kg de CO<sub>2</sub>e
                    </span>
                  </Addendum>
                </div>
              </FlexHabit>
            </ToggleHabitContainer>
            <Optionals $show={!isHabit}>
              <OptionalRelay changeRelay={changeRelay} value={values.relay} point={point} />
              <OptionalTraj km={values.km} changeKm={changeKm} changeTraj={changeTraj} value={values.traj} />
            </Optionals>
          </ToggleContainer>
          <ToggleContainerBottom data-testid='partieAvion'>
            <ToggleHabitContainer>
              <FlexHabitBottom>
                <div className='item1'>
                  <Switch
                    className='toggle'
                    checked={isPlane}
                    onChange={() => setIsPlane(!isPlane)}
                    offColor='var(--neutral-00)'
                    onColor='var(--primary-50)'
                    aria-label='Changer de thème'
                    uncheckedHandleIcon={<Svg x='0px' y='0px' width='16' height='16' viewBox='0 0 16 16' />}
                    checkedHandleIcon={
                      <Svg x='0px' y='0px' width='16' height='16' viewBox='0 0 16 16'>
                        <path
                          fill='#39a69e'
                          d='M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z'
                        />
                      </Svg>
                    }
                  />
                </div>
                <div className='item2'>Votre colis vient de loin (transport par avion).</div>
                <div className='item3'>
                  <Addendum>
                    <span className='plus'>+</span>
                    <span className='txt' data-testid='bcAvion'>
                      {convertGramsToKilograms(diffs.diffPlane)} kg de CO<sub>2</sub>e
                    </span>
                  </Addendum>
                </div>
              </FlexHabitBottom>
            </ToggleHabitContainer>
          </ToggleContainerBottom>
          <ResultatsLivraison co2eq={cO2eq} />
          <YearlyLivraison co2eq={cO2eq} />
        </ScreenshotWrapper2>
      </SectionWideContent>
    </Section>
  )
}

const Optionals = styled.div`
  display: ${(props) => (props.$show ? 'block' : 'none')};
  > .item2 {
    align-items: center;
    display: flex;
    font-size: 14px;
    justify-content: center;
    ${MEDIA.LT.SMALL} {
      justify-content: flex-start;
      margin-bottom: 1rem;
      margin-left: 1rem;
    }
  }
`

const H2Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
  margin-right: 0.5rem;
  margin-top: 0;
`

const DropList = styled.div`
  background-color: var(--neutral-00);
  border: 1px solid #e2dce0;
  border-radius: 16px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: start;
  ${MEDIA.LT.XLARGE} {
    grid-template-columns: repeat(1, 1fr);
    justify-items: start;
  }
  position: relative;
  z-index: 1;
  > div > label {
    color: #746770;
    font-size: 14px;
    margin-bottom: 0;
  }
  > div > select {
    color: var(--primary-50);
    padding-left: 0;
    white-space: normal;
    width: 100%;
    word-wrap: break-word;
    ${MEDIA.LT.XSMALL} {
      font-size: 0.75rem;
    }
  }
`

const Addendum = styled.div`
  align-items: center;
  background-color: var(--secondary-10);
  border: 1px solid var(--secondary-20);
  border-radius: 8px;
  color: var(--secondary-60);
  display: flex;
  font-size: 14px;
  font-weight: 400;
  justify-content: center;
  letter-spacing: 0em;
  line-height: 32px;
  min-width: 100px;
  ${MEDIA.LT.LARGE} {
    margin-right: 1rem;
  }
  ${MEDIA.LT.MEDIUM} {
    margin-right: 0;
  }
  padding: 0 0.65rem;
  ${MEDIA.LT.XSMALL} {
    padding: 0 0.25rem;
  }
  > .txt {
    ${MEDIA.LT.LARGE} {
      line-height: 20px;
    }
  }
  > .plus {
    font-size: 28px;
    ${MEDIA.LT.XSMALL} {
      font-size: 14px;
    }
    line-height: 32px;
    margin-right: 5px;
    margin-top: -8px;
  }
`

const Flex = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 1rem;

  > .buttons {
    display: flex;
    gap: 0.5rem;
  }
`

const ToggleContainer = styled.div`
  background-color: var(--neutral-10);
  display: ${(props) => (props.$show ? 'block' : 'none')};
`

const ToggleHabitContainer = styled.div`
  .toggle {
    border: 1px solid #39a69e;
    .react-switch-handle {
      background: var(--neutral-00) !important;
      border: 1px solid #39a69e !important;
      height: 19px !important;
      width: 19px !important;
      svg {
        left: 35% !important;
        top: 35% !important;
      }
    }
    .react-switch-bg {
      border-radius: 13px !important;
      height: 21px !important;
      width: 50px !important;
      > div > svg {
        display: none;
      }
    }
  }
`

const FlexHabit = styled.div`
  display: flex;
  margin-top: -1rem;
  padding: 2rem 0 1rem 2rem;
  ${MEDIA.LT.SMALL} {
    padding: 2rem 0 1rem 1rem;
  }
  > .item1 {
    align-items: center;
    display: flex;
    width: 6rem;
  }
  > .item2 {
    align-items: center;
    display: flex;
    justify-content: center;
    ${MEDIA.LT.SMALL} {
      padding-left: 0.25rem;
      font-size: 14px;
    }
  }
  > .item3 {
    margin-left: auto;
    margin-right: 2rem;
    ${MEDIA.LT.SMALL} {
      margin-right: 1rem;
    }
  }
`

const ToggleContainerBottom = styled.div`
  background-color: var(--neutral-10);
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`

const FlexHabitBottom = styled.div`
  border-top: 1px solid #d8dbe1;
  display: flex;
  padding: 1rem 0 1rem 2rem;
  ${MEDIA.LT.SMALL} {
    padding: 2rem 0 1rem 1rem;
  }
  > .item1 {
    align-items: center;
    display: flex;
    width: 6rem;
  }
  > .item2 {
    align-items: center;
    display: flex;
    justify-content: center;
    ${MEDIA.LT.SMALL} {
      padding-left: 0.25rem;
      font-size: 14px;
    }
  }
  > .item3 {
    margin-left: auto;
    margin-right: 2rem;
    ${MEDIA.LT.SMALL} {
      margin-right: 1rem;
    }
  }
`

const HideableSpan = styled.span`
  ${MEDIA.LT.XSMALL} {
    display: none;
  }
`
