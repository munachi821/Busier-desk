import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Landing/Home";
import SignUpSignin from "./Auth/SignUpSignin";
import DashboardLayout from "./Dashboard/DashboardLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authentication" element={<SignUpSignin />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
