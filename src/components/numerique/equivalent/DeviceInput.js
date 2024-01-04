import { useContext } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import styled from 'styled-components'
import ModalContext from 'components/providers/ModalProvider'
import Button from 'components/base/buttons/Button'
import RulesContextNumerique from '../RulesProviderNumerique'
import DailyUsageInput from './deviceInput/DailyUsageInput'
import LifeSpanInput from './deviceInput/LifespanInput'

const devices = [
  { name: 'smartphone', label: '📱 Smartphone' },
  { name: 'tablette', label: '📱 Tablette' },
  { name: 'ordinateur portable', label: '💻 Ordinateur portable' },
  { name: 'ordinateur et écran', label: '🖥 Ordinateur fixe' },
]

const Wrapper = styled.div`
  margin-bottom: 1rem;
  padding-left: 3rem;
  padding-right: 3rem;
  width: 100%;
  .carousel.carousel-slider {
    overflow: inherit;
  }
  .carousel .control-dots {
    bottom: -35px;
  }
  .carousel .control-dots .dot {
    border: 1px solid black;
    width: 12px;
    height: 12px;
  }
  .carousel .control-prev.control-arrow:before {
    border-right: 14px solid #39a69e;
  }
  .carousel .control-prev.control-arrow {
    left: -35px;
  }
  .carousel .control-next.control-arrow:before {
    border-left: 14px solid #39a69e;
  }
  .carousel .control-next.control-arrow {
    right: -35px;
  }
  .carousel .control-arrow:before,
  .carousel.carousel-slider .control-arrow:before {
    border-bottom: 14px solid transparent;
    border-top: 14px solid transparent;
  }
  .carousel.carousel-slider .control-arrow:hover {
    background: inherit;
  }
`

const Slide = styled.div`
  background-color: ${(props) => props.theme.colors.second};
  border: 0.0625rem solid ${(props) => props.theme.colors.second};
  border-radius: 1rem;
  height: 100%;
  padding: 1.5rem;
  /* width: calc(50% - 1rem); */
`
const Label = styled.label`
  display: block;
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
`
const Sliders = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  ${(props) => props.theme.mq.medium} {
    flex-direction: column;
  }
`
const Text = styled.p`
  font-size: ${(props) => (props.$large ? 1 : 0.75)}rem;
  text-align: center;
`

export default function DeviceInput(props) {
  const { setSituation } = useContext(RulesContextNumerique)

  const { setDevices } = useContext(ModalContext)

  return (
    <Wrapper>
      <Carousel
        onChange={(index) => {
          setSituation({
            [props.name + ' . appareil']: `'${devices[index - 1]?.name || 'moyenne'}'`,
          })
        }}
        statusFormatter={(currentItem, total) => {
          return `${currentItem} sur ${total}`
        }}
        swipeable={true}
        emulateTouch={false}
        autoFocus={true}
        centerMode={false}
        showArrows={true}
        useKeyboardArrows={true}
        transitionTime={1}
        infiniteLoop={true}
        labels={{ leftArrow: 'item précédent', rightArrow: 'item suivant', item: 'item' }}
        onClickThumb={() => {
          console.info('hello')
        }}
        showThumbs={false}>
        <Slide>
          <Label>Terminal utilisé</Label>
          <Text $large>
            Pour calculer l'impact de la construction et de l'usage du terminal, nous utilisons pour la valeur par
            défaut{' '}
            <Button asLink onClick={() => setDevices(true)}>
              un agrégat de terminaux
            </Button>
            . Vous pouvez modifier le terminal utilisé à l'aide des flèches.
          </Text>
          <Button asLink onClick={() => props.setConstruction((prevConstruction) => !prevConstruction)}>
            {props.construction ? 'Ne pas a' : 'A'}fficher l’impact de la construction
          </Button>
        </Slide>
        {devices.map((device) => (
          <Slide key={device.name}>
            <Label>{device.label}</Label>
            <Sliders>
              <LifeSpanInput name={props.name} device={device} />
              <DailyUsageInput name={props.name} device={device} />
            </Sliders>
            <Text>L’impact de la construction de l’appareil est attribué au prorata de sa durée de vie totale.</Text>
            <Button asLink onClick={() => props.setConstruction((prevConstruction) => !prevConstruction)}>
              {props.construction ? 'Ne pas a' : 'A'}fficher l’impact de la construction
            </Button>
          </Slide>
        ))}
      </Carousel>
    </Wrapper>
  )
}
