import "./Home.css";
import "plyr-react/dist/plyr.css";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import PlayList from "./components/PlayList";
import FindSongs from "./components/FindSongs";
import SongContext from "./Context/SongContext";
import Plyr from "plyr-react";
import axios from "axios";
import Sidebar from "./components/sidebar";

function Home({ User, setUser, userPassword, setUserPassword }) {
  const headers = {
    headers: {
      "content-type": "application/json",
      authorization: `bearer ${JSON.parse(localStorage.accessToken)}`,
    },
  };
  const [category, setCategory] = useState([]);
  const [Playlist, setPlaylist] = useState([]);
  const [allPlaylist, setAllPlaylist] = useState([]);
  const [songToUser, setsongToUser] = useState([]);
  const [songFind, setsongFind] = useState([]);
  const [newsong, setNewsong] = useState("");
  const [http, setHttp] = useState("");
  const [videocall, setVideocall] = useState(null);
  const [songplaylist, setsongplaylist] = useState([]);

  useEffect(() => {
    const get_all_user_playlist = async () => {
      const res = await axios.get(
        `http://localhost:3001/playlists/userPlaylists`,
        headers
      );
      const data = await res.data;
      setAllPlaylist(data);
      setPlaylist(data.map((playlist) => playlist.PlaylistName));
      setCategory(data[0]?.PlaylistName);
      setsongToUser(data[0]?.songs);
    };
    get_all_user_playlist();
  }, []);

  useEffect(() => {
    const get_all_user_playlist = async () => {
      const res = await axios.get(
        `http://localhost:3001/playlists/userPlaylists`,
        headers
      );
      const data = await res.data;
      if (category === "All songs") {
        let All_songs = allPlaylist.map((playlist) => playlist.songs);
        All_songs = Array.prototype.concat.apply([], All_songs);
        setsongToUser(All_songs);
      } else {
        setAllPlaylist(data);
        const playlistChosen = allPlaylist.filter(
          (playlist) => playlist.PlaylistName === category
        );
        setsongToUser(playlistChosen[0]?.songs);
      }
    };
    get_all_user_playlist();
  }, [category]);

  async function add_playlist_to_mongo(playlist) {
    const playlistName = { playlistName: playlist };
    const res = await axios.post(
      "http://localhost:3001/playlists",
      playlistName,
      headers
    );
    const data = await res.data;
    const playlistnames = data.map((playlist) => playlist.PlaylistName);
    setPlaylist(playlistnames);
  }

  async function add_song_to_playlist(song) {
    const playlistName = category;
    console.log(playlistName);
    const res = await axios.put(
      `http://localhost:3001/playlists`,
      { playlistName, song },
      headers
    );

    const data = await res.data;
    setCategory(category);
    setsongToUser(data.songs);
  }

  async function Delete_a_song_from_the_list(song_id) {
    const playlistName = category;
    const res = await axios.put(
      `http://localhost:3001/playlists/delete`,

      {
        playlistName,
        song_id,
      },
      headers
    );
    const data = await res.data;
    setsongToUser(data[0]?.songs);
    setNewsong(newsong);
  }
  async function Delete_play_list() {
    const playlistName = category;
    console.log(category);
    const res = await axios.put(
      `http://localhost:3001/playlists/deleteplaylist`,

      {
        playlistName,
      },
      headers
    );
    const data = await res.data;
    console.log(data);
    const playlistnames = data.map((playlist) => playlist.PlaylistName);
    console.log(playlistnames);
    setCategory(playlistnames[0]);
    setPlaylist(playlistnames);
    setsongplaylist([]);
  }

  // const allsongs = () => {};
  // const mysongs = () => {};

  const playhttp = (id) => {
    setHttp({
      type: "video",
      sources: [
        {
          src: id,
          provider: "youtube",
        },
      ],
    });
  };

  const logout = () => {
    localStorage.accessToken = null;
    setUser(false);
  };

  const search = async (search) => {
    const res = await fetch(`http://localhost:3001/api/search/${search}`);
    const data = await res.json();
    setsongFind(data);
  };

  return (
    <div>
      <SongContext.Provider
        value={{
          allPlaylist: allPlaylist,
          setNewsong: setNewsong,
          add_song_to_playlist: add_song_to_playlist,
          playhttp: playhttp,
          setVideocall: setVideocall,
          setCategory: setCategory,
          User: User,
          category: category,
          videocall: videocall,
          Playlist: Playlist,
          songplaylist: songplaylist,
          setPlaylist: setPlaylist,
          add_playlist_to_mongo: add_playlist_to_mongo,
          setsongplaylist: setsongplaylist,
          setsongToUser: setsongToUser,
          logout: logout,
          search: search,
        }}
      >
        <Sidebar Delete_play_list={Delete_play_list} />
        <Header />

        <div className="SelectCategory"></div>
        <div className="form"></div>
        <div className="PlayList">
          <PlayList
            playhttp={playhttp}
            songToUser={songToUser}
            Delete_a_song_from_the_list={Delete_a_song_from_the_list}
          />
        </div>
        <div className="FindSongs">
          <FindSongs songFind={songFind} />
        </div>
        <div className="ReactPlayer">
          <Plyr source={http} />
        </div>
      </SongContext.Provider>
    </div>
  );
}

