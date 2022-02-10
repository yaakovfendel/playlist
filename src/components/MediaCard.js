import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "@emotion/react";
import SongContext from "../Context/SongContext";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
export default function MediaCard({ song, setnewSong }) {
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
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="180"
        image={song.thumbnails[0].url}
        alt=""
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div"></Typography>
        <Typography variant="body2" color="text.secondary">
          {song.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            add_song_to_playlist(song);
            playhttp(song.url);
          }}
        >
          <AddBoxIcon />
        </Button>
        <Button size="small">
          <IconButton aria-label="play/pause">
            <PlayArrowIcon
              sx={{ height: 45, width: 52 }}
              onClick={() => playhttp(song.url)(setVideocall(true))}
            />
          </IconButton>
        </Button>
        <Typography variant="body2" color="text.secondary">
          {song.duration}
        </Typography>
      </CardActions>
    </Card>
  );
}
