import { Link, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaClipboardList, FaUserPlus, FaUsers, FaMoneyBillWave } from "react-icons/fa";

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { to: "/admin/dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
    { to: "/admin/requests", icon: <FaClipboardList />, label: "Requests" },
    { to: "/admin/donations", icon: <FaMoneyBillWave />, label: "Donation Requests" },
    { to: "/admin/add-admin", icon: <FaUserPlus />, label: "Add Admin" },
    { to: "/admin/users", icon: <FaUsers />, label: "Users" },
  ];

  return (
    <div className="min-h-screen w-64 bg-[rgb(33,49,89)] text-white flex flex-col shadow-lg">
      {/* Logo */}
      <div className="p-6 text-2xl font-bold tracking-wide text-center border-b border-gray-700">
        Admin Panel
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map(({ to, icon, label }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-4 px-4 py-3 rounded-lg font-medium transition-all duration-200
              ${
                location.pathname === to
                  ? "bg-[rgb(100,150,255)] text-white shadow-md"
                  : "hover:bg-[rgb(50,75,130)]"
              }`}
          >
            <span className="text-lg">{icon}</span>
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;
