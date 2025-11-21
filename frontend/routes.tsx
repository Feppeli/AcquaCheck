import React from "react";
import { Route, BrowserRouter, Routes as RouterRoutes } from "react-router-dom"; 

import FormSelector from './src/components/FormSelector/FormSelector'
import FormCheckup from './src/components/FormCheckup/FormCheckup' 
import LoginScreen from './src/components/LoginScreen/LoginScreen'
import CadScreen from './src/components/CadScreen/CadScreen'

const AppRoutes = () => {
    return(
        <BrowserRouter>
            <RouterRoutes> 
                <Route element={ <LoginScreen /> } path="/" /> 
                <Route element={ <CadScreen /> } path="/cadUser" /> 
                <Route element={ <FormSelector /> } path="/formLocal" /> 
                <Route element={ <FormCheckup /> } path="/formCheckup" /> 
                
            </RouterRoutes>
        </BrowserRouter>
    )
}

export default AppRoutes;