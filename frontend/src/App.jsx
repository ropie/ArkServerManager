import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar, { SidebarItem } from "./components/Sidebar";
import { FaBell, FaSearch } from "react-icons/fa";
import { IoAccessibility } from "react-icons/io5";

import {
  LifeBuoy,
  Receipt,
  Boxes,
  Package,
  UserCircle,
  BarChart3,
  LayoutDashboard,
  Settings,
} from "lucide-react";

/*
const App = () => {
  return (
    <div className='p-6'>
      <Sidebar />
      <Navbar />
      <Outlet />
    </div>
  )
}
*/
const App = () => {
  return (
    <div className="w-full flex ">
      <Sidebar>
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          alert
        />
        <SidebarItem icon={<BarChart3 size={20} />} text="Characters" />
        <SidebarItem icon={<IoAccessibility size={20} />} text="Players" />
        <SidebarItem icon={<BarChart3 size={20} />} text="Tribes" />
        <hr className="my-3" />
        <SidebarItem icon={<Settings size={20} />} text="Settings" />
        <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
      </Sidebar>

        {/* Dashboard Layout section */}
      <div className="h-screen flex-1 bg-zinc-100 space-y-6">
        {/* Navbar section */}
        <div className="w-full h-[8ch] px-12 bg-zinc-50 shadow-md flex items-center justify-between">

          <div className="w-96 border border-zinc-300 rounded-full h-11 flex items-center justify-center">
            <input type="text" placeholder="Search..." className="flex-1 h-full rounded-full outline-none border-none bg-zinc-50 px-4" />

            <button className="px-4 h-full flex items-center justify-center text-base text-zinc-600 border-l border-zinc-300">
              <FaSearch />
            </button>
          </div>


        </div>

        {/* Dashboard contents */}
        <div className="w-full px-12">
          <h1 className="text-xl text-zinc-800 font-medium">
            This is the Dashboard page.  Server stats and other stuff will go here.  For now, I only have the player list.  Links on the side do not work yet.  But they will soon. :-)
          </h1>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default App;
