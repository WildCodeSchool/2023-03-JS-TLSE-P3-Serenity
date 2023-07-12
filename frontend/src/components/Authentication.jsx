import React, { useState, useContext } from "react";
import axios from "axios";
import "../styles/Authentication.scss";
import { useNavigate } from "react-router-dom";
import AuthFunctionContext from "../contexts/AuthFunctionContext";

export default function Authentication() {
  const { setUser, setUserInfo } = useContext(AuthFunctionContext);
  const credentials = window.location.href.split("/").at(-1);
  // regex definition for matricule and mail user
  const regexMatricule = /^\d{0,8}$/;
  const regexAdeli = /^\d{0,9}$/;
  const regexMail = /^$|^[a-zA-Z0-9._%+-@]+$/;

  // useState definition
  const [matricule, setMatricule] = useState("");
  const [mail, setMail] = useState("");
  const [adeli, setAdeli] = useState("");
  const [warningMatricule, setWarningMatricule] = useState(false);
  const [warningMail, setWarningMail] = useState(false);
  const [warningAdeli, setWarningAdeli] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [failAuth, setFailAuth] = useState(false);

  const navigate = useNavigate();

  // submit handler for the form
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const dataFromForm = Object.fromEntries(formData.entries());
    if (credentials === "admin") {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/admins/login`, dataFromForm)
        .then((response) => {
          if (response.data.token) {
            setUser(response.data.token);
            setUserInfo(response.data.user);
            navigate("/espaceadmin");
          } else {
            console.info(response);
          }
        })
        .catch((error) => {
          console.error(error.message);
          setFailAuth(true);
        });
    } else if (credentials === "loginpro") {
      axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/practicians/login`,
          dataFromForm
        )
        .then((response) => {
          if (response.data.token) {
            setUser(response.data.token);
            setUserInfo(response.data.user);
            navigate("/espacepro");
          } else {
            console.info(response);
          }
        })
        .catch((error) => {
          console.error(error.message);
          setFailAuth(true);
        });
    } else if (credentials === "login") {
      axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/patients/login`,
          dataFromForm
        )
        .then((response) => {
          if (response.data.token) {
            setUser(response.data.token);
            setUserInfo(response.data.user);
            navigate("/espacepatient");
          } else {
            console.info(response);
          }
        })
        .catch((error) => {
          console.error(error.message);
          setFailAuth(true);
        });
    }
  };

  // handler for change in input admin matricule
  const handleMatriculeChange = (event) => {
    if (regexMatricule.test(event.target.value)) {
      setMatricule(event.target.value);
      setWarningMatricule(false);
    } else {
      setWarningMatricule(true);
    }
  };

  // handler for change in input practician adeli number
  const handleAdeliChange = (event) => {
    if (regexAdeli.test(event.target.value)) {
      setAdeli(event.target.value);
      setWarningAdeli(false);
    } else {
      setWarningAdeli(true);
    }
  };

  // handler for change in input patient mail
  const handleMailChange = (event) => {
    if (regexMail.test(event.target.value)) {
      setMail(event.target.value);
      setWarningMail(false);
    } else {
      setWarningMail(true);
    }
  };

  // handler for change in password input
  const handlePasswordChange = (event) => setPassword(event.target.value);

  // toggle to change type input for password to show it if user click on the SHOW button
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  // change the authentication "username" according to the type of user
  const authenticationType = () => {
    let authentificationTypeToShow = "";
    switch (credentials) {
      case "admin":
        authentificationTypeToShow = (
          <>
            <label className="admin-practician-label" htmlFor="matricule">
              Matricule
            </label>
            <input
              name="matricule"
              id="matricule"
              className="input-username-black"
              type="text"
              autoComplete="true"
              value={matricule}
              onChange={handleMatriculeChange}
            />
            {warningMatricule ? (
              <p className="warning-username">
                Le matricule n'est composé que de 8 chiffres
              </p>
            ) : (
              <p className="description-username">
                Le matricule est une série de 8 chiffres
              </p>
            )}
          </>
        );
        break;
      case "loginpro":
        authentificationTypeToShow = (
          <>
            <label className="admin-practician-label" htmlFor="adeli">
              Numéro Adeli
            </label>
            <input
              name="adeli"
              id="adeli"
              className="input-username-black"
              type="text"
              autoComplete="true"
              value={adeli}
              onChange={handleAdeliChange}
            />
            {warningAdeli ? (
              <p className="warning-username">
                Le numéro Adeli est composé de seulement 9 chiffres
              </p>
            ) : (
              <p className="description-username">
                Le numéro Adeli est une série de 9 chiffres
              </p>
            )}
          </>
        );
        break;
      case "login":
        authentificationTypeToShow = (
          <>
            <label className="patient-label" htmlFor="mail">
              Mail
            </label>
            <input
              name="mail"
              id="mail"
              className="input-username-white"
              type="text"
              autoComplete="true"
              value={mail}
              onChange={handleMailChange}
            />
            {warningMail && (
              <p className="warning-username">
                Le nom d'utilisateur doit être un mail
              </p>
            )}
          </>
        );
        break;
      default:
        break;
    }
    return authentificationTypeToShow;
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="connection">
        <div className="connection-input">{authenticationType()}</div>
        <div className="password-input">
          <label
            className={
              credentials === "login"
                ? "patient-label"
                : "admin-practician-label"
            }
            htmlFor="password"
          >
            Mot de passe
          </label>
          <div className="password-input-and-show">
            <input
              name="password"
              id="password"
              className={
                credentials === "login" ? "input-pw-white" : "input-pw-black"
              }
              autoComplete="current-password"
              type={!passwordShown ? "password" : "text"}
              value={password}
              onChange={handlePasswordChange}
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
        <button type="submit" className="connection-button">
          SE CONNECTER
        </button>
      </form>
      {failAuth && (
        <div>
          <button
            className="bg-fail-auth-modal"
            type="button"
            onClick={() => setFailAuth(false)}
            label="close fail authentication modal"
          />
          <div className="fail-auth-modal">
            <button
              className="exit-modal-fail-button"
              type="button"
              onClick={() => setFailAuth(false)}
            >
              <i className="fi fi-rr-cross-small" />
            </button>
            <p>Les champs renseignés ne correspondent pas.</p>
            <p>Veuillez réessayer.</p>
          </div>
        </div>
      )}
    </div>
  );
}
