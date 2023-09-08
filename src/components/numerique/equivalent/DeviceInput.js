import DailyUsageInput from "./deviceInput/DailyUsageInput";
import LifeSpanInput from "./deviceInput/LifespanInput";
import ButtonLink from "components/base/ButtonLink";
import RulesContext from "components/numerique/RulesProvider";
import ModalContext from "components/providers/ModalProvider";
import React, { useContext } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styled from "styled-components";

const devices = [
  { name: "smartphone", label: "📱 Smartphone" },
  { name: "tablette", label: "📱 Tablette" },
  { name: "ordinateur portable", label: "💻 Ordinateur portable" },
  { name: "ordinateur et écran", label: "🖥 Ordinateur fixe" },
];

const Wrapper = styled.div`
  margin-bottom: 1rem;
  width: 100%;
`;

const Slide = styled.div`
  background-color: ${(props) => props.theme.colors.second};
  border: 0.0625rem solid ${(props) => props.theme.colors.second};
  border-radius: 1rem;
  height: 100%;
  padding: 1.5rem;
  /* width: calc(50% - 1rem); */
`;
const Label = styled.label`
  display: block;
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
`;
const Sliders = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;
const Text = styled.p`
  font-size: ${(props) => (props.large ? 1 : 0.75)}rem;
  text-align: center;
`;
const StyledButtonLink = styled(ButtonLink)`
  display: block;
  font-size: 0.75rem;
  margin: 0 auto;
`;
export default function DeviceInput(props) {
  const { setSituation } = useContext(RulesContext);

  const { setDevices } = useContext(ModalContext);

  return (
    <Wrapper>
      <Carousel
        onChange={(index) => {
          setSituation({
            [props.name + " . appareil"]: `'${devices[index - 1]?.name || "moyenne"}'`,
          });
        }}
        statusFormatter={(currentItem, total) => {
          return `${currentItem} sur ${total}`;
        }}
        swipeable={true}
        emulateTouch={false}
        autoFocus={true}
        centerMode={false}
        showArrows={true}
        useKeyboardArrows={true}
      >
        <Slide>
          <Label>Terminal utilisé</Label>
          <Text large>
            Pour calculer l'impact de la construction et de l'usage du terminal, nous utilisons pour la valeur par
            défaut <ButtonLink onClick={() => setDevices(true)}>un agrégat de terminaux</ButtonLink>. Vous pouvez
            modifier le terminal utilisé à l'aide des flèches.
          </Text>
          <StyledButtonLink onClick={() => props.setConstruction((prevConstruction) => !prevConstruction)}>
            {props.construction ? "Ne pas a" : "A"}fficher l’impact de la construction
          </StyledButtonLink>
        </Slide>
        {devices.map((device) => (
          <Slide key={device.name}>
            <Label>{device.label}</Label>
            <Sliders>
              <LifeSpanInput name={props.name} device={device} />
              <DailyUsageInput name={props.name} device={device} />
            </Sliders>
            <Text>L’impact de la construction de l’appareil est attribué au prorata de sa durée de vie totale.</Text>
            <StyledButtonLink onClick={() => props.setConstruction((prevConstruction) => !prevConstruction)}>
              {props.construction ? "Ne pas a" : "A"}fficher l’impact de la construction
            </StyledButtonLink>
          </Slide>
        ))}
      </Carousel>
    </Wrapper>
  );
}
