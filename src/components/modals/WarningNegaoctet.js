import Modal2 from "components/base/Modal2";
import ModalContext from "components/providers/ModalProvider";
import React, { useContext } from "react";
import styled from "styled-components";

export default function WarningNegaoctet() {
  const { warningNegaoctet: open, setWarningNegaoctet: setOpen } = useContext(ModalContext);

  const getTitle = () => {
    return <Title>Source des données</Title>;
  };

  return (
    <Modal2 open={open} setOpen={setOpen} getTitle={getTitle}>
      <p>
        ⚠️ Attention : aujourd’hui pour calculer l’impact carbone de Stocker un Go de données, nous ne prenons pas en
        compte dans nos calculs l’impact carbone de la transmission ni celui du stockage effectué par l'appareil,
        puisque nous estimions que ce dernier étant partagé par beaucoup de personnes, était amorti.
      </p>
      <p>
        Ces calculs, expliquent la différence d’impact carbone que l’on a entre le site impactco2.fr et le données NO.{" "}
      </p>
      <p>Nous travaillons à affiner ce calcul et le mettre à jour.</p>
    </Modal2>
  );
}

const Title = styled.h1`
  margin: 0;
`;
