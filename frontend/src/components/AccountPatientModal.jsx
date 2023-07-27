/* eslint-disable camelcase */
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../styles/AccountPatientModal.scss";
import AuthFunctionContext from "../contexts/AuthFunctionContext";

function AccountPatientModal() {
  const { userInfo, setUserInfo, userToken } = useContext(AuthFunctionContext);
  const {
    firstname,
    lastname,
    mail,
    id,
    role,
    phone,
    gender,
    civility,
    birthday,
    birthname,
    family_situation,
    job,
    children_number,
    street,
    postal_code,
    city,
    country,
    emergency_firstname,
    emergency_lastname,
    emergency_phone,
  } = userInfo;
  const [firstnameInfo, setFirstnameInfo] = useState(firstname);
  const [lastnameInfo, setLastnameInfo] = useState(lastname);
  const [mailInfo, setMailInfo] = useState(mail);
  const [phoneInfo, setPhoneInfo] = phone ? useState(phone) : useState("");
  const [genderInfo, setGenderInfo] = gender ? useState(gender) : useState("M");
  const [civilityInfo, setCivilityInfo] = civility
    ? useState(civility)
    : useState("Monsieur");
  const [birthdayInfo, setBirthdayInfo] = birthday
    ? useState(birthday.split("T")[0])
    : useState("1970-01-01");
  const [birthnameInfo, setBirthnameInfo] = birthname
    ? useState(birthname)
    : useState("");
  const [familyInfo, setFamilyInfo] = family_situation
    ? useState(family_situation)
    : useState("Non communiqué");
  const [jobInfo, setJobInfo] = job ? useState(job) : useState("");
  const [childrenInfo, setChildrenInfo] = children_number
    ? useState(children_number)
    : useState(0);
  const [streetInfo, setStreetInfo] = street ? useState(street) : useState("");
  const [postalCodeInfo, setPostalCodeInfo] = postal_code
    ? useState(postal_code)
    : useState("");
  const [cityInfo, setCityInfo] = city ? useState(city) : useState("");
  const [countryInfo, setCountryInfo] = country
    ? useState(country)
    : useState("");
  const [emergencyFirstnameInfo, setEmergencyFirstnameInfo] =
    emergency_firstname ? useState(emergency_firstname) : useState("");
  const [emergencyLastnameInfo, setEmergencyLastnameInfo] = emergency_lastname
    ? useState(emergency_lastname)
    : useState("");
  const [emergencyPhoneInfo, setEmergencyPhoneInfo] = emergency_phone
    ? useState(emergency_phone)
    : useState("");
  const [passwordChange, setPasswordChange] = useState("");
  const [passwordCheckChange, setPasswordCheckChange] = useState("");
  const [messageCheckPassword, setMessageCheckPassword] = useState("");
  const [messageVerifiedPassword, setMessageVerifiedPassword] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordCheckShown, setPasswordCheckShown] = useState(false);
  const regexPw =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const regexCP = /^\d{0,5}$/;
  const checkPasswordCharacter = (password, callback) => {
    if (regexPw.test(password)) {
      if (callback) {
        callback(true);
      }
    } else {
      callback(false);
    }
  };

  const checkPassword = (password) => {
    if (password !== passwordChange) {
      setMessageVerifiedPassword(true);
    } else {
      setMessageVerifiedPassword(false);
    }
  };

  const handlePasswordCheck = (e) => {
    setPasswordCheckChange(e.target.value);
  };

  const modalValidateInfo = () => {
    return Swal.fire({
      background: "#242731",
      position: "center",
      icon: "success",
      title: "Informations modifiées",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const modalValidatePw = () => {
    return Swal.fire({
      background: "#242731",
      position: "center",
      icon: "success",
      title: "Mot de passe modifié",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const modalProblemWhileUpdate = () => {
    return Swal.fire({
      background: "#242731",
      position: "center",
      icon: "error",
      title: "Erreur lors de la mise à jour, veuillez réessayer",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const modalProblemChar = () => {
    return Swal.fire({
      background: "#242731",
      position: "center",
      icon: "error",
      title:
        "Le mot de passe doit contenir au moins 8 caractères dont une majuscule, un chiffre et un caractère spécial.",
      showConfirmButton: false,
      timer: 3000,
    });
  };

  useEffect(() => {
    checkPassword(passwordCheckChange);
    if (messageVerifiedPassword) {
      setMessageCheckPassword("Les mots de passe sont différents");
    } else {
      setMessageCheckPassword("");
    }
  }, [messageVerifiedPassword, passwordCheckChange, passwordChange]);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleCheckPassword = () => {
    setPasswordCheckShown(!passwordCheckShown);
  };

  const modifyPatient = (dataFromForm) => {
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/patients/account/${id}`,
        dataFromForm,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            Role: `${role}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 204) {
          if (dataFromForm.password) {
            modalValidatePw();
          } else if (dataFromForm.mail) {
            setUserInfo({
              ...userInfo,
              firstname: dataFromForm.firstname,
              lastname: dataFromForm.lastname,
              mail: dataFromForm.mail,
              phone: dataFromForm.phone,
            });
            modalValidateInfo();
          } else if (dataFromForm.gender) {
            setUserInfo({
              ...userInfo,
              gender: dataFromForm.gender,
              civility: dataFromForm.civility,
              birthday: dataFromForm.birthday,
              birthname: dataFromForm.birthname,
              family_situation: dataFromForm.family_situation,
              job: dataFromForm.job,
              children_number: dataFromForm.children_number,
              street: dataFromForm.street,
              postal_code: dataFromForm.postal_code,
              city: dataFromForm.city,
              country: dataFromForm.country,
              emergency_firstname: dataFromForm.emergency_firstname,
              emergency_lastname: dataFromForm.emergency_lastname,
              emergency_phone: dataFromForm.emergency_phone,
            });
            modalValidateInfo();
          }
        } else {
          modalProblemWhileUpdate();
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const handleValidatePassword = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const dataFromForm = Object.fromEntries(formData.entries());
    const passwordFromForm = { password: dataFromForm.password };
    checkPasswordCharacter(passwordChange, (isValid) => {
      if (isValid) {
        modifyPatient(passwordFromForm);
      } else {
        modalProblemChar();
      }
    });
  };

  const handleValidateInfo = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const dataFromForm = Object.fromEntries(formData.entries());
    modifyPatient(dataFromForm);
  };

  const handlePostalCode = (e) => {
    if (regexCP.test(e.target.value)) {
      setPostalCodeInfo(e.target.value);
    }
  };

  return (
    <div className="container-list-info-patient">
      <div className="container-scroll">
        <div className="first-infos-patient">
          <h2 className="title-first-info">Informations principales</h2>
          <div className="account-info-list-patient">
            <form
              onSubmit={handleValidateInfo}
              className="global-info-form-patient"
            >
              <div className="global-info-patient-grid">
                <div className="firstname-input-patient">
                  <label htmlFor="firstname">Prénom</label>
                  <input
                    type="text"
                    value={firstnameInfo}
                    name="firstname"
                    id="firstname"
                    onChange={(e) => setFirstnameInfo(e.target.value)}
                  />
                </div>
                <div className="lastname-input-patient">
                  <label htmlFor="lastname">Nom</label>
                  <input
                    type="text"
                    value={lastnameInfo}
                    name="lastname"
                    id="lastname"
                    onChange={(e) => setLastnameInfo(e.target.value)}
                  />
                </div>
                <div className="mail-input-patient">
                  <label htmlFor="mail">Mail</label>
                  <input
                    type="text"
                    value={mailInfo}
                    name="mail"
                    id="mail"
                    onChange={(e) => setMailInfo(e.target.value)}
                  />
                </div>
                <div className="phone-input-patient">
                  <label htmlFor="phone">Téléphone</label>
                  <input
                    type="text"
                    value={phoneInfo}
                    name="phone"
                    id="phone"
                    onChange={(e) => setPhoneInfo(e.target.value)}
                  />
                </div>
              </div>
              <button type="submit" className="button-modification-validation">
                <p>Valider modification</p>
              </button>
            </form>

            <form onSubmit={handleValidatePassword} className="password-form">
              <div className="password-form-grid">
                <div className="password-input">
                  <label htmlFor="password" className="label-password">
                    Mot de passe
                  </label>
                  <input hidden type="text" autoComplete="username" />
                  <div className="password-input-and-show">
                    <input
                      type={!passwordShown ? "password" : "text"}
                      value={passwordChange}
                      name="password"
                      id="password"
                      autoComplete="new-password"
                      onChange={(e) => setPasswordChange(e.target.value)}
                    />
                    <button
                      onClick={togglePassword}
                      type="button"
                      className="hide-or-show-button"
                    >
                      <i
                        id="pw-icon-show-hide"
                        className={
                          passwordShown
                            ? "fi fi-rr-eye-crossed"
                            : "fi fi-rr-eye"
                        }
                        alt="button to show or hide password"
                      />
                    </button>
                  </div>
                </div>
                <div className="password-input-check">
                  <label
                    htmlFor="passwordCheck"
                    className="label-password-check"
                  >
                    Confirmer le mot de passe
                  </label>
                  <div className="password-check-input-and-show">
                    <input
                      type={!passwordCheckShown ? "password" : "text"}
                      value={passwordCheckChange}
                      autoComplete="new-password"
                      name="passwordCheck"
                      id="passwordCheck"
                      onChange={handlePasswordCheck}
                    />
                    <button
                      onClick={toggleCheckPassword}
                      type="button"
                      className="hide-or-show-button"
                    >
                      <i
                        id="pw-icon-show-hide"
                        className={
                          passwordCheckShown
                            ? "fi fi-rr-eye-crossed"
                            : "fi fi-rr-eye"
                        }
                        alt="button to show or hide password"
                      />
                    </button>
                  </div>
                </div>
              </div>
              <p
                className={
                  messageCheckPassword.length
                    ? "verified-message"
                    : "verified-message-hidden"
                }
              >
                {messageCheckPassword}
              </p>
              <button
                type="submit"
                className={
                  messageCheckPassword.length
                    ? "button-modification-validation disable-button"
                    : "button-modification-validation"
                }
              >
                Valider changement de mot de passe
              </button>
              <p>
                Le mot de passe doit contenir au moins 8 caractères dont une
                majuscule, un chiffre et un caractère spécial.
              </p>
            </form>
          </div>
        </div>
        <hr />
        <div className="other-infos-patient">
          <form
            onSubmit={handleValidateInfo}
            className="global-other-info-form-patient"
          >
            <div className="global-other-info-patient-flex">
              <div className="section-account-info">
                <h2 className="title-section-account-info">
                  Autres informations
                </h2>
                <div className="section-other-info">
                  <div className="gender-info">
                    <p>Sexe à l'état civil</p>
                    <div className="gender-radio">
                      <div className="gender-male-radio">
                        <input
                          type="radio"
                          value="M"
                          name="gender"
                          checked={genderInfo === "M"}
                          onChange={(e) => setGenderInfo(e.target.value)}
                        />
                        <label htmlFor="male">Masculin</label>
                      </div>
                      <div className="gender-female-radio">
                        <input
                          type="radio"
                          value="F"
                          name="gender"
                          checked={genderInfo === "F"}
                          onChange={(e) => setGenderInfo(e.target.value)}
                        />
                        <label htmlFor="female">Féminin</label>
                      </div>
                    </div>
                  </div>
                  <div className="civility-info">
                    <p>Civilité</p>
                    <div className="civility-radio">
                      <div className="civility-mister-radio">
                        <input
                          type="radio"
                          value="Monsieur"
                          name="civility"
                          checked={civilityInfo === "Monsieur"}
                          onChange={(e) => setCivilityInfo(e.target.value)}
                        />
                        <label htmlFor="mister">Monsieur</label>
                      </div>
                      <div className="civility-mrs-radio">
                        <input
                          type="radio"
                          value="Madame"
                          name="civility"
                          checked={civilityInfo === "Madame"}
                          onChange={(e) => setCivilityInfo(e.target.value)}
                        />
                        <label htmlFor="mrs">Madame</label>
                      </div>
                      <div className="civility-other-radio">
                        <input
                          type="radio"
                          value="Autre"
                          name="civility"
                          checked={civilityInfo === "Autre"}
                          onChange={(e) => setCivilityInfo(e.target.value)}
                        />
                        <label htmlFor="other">Autre</label>
                      </div>
                    </div>
                  </div>
                  <div className="birthday-input">
                    <label htmlFor="birthday">Date de naissance</label>
                    <input
                      type="date"
                      value={birthdayInfo}
                      name="birthday"
                      id="birthday"
                      onChange={(e) => setBirthdayInfo(e.target.value)}
                    />
                  </div>
                  <div className="birthname-input">
                    <label htmlFor="birthname">Nom de naissance</label>
                    <input
                      type="text"
                      value={birthnameInfo}
                      name="birthname"
                      id="birthname"
                      onChange={(e) => setBirthnameInfo(e.target.value)}
                    />
                  </div>
                  <div className="family-input">
                    <label htmlFor="family">Situation familiale</label>
                    <select
                      value={familyInfo}
                      name="family_situation"
                      onChange={(e) => setFamilyInfo(e.target.value)}
                    >
                      <option className="option-select" value="">
                        Non communiqué
                      </option>
                      <option className="option-select" value="maried">
                        Marié⸱e
                      </option>
                      <option className="option-select" value="pacs">
                        Pacsé⸱e
                      </option>
                      <option className="option-select" value="divorced">
                        Divorcé⸱e
                      </option>
                      <option className="option-select" value="separated">
                        Séparé⸱e
                      </option>
                      <option className="option-select" value="single">
                        Célibataire
                      </option>
                      <option className="option-select" value="widowed">
                        Veuf⸱euve
                      </option>
                    </select>
                  </div>
                  <div className="job-input">
                    <label htmlFor="job">Profession</label>
                    <input
                      type="text"
                      value={jobInfo}
                      name="job"
                      id="job"
                      onChange={(e) => setJobInfo(e.target.value)}
                    />
                  </div>
                  <div className="children-input">
                    <label htmlFor="children">Nombre d'enfants</label>
                    <select
                      type="text"
                      value={childrenInfo}
                      name="children_number"
                      id="children"
                      onChange={(e) => setChildrenInfo(e.target.value)}
                    >
                      <option className="option-select" value={0}>
                        0
                      </option>
                      <option className="option-select" value={1}>
                        1
                      </option>
                      <option className="option-select" value={2}>
                        2
                      </option>
                      <option className="option-select" value={3}>
                        3
                      </option>
                      <option className="option-select" value={4}>
                        4
                      </option>
                      <option className="option-select" value={5}>
                        5
                      </option>
                      <option className="option-select" value={6}>
                        6
                      </option>
                      <option className="option-select" value={7}>
                        7
                      </option>
                      <option className="option-select" value={8}>
                        8
                      </option>
                      <option className="option-select" value={9}>
                        9
                      </option>
                      <option className="option-select" value={10}>
                        10
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <hr />
              <div className="section-address-info">
                <h2 className="title-address-info">Adresse</h2>
                <div className="address-info">
                  <div className="street-input">
                    <label htmlFor="street">Rue</label>
                    <input
                      type="text"
                      value={streetInfo}
                      name="street"
                      id="street"
                      onChange={(e) => setStreetInfo(e.target.value)}
                    />
                  </div>
                  <div className="postal-input">
                    <label htmlFor="postalCode">Code postal</label>
                    <input
                      type="text"
                      value={postalCodeInfo}
                      name="postal_code"
                      id="postalCode"
                      onChange={handlePostalCode}
                    />
                  </div>
                  <div className="city-input">
                    <label htmlFor="city">Ville</label>
                    <input
                      type="text"
                      value={cityInfo}
                      name="city"
                      id="city"
                      onChange={(e) => setCityInfo(e.target.value)}
                    />
                  </div>
                  <div className="country-input">
                    <label htmlFor="country">Pays</label>
                    <input
                      type="text"
                      value={countryInfo}
                      name="country"
                      id="country"
                      onChange={(e) => setCountryInfo(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <hr />
              <div className="section-emergency-info">
                <h2 className="title-emergency-info">Contact d'urgence</h2>
                <div className="emergency-info">
                  <div className="emergency-firstname-input">
                    <label htmlFor="emergencyFirstname">Prénom</label>
                    <input
                      type="text"
                      value={emergencyFirstnameInfo}
                      name="emergency_firstname"
                      id="emergencyFirstname"
                      onChange={(e) =>
                        setEmergencyFirstnameInfo(e.target.value)
                      }
                    />
                  </div>
                  <div className="emergency-lastname-input">
                    <label htmlFor="emergencyLastname">Nom</label>
                    <input
                      type="text"
                      value={emergencyLastnameInfo}
                      name="emergency_lastname"
                      id="emergencyLastname"
                      onChange={(e) => setEmergencyLastnameInfo(e.target.value)}
                    />
                  </div>
                  <div className="emergency-phone-input">
                    <label htmlFor="emergencyPhone">Téléphone</label>
                    <input
                      type="text"
                      value={emergencyPhoneInfo}
                      name="emergency_phone"
                      id="emergencyPhone"
                      onChange={(e) => setEmergencyPhoneInfo(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" className="button-modification-validation">
              <p>Mise à jour des autres informations</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AccountPatientModal;
