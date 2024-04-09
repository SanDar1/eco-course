import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Header from "../HeaderComponent/Header";
import {adminRoutes, authRoutes, governmentRoutes, userRoutes} from "./routes";
import {LOGIN_ROUTE, MAIN_ROUTE} from "../../utils/consts";
import Navbar from "../NavbarComponent/Navbar";

const AppRoutes = () => {
  let userData = false
  let isAuth = false

  if (localStorage.getItem('userData')) {
    userData = JSON.parse(localStorage.getItem('userData'))
    isAuth = JSON.parse(localStorage.getItem('refreshToken'))
  }

  return (
    <>
      {!isAuth && <Header />}
      {isAuth && <Navbar />}
        <Routes>
          {
            !isAuth && authRoutes.map(authRoute =>
              <Route key={ authRoute.path } path={ authRoute.path } exact element={ < authRoute.Component /> } />
            )
          }
          {
            isAuth && userData.role === 'ADMIN' && adminRoutes.map(adminRoute =>
              <Route key={ adminRoute.path } path={ adminRoute.path } exact element={ < adminRoute.Component /> } />
            )
          }
          {
            isAuth && userData.role === 'GOVERNMENT' && governmentRoutes.map(governmentRoute =>
              <Route key={ governmentRoute.path } path={ governmentRoute.path } exact element={ < governmentRoute.Component /> } />
            )
          }
          {
            isAuth && userData.role === 'USER' && userRoutes.map(userRoute =>
              <Route key={ userRoute.path } path={ userRoute.path } exact element={ < userRoute.Component /> } />
            )
          }
          {!isAuth && <Route path="*" element={ <Navigate to={LOGIN_ROUTE} /> } />}
          {isAuth && <Route path="*" element={ <Navigate to={MAIN_ROUTE} /> } />}
        </Routes>
    </>
  );
};

export default AppRoutes;