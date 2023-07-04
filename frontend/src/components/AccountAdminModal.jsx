import React, { useState, useContext } from "react";
import "../styles/AccountAdminModal.scss";
import AuthFunctionContext from "../contexts/AuthFunctionContext";

function AccountAdminModal() {
  const { userInfo } = useContext(AuthFunctionContext);
  // eslint-disable-next-line camelcase
  const { firstname, lastname, mail, registration_number } = userInfo;
  const [firstnameInfo, setFirstnameInfo] = useState(firstname);
  const [lastnameInfo, setLastnameInfo] = useState(lastname);
  const [mailInfo, setMailInfo] = useState(mail);
  const [matriculeInfo, setMatriculeInfo] = useState(registration_number);
  const [passwordChange, setPasswordChange] = useState("Mot de passe");

  return (
    <div className="container-list-info">
      <div className="account-info-list">
        <form>
          <label htmlFor="firstname">Prénom :</label>
          <input
            type="text"
            value={firstnameInfo}
            name="firstname"
            id="firstname"
            onChange={(e) => setFirstnameInfo(e.target.value)}
          />
          <label htmlFor="lastname">Nom :</label>
          <input
            type="text"
            value={lastnameInfo}
            name="lastname"
            id="lastname"
            onChange={(e) => setLastnameInfo(e.target.value)}
          />
          <label htmlFor="mail">Mail :</label>
          <input
            type="text"
            value={mailInfo}
            name="mail"
            id="mail"
            onChange={(e) => setMailInfo(e.target.value)}
          />
          <label htmlFor="matricule">Matricule :</label>
          <input
            type="text"
            value={matriculeInfo}
            name="matricule"
            id="matricule"
            onChange={(e) => setMatriculeInfo(e.target.value)}
          />
        </form>

        <form>
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="text"
            value={passwordChange}
            name="password"
            id="password"
            onChange={(e) => setPasswordChange(e.target.value)}
            onFocus={() => setPasswordChange("")}
          />
        </form>
      </div>
    </div>
  );
}

export default AccountAdminModal;
