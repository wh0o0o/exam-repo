import { NavLink } from "react-router-dom";
import Ikon from "../../assets/img/basket.svg";
import "./Header.module.css";

const Header = ({ setActive }) => {
  return (
    <header>
      <NavLink className="logo" to={"/"}>
        WeAreBuilding
      </NavLink>
      <div className="nav_wrapper">
        <nav>
          <NavLink className="navlink" to={"#catalog"}>
            каталог
          </NavLink>
        </nav>
        <div className="ikon" onClick={() => setActive(true)}>
          <img src={Ikon} alt="" />
        </div>
      </div>
    </header>
  );
};

export default Header;
