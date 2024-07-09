import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar";
import SimpleLayout from "./layouts/simpleLayout";
import HomePage from "./components/dashboard";
import LoginPage from "./pages/signin";
import Signup from "./pages/signup";
import NotFound from "./pages/404";
import ProtectedRoutes from "./utils/protectedRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route element={<Sidebar />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Route>

        {/* <Route element={<SimpleLayout />}> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        {/* </Route> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const mapRoutes = (routes) =>
  routes.map((route, key) => (
    <Route
      key={key}
      path={route.route}
      element={
        route.sidebar ? (
          <Sidebar>
            <route.component />
          </Sidebar>
        ) : (
          <SimpleLayout>
            <route.component />
          </SimpleLayout>
        )
      }
    />
  ));

export default App;
