import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import "./Sidebaremployes.css";
export default function Sidebaaremployes({
  get_employe_by_id,
  shiptstime,
  shiptsmoney,
  get_shifts_by_id,
  delete_,
  handleChange,
  full_detailes,
}) {
  return (
    <div className="sidebar">
      <div className="logo">
        <h2>Employ-app</h2>
      </div>
      <button>
        <Link to={"/Home"}>
          <SidebarOption Icon={HomeIcon} option="Home" />
        </Link>
      </button>
      <SidebarOption Icon={SearchIcon} option="Search" />
      <button onClick={() => get_employe_by_id("enter")}>
        <SidebarOption option="enter" />
      </button>
      <button onClick={() => get_employe_by_id("exit")}>
        <SidebarOption option="exit" />
      </button>
      <button onClick={() => shiptstime()}>
        <SidebarOption option="time of work by id" />
      </button>
      <button onClick={() => shiptsmoney()}>
        <SidebarOption option="salary by id" />
      </button>
      <button onClick={() => get_shifts_by_id()}>
        <SidebarOption option="get shifts by id" />
      </button>
      <button onClick={() => delete_()}>
        <SidebarOption option="Delete" />
      </button>
      <form>
        <br />
        <strong className="sidebar__title">FIRST NAME</strong>
        <hr />
        <input
          className="sidebar-input"
          placeholder="First Name"
          type="text"
          name="firstName"
          value={full_detailes.firstName}
          onChange={handleChange}
        />
        <br />
        <strong className="sidebar__title">LAST NAME</strong>
        <hr />
        <input
          className="sidebar-input"
          placeholder="Last Name"
          type="text"
          name="lastName"
          value={full_detailes.lastName}
          onChange={handleChange}
        />
        <br />
        <strong className="sidebar__title">ID</strong>
        <hr />
        <input
          className="sidebar-input"
          placeholder="id"
          type="text"
          name="id"
          value={full_detailes.id}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}
