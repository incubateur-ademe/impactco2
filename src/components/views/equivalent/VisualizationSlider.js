import Section from "components/base/Section";
import ScreenshotWrapper from "components/misc/ScreenshotWrapper";
import visualizations from "components/visualizations/list";
import React from "react";
import Slider from "react-slick";
import styled from "styled-components";

const StyledSection = styled(Section)`
  margin-bottom: 4rem;

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

export default function Visualization(props) {
  return visualizations[props.equivalent.slug] ? (
    <StyledSection>
      <Section.Content>
        <Slider
          dots={false}
          infinite={true}
          speed={200}
          fade={true}
          slidesToShow={1}
          slidesToScroll={1}
          responsive={[
            {
              breakpoint: 830,
              settings: {
                dots: true,
                arrows: false,
              },
            },
          ]}
        >
          {visualizations[props.equivalent.slug].map((visualization) => (
            <ScreenshotWrapper key={props.equivalent.slug} equivalent={props.equivalent} background>
              {visualization}
            </ScreenshotWrapper>
          ))}
        </Slider>
      </Section.Content>
    </StyledSection>
  ) : null;
}
