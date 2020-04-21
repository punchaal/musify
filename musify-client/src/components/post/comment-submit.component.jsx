import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core";

import { TextField, Button, InputAdornment } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function CommentSubmit() {
  const classes = useStyles();
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <form>
      <TextField
        id="outlined-textarea"
        label="Comment"
        placeholder="Placeholder"
        multiline
        variant="outlined"
        value={value}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button>Post</Button>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}
