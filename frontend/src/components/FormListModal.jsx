import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../styles/FormListModal.scss";
import AuthFunctionContext from "../contexts/AuthFunctionContext";

function FormListModal() {
  const { userToken, userInfo } = useContext(AuthFunctionContext);
  const { role } = userInfo;
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

  const handleCheckboxFormRead = (formId, field) => {
    const updatedForms = forms.map((form) => {
      if (form.id === formId) {
        return {
          ...form,
          [field]: !form[field],
        };
      }
      return form;
    });
    setForms(updatedForms);
  };

  const handleCheckboxFormDone = (formId, field) => {
    const updatedForms = forms.map((form) => {
      if (form.id === formId) {
        return {
          ...form,
          [field]: !form[field],
        };
      }
      return form;
    });
    setForms(updatedForms);
  };

  const handleDeleteFormButtonClick = (formId) => {
    Swal.fire({
      title: "Êtes-vous sûr de vouloir supprimer cette requête ?",
      text: "Vous ne pourrez pas annuler cette action !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimer !",
      cancelButtonText: "Non, annuler !",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `${import.meta.env.VITE_BACKEND_URL}/admins/forms/${formId}`,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
                Role: `${role}`,
              },
            }
          )
          .then(() => {
            const updatedForms = forms.filter((form) => form.id !== formId);
            setForms(updatedForms);
            Swal.fire("Supprimé !", "La requête a été supprimé.", "success");
          })
          .catch((error) => {
            console.error(`Error deleting form with ID ${formId}:`, error);
            Swal.fire(
              "Erreur!",
              "Une erreur est survenue lors de la suppression.",
              "Erreur"
            );
          });
      }
    });
  };

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
            <th> </th>
          </tr>
        </thead>
        <tbody className="form-list-table-body">
          {forms.map((form) => (
            <tr key={form.id}>
              <td>{form.user_type}</td>
              <td>{form.request_type}</td>
              <td>{form.request}</td>
              <td>{new Date(form.create_time).toLocaleDateString()}</td>
              <td>
                <input
                  type="checkbox"
                  className="checkbox-form"
                  checked={form.is_read}
                  onChange={() => handleCheckboxFormRead(form.id, "is_read")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  className="checkbox-form"
                  checked={form.is_done}
                  onChange={() => handleCheckboxFormDone(form.id, "is_done")}
                />
              </td>
              <td className="form-list-table-buttons">
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => handleDeleteFormButtonClick(form.id)}
                >
                  <i className="fi fi-rr-trash" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FormListModal;
