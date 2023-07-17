import Modal2 from "components/base/Modal2";
import ModalContext from "components/providers/ModalProvider";
import React, { useContext } from "react";

export default function DetailLivraisonModal2() {
  const { hypothesis: open, setHypothesis: setOpen } = useContext(ModalContext);
  return (
    <Modal2 open={open} setOpen={setOpen}>
      <h2>Les hypothèses retenues pour la livraison de colis </h2>
      <p>L'ensemble des calculs sont issus de ...</p>
      <h3>Pour les colis : </h3>
      <p>On considère que...</p>
      <h3>Pour les modes de transports :</h3>
      <p>On considère que ...</p>
    </Modal2>
  );
}
