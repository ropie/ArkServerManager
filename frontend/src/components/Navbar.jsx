import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-blue-500">
      <nav className="justify-between items-center mb-6">
        <NavLink to="/">
          <img
            alt="MAWG logo"
            className="h-15 inline"
            src="/mawg_logo.png"
          ></img>
        </NavLink>
      </nav>
      <div>TODO: Navbar, Sorting, Pagination, Login, Darkmode</div>
    </div>
  );
}
