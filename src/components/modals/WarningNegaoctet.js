import Modal from "components/base/Modal";
import ModalContext from "components/providers/ModalProvider";
import React, { useContext } from "react";

export default function WarningNegaoctet() {
  const { warningNegaoctet: open, setWarningNegaoctet: setOpen } = useContext(ModalContext);
  return (
    <Modal open={open} setOpen={setOpen}>
      <h2>Avertissement</h2>
    </Modal>
  );
}
