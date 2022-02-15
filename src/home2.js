import { Header } from "./components/Header/Header";
import { Form } from "./components/Form/Form";
import { SongList } from "./components/SongList/SongList";
import { useEffect, useRef, useState } from "react";
import Plyr from "plyr-react";
import "plyr-react/dist/plyr.css";
import "./App.css";
import hotelSong from "./assets/hotel.mp3";
import { Search } from "./components/Search/Search";
import songContext from "./contexts/SongContext";
import UserContext from "./contexts/UserContext";
import { Song } from "./classes/Song";
import { LoginPage } from "./components/LoginPage/LoginPage";
import { Button } from "@mui/material";
import PlaylistPicker from "./components/PlaylistPicker/PlaylistPicker";

function App() {
  const videoOptions = { autoplay: true };
  const serverUrl = process.env.REACT_APP_SONGS_SERVER_URL;

  // use states
  const [songs, setSongs] = useState([]);
  const [currentSongId, setCurrentSongId] = useState(null);
  const [playerSrc, setPlayerSrc] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [userAccessToken, setUserAccessToken] = useState(null);
  const [playlist, setPlaylist] = useState("");

  // use refs
  const playAllCondRef = useRef(false);
  const plyrRef = useRef(null);
  const plyrIoClassicRef = useRef(null);
  const currentSongIndexRef = useRef(null);

  // useeffects
  useEffect(() => {
    if (userAccessToken) {
      syncUserSongs(userAccessToken);
    } else {
      setSongs([]);
    }
  }, [userAccessToken]);
  useEffect(() => {
    playlist ? getPlaylist(playlist) : syncUserSongs(userAccessToken);
  }, [playlist]);

  // functions

  // #region media control
  const playSong = (id) => {
    const song = songs.find((s) => s.id === id);
    setCurrentSongId(song.id);
    setPlayerSrc({
      type: "audio",
      sources: [
        {
          src: song.src,
          ...(song.provider && { provider: song.provider }),
        },
      ],
    });
    setShowPlayer(true);
  };

  const stopSong = () => {
    setCurrentSongId(null);
    setPlayerSrc({});
    setShowPlayer(false);
  };

  const playAll = () => {
    playAllCondRef.current = true;
    const songsSources = songs.map((song) => {
      return {
        src: song.link,
        ...(song.provider && { provider: song.provider }),
      };
    });
    setCurrentSongId(songs[0].id);
    setPlayerSrc({
      type: "audio",
      sources: [songsSources[0]],
    });
    currentSongIndexRef.current = 0;
  };

  const shuffleSongs = () => {
    for (let i = songs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    setSongs([...songs]);
  };

  const getNextSongId = () => {
    if (
      songs.length <= currentSongIndexRef.current - 2 ||
      currentSongIndexRef.current < 0
    ) {
      playAllCondRef.current = false;
      console.log("no next song");
      return;
    }
    currentSongIndexRef.current++;
    return songs[currentSongIndexRef.current].id;
  };

  const playNextSong = () => {
    const nextSongId = getNextSongId();
    nextSongId && playSong(nextSongId);
  };

  // #endregion

  // #region server control
  const addSongToServer = async (song) => {
    try {
      const rsp = await fetch(serverUrl + "songs/", {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + userAccessToken,
        },
        method: "POST",
        body: JSON.stringify({
          title: song.title,
          artist: song.artist,
          src: song.link,
          authorization: userAccessToken,
          id: song.id,
          provider: song.provider,
        }),
      });
      if (rsp.ok) {
        console.log("fetch in addtodb");
        const data = await rsp.json();
        console.log(data);
      } else {
        console.log("not added");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const removeSongFromServer = async (songId) => {
    if (userAccessToken) {
      const rsp = await fetch(serverUrl + "songs/" + songId, {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + userAccessToken,
        },
        method: "DELETE",
      });
      const data = await rsp.json();
      console.log(data);
    }
  };

  const syncUserSongs = async (AccessToken) => {
    try {
      for (const s of songs) {
        await addSongToServer(s);
      }
    } catch {
      console.log("failed adding current songs to DB");
    }
    try {
      const rsp = await fetch(serverUrl + "songs/", {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + AccessToken,
        },
      });
      const userSongs = await rsp.json();

      setSongs([
        ...userSongs.map((s) => {
          return { ...s, link: s.src };
        }),
      ]);
    } catch {
      console.log("failed fetching songs from DB");
    }
  };

  const getPlaylist = async (playlistId) => {
    const rsp = await fetch(serverUrl + "playlist/" + playlistId, {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + userAccessToken,
      },
    });
    const playList = await rsp.json();
    console.log(playList.songs);
    setSongs(playList.songs);
  };
  // #endregion

  // #region song list control

  const addSong = async (title, artist, link, srcType) => {
    if (songs.find((s) => s.link === link)) {
      console.log("song already exists");
      return;
    }
    const song = new Song(title, artist, link, srcType);
    if (userAccessToken) {
      await addSongToServer(song);
    }
    setSongs([...songs, song]);
  };

  const removeSong = async (id) => {
    console.log("removing " + id);
    removeSongFromServer(id);
    setSongs([...songs.filter((s) => s.id !== id)]);
    console.log(songs);
  };
  // #endregion

  return (
    <div className="App">
      <UserContext.Provider value={{ userAccessToken, setUserAccessToken }}>
        <LoginPage></LoginPage>
        <Button
          onClick={() => {
            playAll();
          }}
        >
          play all
        </Button>
        <Button
          onClick={() => {
            playNextSong();
          }}
        >
          next
        </Button>
        <Button onClick={shuffleSongs}>shuffle</Button>
        <Header />
        <Form addSong={addSong} />
        <PlaylistPicker
          playlist={playlist}
          setPlaylist={setPlaylist}
          syncUserSongs={syncUserSongs}
        />

        <div className="song-containers">
          <songContext.Provider
            value={{ currentSongId, removeSong, playSong, stopSong }}
          >
            <SongList songs={songs} />
          </songContext.Provider>
          <Search addSong={addSong} />
        </div>
      </UserContext.Provider>
      {playerSrc && (
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
          source={playerSrc}
          options={videoOptions}
          hidden={showPlayer}
        />
      )}
    </div>
  );
}

export default App;
