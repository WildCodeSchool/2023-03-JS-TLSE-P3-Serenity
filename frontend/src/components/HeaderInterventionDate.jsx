import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import AuthFunctionContext from "../contexts/AuthFunctionContext";
import "../styles/HeaderInterventionDate.scss";

function HeaderInterventionDate() {
  const [patient, setPatient] = useState(null);
  const { userToken, userInfo } = useContext(AuthFunctionContext);
  const { role } = userInfo;

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/practician/patients`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          Role: `${role}`,
        },
      })
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setPatient(response.data[0]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!patient) return null;

  return (
    <div className="header-intervention-date">
      <p>{patient.intervention_name}</p>
      <div className="intervention-date">
        <div className="date-label">Date</div>
        <div>
          {new Date(patient.intervention_date).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
      </div>
    </div>
  );
}

export default HeaderInterventionDate;
