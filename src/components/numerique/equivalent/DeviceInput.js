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

  .slick-track {
    display: flex !important;
  }

  .slick-slide {
    height: inherit !important;

    & > div {
      height: 100%;
    }
  }
  .slick-prev {
    /* stylelint-disable-line */
    background-image: url("data:image/svg+xml,%3Csvg width='27' height='31' viewBox='0 0 27 31' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.5 17.9187C-0.499999 16.764 -0.500001 13.8772 1.5 12.7225L22.5 0.598169C24.5 -0.556532 27 0.886842 27 3.19624L27 27.445C27 29.7544 24.5 31.1977 22.5 30.043L1.5 17.9187Z' fill='%23${(
      props
    ) => props.theme.colors.main.replace("#", "")}'/%3E%3C/svg%3E%0A");
    left: -1rem;
  }

  .slick-next {
    background-image: url("data:image/svg+xml,%3Csvg width='27' height='31' viewBox='0 0 27 31' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25.5 12.7224C27.5 13.8771 27.5 16.7639 25.5 17.9186L4.5 30.0429C2.5 31.1976 -1.38802e-06 29.7543 -1.28708e-06 27.4449L-2.27131e-07 3.19616C-1.26184e-07 0.886754 2.5 -0.556626 4.5 0.598075L25.5 12.7224Z' fill='%23${(
      props
    ) => props.theme.colors.main.replace("#", "")}'/%3E%3C/svg%3E%0A");
    right: -1rem;
  }
`;

const Slide = styled.div`
  background-color: ${(props) => props.theme.colors.second};
  border: 0.0625rem solid ${(props) => props.theme.colors.second};
  border-radius: 1rem;
  height: 100%;
  padding: 1.5rem;
  width: calc(50% - 1rem);
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
