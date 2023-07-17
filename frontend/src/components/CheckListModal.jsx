import React, { useContext, useState } from "react";
import "../styles/CheckListModal.scss";
import StateContext from "../contexts/StateContext";

function CheckListModal() {
  const { setActiveTheme } = useContext(StateContext);

  const [checkedItems, setCheckedItems] = useState([
    {
      name: "carte d'identité",
      checked: false,
      obligatory: true,
      note: "Obligatoire",
    },
    {
      name: "carte vitale",
      checked: false,
      obligatory: true,
      note: "Obligatoire",
    },
    {
      name: "moyen de paiement",
      checked: false,
      obligatory: true,
      note: "Obligatoire",
    },
    {
      name: "test covid",
      checked: false,
      obligatory: true,
      note: "Datant de moins de 72h",
    },
    {
      name: "carnet de vaccination",
      checked: false,
      obligatory: true,
      note: "Obligatoire et à jour",
    },
    {
      name: "attestation mutuelle",
      checked: false,
      obligatory: false,
      note: "Obligatoire",
    },
  ]);

  const handleCheckboxChange = (index) => (event) => {
    const newItems = [...checkedItems];
    newItems[index].checked = event.target.checked;
    setCheckedItems(newItems);
  };

  const handleReturnButtonClick = () => {
    setActiveTheme(null);
  };

  return (
    <div className="check-list-modal-container">
      <div className="check-list-modal-header">
        <button
          type="button"
          className="return-button-modal"
          onClick={handleReturnButtonClick}
        >
          <i className="fi fi-rr-arrow-circle-left" />
        </button>
        <h1>Ma préparation</h1>
      </div>
      <h2>Ma check-list avant le départ à la clinique</h2>
      <div className="check-list-modal-list">
        {checkedItems.map((item, index) => (
          <div key={item.name}>
            <label>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={handleCheckboxChange(index)}
                className="checkbox"
              />
              {item.name}
            </label>
            {item.obligatory && <p className="note">{item.note}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CheckListModal;
