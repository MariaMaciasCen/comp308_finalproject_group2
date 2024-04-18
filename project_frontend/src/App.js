import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Topbar from "./UI/Topbar";
import Footer from "./UI/Footer";
import Register from "./Components/Register";
import Appointments from "./Components/Appointments";
import GameVideo from "./Components/GameVideo";

function App() {
  return (
    <BrowserRouter>
      <Topbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="gamevideo" element={<GameVideo />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
