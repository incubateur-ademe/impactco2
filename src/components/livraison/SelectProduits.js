import { produits } from "./data.js";
import Select from "components/base/Select";
import styled from "styled-components";

const StyledSelect = styled(Select)`
  margin: 1rem;
  > select {
    border: none;
  }
`;

export default function SelectProduits(props) {
  return (
    <>
      <StyledSelect
        onChange={(e) => {
          window?.please?.track(["trackEvent", "Interaction", "Select", `Products_${e.value}`]);
          props.changeProduit(produits.find((produit) => produit.uid === e.value));
        }}
        value={props.value}
        label="Vous commandez"
        name="produits"
      >
        {produits.map((produit) => (
          <option key={produit.uid} value={produit.uid}>
            {produit.displayed}
          </option>
        ))}
      </StyledSelect>
    </>
  );
}
