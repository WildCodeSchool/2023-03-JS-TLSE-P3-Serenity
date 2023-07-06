import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/FormListModal.scss";

function FormListModal() {
  const [forms, setForms] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/admins/forms`)
      .then((response) => {
        const updatedForms = response.data.map((form) => ({
          ...form,
        }));
        setForms(updatedForms);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className="form-list">
      <table className="form-list-table">
        <thead className="form-list-table-body">
          <tr>
            <th>Utilisateur</th>
            <th>Objet</th>
            <th>Requête</th>
            <th>Date</th>
            <th>Lu</th>
            <th>Fait</th>
          </tr>
        </thead>
        <tbody className="form-list-table-body">
          {forms.map((form) => (
            <tr key={form.id}>
              <td>{form.user_type}</td>
              <td>{form.request_type}</td>
              <td>{form.request}</td>
              <td>{new Date(form.create_time).toLocaleDateString()}</td>
              <td>{form.is_read}</td>
              <td>{form.is_done}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FormListModal;
