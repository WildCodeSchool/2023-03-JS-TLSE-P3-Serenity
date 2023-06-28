// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../styles/FormListModal.scss";

// function FormListModal() {
//   const [forms, setForms] = useState([]);
//   // const [selectedForm, setSelectedForm] = useState(null);

//   // const handleTrClick = (form) => {
//   //   setSelectedForm(form);
//   // };
//   useEffect(() => {
//     axios
//       .get(`${import.meta.env.VITE_BACKEND_URL}/admins/forms`)
//       .then((response) => {
//         const promises = response.data.map((form) =>
//           Promise.all([
//             axios.get(
//               `${import.meta.env.VITE_BACKEND_URL}/admins/forms/countform/${
//                 form.id
//               }`
//             ),
//           ])
//         );

//         Promise.all(promises)
//           .then((countResponses) => {
//             const updatedForms = response.data.map((form, index) => ({
//               ...form,
//               countForm: countResponses[index][0].data.formCount,
//             }));
//             setForms(updatedForms);
//           })
//           .catch((error) => {
//             console.error(error);
//           });
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);
//   return (
//     <div className="form-list">
//       <div className="form-list-header">
//         <button type="button" className="delete-button">
//           <i className="fi fi-rr-trash" />
//         </button>
//       </div>
//       <div className="form-list-body">
//         <table className="form-list-table">
//           <thead className="form-list-table-header">
//             <tr>
//               <th>Qui?</th>
//               <th>Pourquoi?</th>
//               <th>Requête</th>
//               <th>Lu</th>
//               <th>Fait</th>
//             </tr>
//           </thead>
//           <tbody className="form-list-table-body">
//             {forms.map((form) => (
//               <tr
//                 key={form.id}
//                 // onClick={() => handleTrClick(form)}
//               >
//                 <td>{form.user_type}</td>
//                 <td>{form.request_type}</td>
//                 <td>{form.request}</td>
//                 <td>{form.is_read}</td>
//                 <td>{form.is_done}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default FormListModal;
