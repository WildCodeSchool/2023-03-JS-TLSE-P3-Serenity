import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../styles/AccountAdminModal.scss";
import AuthFunctionContext from "../contexts/AuthFunctionContext";

function AccountAdminModal() {
  const { userInfo, setUserInfo, userToken } = useContext(AuthFunctionContext);
  // eslint-disable-next-line camelcase
  const { firstname, lastname, mail, registration_number, id, role } = userInfo;
  const [firstnameInfo, setFirstnameInfo] = useState(firstname);
  const [lastnameInfo, setLastnameInfo] = useState(lastname);
  const [mailInfo, setMailInfo] = useState(mail);
  const [matriculeInfo, setMatriculeInfo] = useState(registration_number);
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

  const modifyAdmin = (dataFromForm) => {
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/admins/account/${id}`,
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
          } else if (dataFromForm.registration_number) {
            setUserInfo({
              ...userInfo,
              registration_number: dataFromForm.registration_number,
              mail: dataFromForm.mail,
              firstname: dataFromForm.firstname,
              lastname: dataFromForm.lastname,
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
        modifyAdmin(passwordFromForm);
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
    modifyAdmin(dataFromForm);
  };

  return (
    <div className="container-list-info">
      <div className="account-info-list">
        <form onSubmit={handleValidateInfo} className="global-info-form">
          <div className="global-info-grid">
            <div className="firstname-input">
              <label htmlFor="firstname">Prénom</label>
              <input
                type="text"
                value={firstnameInfo}
                name="firstname"
                id="firstname"
                onChange={(e) => setFirstnameInfo(e.target.value)}
              />
            </div>
            <div className="lastname-input">
              <label htmlFor="lastname">Nom</label>
              <input
                type="text"
                value={lastnameInfo}
                name="lastname"
                id="lastname"
                onChange={(e) => setLastnameInfo(e.target.value)}
              />
            </div>
            <div className="mail-input">
              <label htmlFor="mail">Mail</label>
              <input
                type="text"
                value={mailInfo}
                name="mail"
                id="mail"
                onChange={(e) => setMailInfo(e.target.value)}
              />
            </div>
            <div className="matricule-input">
              <label htmlFor="matricule">Matricule</label>
              <input
                type="text"
                value={matriculeInfo}
                name="registration_number"
                id="matricule"
                onChange={(e) => setMatriculeInfo(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="button-modification-info-validation">
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
                      passwordShown ? "fi fi-rr-eye-crossed" : "fi fi-rr-eye"
                    }
                    alt="button to show or hide password"
                  />
                </button>
              </div>
            </div>
            <div className="password-input-check">
              <label htmlFor="passwordCheck" className="label-password-check">
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
                ? "button-modification-pw-validation disable-button"
                : "button-modification-pw-validation"
            }
          >
            Valider changement de mot de passe
          </button>
          <p>
            Le mot de passe doit contenir au moins 8 caractères dont au moins
            une majuscule, un chiffre et un caractère spécial.
          </p>
        </form>
      </div>
    </div>
  );
}

export default AccountAdminModal;
