import React, { useContext, useState } from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import SongContext from "../Context/SongContext";
import { Link } from "react-router-dom";
import CustomizedSelects from "./CustomizedSelects";
import SelectCategory from "./SelectCategory";

function Sidebar({ setNewsong }) {
  const onFormSubmit = async (event) => {
    event.preventDefault();
    const playlistName = event.currentTarget[0].value;
    add_playlist_to_mongo(playlistName);
    // const res = await api.post("playlists/new", { name: playlistName });
    // setPlaylists((playlists) => [...playlists, res.body]);
  };

  const onSearchSubmit = async (event) => {
    setNewsong(true);
    event.preventDefault();
    const searchfor = event.currentTarget[0].value;
    search(searchfor);
    // const res = await api.post("playlists/new", { name: playlistName });
    // setPlaylists((playlists) => [...playlists, res.body]);
  };

  const { User } = useContext(SongContext);
  const { logout } = useContext(SongContext);
  const { add_playlist_to_mongo } = useContext(SongContext);
  const { search } = useContext(SongContext);
  const [dropdown, setDropdown] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);
  return (
    <div className="sidebar">
      <div className="logo">
        <img
          className="sidebar__logo"
          src="https://i.pinimg.com/originals/f0/5c/bc/f05cbc8c0f8b075d2b4f1f68fee49649.jpg"
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
      <SidebarOption Icon={HomeIcon} option="Home" />
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
      <br />
      <strong className="sidebar__title">PLAY LISTS</strong>
      <hr />
      <form onSubmit={(e) => onFormSubmit(e)}>
        <input
          className="sidebar-input"
          placeholder="Add Playlist"
          type="text"
        />
      </form>

      <br />
      <strong className="sidebar__title">ADD SONG</strong>
      <br />
      <button onClick={() => setDropdown2(!dropdown2)}>
        <SidebarOption Icon={LibraryMusicIcon} option="ADD SONG" />
      </button>
      <hr />
      {dropdown2 && <SelectCategory />}
    </div>
  );
}

export default Sidebar;
// {playlists?.map((playlist) => {
//     console.log(playlist);
//     return (
//       <div className="sidebar__songs" key={playlist._id}>
//         <SidebarOption option={playlist.name} />
//         <RemoveIcon
//           onClick={() => deletePlaylist(playlist._id)}
//           className="add-btn"
//         />
//       </div>
//     );
//   })}
