import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AboutUs from "../components/AboutUs";
import "../styles/EspacePro.scss";
import StateContext from "../contexts/StateContext";
import AuthFunctionContext from "../contexts/AuthFunctionContext";
import HeaderLocation from "../components/HeaderLocation";
import PatientListModal from "../components/PatientListModal";
import AccountPracticianModal from "../components/AccountPracticianModal";
import SendForm from "../components/SendForm";
import RessourcesModal from "../components/RessourcesModal";
import InterventionsModal from "../components/InterventionsModal";

export default function EspacePro() {
  const navigate = useNavigate();
  const { linkToActive, setActiveModal } = useContext(StateContext);
  const { userInfo, userToken } = useContext(AuthFunctionContext);

  useEffect(() => {
    switch (userInfo.role) {
      case "admin":
        setActiveModal("Praticiens");
        break;
      case "practician":
        setActiveModal("Patients");
        break;
      case "patient":
        setActiveModal("Ma préparation");
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    switch (userInfo.role) {
      case "admin":
        navigate("/espaceadmin");
        break;
      case "practician":
        navigate("/espacepro");
        break;
      case "patient":
        navigate("/espacepatient");
        break;
      default:
        navigate("/");
        break;
    }
  }, [userInfo]);

  let CurrentModalePractician;
  switch (linkToActive) {
    case "Home":
      CurrentModalePractician = <PatientListModal />;
      break;
    case "Mon Compte":
      CurrentModalePractician = <AccountPracticianModal />;
      break;
    case "Interventions":
      CurrentModalePractician = <InterventionsModal />;
      break;
    case "Ressources":
      CurrentModalePractician = <RessourcesModal />;
      break;
    case "Formulaire":
      CurrentModalePractician = <SendForm />;
      break;
    case "A propos":
      CurrentModalePractician = <AboutUs />;
      break;
    default:
      CurrentModalePractician = <PatientListModal />;
      break;
  }

  return (
    userInfo.role === "practician" &&
    userToken && (
      <div className="home-practician">
        <Navbar />

        <div className="modal-container">
          <HeaderLocation />
          {CurrentModalePractician}
        </div>
      </div>
    )
  );
}
