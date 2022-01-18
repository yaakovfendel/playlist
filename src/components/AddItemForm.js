import { useRef } from "react";
import "./AdditemForm.css";
export default function AddItemForm({
  Add_a_song_to_the_list,
  setNewsong,
  newsong,
  search,
  filterPlaylist,
  allsongs,
}) {
  const val = useRef();
  return (
    <div>
      <h3> SONG</h3>
      <input
        ref={val}
        type="text"
        className="form-control "
        placeholder="add song to play list"
        value={newsong}
        onChange={(e) => filterPlaylist(e.target.value)}
      />
      <button className="btn" onClick={() => search(val.current.value)}>
        find song
      </button>
      <button className="btn" onClick={() => allsongs()}>
        all songs
      </button>
    </div>
  );
}
