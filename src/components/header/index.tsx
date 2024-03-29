import {HeaderContainer} from "./styles";
import logoIgnite from '../../assets/Ignitesimbol.png'
import {Scroll, Timer} from "phosphor-react";
import {NavLink} from "react-router-dom";
export function Header() {
    return(
        <HeaderContainer>
            <img src={logoIgnite} alt="logo simbol"/>
            <nav>
                <NavLink to="/" title="timer">
                    <Timer size={24}/>
                </NavLink>

                <NavLink to="/history" title="Histórico">
                    <Scroll size={24}/>
                </NavLink>
            </nav>
        </HeaderContainer>
    )
}