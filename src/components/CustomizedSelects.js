import * as React from "react";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import InputBase from "@mui/material/InputBase";
import SongContext from "../Context/SongContext";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

export default function CustomizedSelects() {
  const { setCategory } = React.useContext(SongContext);
  const { category } = React.useContext(SongContext);
  const { Playlist } = React.useContext(SongContext);
  const { add_playlist_to_mongo } = React.useContext(SongContext);
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const val = React.useRef();
  const [inputCategory, setInputCategory] = React.useState("");
  console.log(Playlist);
  const names = Playlist?.map((Playlist) => {
    return Playlist;
  });
  return (
    <div>
      <FormControl sx={{ m: 0.2 }} variant="standard">
        <InputLabel htmlFor="demo-customized-select-native">
          your libary
        </InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          value={category}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          {names?.map((playlist) => {
            return <option value={playlist.PlaylistName}>{playlist}</option>;
          })}
        </NativeSelect>
      </FormControl>
    </div>
  );
}

// <FormControl sx={{ m: 1 }} variant="standard">
//   <input
//     ref={val}
//     type="text"
//     className="form-control "
//     placeholder="add playlist name"
//     value={inputCategory}
//     onChange={(e) => setInputCategory(e.target.value)}
//   />
//   <button
//     className="btn"
//     onClick={() => add_playlist_to_mongo(val.current.value)}
//   >
//     add playlist name
//   </button>
// </FormControl>