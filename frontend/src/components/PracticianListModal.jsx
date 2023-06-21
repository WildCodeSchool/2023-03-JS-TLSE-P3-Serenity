import React, { useEffect, useState } from "react";
import "../styles/PracticianListModal.scss";
import axios from "axios";
import Buttonadd from "./Buttonadd";
import ButtonUpdate from "./ButtonUpdate";

function PracticianListModal() {
  // const yoyo = event.target;
  const [listPratician, SetListPratician] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/espacepro`)
      .then((response) => response.data)
      .then((data) => {
        SetListPratician(data);
      })
      .catch();
  }, []);
  return (
    <div className="practician-list-container">
      <div className="practician-list">
        <div className="practician-list-header">
          <input className="search-input" type="text" placeholder="Search" />
          <button type="button" className="delete-button">
            <i className="bi bi-trash" />
          </button>
        </div>
        <div className="practician-list-body">
          <td>
            <div className="practician-list-table">
              <p>Practicien 1</p> <ButtonUpdate />
            </div>
            {listPratician.map((el) => (
              <p key={el.id}>
                {el.id}
                {el.mail}
              </p>
            ))}
          </td>
        </div>
        <div className="practician-list-footer">
          <Buttonadd />
        </div>
      </div>
    </div>
  );
}

export default PracticianListModal;
