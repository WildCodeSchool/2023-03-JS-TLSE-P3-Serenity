// /* eslint-disable camelcase */
// import React, { useState, useContext, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import "../styles/AccountPatientModal.scss";
// import AuthFunctionContext from "../contexts/AuthFunctionContext";

// function AccountPatientModal() {
//   const { userInfo, userToken } = useContext(AuthFunctionContext);
//   const { role } = userInfo;
//   const [utilisateurForm, setUtilisateurForm] = useState(role);
//   const [lastnameInfo, setLastnameInfo] = useState(lastname);
//   const [mailInfo, setMailInfo] = useState(mail);
//   const [phoneInfo, setPhoneInfo] = phone ? useState(phone) : useState("");
//   const [genderInfo, setGenderInfo] = gender ? useState(gender) : useState("M");
//   const [civilityInfo, setCivilityInfo] = civility
//     ? useState(civility)
//     : useState("Monsieur");
//   const [birthdayInfo, setBirthdayInfo] = birthday
//     ? useState(birthday.split("T")[0])
//     : useState("1970-01-01");
//   const [birthnameInfo, setBirthnameInfo] = birthname
//     ? useState(birthname)
//     : useState("");
//   const [familyInfo, setFamilyInfo] = family_situation
//     ? useState(family_situation)
//     : useState("Non communiqué");
//   const [jobInfo, setJobInfo] = job ? useState(job) : useState("");
//   const [childrenInfo, setChildrenInfo] = children_number
//     ? useState(children_number)
//     : useState(0);
//   const [streetInfo, setStreetInfo] = street ? useState(street) : useState("");
//   const [postalCodeInfo, setPostalCodeInfo] = postal_code
//     ? useState(postal_code)
//     : useState("");
//   const [cityInfo, setCityInfo] = city ? useState(city) : useState("");
//   const [countryInfo, setCountryInfo] = country
//     ? useState(country)
//     : useState("");
//   const [emergencyFirstnameInfo, setEmergencyFirstnameInfo] =
//     emergency_firstname ? useState(emergency_firstname) : useState("");
//   const [emergencyLastnameInfo, setEmergencyLastnameInfo] = emergency_lastname
//     ? useState(emergency_lastname)
//     : useState("");
//   const [emergencyPhoneInfo, setEmergencyPhoneInfo] = emergency_phone
//     ? useState(emergency_phone)
//     : useState("");
//   const [passwordChange, setPasswordChange] = useState("");
//   const [passwordCheckChange, setPasswordCheckChange] = useState("");
//   const [messageCheckPassword, setMessageCheckPassword] = useState("");
//   const [messageVerifiedPassword, setMessageVerifiedPassword] = useState(false);
//   const [passwordShown, setPasswordShown] = useState(false);
//   const [passwordCheckShown, setPasswordCheckShown] = useState(false);
//   const regexPw =
//     /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
//   const regexCP = /^\d{0,5}$/;
//   const checkPasswordCharacter = (password, callback) => {
//     if (regexPw.test(password)) {
//       if (callback) {
//         callback(true);
//       }
//     } else {
//       callback(false);
//     }
//   };

//   const checkPassword = (password) => {
//     if (password !== passwordChange) {
//       setMessageVerifiedPassword(true);
//     } else {
//       setMessageVerifiedPassword(false);
//     }
//   };

//   const handlePasswordCheck = (e) => {
//     setPasswordCheckChange(e.target.value);
//   };

//   const modalValidateInfo = () => {
//     return Swal.fire({
//       position: "center",
//       icon: "success",
//       title: "Informations modifiées",
//       showConfirmButton: false,
//       timer: 1500,
//     });
//   };

//   const modalValidatePw = () => {
//     return Swal.fire({
//       position: "center",
//       icon: "success",
//       title: "Mot de passe modifié",
//       showConfirmButton: false,
//       timer: 1500,
//     });
//   };

//   const modalProblemWhileUpdate = () => {
//     return Swal.fire({
//       position: "center",
//       icon: "error",
//       title: "Erreur lors de la mise à jour, veuillez réessayer",
//       showConfirmButton: false,
//       timer: 2000,
//     });
//   };

//   const modalProblemChar = () => {
//     return Swal.fire({
//       position: "center",
//       icon: "error",
//       title:
//         "Le mot de passe doit contenir au moins 8 caractères dont au moins une majuscule, un chiffre et un caractère spécial.",
//       showConfirmButton: false,
//       timer: 3000,
//     });
//   };

//   useEffect(() => {
//     checkPassword(passwordCheckChange);
//     if (messageVerifiedPassword) {
//       setMessageCheckPassword("Les mots de passe sont différents");
//     } else {
//       setMessageCheckPassword("");
//     }
//   }, [messageVerifiedPassword, passwordCheckChange, passwordChange]);

//   const togglePassword = () => {
//     setPasswordShown(!passwordShown);
//   };

//   const toggleCheckPassword = () => {
//     setPasswordCheckShown(!passwordCheckShown);
//   };

