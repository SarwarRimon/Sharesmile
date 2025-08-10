import { Link, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaClipboardList, FaUserPlus, FaUsers, FaMoneyBillWave } from "react-icons/fa";
import { themeColors, combineClasses } from './theme';

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { to: "/admin/dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
    { to: "/admin/requests", icon: <FaClipboardList />, label: "Requests" },
    { to: "/admin/donations", icon: <FaMoneyBillWave />, label: "Donation Requests" },
    { to: "/admin/campaigns", icon: <FaClipboardList />, label: "Manage Campaigns" },
    { to: "/admin/add-admin", icon: <FaUserPlus />, label: "Add Admin" },
    { to: "/admin/users", icon: <FaUsers />, label: "Users" },
  ];

  return (
    <div className={combineClasses(
      "min-h-screen w-64 flex flex-col",
      themeColors.bgGradient.dark,
      "text-white border-r border-slate-700",
      themeColors.shadow
    )}>
      {/* Logo */}
      <div className={combineClasses(
        "p-6 text-2xl font-bold tracking-wide text-center",
        "border-b border-slate-700/50",
        "bg-gradient-to-b from-slate-800 to-slate-900"
      )}>
        <span className={combineClasses(
          themeColors.animation.pulse,
          "bg-gradient-to-r from-sky-400 to-teal-400 bg-clip-text text-transparent"
        )}>Admin Panel</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map(({ to, icon, label }) => (
          <Link
            key={to}
            to={to}
            className={combineClasses(
              "flex items-center gap-4 px-4 py-3 rounded-lg font-medium",
              themeColors.interactive.base,
              location.pathname === to
                ? combineClasses(
                    "bg-sky-500/10 text-sky-400 border border-sky-500/20",
                    "shadow-lg shadow-sky-500/10"
                  )
                : "hover:bg-slate-800/80 text-slate-300 hover:text-white"
            )}
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
