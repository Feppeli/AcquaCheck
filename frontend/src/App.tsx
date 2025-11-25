
import { Route, BrowserRouter, Routes as RouterRoutes } from "react-router-dom"; 

import FormSelector from './components/FormSelector/FormSelector'
import FormCheckup from "./components/FormCheckup/FormCheckup";
import LoginScreen from "./components/LoginScreen/LoginScreen";
import CadScreen from "./components/CadScreen/CadScreen";
import Dashboard from "./components/Dashboard/Dashboard";
import { AuthProvider } from "./api/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"

const AppRoutes = () => {
    return(
        <AuthProvider>
            <BrowserRouter>
                <RouterRoutes> 
                    <Route element={ <LoginScreen /> } path="/" /> 

                    <Route element={<ProtectedRoute/>}>
                        <Route element={ <FormSelector /> } path="/formLocal" /> 
                        <Route element={ <FormCheckup /> } path="/formCheckup" /> 
                        <Route element={ <Dashboard /> } path="/Dashboard-admin" /> 
                    </Route>

                    <Route element={ <CadScreen /> } path="/cadUser" /> 
                </RouterRoutes>
            </BrowserRouter>
        </AuthProvider>

    )
};

export default AppRoutes;