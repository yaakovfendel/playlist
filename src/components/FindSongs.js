import { useState } from "react";
import "./FindSongs.css";
import MediaCard from "./MediaCard";
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
