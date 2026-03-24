import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Landing/Home";
import SignUpSignin from "./Auth/SignUpSignin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authentication" element={<SignUpSignin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
