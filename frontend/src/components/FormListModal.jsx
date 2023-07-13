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

  const updateFormCheckbox = (formId, field, value) => {
    const updatedForms = forms.map((form) => {
      if (form.id === formId) {
        return {
          ...form,
          [field]: value,
        };
      }
      return form;
    });
    setForms(updatedForms);
  };

  const handleCheckboxFormRead = (formId) => {
    const form = forms.find((el) => el.id === formId);
    const updatedValue = !form.is_read;

    updateFormCheckbox(formId, "is_read", updatedValue);

    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/admins/forms/${formId}`,
        { is_read: updatedValue },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            Role: `${role}`,
          },
        }
      )
      .catch((error) => {
        console.error(`Error updating form with ID ${formId}:`, error);
        Swal.fire({
          background: "#242731",
          position: "center",
          icon: "error",
          title: "Une erreur est survenue lors de la mise à jour.",
          showConfirmButton: false,
          timer: 2000,
        });
        // Revert the local state change if the update fails
        updateFormCheckbox(formId, "is_read", !updatedValue);
      });
  };

  const handleCheckboxFormDone = (formId) => {
    const form = forms.find((el) => el.id === formId);
    const updatedValue = !form.is_done;

    updateFormCheckbox(formId, "is_done", updatedValue);

    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/admins/forms/${formId}`,
        { is_done: updatedValue },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            Role: `${role}`,
          },
        }
      )
      .catch((error) => {
        console.error(`Error updating form with ID ${formId}:`, error);
        Swal.fire({
          background: "#242731",
          position: "center",
          icon: "error",
          title: "Une erreur est survenue lors de la mise à jour.",
          showConfirmButton: false,
          timer: 2000,
        });
        // Revert the local state change if the update fails
        updateFormCheckbox(formId, "is_done", !updatedValue);
      });
  };

  const handleDeleteFormButtonClick = (event, formId) => {
    event.stopPropagation();
    Swal.fire({
      background: "#242731",
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
            Swal.fire({
              background: "#242731",
              position: "center",
              icon: "success",
              title: "La requête a été supprimée",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            console.error(`Error deleting form with ID ${formId}:`, error);
            Swal.fire({
              background: "#242731",
              position: "center",
              icon: "error",
              title: "Une erreur est survenue lors de la suppression.",
              showConfirmButton: false,
              timer: 2000,
            });
          });
      }
    });
  };

  const handleFormClick = (event, form) => {
    const { tagName } = event.target;
    if (tagName === "INPUT" || tagName === "BUTTON") {
      return;
    }

    Swal.fire({
      background: "#242731",
      title: "Informations de la requête",
      html: `
        <p>Utilisateur: ${form.user_type}</p><br>
        <p>Objet: ${form.request_type}</p><br>
        <p>Requête:<br> ${form.request}</p><br>
        <p>Date: ${new Date(form.create_time).toLocaleDateString()}</p>
      `,
      showCancelButton: false,
      confirmButtonText: "Fermer",
    });
    updateFormCheckbox(form.id, "is_read", true);
  };

  return (
    <div className="form-list">
      <table className="form-list-table">
        <thead className="form-list-table-body">
          <tr className="table-header">
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
            <tr
              key={form.id}
              className="clickable-row"
              onClick={(event) => handleFormClick(event, form)}
            >
              <td>{form.user_type}</td>
              <td>{form.request_type}</td>
              <td>
                <p>{form.request}</p>
              </td>
              <td>{new Date(form.create_time).toLocaleDateString()}</td>
              <td>
                <input
                  type="checkbox"
                  className="checkbox-form"
                  checked={form.is_read}
                  onChange={() => handleCheckboxFormRead(form.id)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  className="checkbox-form"
                  checked={form.is_done}
                  onChange={() => handleCheckboxFormDone(form.id)}
                />
              </td>
              <td className="form-list-table-buttons">
                <button
                  type="button"
                  className="delete-button"
                  onClick={(event) =>
                    handleDeleteFormButtonClick(event, form.id)
                  }
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
