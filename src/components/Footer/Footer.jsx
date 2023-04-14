import { NavLink } from "react-router-dom"
import style from "./footer.module.css"

const Footer = () => {
    return (
        <footer>
            <div className={style.footer_wrapper}>
                <NavLink className="logo_footer" to={"/"}>
                WeAreBuilding
                </NavLink>
                <nav>
                    <NavLink className={style.navlink} to={"#"}>каталог</NavLink>
                </nav>
            </div>
        </footer>
    )
}

export default Footer