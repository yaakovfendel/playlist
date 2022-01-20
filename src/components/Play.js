import { useContext } from "react";
import SongContext from "../Context/SongContext";
import "./play.css";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Play({
  id,
  url,
  title,
  thumbnails,
  Delete_a_task_from_the_list,
}) {
  const { playhttp } = useContext(SongContext);
  const { setVideocall } = useContext(SongContext);
  const { videocall } = useContext(SongContext);
  const { User } = useContext(SongContext);
  return (
    <div className="containerPlay">
      <div className="songandimg" id="addVideo">
        <button
          className="button"
          id="playVideo"
          onClick={() => playhttp(id)(setVideocall(!videocall))}
        >
          <img className="songsImg " id={id} src={thumbnails} alt="" />
        </button>
        <h4 className="title">{title}</h4>
      </div>
      {User && (
        <button
          className="button delete"
          onClick={() => Delete_a_task_from_the_list(id)}
        >
          <DeleteIcon></DeleteIcon>
        </button>
      )}
    </div>
  );
}
// User && user[0] == User[1] &&
