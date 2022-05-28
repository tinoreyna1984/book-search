import React from "react";
import { Route, Routes } from "react-router-dom";
import { DashboardRoutes } from "./DashboardRoutes";
import { Home } from "../pages/Home";
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <DashboardRoutes />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};
