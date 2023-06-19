import React, { useState } from "react";
import "../styles/Authentication.scss";

import eyePwShown from "../assets/eye_pw_show_icon.svg";
import eyePwHide from "../assets/eye_pw_hide_icon.svg";

export default function Authentication() {
  const credentials = window.location.href.split("/").at(-1);
  // regex definition for matricule and mail user
  const regexMatricule = /^\d{0,8}$/;
  const regexAdeli = /^\d{0,9}$/;
  const regexMail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // useState definition
  const [matricule, setMatricule] = useState("");
  const [mail, setMail] = useState("");
  const [adeli, setAdeli] = useState("");
  const [warningMatricule, setWarningMatricule] = useState(false);
  const [warningMail, setWarningMail] = useState(false);
  const [warningAdeli, setWarningAdeli] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  // submit handler for the form
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    return Object.fromEntries(formData.entries());
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
    if (credentials === "admin") {
      authentificationTypeToShow = (
        <>
          <label htmlFor="matricule">Matricule</label>
          <input
            name="matriculeInput"
            id="matricule"
            type="text"
            autoComplete="true"
            value={matricule}
            onChange={handleMatriculeChange}
          />
          {warningMatricule && (
            <p className="warning-matricule">
              Le matricule n'est composé que de 8 chiffres
            </p>
          )}
        </>
      );
    } else if (credentials === "espacepro") {
      authentificationTypeToShow = (
        <>
          <label htmlFor="adeli">Numéro Adeli</label>
          <input
            name="adeliInput"
            id="adeli"
            type="text"
            autoComplete="true"
            value={adeli}
            onChange={handleAdeliChange}
          />
          {warningAdeli && (
            <p className="warning-adeli">
              Le numéro Adeli est composé de seulement 8 chiffres
            </p>
          )}
        </>
      );
    } else if (credentials === "login") {
      authentificationTypeToShow = (
        <>
          <label htmlFor="mail">Mail</label>
          <input
            name="mailInput"
            id="mail"
            type="text"
            autoComplete="true"
            value={mail}
            onChange={handleMailChange}
          />
          {warningMail && (
            <p className="warning-mail">Le nom d'utilisateur est le mail</p>
          )}
        </>
      );
    }
    return authentificationTypeToShow;
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="connection">
        <div className="connection-input">{authenticationType()}</div>
        <label htmlFor="password">Password</label>
        <div>
          <input
            name="password-input"
            id="password"
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
            <img
              id="pw-icon-show-hide"
              src={passwordShown ? eyePwHide : eyePwShown}
              alt="button to show or hide password"
            />
          </button>
        </div>
        <button type="submit" className="connection-button">
          SE CONNECTER
        </button>
      </form>
    </div>
  );
}
