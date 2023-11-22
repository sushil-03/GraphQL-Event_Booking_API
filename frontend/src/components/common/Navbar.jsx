import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="flex p-10 items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold">BookUp</h1>
      </div>
      <div>
        <ul className="flex gap-4">
          <li>
            <NavLink to="/auth">Authenticate</NavLink>
          </li>
          <li>
            <NavLink to="/events">Events</NavLink>
          </li>
          <li>
            <NavLink to="/booking">Bookings</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
