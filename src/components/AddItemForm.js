import { useRef } from "react";
import "./AdditemForm.css";
import CustomizedSelects from "./CustomizedSelects";
import SelectCategory from "./SelectCategory";
export default function AddItemForm({
  Add_a_song_to_the_list,
  setNewsong,
  newsong,
  search,
  filterPlaylist,
  allsongs,
  mysongs,
}) {
  const val = useRef();
  return <div className="form-control-div "></div>;
}
// <SelectCategory />
// <CustomizedSelects />
// <input
//   ref={val}
//   type="text"
//   className="form-control "
//   placeholder="find a song"
//   value={newsong}
//   // onChange={(e) => filterPlaylist(e.target.value)}
// />

// <button className="btn" onClick={() => search(val.current.value)}>
//   🔎
// </button>
// <button className="btn" onClick={() => mysongs()}>
//   mysongs
// </button>
// <button className="btn" onClick={() => allsongs()}>
//   all songs
// </button>
