import Play from "./Play";
import "./PlayList.css";

export default function PlayList({
  playhttp,
  songlist,
  Delete_a_task_from_the_list,
}) {
  return (
    <div>
      <div id="titlePlaylist">Play list</div>
      <div className="playlistsongs">
        {songlist.map(
          ({ id, duration, thumbnails, title, type, url, views }) => (
            <Play
              key={id}
              id={id}
              url={url}
              title={title}
              thumbnails={thumbnails}
              Delete_a_task_from_the_list={Delete_a_task_from_the_list}
              // user={user}
            />
          )
        )}
      </div>
    </div>
  );
}
