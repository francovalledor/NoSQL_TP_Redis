import "./App.css";
import { Link, Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <h1>The Mandalorian</h1>
      <Layout />
      <Routes>
        <Route path="/" element={<div>main</div>}></Route>
        <Route path="about" element={<div>about</div>} />
        <Route path="dashboard" element={<div>dashboard</div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;

const Layout: React.FC = () => {
  return (
    <ul>
      <li>
        <Link to={"/"}>HOME</Link>
      </li>
      <li>
        <Link to={"about"}>ABOUT</Link>
      </li>
      <li>
        <Link to={"dashboard"}>DASHBOARD</Link>
      </li>
    </ul>
  );
};
