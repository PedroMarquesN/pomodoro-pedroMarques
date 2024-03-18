import {Header} from "../../components/header/index";
import {Outlet} from "react-router-dom";
import {LayoutContainer} from "./styles";

export function Index() {
    return (
        <LayoutContainer>
            <Header/>
            <Outlet/>
        </LayoutContainer>
    )
}