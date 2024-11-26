import Home from "../pages/home/home";
import Login from "../pages/login/login";
import Cadastrar from "../pages/cadastro/cadastrar";
import Perfil from "../pages/profile/profile";
import Sobre from "../pages/sobrenos/sobrenos";
import Produto from "../pages/produto/produto";
import Favoritos from "../pages/favorites/pagefavorites";
import Faq from "../pages/faq/faq";
import Promocao from "../pages/promocao/promocao";
import Carrinho from "../pages/carrinho/carrinho";
import FinalizarCompra from "../pages/compra/FinalizaCompra";

import { Route, Routes as RoutesDom } from "react-router-dom";

const Routes = () => {
  return (
      <RoutesDom>
        <Route path="/" index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="cadastrar" element={<Cadastrar />} />
        <Route path="perfil" element={<Perfil/>} />
        <Route path="sobrenos" element={<Sobre/>} />
        <Route path="favoritos" element={<Favoritos/>} />
        <Route path="faq" element={<Faq/>} />  
        <Route path="promocoes" element={<Promocao/>} />  
        <Route path="carrinho" element={<Carrinho/>} /> 
        <Route path="finalizarcompra" element={<FinalizarCompra/>} />  
        <Route path="produto/:id" element={<Produto/>} />
      </RoutesDom>
  )
}

export default Routes;