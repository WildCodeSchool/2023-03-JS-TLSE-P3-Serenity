/* eslint-disable camelcase */
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "../styles/MyPracticianModal.scss";
import AuthFunctionContext from "../contexts/AuthFunctionContext";

function MyPracticianModal() {
  const { userInfo, userToken } = useContext(AuthFunctionContext);
  const { id, role } = userInfo;
  const [infoPractician, setInfoPractician] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/patients/practician/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          Role: `${role}`,
        },
      })
      .then((response) => {
        setInfoPractician(response.data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return isLoaded ? (
    <div className="container-info-practician">
      <div className="container-scroll-infos-practician">
        <div className="contact-practician-info">
          <h2 className="title-practician-info">Contacts praticien</h2>
          <div className="practician-infos">
            <div className="firstname-practician">
              <label htmlFor="firstname">Prénom</label>
              <div className="firstname information">
                <p>{infoPractician.firstname}</p>
              </div>
            </div>
            <div className="lastname-practician">
              <label htmlFor="lastname">Nom</label>
              <div className="lastname information">
                <p>{infoPractician.lastname}</p>
              </div>
            </div>
            <div className="speciality-practician">
              <label htmlFor="speciality">Spécialité</label>
              <div className="speciality information">
                <p>{infoPractician.speciality}</p>
              </div>
            </div>
            <div className="phone-practician">
              <label htmlFor="phone">Téléphone</label>
              <div className="phone information">
                <p>{infoPractician.phone}</p>
              </div>
            </div>
          </div>
        </div>
        {(infoPractician.language ||
          infoPractician.biography ||
          infoPractician.diploma ||
          infoPractician.other_formation ||
          infoPractician.experience ||
          infoPractician.association ||
          infoPractician.publication ||
          infoPractician.award) && (
          <>
            <br />
            <hr />
            <div className="other-infos-practician">
              <h2 className="title-practician-info">Informations praticien</h2>
              <div className="practician-other-infos">
                {infoPractician.language && (
                  <div className="language-practician">
                    <label htmlFor="language">Langues parlées</label>
                    <div className="language information">
                      <p>{infoPractician.language}</p>
                    </div>
                  </div>
                )}
                {infoPractician.biography && (
                  <div className="biography-practician">
                    <label htmlFor="biography">Biographie</label>
                    <div className="biography information">
                      <p>
                        {/* {infoPractician.biography.replace(/\n\r?/g, "\n")} */}
                        {infoPractician.biography}
                      </p>
                    </div>
                  </div>
                )}
                {infoPractician.diploma && (
                  <div className="diploma-practician">
                    <label htmlFor="diploma">Diplômes</label>
                    <div className="diploma information">
                      <p>{infoPractician.diploma}</p>
                    </div>
                  </div>
                )}
                {infoPractician.other_formation && (
                  <div className="formation-practician">
                    <label htmlFor="formation">Autres formations</label>
                    <div className="formation information">
                      <p>{infoPractician.other_formation}</p>
                    </div>
                  </div>
                )}
                {infoPractician.experience && (
                  <div className="experience-practician">
                    <label htmlFor="experience">Expériences</label>
                    <div className="experience information">
                      <p>{infoPractician.experience}</p>
                    </div>
                  </div>
                )}
                {infoPractician.association && (
                  <div className="association-practician">
                    <label htmlFor="association">Associations</label>
                    <div className="association information">
                      <p>{infoPractician.association}</p>
                    </div>
                  </div>
                )}
                {infoPractician.publication && (
                  <div className="publication-practician">
                    <label htmlFor="publication">Publications</label>
                    <div className="publication information">
                      <p>{infoPractician.publication}</p>
                    </div>
                  </div>
                )}
                {infoPractician.award && (
                  <div className="award-practician">
                    <label htmlFor="award">Récompenses</label>
                    <div className="award information">
                      <p>{infoPractician.award}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  ) : (
    <p>Chargement...</p>
  );
}

export default MyPracticianModal;
