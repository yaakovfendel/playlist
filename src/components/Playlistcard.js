import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import SongContext from "../Context/SongContext";

export default function Playlistcard({ playlist }) {
  const handleChange = (event) => {};
  const { playhttp } = React.useContext(SongContext);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard">Play List</InputLabel>
        {playlist?.songs.map((song) => {
          return (
            <button onClick={() => playhttp(song.id)}>
              <NativeSelect sx={{ disply: "flex" }}>{song.title}</NativeSelect>;
            </button>
          );
        })}
      </FormControl>
    </Box>
  );
}
