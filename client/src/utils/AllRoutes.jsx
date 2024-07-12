import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import AddProject from "../pages/AddProject";
import Projects from "../pages/Projects";
import PrivateRoute from "./PrivateRoute";

// Managing all available routes
export default function AllRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/addProject" element={<PrivateRoute><AddProject /></PrivateRoute>}></Route>
        <Route path="/projects" element={<PrivateRoute><Projects /></PrivateRoute>}></Route>
      </Routes>
    </>
  );
}
