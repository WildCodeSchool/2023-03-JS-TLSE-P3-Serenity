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
        navigate("/admin");
        break;
    }
  }, [userInfo]);
  let CurrentModaleAdmin;
  switch (linkToActive) {
    case "home":
      CurrentModaleAdmin = <PracticianListModal />;
      break;
    case "Mon Compte":
      CurrentModaleAdmin = <AccountAdminModal />;
      break;
    case "Formulaires":
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
      <div className="home">
        <Navbar />

        <div className="modal-container">
          <HeaderLocation />
          {CurrentModaleAdmin}
        </div>
      </div>
    )
  );
}
