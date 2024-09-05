import Home from "../pages/home/home";
import Login from "../pages/login/login";

import { Route, Routes as RoutesDom } from "react-router-dom";

const Routes = () => {
  return (
      <RoutesDom>
        <Route path="/" index element={<Home />} />
        <Route path="login" element={<Login />} />
      </RoutesDom>
  )
}

export default Routes;