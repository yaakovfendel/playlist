import MediaControlCard from "./MediaControlCard";
import Play from "./Play";
import "./PlayList.css";

export default function PlayList({
  playhttp,
  songToUser,
  Delete_a_song_from_the_list,
}) {
  return (
    <div>
      <div className="playlistsongs findsongs">
        {songToUser?.map(
          ({ _id, id, duration, thumbnails, title, type, url, views }, i) => (
            <MediaControlCard
              key={i}
              _id={_id}
              id={id}
              url={url}
              title={title}
              thumbnails={thumbnails}
              Delete_a_song_from_the_list={Delete_a_song_from_the_list}
              duration={duration}
            />
          )
        )}
      </div>
    </div>
  );
}
// import Play from "./Play";
// import "./PlayList.css";

// export default function PlayList({
//   playhttp,
//   songToUser,
//   Delete_a_song_from_the_list,
// }) {
//   console.log(songToUser);
//   return (
//     <div>
//       <div id="titlePlaylist">Play list</div>
//       <div className="playlistsongs">
//         {songToUser?.map(
//           ({ _id, id, duration, thumbnails, title, type, url, views }, i) => (
//             <Play
//               key={i}
//               _id={_id}
//               id={id}
//               url={url}
//               title={title}
//               thumbnails={thumbnails}
//               Delete_a_song_from_the_list={Delete_a_song_from_the_list}
//             />
//           )
//         )}
//       </div>
//     </div>
//   );
// }

// <div id="titlePlaylist">Play list</div>
