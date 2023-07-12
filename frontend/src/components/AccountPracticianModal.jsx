/* eslint-disable camelcase */
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../styles/AccountPracticianModal.scss";
import AuthFunctionContext from "../contexts/AuthFunctionContext";

function AccountPracticianModal() {
  const { userInfo, setUserInfo, userToken } = useContext(AuthFunctionContext);
  // eslint-disable-next-line camelcase
  const {
    firstname,
    lastname,
    mail,
    adeli_number,
    id,
    role,
    speciality,
    phone,
    language,
    biography,
    diploma,
    other_formation,
    experience,
    association,
    publication,
    award,
  } = userInfo;
  const [firstnameInfo, setFirstnameInfo] = useState(firstname);
  const [lastnameInfo, setLastnameInfo] = useState(lastname);
  const [mailInfo, setMailInfo] = useState(mail);
  const [adeliInfo, setAdeliInfo] = useState(adeli_number);
  const [specialityInfo, setSpecialityInfo] = useState(speciality);
  const [phoneInfo, setPhoneInfo] = useState(phone);
  const [languageInfo, setLanguageInfo] = language
    ? useState(language)
    : useState("");
  const [biographyInfo, setBiographyInfo] = biography
    ? useState(biography)
    : useState("");
  const [diplomaInfo, setDiplomaInfo] = diploma
    ? useState(diploma)
    : useState("");
  const [formationInfo, setFormationInfo] = other_formation
    ? useState(other_formation)
    : useState("");
  const [experienceInfo, setExperienceInfo] = experience
    ? useState(experience)
    : useState("");
  const [associationInfo, setAssociationInfo] = association
    ? useState(association)
    : useState("");
  const [publicationInfo, setPublicationInfo] = publication
    ? useState(publication)
    : useState("");
  const [awardInfo, setAwardInfo] = award ? useState(award) : useState("");
  const [passwordChange, setPasswordChange] = useState("");
  const [passwordCheckChange, setPasswordCheckChange] = useState("");
  const [messageCheckPassword, setMessageCheckPassword] = useState("");
  const [messageVerifiedPassword, setMessageVerifiedPassword] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordCheckShown, setPasswordCheckShown] = useState(false);
  const regexPw =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
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
      position: "center",
      icon: "success",
      title: "Informations modifiées",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const modalValidatePw = () => {
    return Swal.fire({
      position: "center",
      icon: "success",
      title: "Mot de passe modifié",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const modalProblemWhileUpdate = () => {
    return Swal.fire({
      position: "center",
      icon: "error",
      title: "Erreur lors de la mise à jour, veuillez réessayer",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const modalProblemChar = () => {
    return Swal.fire({
      position: "center",
      icon: "error",
      title:
        "Le mot de passe doit contenir au moins 8 caractères dont au moins une majuscule, un chiffre et un caractère spécial.",
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

  const modifyPractician = (dataFromForm) => {
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/practicians/account/${id}`,
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
          } else if (dataFromForm.adeli_number) {
            setUserInfo({
              ...userInfo,
              adeli_number: dataFromForm.adeli_number,
              mail: dataFromForm.mail,
              firstname: dataFromForm.firstname,
              lastname: dataFromForm.lastname,
              speciality: dataFromForm.speciality,
              phone: dataFromForm.phone,
            });
            modalValidateInfo();
          } else if (dataFromForm.language) {
            setUserInfo({
              ...userInfo,
              language: dataFromForm.language,
              biography: dataFromForm.biography,
              diploma: dataFromForm.diploma,
              other_formation: dataFromForm.other_formation,
              experience: dataFromForm.experience,
              association: dataFromForm.association,
              publication: dataFromForm.publication,
              award: dataFromForm.award,
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
        modifyPractician(passwordFromForm);
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
    modifyPractician(dataFromForm);
  };

  return (
    <div className="container-list-info-practician">
      <div className="container-scroll">
        <div className="first-infos-practician">
          <h2 className="section-account-info">Informations principales</h2>
          <div className="account-info-list-practician">
            <form
              onSubmit={handleValidateInfo}
              className="global-info-form-practician"
            >
              <div className="global-info-practician-grid">
                <div className="firstname-input-practician">
                  <label htmlFor="firstname">Prénom</label>
                  <input
                    type="text"
                    value={firstnameInfo}
                    name="firstname"
                    id="firstname"
                    onChange={(e) => setFirstnameInfo(e.target.value)}
                  />
                </div>
                <div className="lastname-input-practician">
                  <label htmlFor="lastname">Nom</label>
                  <input
                    type="text"
                    value={lastnameInfo}
                    name="lastname"
                    id="lastname"
                    onChange={(e) => setLastnameInfo(e.target.value)}
                  />
                </div>
                <div className="mail-input-practician">
                  <label htmlFor="mail">Mail</label>
                  <input
                    type="text"
                    value={mailInfo}
                    name="mail"
                    id="mail"
                    onChange={(e) => setMailInfo(e.target.value)}
                  />
                </div>
                <div className="adeli-input">
                  <label htmlFor="adeli">Numéro Adeli</label>
                  <input
                    type="text"
                    value={adeliInfo}
                    name="adeli_number"
                    id="adeli"
                    onChange={(e) => setAdeliInfo(e.target.value)}
                  />
                </div>
                <div className="speciality-input-practician">
                  <label htmlFor="speciality">Spécialité</label>
                  <input
                    type="text"
                    value={specialityInfo}
                    name="speciality"
                    id="speciality"
                    onChange={(e) => setSpecialityInfo(e.target.value)}
                  />
                </div>
                <div className="phone-input-practician">
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
                Le mot de passe doit contenir au moins 8 caractères dont au
                moins une majuscule, un chiffre et un caractère spécial.
              </p>
            </form>
          </div>
        </div>
        <hr />
        <br />
        <div className="other-infos-practician">
          <h2 className="section-account-info">Autres informations</h2>
          <form
            onSubmit={handleValidateInfo}
            className="global-other-info-form-practician"
          >
            <div className="global-other-info-practician-flex">
              <div className="language-input">
                <label htmlFor="language">Langages</label>
                <input
                  type="text"
                  value={languageInfo}
                  name="language"
                  id="language"
                  onChange={(e) => setLanguageInfo(e.target.value)}
                />
              </div>
              <div className="biography-input">
                <label htmlFor="biography">Biographie</label>
                <textarea
                  type="text"
                  value={biographyInfo}
                  name="biography"
                  id="biography"
                  onChange={(e) => setBiographyInfo(e.target.value)}
                />
              </div>
              <div className="diploma-input">
                <label htmlFor="diploma">Dîplomes</label>
                <textarea
                  type="text"
                  value={diplomaInfo}
                  name="diploma"
                  id="diploma"
                  onChange={(e) => setDiplomaInfo(e.target.value)}
                />
              </div>
              <div className="formation-input">
                <label htmlFor="formation">Autres formations</label>
                <textarea
                  type="text"
                  value={formationInfo}
                  name="other_formation"
                  id="formation"
                  onChange={(e) => setFormationInfo(e.target.value)}
                />
              </div>
              <div className="experience-input">
                <label htmlFor="experience">Expériences</label>
                <textarea
                  type="text"
                  value={experienceInfo}
                  name="experience"
                  id="experience"
                  onChange={(e) => setExperienceInfo(e.target.value)}
                />
              </div>
              <div className="association-input">
                <label htmlFor="association">Associations</label>
                <textarea
                  type="text"
                  value={associationInfo}
                  name="association"
                  id="association"
                  onChange={(e) => setAssociationInfo(e.target.value)}
                />
              </div>
              <div className="publication-input">
                <label htmlFor="publication">Publications</label>
                <textarea
                  type="text"
                  value={publicationInfo}
                  name="publication"
                  id="publication"
                  onChange={(e) => setPublicationInfo(e.target.value)}
                />
              </div>
              <div className="award-input">
                <label htmlFor="award">Récompenses</label>
                <textarea
                  type="text"
                  value={awardInfo}
                  name="award"
                  id="award"
                  onChange={(e) => setAwardInfo(e.target.value)}
                />
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

export default AccountPracticianModal;
