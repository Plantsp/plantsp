import Home from "../pages/home/home";
import Login from "../pages/login/login";

import { Route, Routes as RoutesDom, useNavigate } from "react-router-dom";

const Routes = () => {
  let nav = useNavigate();

  return (
      <RoutesDom>
        <Route path="/" index element={<Home />} />
        <Route path="login" element={<Login />} />
      </RoutesDom>
  )
}

export default Routes;