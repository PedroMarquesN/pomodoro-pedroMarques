import {Index} from "../../components/header";
import {Outlet} from "react-router-dom";
import {LayoutContainer} from "./styles";

export function Index() {
    return (
        <LayoutContainer>
            <Index/>
            <Outlet/>
        </LayoutContainer>
    )
}