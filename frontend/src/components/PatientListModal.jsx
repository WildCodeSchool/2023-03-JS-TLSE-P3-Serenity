import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../styles/PatientListModal.scss";
import ButtonAddPatient from "./ButtonAddPatient";
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
    <div className="patient-list-container">
      <div className="patient-list">
        <div className="patient-list-header">
          <input
            className="search-input"
            type="text"
            placeholder="Rechercher un patient"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="patient-list-body">
          <table className="patient-list-table">
            <thead className="patient-list-table-body">
              <tr className="table-header">
                <th>Nom</th>
                <th>Mail</th>
                <th>Téléphone</th>
                <th>Intervention</th>
                <th>Date</th>
                <th> </th>
              </tr>
            </thead>
            <tbody className="patient-list-table-body">
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
                    <td>{patient.intervention_name}</td>
                    <td>
                      {new Date(patient.intervention_date).toLocaleDateString()}
                    </td>
                    <td className="patient-list-table-buttons">
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
        <div className="patient-list-footer">
          <ButtonAddPatient />
        </div>
      </div>
    </div>
  );
}

export default PatientListModal;
