import Home from "../pages/home/home";
import Login from "../pages/login/login";
import Cadastrar from "../pages/cadastro/cadastrar";
import Perfil from "../pages/profile/profile";

import { Route, Routes as RoutesDom } from "react-router-dom";

const Routes = () => {
  return (
      <RoutesDom>
        <Route path="/" index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="cadastrar" element={<Cadastrar />} />
        <Route path="perfil" element={<Perfil/>} />
        
      </RoutesDom>
  )
}

export default Routes;