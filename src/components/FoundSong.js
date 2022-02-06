import { useContext, useState } from "react";
import SongContext from "../Context/SongContext";
import "./FoundSong.css";
import SelectCategory from "./SelectCategory";

export default function FoundSong({ song, setnewSong }) {
  const { Add_a_song_to_the_list } = useContext(SongContext);
  const { playhttp } = useContext(SongContext);
  const { User } = useContext(SongContext);
  const { setCategory } = useContext(SongContext);
  const { category } = useContext(SongContext);

  return (
    <div className="containerFoundSong">
      {User && (
        <button
          className="button "
          id="addVideofoundsong"
          onClick={() => {
            song.user = User;
            Add_a_song_to_the_list(song, category);
            playhttp(song.url);
            setnewSong(true);
          }}
        >
          <img className="img " src={song.thumbnails[0].url} alt="" />;
        </button>
      )}
    </div>
  );
}
