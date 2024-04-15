import "./App.css";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { AllTheEpisodes } from "./components/AllEpisodes";

function App() {
  return (
    <div className="container" style={{height: "100vh"}}>
      <h1><Link to={"/"}>The Mandalorian</Link></h1>
      <Routes>
        <Route path="/" element={<AllTheEpisodes />}></Route>
        <Route path="about" element={<div>about</div>} />
        <Route path="dashboard" element={<div>dashboard</div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