export default Home;
// async function add_song_to_playlist(song, playlistName) {
//   const res = await axios.put(
//     `http://localhost:3001/playlists`,
//     { playlistName, song },
//     headers
//   );
//   const data = await res.data;
//   setsongToUser(data.songs);
// }

// <div className="Login">
// {!User && (
//   <Login
//     get_all_users_from_mongo={get_all_users_from_mongo}
//     register={register}
//     login={login}
//     User={User}
//     userPassword={userPassword}
//     setUserPassword={setUserPassword}
//   />
// )}
// </div>
// <div className="Login">
// {User && <Logged logout={logout} User={User} />}
// </div>

// <div className="AddItemForm">
//   <AddItemForm
//     mysongs={mysongs}
//     allsongs={allsongs}
//     search={search}
//     setNewsong={setNewsong}
//     newsong={newsong}
//     filterPlaylist={filterPlaylist}
//     Add_a_song_to_the_list={Add_a_song_to_the_list}
//   />
// </div>
// function add_song_to_mongo(song) {
//   fetch(`http://localhost:3001/songs/newsong`, {
//     method: "POST",
//     headers: {
//       "content-type": "application/json",
//       authorization: `bearer ${JSON.parse(localStorage.accessToken)}`,
//     },
//     body: JSON.stringify(song),
//   }).then((res) =>
//     res.json().then((data) => {
//       if (data) {
//       }
//     })
//   );
// }
// const register = (userName, userPassword) => {
//   navigate("/");
// };
// const login = (userName, userPassword) => {
//   navigate("/Signin");
// };
// const Add_a_song_to_the_list = (song, category) => {
//   const fullsong = {
//     id: song.id,
//     duration: song.duration,
//     thumbnails: song.thumbnails[0].url,
//     title: song.title,
//     type: song.type,
//     url: song.url,
//     views: song.views,
//     category: category,
//   };
//   add_song_to_mongo(fullsong);
// };

// const filterPlaylist = (search) => {
//   setNewsong(search);
//   if (search) {
//     // setsongToUser(
//     //   songToUser.filter((v) =>
//     //     v.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
//     //   )
//     // );
//   } else {
//     // setsongToUser(usersSongs);
//   }
// };

// async function get_all_users_from_mongo() {
//   const res = await fetch(`http://localhost:3001/users`, {
//     method: "GET",
//   });
//   const data = await res.json();
//   setUserPassword("");
// }
// useEffect(() => {
// const get_playlist = async (category) => {
//   const res = await axios.get(
//     `http://localhost:3001//playlist/${category}`,
//     headers
//   );
//   const data = await res.data;
//   setAllPlaylist(data);
//   setPlaylist(data.map((playlist) => playlist.PlaylistName));
//   setCategory(data[0]?.PlaylistName);
//   setsongToUser(data[0]?.songs);
// };
// get_playlist(category);
//   const playlistChosen = allPlaylist.filter(
//     (playlist) => playlist.PlaylistName === category
//   );
//   setsongToUser(playlistChosen[0]?.songs);
// }, [category]);
