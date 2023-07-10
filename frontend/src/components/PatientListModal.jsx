import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../styles/PatientListModal.scss";
import Buttonadd from "./Buttonadd";
import StateContext from "../contexts/StateContext";
import DeletePatientButton from "./DeletePatientButton";
import AuthFunctionContext from "../contexts/AuthFunctionContext";

function PatientListModal() {
  const [patients, setPatients] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const { userToken, userInfo } = useContext(AuthFunctionContext);
  const { role } = userInfo;
  const { showSuccessMessageAdd } = useContext(StateContext);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/practician/patients`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          Role: `${role}`,
        },
      })
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [showSuccessMessageAdd]);
  return (
    <div className="practician-list-container">
      <div className="practician-list">
        <div className="practician-list-header">
          <input
            className="search-input"
            type="text"
            placeholder="Rechercher un patient"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="practician-list-body">
          <table className="practician-list-table">
            <thead className="practician-list-table-header">
              <tr>
                <th>Nom</th>
                <th>Mail</th>
                <th>Téléphone</th>
                <th>Intervention</th>
                <th>Date</th>
                <th> </th>
              </tr>
            </thead>
            <tbody className="practician-list-table-body">
              {patients
                .filter(
                  (patient) =>
                    patient.lastname &&
                    patient.lastname
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
                )
                .map((patient) => (
                  <tr key={patient.id}>
                    <td>
                      {patient.firstname} {patient.lastname}
                    </td>
                    <td>{patient.mail}</td>
                    <td>{patient.phone}</td>
                    <td className="practician-list-table-buttons">
                      <DeletePatientButton
                        patients={patients}
                        patient={patient.id}
                        setPatients={setPatients}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="practician-list-footer">
          <Buttonadd />
        </div>
      </div>
    </div>
  );
}

export default PatientListModal;
