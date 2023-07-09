import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AboutUs from "../components/AboutUs";
import "../styles/EspacePro.scss";
import StateContext from "../contexts/StateContext";
import AuthFunctionContext from "../contexts/AuthFunctionContext";
import HeaderLocation from "../components/HeaderLocation";

export default function EspacePro() {
  const navigate = useNavigate();
  const { linkToActive, setActiveModal } = useContext(StateContext);
  const { userInfo, userToken } = useContext(AuthFunctionContext);

  useEffect(() => {
    switch (userInfo.role) {
      case "admin":
        navigate("/espaceadmin");
        setActiveModal("Practiciens");
        break;
      case "practician":
        navigate("/espacepro");
        setActiveModal("Patients");
        break;
      case "patient":
        navigate("/espacepatient");
        setActiveModal("Ma préparation");
        break;
      default:
        navigate("/");
        break;
    }
  }, [userInfo]);

  let CurrentModalePractician;
  switch (linkToActive) {
    case "home":
      break;
    case "Mon Compte":
      break;
    case "Formulaires":
      break;
    case "Stats":
      break;
    case "A propos":
      CurrentModalePractician = <AboutUs />;
      break;
    default:
      break;
  }

  return (
    userInfo.role === "practician" &&
    userToken && (
      <div className="home">
        <Navbar />

        <div className="modal-container">
          <HeaderLocation />
          {CurrentModalePractician}
        </div>
      </div>
    )
  );
}
