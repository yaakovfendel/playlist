import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import "./SelectCategory.css";
import SongContext from "../Context/SongContext";

const ITEM_HEIGHT = 20;
const ITEM_PADDING_TOP = 5;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 9 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

export default function SelectCategory() {
  const { Playlist } = React.useContext(SongContext);
  const { setsongplaylist } = React.useContext(SongContext);
  const { songplaylist } = React.useContext(SongContext);

  const names = Playlist?.map((Playlist) => {
    return Playlist;
  });
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setsongplaylist(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id="demo-multiple-checkbox-label">PLAY LIST</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={songplaylist}
          onChange={handleChange}
          input={<OutlinedInput label="PLAY LIST" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name} target={name}>
              <Checkbox checked={songplaylist.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
