import "./Home.css";
import "plyr-react/dist/plyr.css";
import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import PlayList from "./components/PlayList";
import FindSongs from "./components/FindSongs";
import SongContext from "./Context/SongContext";
import Plyr from "plyr-react";
import axios from "axios";
import Sidebar from "./components/sidebar";
import RecipeReviewCard from "./components/RecipeReviewCard";

function Home({ User, setUser, userPassword, setUserPassword }) {
  const [videoOptions, setVideoOptions] = useState({ autoplay: true });
  const [showPlayer, setShowPlayer] = useState(false);
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
  const [currentSongId, setCurrentSongId] = useState(null);

  const playAllCondRef = useRef(false);
  const currentSongIndexRef = useRef(null);
  const plyrRef = useRef(null);
  const plyrIoClassicRef = useRef(null);

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
      setAllPlaylist(data);
      if (category === "All songs") {
        let All_songs = allPlaylist.map((playlist) => playlist.songs);
        All_songs = Array.prototype.concat.apply([], All_songs);
        setsongToUser(All_songs);
      } else {
        const playlistChosen = allPlaylist.filter(
          (playlist) => playlist.PlaylistName === category
        );
        setsongToUser(playlistChosen[0]?.songs);
      }
      plyrRef.current(null);
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
    const res = await axios.put(
      `http://localhost:3001/playlists`,
      { playlistName, song },
      headers
    );
    const data = await res.data;
    setCategory(data.PlaylistName);
    console.log(data);
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
    setShowPlayer(false);
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
    setShowPlayer(false);
  }

  // const allsongs = () => {};
  // const mysongs = () => {};

  const playhttp = (id) => {
    setCurrentSongId(id);
    setHttp({
      type: "video",
      sources: [
        {
          src: id,
          provider: "youtube",
        },
      ],
    });
    setShowPlayer(true);
  };
  const stopSong = () => {
    setCurrentSongId(null);
    setHttp({});
    setShowPlayer(false);
  };

  const playAllsongs = () => {
    playAllCondRef.current = true;
    console.log("%%%%%%%%%%%%");
    console.log(songToUser);
    const songsSources = songToUser.map((song) => {
      return song.id;
    });
    setCurrentSongId(songToUser[0].id);
    playhttp(...songsSources);
    currentSongIndexRef.current = 0;
  };

  const getNextSongId = () => {
    if (
      songToUser.length <= currentSongIndexRef.current - 2 ||
      currentSongIndexRef.current < 0
    ) {
      playAllCondRef.current = false;
      console.log("no next song");
      return;
    }
    currentSongIndexRef.current++;
    return songToUser[currentSongIndexRef.current].id;
  };
  const playNextSong = () => {
    const nextSongId = getNextSongId();
    nextSongId && playhttp(nextSongId);
  };

  const logout = () => {
    setShowPlayer(false);

    localStorage.accessToken = null;
    setUser(false);
  };

  const search = async (search) => {
    stopSong();
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
          stopSong: stopSong,
        }}
      >
        <Sidebar
          Delete_play_list={Delete_play_list}
          playAllsongs={playAllsongs}
        />
        <Header />

        <div className="PlayList">
          <PlayList
            playhttp={playhttp}
            songToUser={songToUser}
            Delete_a_song_from_the_list={Delete_a_song_from_the_list}
          />
        </div>

        <div className="RecipeReviewCard">
          {allPlaylist?.map((playlist) => (
            <RecipeReviewCard playlist={playlist} />
          ))}
        </div>
        <div className="FindSongs">
          <FindSongs songFind={songFind} />
        </div>
        <div className="ReactPlayer">
          <Plyr
            ref={(el) => {
              if (el?.plyr?.on) {
                el.plyr.on("ended", () => {
                  if (playAllCondRef.current) {
                    playNextSong();
                  }
                });
              }
              plyrRef.current = el;
            }}
            source={http}
            options={videoOptions}
            hidden={showPlayer}
          />
        </div>
      </SongContext.Provider>
    </div>
  );
}

export default Home;
