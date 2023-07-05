import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PracticianListModal from "../components/PracticianListModal";
import FormListModal from "../components/FormListModal";
import "../styles/EspaceAdmin.scss";
import StateContext from "../contexts/StateContext";
import AuthFunctionContext from "../contexts/AuthFunctionContext";
import HeaderLocation from "../components/HeaderLocation";

export default function EspaceAdmin() {
  const navigate = useNavigate();
  const { linkToActive } = useContext(StateContext);
  const { userInfo, userToken } = useContext(AuthFunctionContext);
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
      break;
    case "Formulaires":
      CurrentModaleAdmin = <FormListModal />;
      break;
    case "Stats":
      break;
    case "A propos":
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
