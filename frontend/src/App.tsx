
import { Route, BrowserRouter, Routes as RouterRoutes } from "react-router-dom"; 

import FormSelector from './components/FormSelector/FormSelector'
import FormCheckup from "./components/FormCheckup/FormCheckup";
import LoginScreen from "./components/LoginScreen/LoginScreen";
import CadScreen from "./components/CadScreen/CadScreen";
import Dashboard from "./components/Dashboard/Dashboard";


const AppRoutes = () => {
    return(
        <BrowserRouter>
            <RouterRoutes> 
                <Route element={ <LoginScreen /> } path="/" /> 
                <Route element={ <CadScreen /> } path="/cadUser" /> 
                <Route element={ <FormSelector /> } path="/formLocal" /> 
                <Route element={ <FormCheckup /> } path="/formCheckup" /> 
                <Route element={ <Dashboard /> } path="/Dashboard-admin" /> 
            </RouterRoutes>
        </BrowserRouter>
    )
}

export default AppRoutes;