import Footer from "../footer/Footer";
import Header from "../header/Header";
import "./home.scss";
import { Outlet } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="home_page">
      <Header />
      <Outlet />
      <Footer/>
    </div>
  );
};

export default Home;
