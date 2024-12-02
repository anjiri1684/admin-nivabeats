import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddBeatPage from "./pages/AddBeatPage";
import CustomersPage from "./pages/CustomersPage";
import RegisterAdmin from "./pages/RegisterAdmin";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("authToken");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/add-beat"
          element={isAuthenticated ? <AddBeatPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/customers"
          element={
            isAuthenticated ? <CustomersPage /> : <Navigate to="/login" />
          }
        />
        <Route path="/register-admin" element={<RegisterAdmin />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
