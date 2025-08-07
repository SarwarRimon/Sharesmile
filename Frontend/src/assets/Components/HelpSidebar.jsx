import { Link } from 'react-router-dom';
import { FaPlusCircle, FaList, FaEnvelope, FaInfoCircle, FaUserShield } from 'react-icons/fa';

const HelpSidebar = () => {
  return (
    <div className="w-80 h-screen bg-white shadow-xl rounded-r-3xl p-8 flex flex-col space-y-8 border-r border-gray-200
                    transition-transform duration-300 ease-in-out hover:scale-[1.02]">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-8 tracking-wide select-none">
        Help Menu
      </h2>
      
      {[ 
        {to: "/seek-help/new-request", icon: <FaPlusCircle />, label: "New Request"},
        {to: "/seek-help/requests", icon: <FaList />, label: "My Requests"},
        {to: "/seek-help/messages", icon: <FaEnvelope />, label: "Messages"},
        {to: "/seek-help/guidelines", icon: <FaInfoCircle />, label: "Guidelines"},
        {to: "/seek-help/contact", icon: <FaUserShield />, label: "Contact Admin"},
      ].map(({to, icon, label}) => (
        <Link
          key={to}
          to={to}
          className="
            flex items-center gap-4 text-gray-700 text-xl font-semibold
            rounded-lg px-6 py-4
            hover:bg-blue-100 hover:text-blue-700
            transition-colors duration-300 ease-in-out
            shadow-sm hover:shadow-md
            cursor-pointer
          "
        >
          <span className="text-blue-600 text-2xl">{icon}</span>
          <span>{label}</span>
        </Link>
      ))}
    </div>
  );
};

export default HelpSidebar;
