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
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

export default function MediaControlCard({
  id,
  url,
  title,
  thumbnails,
  Delete_a_song_from_the_list,
  _id,
}) {
  const { playhttp } = React.useContext(SongContext);
  const { setVideocall } = React.useContext(SongContext);
  const { category } = React.useContext(SongContext);
  const { videocall } = React.useContext(SongContext);
  const { User } = React.useContext(SongContext);
  const { allPlaylist } = React.useContext(SongContext);
  console.log(allPlaylist);

  let arr = [];
  const s = allPlaylist.map((playlist) => {
    arr = [];
    function b(playlist) {
      console.log(playlist.songs.map((song) => song._id === _id));
      console.log(Boolean(playlist.songs.find((song) => song._id === _id)));
      if (playlist.songs.find((song) => song._id === _id)) {
        arr.push(playlist.PlaylistName);
      }
    }
    b(playlist);
    console.log(arr);
    return arr;
  });
  const theme = useTheme();
  return (
    <Card sx={{ display: "flex" }}>
      {User && (
        <button
          className="button delete"
          onClick={() => Delete_a_song_from_the_list(_id, category)}
        >
          <DeleteIcon> </DeleteIcon>
        </button>
      )}
      {s}
      <Box sx={{ display: "flex", alignItems: "center", pl: 0.1, pb: 0.4 }}>
        <IconButton aria-label="play/pause">
          <PlayArrowIcon
            sx={{ height: 45, width: 52 }}
            onClick={() => playhttp(id)(setVideocall(!videocall))}
          />
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h7">
            {title}
          </Typography>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 100 }}
        image={thumbnails[0]?.url}
        alt="Live from space album cover"
      />
    </Card>
  );
}

// <Typography variant="subtitle1" color="text.secondary" component="div">
//             Mac Miller
//           </Typography>
// <IconButton aria-label="previous">
// {theme.direction === "rtl" ? (
//   <SkipNextIcon />
// ) : (
//   <SkipPreviousIcon />
// )}
// </IconButton>
// <IconButton aria-label="next">
//             {theme.direction === "rtl" ? (
//               <SkipPreviousIcon />
//             ) : (
//               <SkipNextIcon /> // to do to add a function that goes to next song
//             )}
//           </IconButton>
