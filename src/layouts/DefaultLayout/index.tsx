import {Header} from "../../components/Header";
import {Outlet} from "react-router-dom";

export function Index() {
    return (
        <div>
            <Header/>
            <Outlet/>
        </div>
    )
}