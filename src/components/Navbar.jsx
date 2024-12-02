import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <nav className="bg-purple-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">Admin Dashboard</h1>
        <div className="space-x-4">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/add-beat">Add Beat</Link>
          <Link to="/customers">Customers</Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
