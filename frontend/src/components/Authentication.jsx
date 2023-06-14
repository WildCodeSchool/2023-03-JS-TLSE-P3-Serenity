import React, { useState } from "react";
import "../style/authentication.scss";

export default function Authentication() {
  const regexMatricule = /^\d{0,8}$/;
  const [matricule, setMatricule] = useState("");
  const [warningMatricule, setWarningMatricule] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const handleSubmit = (event) => event.preventDefault();
  const handleMatriculeChange = (event) => {
    if (regexMatricule.test(event.target.value)) {
      setMatricule(event.target.value);
      setWarningMatricule(false);
    } else {
      setWarningMatricule(true);
    }
  };
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="connection">
        <div className="matriculeInput">
          <label htmlFor="matricule">Matricule</label>
          <input
            id="matricule"
            type="text"
            value={matricule}
            onChange={handleMatriculeChange}
          />
          {warningMatricule && (
            <p className="warningMatricule">
              Le matricule n'est composé que de 8 chiffres
            </p>
          )}
        </div>
        <div className="passwordInput">
          <label htmlFor="password">Password</label>
          <div>
            <input
              id="password"
              type={!passwordShown ? "password" : "text"}
              value={password}
              onChange={handlePasswordChange}
            />
            <button onClick={togglePassword} type="button">
              👁️
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
