import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SongContext from "../Context/SongContext";

import Playlistcard from "./Playlistcard";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({ playlist }) {
  const { setCategory } = React.useContext(SongContext);

  const handleButton = (category) => {
    setCategory(category);
  };

  console.log(playlist);

  return (
    <button onClick={() => handleButton(playlist.PlaylistName)}>
      <Card sx={{ maxHeight: 360, margin: 1, minWidth: 200, maxWidth: 200 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {playlist.PlaylistName.charAt(0).toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon></MoreVertIcon>
            </IconButton>
          }
          title={playlist.PlaylistName}
          // subheader="September 14, 2016"
        />

        <CardMedia component="img" height="194" image={playlist.image} alt="" />
        <CardContent></CardContent>
        <IconButton aria-label="add to favorites"></IconButton>
      </Card>
    </button>
  );
}
// <Typography variant="body2" color="text.secondary">
//           This impressive paella is a perfect party dish and a fun meal to cook
//           together with your guests. Add 1 cup of frozen peas along with the
//           mussels, if you like.
//         </Typography>
