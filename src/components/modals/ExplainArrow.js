import styled from "styled-components";

export default function ResultatLivraison(props) {
  console.log("props", props);

  return (
    <Wrapper>
      <BlueGrid>
        <div className="item1"></div>
        <div className="item2" data-testid="resultAsText">
          <ActualResult>1</ActualResult>
          <Units> kg de méthane </Units>
        </div>
        <div className="item3">
          <div></div>
        </div>
        <div className="item4">
          <Subexplain>
            <div>ex. : si la fabrication d'un</div>
            <div>produit émet</div>
            <div>
              <strong>1kg de méthane + 1kg de CO2</strong>
            </div>
          </Subexplain>
        </div>
        <div className="item5"></div>
        <div className="item6"></div>
      </BlueGrid>
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
  grid-template-columns: 1px 1fr;
  max-width: 350px;
  padding: 0.5rem 1rem 1rem 1rem;
  ${(props) => props.theme.mq.xlarge} {
    border-bottom-left-radius: 0;
    border-top-right-radius: 16px;
    max-width: 100%;
    padding-left: 30%;
    padding-right: 30%;
  }
  ${(props) => props.theme.mq.medium} {
    padding-left: 25%;
    padding-right: 25%;
  }
  ${(props) => props.theme.mq.small} {
    padding: 0.5rem 1rem 1rem 1rem;
  }
  > .item1 {
    align-items: center;
    display: flex;
    justify-content: end;
    margin-right: 4px;
    margin-top: 7px;
  }
  > .item3 {
    grid-row: span 3;
    position: relative;
    > div {
      clip-path: polygon(100% 49%, 83% 0, 84% 99%);
      ${(props) => props.theme.mq.xlarge} {
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
  font-size: 36px;
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

const Arrow = styled.div`
  background: #457be7;
  clip-path: polygon(0% 0%, 52.5% 49.75%, 52.5% 52.5%, 0% 100%);
  height: 100%;
  width: 30px;
  ${(props) => props.theme.mq.xlarge} {
    clip-path: polygon(100% 0%, 52.5% 49.75%, 48.75% 49.75%, 0% 0%);
    height: 30px;
    margin-top: -1px;
    width: 100%;
  }
`;

const Wrapper = styled.div`
  display: flex;
  ${(props) => props.theme.mq.xlarge} {
    flex-direction: column;
  }
`;
