import React, { useContext, useState } from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import SongContext from "../Context/SongContext";
import CustomizedSelects from "./CustomizedSelects";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

function Sidebar({ playAllsongs, Delete_play_list }) {
  const onFormSubmit = async (event) => {
    event.preventDefault();
    const playlistName = event.currentTarget[0].value;
    add_playlist_to_mongo(playlistName);
  };

  const onSearchSubmit = async (event) => {
    event.preventDefault();
    const searchfor = event.currentTarget[0].value;
    search(searchfor);
  };

  const { User } = useContext(SongContext);
  const { logout } = useContext(SongContext);

  const { add_playlist_to_mongo } = useContext(SongContext);
  const { search } = useContext(SongContext);
  const [dropdown, setDropdown] = useState(false);
  return (
    <div className="sidebar">
      <div className="logo">
        <img
          className="sidebar__logo"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI3R6bkSrom9U7IqQdhZlQoR9OgqesLuQzsg&usqp=CAU"
          alt=""
        />
        <h2>Play-List</h2>
      </div>
      {!User && (
        <button>
          <Link to={`/Signin`}>
            <SidebarOption Icon={LoginIcon} option="log in" />
          </Link>
        </button>
      )}
      {!User && (
        <button>
          <Link to={`/`}>
            <SidebarOption Icon={LoginIcon} option="sign up" />
          </Link>
        </button>
      )}
      {User && (
        <button onClick={() => logout()}>
          <SidebarOption Icon={LogoutIcon} option="log out" />
        </button>
      )}
      <button>
        <Link to={"/Home"}>
          <SidebarOption Icon={HomeIcon} option="Home" />
        </Link>
      </button>
      <SidebarOption Icon={SearchIcon} option="Search" />
      <hr />
      <form onSubmit={(e) => onSearchSubmit(e)}>
        <input className="sidebar-input" placeholder="search" type="text" />
      </form>
      <button onClick={() => setDropdown(!dropdown)}>
        <br />
        <SidebarOption Icon={LibraryMusicIcon} option="Your Library" />
      </button>
      {dropdown && <CustomizedSelects />}

      <button
        onClick={() => {
          playAllsongs();
        }}
      >
        <br />
        <SidebarOption Icon={LibraryMusicIcon} option="play all" />
      </button>
      <strong className="sidebar__title">PLAY LISTS</strong>
      <hr />
      <form onSubmit={(e) => onFormSubmit(e)}>
        <input
          className="sidebar-input"
          placeholder="Add Playlist"
          type="text"
        />
      </form>
      {User && (
        <button className="button delete" onClick={() => Delete_play_list()}>
          <SidebarOption Icon={DeleteIcon} option="DELETE PLAY LIST" />
        </button>
      )}
      <hr />
      <button>
        <Link to={`/Employe`}>
          <SidebarOption Icon={LoginIcon} option="Employe" />
        </Link>
      </button>
    </div>
  );
}

export default Sidebar;
