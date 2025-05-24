import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="justify-between items-center mb-6">
        <NavLink to="/">
          <img
            alt="MAWG logo"
            className="h-15 inline"
            src="https://cdn.tip4serv.com/shop/ALL_STORES/10952/templates/murga/assets/images/c6e449ed295ff6c9c67ba2fc036f75ad.png"
          ></img>
        </NavLink>
      </nav>
      <div>TODO: Navbar, Sorting, Pagination, Login, Darkmode</div>
    </div>
  );
}
