import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SongContext from "../Context/SongContext";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NativeSelectDemo from "./NativeSelectDemo";
export default function MediaControlCard({
  id,
  url,
  title,
  thumbnails,
  Delete_a_song_from_the_list,
  _id,
  duration,
}) {
  const { playhttp } = React.useContext(SongContext);
  const { category } = React.useContext(SongContext);
  const { User } = React.useContext(SongContext);
  const { allPlaylist } = React.useContext(SongContext);
  const [flag, setFlag] = React.useState(false);
  console.log(allPlaylist);

  let arryplayList = [];
  const songPlayList = allPlaylist.map((playlist) => {
    arryplayList = [];
    function playlisttoarry(playlist) {
      if (playlist.songs.find((song) => song._id === _id)) {
        arryplayList.push(playlist.PlaylistName);
      }
    }
    playlisttoarry(playlist);
    return arryplayList;
  });
  return (
    <Card sx={{ display: "flex" }}>
      <Box>
        <CardMedia
          onClick={() => playhttp(id)}
          component="img"
          sx={{ width: 100 }}
          image={thumbnails[0]?.url}
          alt="Live from space album cover"
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", pl: 0.3, pb: 0.4 }}>
        {User && (
          <button
            className="button delete"
            onClick={() => Delete_a_song_from_the_list(_id, category)}
          >
            <DeleteIcon> </DeleteIcon>
          </button>
        )}
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", pl: 0.3, pb: 0.4 }}>
        <MoreVertIcon onClick={() => setFlag(!flag)}></MoreVertIcon>
        {flag && <NativeSelectDemo songPlayList={songPlayList} />}
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", pl: 0.7, pb: 0.4 }}>
        <IconButton aria-label="play/pause">
          <PlayArrowIcon
            sx={{ height: 45, width: 52 }}
            onClick={() => playhttp(id)}
          />
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h7">
            {duration}
          </Typography>
        </CardContent>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h7">
            {title}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
