import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import "../styles/CheckListModal.scss";
import StateContext from "../contexts/StateContext";
import AuthFunctionContext from "../contexts/AuthFunctionContext";

function CheckListModal() {
  const { userToken, userInfo } = useContext(AuthFunctionContext);
  const { role } = userInfo;
  const { setActiveTheme } = useContext(StateContext);

  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/patients/ressourceintervention/1`,
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
      <h2 className="modal-title">
        Ma check-list avant le départ à la clinique
      </h2>
      <div className="check-list-modal-list">
        {checkedItems.map((item, index) => (
          <div key={item.id} className="check-list-item">
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
