import Search from "./Search";
import Checkbox from "components/base/Checkbox";
import Section from "components/base/Section";
import BarChart from "components/charts/BarChart";
import Bottom from "components/misc/category/Bottom";
import Instruction from "components/misc/category/Instruction";
import Top from "components/misc/category/Top";
import Wrapper from "components/misc/category/Wrapper";
import TransportContext from "components/transport/TransportProvider";
import useItineraries from "hooks/useItineraries";
import useTransportations from "hooks/useTransportations";
import React, { useContext } from "react";

export default function Itinerary(props) {
  const { displayAll, setDisplayAll, start, end } = useContext(TransportContext);

  const itineraries = useItineraries(start, end);

  const transportations = useTransportations(itineraries);

  return (
    <Section>
      <Section.Content>
        <Wrapper name={props.category.title || props.category.name} slug={props.category.slug}>
          <Search itineraire iframe={props.iframe} />
          {props.iframe ? <>YesIFrame</> : <>NoIframe</>}
          {transportations.length ? (
            <Top>
              <Instruction />
              <Top.Checkboxes visible>
                <Checkbox
                  name="displayAll"
                  checked={displayAll}
                  onChange={() => {
                    setDisplayAll((prevDisplayAll) => !prevDisplayAll);
                    window?.please?.track([
                      "trackEvent",
                      "Interaction",
                      "Voir tous les équivalents",
                      props.category.name,
                    ]);
                  }}
                >
                  Voir tous les équivalents
                </Checkbox>
              </Top.Checkboxes>
            </Top>
          ) : null}
          <BarChart items={transportations} max={transportations[transportations.length - 1]?.value} />
          {transportations.length ? <Bottom category={props.category} /> : null}
        </Wrapper>
      </Section.Content>
    </Section>
  );
}
