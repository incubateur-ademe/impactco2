import { convertGramsToKilograms } from "./utils";
import ButtonLink from "components/base/ButtonLink";
import ModalContext from "components/providers/ModalProvider";
import React, { useContext } from "react";
import styled from "styled-components";

export default function ResultatLivraison(props) {
  const { setHypothesisLivraison } = useContext(ModalContext);

  return (
    <Wrapper>
      <CenteredBlock>
        <BlueGrid>
          <div className="item1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 3C9.49 3 12.383 5.554 12.913 8.895C14.088 7.724 15.71 7 17.5 7H22V9.5C22 13.09 19.09 16 15.5 16H13V21H11V13H9C5.134 13 2 9.866 2 6V3H6ZM20 9H17.5C15.015 9 13 11.015 13 13.5V14H15.5C17.985 14 20 11.985 20 9.5V9ZM6 5H4V6C4 8.761 6.239 11 9 11H11V10C11 7.239 8.761 5 6 5Z"
                fill="#90B3F8"
              />
            </svg>
          </div>
          <div className="item2" data-testid="resultAsText">
            <ActualResult>{convertGramsToKilograms(props.co2eq)}</ActualResult>
            <Units> kg de CO2e </Units>
          </div>
          <div className="item3">
            <div></div>
          </div>
          <div className="item4">
            <Subexplain>
              <div>
                <strong>par livraison</strong>, soit...
              </div>
            </Subexplain>
          </div>
          <div className="item5"></div>
          <div className="item6">
            <UnderstandLink>
              <ButtonLink onClick={() => setHypothesisLivraison(true)}>Comprendre le calcul</ButtonLink>
            </UnderstandLink>
          </div>
        </BlueGrid>
      </CenteredBlock>
      <Arrow></Arrow>
    </Wrapper>
  );
}

const BlueGrid = styled.div`
  background-color: #457be7;
  border-bottom-left-radius: 16px;
  border-top-left-radius: 16px;
  color: white;
  display: grid;
  grid-template-columns: 30px 1fr;
  margin: auto;
  padding: 0.5rem 1rem 1rem 1rem;
  width: fit-content;
  ${(props) => props.theme.mq.small} {
    border-bottom-left-radius: 0;
    border-top-right-radius: 16px;
  }
  > .item1 {
    align-items: center;
    display: flex;
    justify-content: end;
    margin-right: 4px;
  }
  > .item3 {
    grid-row: span 3;
    position: relative;
    > div {
      clip-path: polygon(100% 49%, 83% 0, 84% 99%);
      ${(props) => props.theme.mq.small} {
        display: none;
      }
    }
  }
  > .item4 {
    color: #aec8fc;
    margin-bottom: 0.5rem;
    margin-top: -5px;
  }
  > .item5 {
    margin-top: -5px;
  }
`;

const ActualResult = styled.span`
  font-size: 2.25rem;
  ${(props) => props.theme.mq.large} {
    font-size: 1.5rem;
  }
  font-weight: 700;
  line-height: 56px;
`;

const Units = styled.span`
  font-size: 18px;
  font-weight: 400;
  line-height: 40px;
`;

const Subexplain = styled.span`
  color: #aec8fc;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
`;

const UnderstandLink = styled.div`
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0em;
  line-height: 24px;
  > button {
    color: white;
    text-decoration: underline;
    text-underline-offset: 5px;
  }
`;

const Arrow = styled.div`
  background: #457be7;
`;

const Wrapper = styled.div`
  display: flex;
  ${(props) => props.theme.mq.small} {
    flex-direction: column;
    width: inherit;
  }
`;

const CenteredBlock = styled.div`
  /* background-color: #457be7;
  border-bottom-left-radius: 14px;
  ${(props) => props.theme.mq.small} {
    border-bottom-left-radius: 0;
  }
  border-top-left-radius: 14px;
  border-top-right-radius: 14px; */
`;
