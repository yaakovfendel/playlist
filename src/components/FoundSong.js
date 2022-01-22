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
      {User && (
        <button
          className="button "
          id="addVideofoundsong"
          onClick={() => {
            song.user = User;
            console.log(song);
            Add_a_song_to_the_list(song);
            playhttp(song.url);
          }}
        >
          <img className="img " src={song.thumbnails[0].url} alt="" />;
        </button>
      )}
    </div>
  );
}

// ➕

// <div id="addVideofoundsong">
//   <button className="button" onClick={() => playhttp(song.url)}></button>
//   <h4>{song.title}</h4>
// </div>
