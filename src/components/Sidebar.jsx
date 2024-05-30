import { MdOutlineDoubleArrow } from "react-icons/md";
import { FiMoreVertical } from "react-icons/fi";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { createContext, useContext } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const sidebarContext = createContext();

export const SidebarItem = ({ icon, text, active, route }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const expanded = useContext(sidebarContext);
  return (
    <li
      className={`mt-4 relative flex items-center py-2 my-1 px-2 font-forum rounded-md cursor-pointer transition-colors ${
        active && "bg-green-500 text-slate-50"
      } group ${
        location.pathname === route
          ? "bg-green-500 text-slate-50"
          : "hover:bg-gray-800 text-slate-100"
      } `}
      onClick={() => navigate(route)}>
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "ml-2 w-52" : "w-0"
        }`}>
        {text}
      </span>
      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-green-500 text-gray-800 text-sm invisible opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 whitespace-nowrap`}>
          {text}
        </div>
      )}
    </li>
  );
};

const Sidebar = ({ children, show }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      className={`h-screen z-10 fixed top-0 left-0 overflow-hidden transition-all ${
        expanded ? "w-52" : "w-20"
      } ${show ? "" : "hidden"} md:block`}>
      <nav className="h-full flex flex-col bg-gray-900 text-slate-200 border-r shadow-sm">
        <div className="p-3 pb-2 flex justify-between items-center">
          <img
            src="/zeraki.png"
            alt="zeraki logo"
            className={`overflow-hidden transition-all ${
              expanded ? "w-52" : "w-0"
            }`}
          />
          <button
            className="p-1.5 rounded-lg"
            onClick={() => setExpanded(!expanded)}>
            {expanded ? (
              <FaAngleDoubleLeft size="30" />
            ) : (
              <MdOutlineDoubleArrow size="30" />
            )}
          </button>
        </div>

        <sidebarContext.Provider value={expanded}>
          <ul className="flex-1 px-3">{children}</ul>
        </sidebarContext.Provider>

        <div className="border-t flex p-3 hover:cursor-pointer">
          <div className="bg-green-500 w-10 h-10 rounded-md flex justify-center items-center">
            <p className="font-bold text-slate-50">JD</p>
          </div>
          <div
            className={`flex items-center overflow-hidden transition-all ${
              expanded ? "w-34 ml-2" : "w-0 ml-0"
            }`}>
            <div className="leading-4 mr-2">
              <h4 className="font-forum">John Doe</h4>
              <span className="text-xs text-slate-50">johndoe@gmail.com</span>
            </div>
            <div>
              <FiMoreVertical size="20" />
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
