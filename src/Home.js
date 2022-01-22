import AddItemForm from "./components/AddItemForm";
import Header from "./components/Header";
import PlayList from "./components/PlayList";
import "./Home.css";
import { useEffect, useState } from "react";
import FindSongs from "./components/FindSongs";
import SongContext from "./Context/SongContext";
import Login from "./components/Login";
import Plyr from "plyr-react";
import "plyr-react/dist/plyr.css";
import Logged from "./components/Logged";
import SelectCategory from "./components/SelectCategory";
import SignIn from "./components/SignIn";
import { Link } from "react-router-dom";
import SignUp from "./components/Signup";
import { useParams, useNavigate } from "react-router-dom";

function Home({ User, setUser, userPassword, setUserPassword }) {
  const [songlist, setSonglist] = useState([]);
  useEffect(() => {
    async function get_all_songs_from_mongo() {
      const res = await fetch(`http://localhost:3001/songs`, {
        method: "GET",
      });
      const data = await res.json();
      // if (!User) {
      setSonglist(data);
      setsongToUser(data);
      // } else {
      // setsongToUser(data.filter((song) => song.user[0] == User[0]));
      // }
    }
    get_all_songs_from_mongo();
  }, []);

  const [songToUser, setsongToUser] = useState(songlist);
  const [songFind, setsongFind] = useState([]);
  const [newsong, setNewsong] = useState("");
  const [http, setHttp] = useState("");
  const [videocall, setVideocall] = useState(null);

  const songcategorys = () => {};
  const Add_a_song_to_the_list = (song) => {
    const songcategory = songcategorys();
    const fullsong = {
      id: song.id,
      duration: song.duration,
      thumbnails: song.thumbnails[0].url,
      title: song.title,
      type: song.type,
      url: song.url,
      views: song.views,
      category: [].push(songcategory),
    };
    add_song_to_mongo(fullsong);
  };

  function add_song_to_mongo(song) {
    fetch(`http://localhost:3001/songs`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.accessToken)}`,
      },
      body: JSON.stringify(song),
    }).then((res) =>
      res.json().then((data) => {
        if (data) {
          console.log(data);
          setSonglist([...songlist, data]);
          setsongToUser([...songlist, data]);
          setsongFind([]);
        }
      })
    );
  }

  const allsongs = () => {
    setsongToUser(songlist);
  };
  function Delete_a_song_from_the_list(id) {
    fetch(`http://localhost:3001/songs`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.accessToken)}`,
      },
      body: JSON.stringify([id]),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setSonglist(data);
          setsongToUser(data);
        } else {
          console.log(data);
        }
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
  const navigate = useNavigate();

  const register = (userName, userPassword) => {
    navigate("/");
  };
  const login = (userName, userPassword) => {
    navigate("/Signin");
  };
  const logout = () => {
    localStorage.accessToken = null;
    setUser(false);
  };

  async function get_all_users_from_mongo() {
    const res = await fetch(`http://localhost:3001/users`, {
      method: "GET",
    });
    const data = await res.json();
    console.log(data);
    setUserPassword("");
  }

  const search = async (search) => {
    const res = await fetch(`http://localhost:3001/api/search/${search}`);
    const data = await res.json();
    console.log(data);
    setsongFind(data);
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

      <div className="SelectCategory"></div>
      <SongContext.Provider
        value={{
          Add_a_song_to_the_list: Add_a_song_to_the_list,
          playhttp: playhttp,
          User: User,
          videocall: videocall,
          setVideocall: setVideocall,
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
            {!User && (
              <Login
                get_all_users_from_mongo={get_all_users_from_mongo}
                register={register}
                login={login}
                User={User}
                userPassword={userPassword}
                setUserPassword={setUserPassword}
              />
            )}
          </div>
          <div className="Login">
            {User && <Logged logout={logout} User={User} />}
          </div>
          <Link to={`/Signin`}>Signin</Link>
          {videocall && (
            <div className="ReactPlayer">
              <Plyr source={http} />
            </div>
          )}
        </div>
        <div className="PlayList">
          <PlayList
            playhttp={playhttp}
            songlist={songToUser}
            Delete_a_task_from_the_list={Delete_a_song_from_the_list}
          />
        </div>
        <div className="FindSongs">
          <FindSongs songFind={songFind} />
          <Link to={`/`}>Signup</Link>
        </div>
      </SongContext.Provider>
    </div>
  );
}

export default Home;
