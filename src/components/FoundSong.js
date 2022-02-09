// import { useContext, useState } from "react";
// import SongContext from "../Context/SongContext";
// import "./FoundSong.css";
// import SelectCategory from "./SelectCategory";

// export default function FoundSong({ song, setnewSong }) {
//   const { Add_a_song_to_the_list } = useContext(SongContext);
//   const { add_song_to_playlist } = useContext(SongContext);
//   const { playhttp } = useContext(SongContext);
//   const { User } = useContext(SongContext);
//   const { setCategory } = useContext(SongContext);
//   const { category } = useContext(SongContext);
//   const { songplaylist } = useContext(SongContext);

//   return (
//     <div className="containerFoundSong">
//       {User && (
//         <button
//           className="button "
//           id="addVideofoundsong"
//           onClick={() => {
//             song.user = User;
//             add_song_to_playlist(song, songplaylist);
//             playhttp(song.url);
//             setnewSong(true);
//           }}
//         >
//           <img className="img " src={song.thumbnails[0].url} alt="" />;
//         </button>
//       )}
//     </div>
//   );
// }
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SongContext from "../Context/SongContext";
import AddCircleIcon from "@mui/icons-material/AddCircle";
// import { useContext, useState } from "react";
// import "./FoundSong.css";
// import SelectCategory from "./SelectCategory";

export default function FoundSong({ song, setnewSong }) {
  const { Add_a_song_to_the_list } = React.useContext(SongContext);
  const { add_song_to_playlist } = React.useContext(SongContext);
  const { playhttp } = React.useContext(SongContext);
  const { User } = React.useContext(SongContext);
  const { setCategory } = React.useContext(SongContext);
  const { category } = React.useContext(SongContext);
  const { songplaylist } = React.useContext(SongContext);
  const { setVideocall } = React.useContext(SongContext);
  const { videocall } = React.useContext(SongContext);

  const theme = useTheme();

  return (
    <Card sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", alignItems: "center", pl: 0.1, pb: 0.4 }}>
        <IconButton aria-label="play/pause">
          <PlayArrowIcon
            sx={{ height: 45, width: 52 }}
            onClick={() => playhttp(song.url)(setVideocall(true))}
          />
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h7">
            {song.title}
          </Typography>
        </CardContent>
      </Box>
      {User ? (
        <button
          onClick={() => {
            add_song_to_playlist(song);
            playhttp(song.url);
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: 80 }}
            image={song.thumbnails[0].url}
            alt="Live from space album cover"
          />
        </button>
      ) : (
        <CardMedia
          component="img"
          sx={{ width: 80 }}
          image={song.thumbnails[0].url}
          alt="Live from space album cover"
        />
      )}
    </Card>
  );
}

// <Typography variant="subtitle1" color="text.secondary" component="div">
//             Mac Miller
//           </Typography>
// <IconButton aria-label="previous">
//             {theme.direction === "rtl" ? (
//               <SkipNextIcon />
//             ) : (
//               <SkipPreviousIcon />
//             )}
//           </IconButton>
// <IconButton aria-label="next">
// {theme.direction === "rtl" ? (
//   <SkipPreviousIcon />
// ) : (
//   <SkipNextIcon /> // to do to add a function that goes to next song
// )}
// </IconButton>
