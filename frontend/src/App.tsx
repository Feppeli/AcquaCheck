
import { Route, BrowserRouter, Routes as RouterRoutes } from "react-router-dom"; 

import FormSelector from './components/FormSelector/FormSelector'
import FormCheckup from "./components/FormCheckup/FormCheckup";


const AppRoutes = () => {
    return(
        <BrowserRouter>
            <RouterRoutes> 
                <Route element={ <FormSelector /> } path="/" /> 
                <Route element={ <FormCheckup /> } path="/form" /> 
            </RouterRoutes>
        </BrowserRouter>
    )
}

export default AppRoutes;