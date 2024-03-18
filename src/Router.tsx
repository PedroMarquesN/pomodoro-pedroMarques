import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {History} from "./pages/History";
import {Index} from "./layouts/DefaultLayout";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Index/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/history" element={<History />}/>
            </Route>
        </Routes>
    )
}