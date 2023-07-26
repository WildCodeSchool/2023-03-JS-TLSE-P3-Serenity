import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import "../styles/AdministrativeModal.scss";
import StateContext from "../contexts/StateContext";
import AuthFunctionContext from "../contexts/AuthFunctionContext";

function AdministrativeModal() {
  const { userToken, userInfo } = useContext(AuthFunctionContext);
  const { role, id } = userInfo;
  const { setActiveTheme } = useContext(StateContext);

  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/patients/ressourceintervention/${id}?theme_id=2`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            Role: `${role}`,
          },
        }
      )
      .then((response) => {
        const fetchedItems = response.data.map((item) => ({
          id: item.id,
          name: item.title,
          checked: item.is_done,
          obligatory: true,
          note: item.description,
        }));

        setCheckedItems(fetchedItems);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleCheckboxChange = (index) => (event) => {
    const newItems = [...checkedItems];
    newItems[index].checked = event.target.checked;

    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/patients/ressourceintervention/${
          newItems[index].id
        }`,
        { is_done: newItems[index].checked },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            Role: `${role}`,
          },
        }
      )
      .then(() => {
        setCheckedItems(newItems);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleReturnButtonClickModalAdministrative = () => {
    setActiveTheme(null);
  };

  return (
    <div className="administrative-list-modal-container">
      <div className="administrative-list-modal-header">
        <button
          type="button"
          className="administrative-return-button-modal"
          onClick={handleReturnButtonClickModalAdministrative}
        >
          <i className="fi fi-rr-arrow-circle-left" />
        </button>
        <h1>Ma préparation</h1>
      </div>
      <h2 className="administrative-modal-title">
        Quelques démarches administratives à finaliser
      </h2>
      <div className="administrative-list-modal-list">
        {checkedItems.map((item, index) => (
          <div key={item.id} className="administrative-list-item">
            <label>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={handleCheckboxChange(index)}
                className="administrative-checkbox"
              />
              {item.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdministrativeModal;
