import AddItemForm from "./components/AddItemForm";
import Header from "./components/Header";
import PlayList from "./components/PlayList";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import Search from "./components/Search";
import FindSongs from "./components/FindSongs";
import SongContext from "./Context/SongContext";
import Login from "./components/Login";
import Plyr from "plyr-react";
import "plyr-react/dist/plyr.css";

function App() {
  const [songlist, setSonglist] = useState([]);

  useEffect(() => {
    async function get_all_songs_from_mongo() {
      const res = await fetch(`http://localhost:3001/songs`, {
        method: "GET",
      });
      const data = await res.json();
      setSonglist(data);
      setsongToUser(data);
    }
    get_all_songs_from_mongo();
  }, []);

  const [songToUser, setsongToUser] = useState(songlist);
  const [newsong, setNewsong] = useState("");
  const [songFind, setsongFind] = useState([]);
  const [userName, setUserName] = useState([]);
  const [userPassword, setUserPassword] = useState([]);
  const [http, setHttp] = useState("");

  const Add_a_song_to_the_list = (song) => {
    if (!songlist.some((songs) => songs.id === song.id)) {
      setSonglist([
        ...songlist,
        {
          id: song.id,
          duration: song.duration,
          thumbnails: song.thumbnails[0].url,
          title: song.title,
          type: song.type,
          url: song.url,
          views: song.views,
        },
      ]);
      setsongToUser([
        ...songlist,
        {
          id: song.id,
          duration: song.duration,
          thumbnails: song.thumbnails[0].url,
          title: song.title,
          type: song.type,
          url: song.url,
          views: song.views,
        },
      ]);
      add_song_to_mongo({
        id: song.id,
        duration: song.duration,
        thumbnails: song.thumbnails[0].url,
        title: song.title,
        type: song.type,
        url: song.url,
        views: song.views,
      });
    }
  };

  function add_song_to_mongo(song) {
    fetch(`http://localhost:3001/songs`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(song),
    });
  }
  const Delete_a_task_from_the_list = (id) => {
    setSonglist(songlist.filter((song) => song.id !== id));
    setsongToUser(songToUser.filter((song) => song.id !== id));
    Delete_a_task_from_mongo(id);
  };
  const allsongs = () => {
    setsongToUser(songlist);
  };
  function Delete_a_task_from_mongo(id) {
    fetch(`http://localhost:3001/songs`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify([id]),
    });
  }
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

  const login = (userName, userPassword) => {
    console.log(userName, userPassword);
    fetch(`http://localhost:3001/users/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify([userName, userPassword]),
    });
  };

  const search = (search) => {
    fetch(
      `https://youtube-search-results.p.rapidapi.com/youtube-search/?q=${search}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "youtube-search-results.p.rapidapi.com",
          "x-rapidapi-key":
            "5bb3270ad4msh407663cadc687d3p1667bajsncbdb78175cfb",
        },
      }
    ).then((response) =>
      response.json().then((data) => setsongFind(data.items))
    );
    setNewsong("");
  };

  const filterPlaylist = (search) => {
    setNewsong(search);
    console.log(search);
    if (search) {
      setsongToUser(
        songlist.filter((v) =>
          v.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      );
    } else {
      setsongToUser(songlist);
    }
  };
  return (
    <div className="App">
      <Header />
      <SongContext.Provider
        value={{
          Add_a_song_to_the_list: Add_a_song_to_the_list,
          playhttp: playhttp,
        }}
      >
        <div className="form">
          <div className="AddItemForm">
            <AddItemForm
              allsongs={allsongs}
              search={search}
              setNewsong={setNewsong}
              newsong={newsong}
              filterPlaylist={filterPlaylist}
              Add_a_song_to_the_list={Add_a_song_to_the_list}
            />
          </div>
          <div className="Login">
            <Login
              login={login}
              userPassword={userPassword}
              setUserPassword={setUserPassword}
              userName={userName}
              setUserName={setUserName}
            />
          </div>
        </div>
        <div className="PlayList">
          <PlayList
            playhttp={playhttp}
            songlist={songToUser}
            Delete_a_task_from_the_list={Delete_a_task_from_the_list}
          />
        </div>
        <div className="ReactPlayer">
          <Plyr source={http} />
        </div>
        <div className="FindSongs">
          <FindSongs songFind={songFind} />
        </div>
      </SongContext.Provider>
    </div>
  );
}

export default App;
