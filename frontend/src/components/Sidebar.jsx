import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();
export default function Sidebar({ children }) {
  const [expanded, setexpanded] = useState(true);

  return (
    <aside className="h-screen">
      <nav className="h-full inline-flex flex-col bg-zinc-900 border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="/mawg_logo.png"
            className={`w-15 object-center cursor-pointer`}
            alt="MAWG Logo"
          />
            <h1 className={`text-zinc-50 origin-left font-semibold overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}>
            Admin Dashboard</h1>
          <button
            onClick={() => setexpanded((curr) => !curr)}
            className="p-1 rounded-lg bg-zinc-50 hover:bg-grey-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?name=ropie+masta&background=0D8ABC&color=fff&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold text-zinc-50">ropiemasta</h4>
              <span className="text-xs text-zinc-50">ropie@ropie.dev</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext);
  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-zinc-200 to-zinc-100 text-zinc-800"
            : "hover:bg-zinc-200 text-gray-600"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-zinc-400 ${expanded ? "" : "top-2"}`}
          
        />
      )}

{!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-zinc-200 text-zinc-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
