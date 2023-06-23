import Navbar from "../components/Navbar";
import HeaderLocation from "../components/HeaderLocation";
import PracticianListModal from "../components/PracticianListModal";
import "../styles/Home.scss";

export default function Home() {
  return (
    <div className="home">
      <Navbar />
      <HeaderLocation />
      <PracticianListModal />
    </div>
  );
}
