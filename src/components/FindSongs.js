import { useState } from "react";
import "./FindSongs.css";
import FoundSong from "./FoundSong";
import MediaCard from "./MediaCard";
import SelectCategory from "./SelectCategory";
export default function FindSongs({ songFind }) {
  const [newSong, setnewSong] = useState(false);

  return (
    <div>
      <div className="findsongs findsongs1">
        {songFind.map(
          (song, index) =>
            song.type === "video" && (
              <MediaCard key={song.items} song={song} setnewSong={setnewSong} />
            )
        )}
      </div>
    </div>
  );
}
// {songFind.map(
//   (song, index) =>
//     song.type === "video" && (
//       <FoundSong key={song.items} song={song} setnewSong={setnewSong} />
//     )
// )}

// {newSong && <SelectCategory></SelectCategory>}

// <div id="titleList">list of songs</div>
