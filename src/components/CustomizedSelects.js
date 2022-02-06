import * as React from "react";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
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
    // Use the system font instead of the default Roboto font.
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
  const { categoris } = React.useContext(SongContext);
  const { setCategoris } = React.useContext(SongContext);
  const { add_category_to_mongo } = React.useContext(SongContext);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const val = React.useRef();
  const [inputCategory, setInputCategory] = React.useState("");
  return (
    <div>
      <FormControl sx={{ m: 1 }} variant="standard">
        <input
          ref={val}
          type="text"
          className="form-control "
          placeholder="find a song"
          value={inputCategory}
          onChange={(e) => setInputCategory(e.target.value)}
        />
        <button
          className="btn"
          onClick={() => add_category_to_mongo(val.current.value)}
        >
          add to category list
        </button>
      </FormControl>

      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="demo-customized-select-native">
          Play list categiry
        </InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          value={category}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          {categoris?.map((category) => {
            return <option value={category}>{category}</option>;
          })}
        </NativeSelect>
      </FormControl>
    </div>
  );
}

// <option value={"Neshama"}>Neshama</option>
// <option value={"Chsidi"}>Chsidi</option>
// <option value={"Shabat"}>Shabat</option>
