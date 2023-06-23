import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PracticianListModal from "../components/PracticianListModal";
import "../styles/EspaceAdmin.scss";
import AuthFunctionContext from "../contexts/AuthFunctionContext";

export default function EspaceAdmin() {
  const navigate = useNavigate();
  const { userInfo } = useContext(AuthFunctionContext);
  useEffect(() => {
    switch (userInfo.role) {
      case "admin":
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
  return (
    userInfo.role === "admin" && (
      <div className="home">
        <Navbar />
        <PracticianListModal />
      </div>
    )
  );
}
