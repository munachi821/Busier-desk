import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Landing/Home";
import PublicRoute from "./components/auth/PublicRoute";
import SignUpSignin from "./components/auth/SignUpSignin";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DashboardLayout from "./components/dashboard/DashboardLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Fully public */}
        <Route path="/" element={<Home />} />

        {/* Auth — redirect to /dashboard if already logged in */}
        <Route
          path="/authentication"
          element={
            <PublicRoute>
              <SignUpSignin />
            </PublicRoute>
          }
        />

        {/* Protected — redirect to /authentication if not logged in */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;