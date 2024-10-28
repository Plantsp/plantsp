import Home from "../pages/home/home";
import Login from "../pages/login/login";
import Cadastrar from "../pages/cadastro/cadastrar";
import Perfil from "../pages/profile/profile";
import Sobre from "../pages/sobrenos/sobrenos";
import Favoritos from "../pages/favorites/pagefavorites";
import Teste from "../pages/teste/teste";

import { Route, Routes as RoutesDom } from "react-router-dom";

const Routes = () => {
  return (
      <RoutesDom>
        <Route path="/" index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
        <Route path="/perfil" element={<Perfil/>} />
        <Route path="/sobrenos" element={<Sobre/>} />
        <Route path="/favoritos" element={<Favoritos/>} />
        <Route path="/produto/:id" element={<Teste/>} />

      </RoutesDom>
  )
}

export default Routes;