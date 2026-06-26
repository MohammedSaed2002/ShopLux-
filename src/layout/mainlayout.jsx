import React from "react"
import Navbar from "../components/navbar/navbar"
import Footer from "../components/footer/footer"
import { Outlet } from "react-router-dom"
export default function MainLayout() {
  return (
    <>
    <Navbar />
    <Outlet />
    <Footer />
    </>
  )

}