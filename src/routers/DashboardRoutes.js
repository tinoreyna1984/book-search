import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Search } from "../pages/Search";
import { Profile } from "../pages/Profile";

export const DashboardRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  )
}
