import { useState } from "react";
import "./FindSongs.css";
import FoundSong from "./FoundSong";
import SelectCategory from "./SelectCategory";
export default function FindSongs({ songFind }) {
  const [newSong, setnewSong] = useState(false);

  return (
    <div>
      <div className="findsongs">
        {songFind.map(
          (song, index) =>
            song.type === "video" && (
              <FoundSong key={song.items} song={song} setnewSong={setnewSong} />
            )
        )}
      </div>
    </div>
  );
}

// {newSong && <SelectCategory></SelectCategory>}

// <div id="titleList">list of songs</div>
