import { useContext } from "react";
import SongContext from "../Context/SongContext";
import "./FoundSong.css";

export default function FoundSong({ song }) {
  console.log(song);
  // console.log(song.thumbnails[0].url);
  const { Add_a_song_to_the_list } = useContext(SongContext);
  const { playhttp } = useContext(SongContext);

  return (
    <div className="containerFoundSong">
      <h3>{song.title}</h3>
      <button className="btn" onClick={() => playhttp(song?.url)}>
        play
        <img className="img" src={song.thumbnails[0].url} alt="" />;
      </button>
      <button className="btn" onClick={() => Add_a_song_to_the_list(song)}>
        add a song to list
      </button>
    </div>
  );
}
