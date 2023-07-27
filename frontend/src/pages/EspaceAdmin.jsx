import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PracticianListModal from "../components/PracticianListModal";
import FormListModal from "../components/FormListModal";
import AboutUs from "../components/AboutUs";
import "../styles/EspaceAdmin.scss";
import StateContext from "../contexts/StateContext";
import AuthFunctionContext from "../contexts/AuthFunctionContext";
import AccountAdminModal from "../components/AccountAdminModal";
import HeaderLocation from "../components/HeaderLocation";

export default function EspaceAdmin() {
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

  let CurrentModaleAdmin;
  switch (linkToActive) {
    case "Home":
      CurrentModaleAdmin = <PracticianListModal />;
      break;
    case "Mon compte":
      CurrentModaleAdmin = <AccountAdminModal />;
      break;
    case "Formulaire":
      CurrentModaleAdmin = <FormListModal />;
      break;
    case "Stats":
      break;
    case "A propos":
      CurrentModaleAdmin = <AboutUs />;
      break;
    default:
      CurrentModaleAdmin = <PracticianListModal />;
      break;
  }
  return (
    userInfo.role === "admin" &&
    userToken && (
      <div className="home-admin">
        <Navbar />

        <div className="modal-container">
          <HeaderLocation />
          {CurrentModaleAdmin}
        </div>
      </div>
    )
  );
}
