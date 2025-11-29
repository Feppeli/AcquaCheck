
import { Route, BrowserRouter, Routes as RouterRoutes } from "react-router-dom"; 

import FormSelector from './pages/FormSelector/FormSelector'
import FormCheckup from "./pages/FormCheckup/FormCheckup";
import LoginScreen from "./pages/LoginScreen/LoginScreen";
import CadScreen from "./pages/CadScreen/CadScreen";
import Dashboard from "./pages/Dashboard/Dashboard";
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