//   const modifyPractician = (dataFromForm) => {
//     axios
//       .put(
//         `${import.meta.env.VITE_BACKEND_URL}/patients/account/${id}`,
//         dataFromForm,
//         {
//           headers: {
//             Authorization: `Bearer ${userToken}`,
//             Role: `${role}`,
//           },
//         }
//       )
//       .then((response) => {
//         if (response.status === 204) {
//           if (dataFromForm.password) {
//             modalValidatePw();
//           } else if (dataFromForm.mail) {
//             setUserInfo({
//               ...userInfo,
//               firstname: dataFromForm.firstname,
//               lastname: dataFromForm.lastname,
//               mail: dataFromForm.mail,
//               phone: dataFromForm.phone,
//             });
//             modalValidateInfo();
//           } else if (dataFromForm.language) {
//             setUserInfo({
//               ...userInfo,
//               gender: dataFromForm.gender,
//               civility: dataFromForm.civility,
//               birthday: dataFromForm.birthday,
//               birthname: dataFromForm.birthname,
//               family_situation: dataFromForm.family_situation,
//               job: dataFromForm.job,
//               children_number: dataFromForm.children_number,
//               street: dataFromForm.street,
//               postal_code: dataFromForm.postal_code,
//               city: dataFromForm.city,
//               country: dataFromForm.country,
//               emergency_firstname: dataFromForm.emergency_firstname,
//               emergency_lastname: dataFromForm.emergency_lastname,
//               emergency_phone: dataFromForm.emergency_phone,
//             });
//             modalValidateInfo();
//           }
//         } else {
//           modalProblemWhileUpdate();
//         }
//       })
//       .catch((error) => {
//         console.error(error.message);
//       });
//   };

//   const handleValidateInfo = (event) => {
//     event.preventDefault();
//     const form = event.target;
//     const formData = new FormData(form);
//     const dataFromForm = Object.fromEntries(formData.entries());
//     modifyPractician(dataFromForm);
//   };

//   return (
//     <div className="container-list-info-patient">
//       <div className="container-scroll">
//         <div className="first-infos-patient">
//           <h2 className="title-first-info">Informations principales</h2>
//           <div className="account-info-list-patient">
//             <form
//               onSubmit={handleValidateInfo}
//               className="global-info-form-patient"
//             >
//               <div className="global-info-patient-grid">
//                 <div className="firstname-input-patient">
//                   <label htmlFor="firstname">Prénom</label>
//                   <input
//                     type="text"
//                     value={firstnameInfo}
//                     name="firstname"
//                     id="firstname"
//                     onChange={(e) => setFirstnameInfo(e.target.value)}
//                   />
//                 </div>
//                 <div className="lastname-input-patient">
//                   <label htmlFor="lastname">Nom</label>
//                   <input
//                     type="text"
//                     value={lastnameInfo}
//                     name="lastname"
//                     id="lastname"
//                     onChange={(e) => setLastnameInfo(e.target.value)}
//                   />
//                 </div>
//               </div>
//               <button type="submit" className="button-modification-validation">
//                 <p>Valider modification</p>
//               </button>
//             </form>

//             <form onSubmit={handleValidatePassword} className="password-form">
//               <div className="password-form-grid">
//                 <div className="password-input">
//                   <label htmlFor="password" className="label-password">
//                     Mot de passe
//                   </label>
//                   <input hidden type="text" autoComplete="username" />
//                   <div className="password-input-and-show">
//                     <input
//                       type={!passwordShown ? "password" : "text"}
//                       value={passwordChange}
//                       name="password"
//                       id="password"
//                       autoComplete="new-password"
//                       onChange={(e) => setPasswordChange(e.target.value)}
//                     />
//                     <button
//                       onClick={togglePassword}
//                       type="button"
//                       className="hide-or-show-button"
//                     >
//                       <i
//                         id="pw-icon-show-hide"
//                         className={
//                           passwordShown
//                             ? "fi fi-rr-eye-crossed"
//                             : "fi fi-rr-eye"
//                         }
//                         alt="button to show or hide password"
//                       />
//                     </button>
//                   </div>
//                 </div>
//                 <div className="password-input-check">
//                   <label
//                     htmlFor="passwordCheck"
//                     className="label-password-check"
//                   >
//                     Confirmer le mot de passe
//                   </label>
//                   <div className="password-check-input-and-show">
//                     <input
//                       type={!passwordCheckShown ? "password" : "text"}
//                       value={passwordCheckChange}
//                       autoComplete="new-password"
//                       name="passwordCheck"
//                       id="passwordCheck"
//                       onChange={handlePasswordCheck}
//                     />
//                     <button
//                       onClick={toggleCheckPassword}
//                       type="button"
//                       className="hide-or-show-button"
//                     >
//                       <i
//                         id="pw-icon-show-hide"
//                         className={
//                           passwordCheckShown
//                             ? "fi fi-rr-eye-crossed"
//                             : "fi fi-rr-eye"
//                         }
//                         alt="button to show or hide password"
//                       />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               <p
//                 className={
//                   messageCheckPassword.length
//                     ? "verified-message"
//                     : "verified-message-hidden"
//                 }
//               >
//                 {messageCheckPassword}
//               </p>
//               <button
//                 type="submit"
//                 className={
//                   messageCheckPassword.length
//                     ? "button-modification-validation disable-button"
//                     : "button-modification-validation"
//                 }
//               >
//                 Valider changement de mot de passe
//               </button>
//               <p>
//                 Le mot de passe doit contenir au moins 8 caractères dont au
//                 moins une majuscule, un chiffre et un caractère spécial.
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AccountPatientModal;
