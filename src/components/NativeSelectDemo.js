import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import SongContext from "../Context/SongContext";

export default function NativeSelectDemo({ songPlayList }) {
  const { category } = React.useContext(SongContext);
  const { setCategory } = React.useContext(SongContext);
  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const results = songPlayList.filter((element) => {
    return element.length > 0;
  });

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard">Play List</InputLabel>
        <NativeSelect onChange={handleChange} value={category}>
          {results?.map((playlist) => {
            return <option value={playlist}>{playlist}</option>;
          })}
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
