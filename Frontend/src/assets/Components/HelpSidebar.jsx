import { Link } from 'react-router-dom';
import { FaPlusCircle, FaList, FaEnvelope, FaInfoCircle, FaUserShield } from 'react-icons/fa';

const HelpSidebar = () => {
  return (
    <div className="w-80 h-screen bg-white/90 backdrop-blur-sm p-8 flex flex-col space-y-6 
                    border-r border-purple-100 shadow-2xl relative overflow-hidden
                    animate-slide-in-left">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 via-purple-50/50 to-pink-50/50"></div>
      
      <h2 className="text-3xl font-bold mb-8 tracking-wide select-none relative
                     bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Help Menu
      </h2>
      
      {[ 
        {to: "/seek-help/new-request", icon: <FaPlusCircle />, label: "New Request", gradient: "from-indigo-500 to-purple-500"},
        {to: "/seek-help/my-requests", icon: <FaList />, label: "My Requests", gradient: "from-purple-500 to-pink-500"},
        {to: "/seek-help/messages", icon: <FaEnvelope />, label: "Messages", gradient: "from-pink-500 to-rose-500"},
        {to: "/seek-help/guidelines", icon: <FaInfoCircle />, label: "Guidelines", gradient: "from-rose-500 to-indigo-500"},
        {to: "/seek-help/contact", icon: <FaUserShield />, label: "Contact Admin", gradient: "from-indigo-500 to-purple-500"},
      ].map(({to, icon, label, gradient}) => (
        <Link
          key={to}
          to={to}
          className="
            relative flex items-center gap-4 text-gray-700 text-lg font-semibold
            rounded-xl px-6 py-4 group
            hover:text-purple-700
            transition-all duration-300 ease-in-out
            hover:shadow-xl
            cursor-pointer
            overflow-hidden
            bg-white/50 backdrop-blur-sm
            border border-purple-100/50
          "
          >
          <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          <div className={`h-10 w-10 rounded-lg bg-gradient-to-r ${gradient} flex items-center justify-center text-white transform group-hover:scale-110 transition-transform duration-300`}>
            <span className="text-xl">{icon}</span>
          </div>
          <span className="relative">{label}</span>
          <svg className="w-5 h-5 ml-auto text-purple-500 transform opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" 
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      ))}
    </div>
  );
};export default HelpSidebar;
