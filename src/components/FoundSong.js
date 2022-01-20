import { useContext } from "react";
import SongContext from "../Context/SongContext";
import "./FoundSong.css";

export default function FoundSong({ song }) {
  // console.log(song);
  // console.log(song.thumbnails[0].url);
  const { Add_a_song_to_the_list } = useContext(SongContext);
  const { playhttp } = useContext(SongContext);
  const { User } = useContext(SongContext);
  // console.log(User);

  return (
    <div className="containerFoundSong">
      <div id="addVideofoundsong">
        <button className="button" onClick={() => playhttp(song.url)}>
          <img className="img" src={song.thumbnails[0].url} alt="" />;
        </button>
        <h4>{song.title}</h4>
      </div>
      {User && (
        <button
          className="button"
          onClick={() => {
            song.user = User;
            console.log(song);
            Add_a_song_to_the_list(song);
          }}
        >
          ➕
        </button>
      )}
    </div>
  );
}
