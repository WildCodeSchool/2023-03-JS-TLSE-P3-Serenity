import Navbar from "../components/Navbar";
import PracticianListModal from "../components/PracticianListModal";
import "../styles/Home.scss";

export default function Home() {
  return (
    <div className="home">
      <Navbar />
      <PracticianListModal />
    </div>
  );
}
