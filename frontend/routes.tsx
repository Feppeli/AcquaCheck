import React from "react";
import { Route, BrowserRouter, Routes as RouterRoutes } from "react-router-dom"; 

import FormSelector from './src/components/FormSelector/FormSelector'
import FormCheckup from './src/components/FormCheckup/FormCheckup' // Exemplo de componente para /form


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