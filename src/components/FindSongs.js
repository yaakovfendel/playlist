import "./FindSongs.css";
import FoundSong from "./FoundSong";
export default function FindSongs({ songFind }) {
  return (
    <div>
      {songFind.map(
        (song, index) =>
          song.type === "video" && <FoundSong key={song.items} song={song} />
      )}
    </div>
  );
}

// {songFind.map(
//   (song, index) =>
//     index < 3 &&
//     song.type === "video" && <FoundSong key={song.items} song={song} />
// )}
