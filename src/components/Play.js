import { useContext } from "react";
import SongContext from "../Context/SongContext";
import "./play.css";
export default function Play({
  id,
  url,
  title,
  thumbnails,
  Delete_a_task_from_the_list,
}) {
  const { playhttp } = useContext(SongContext);
  console.log(thumbnails);
  return (
    <div className="containerPlay">
      <h3>{title}</h3>
      <button className="btn" onClick={() => Delete_a_task_from_the_list(id)}>
        delet song
      </button>
      <button className="btn" onClick={() => playhttp(id)}>
        <img className="img" id={id} src={thumbnails} alt="" />▶
      </button>
    </div>
  );
}
