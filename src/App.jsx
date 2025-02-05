import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Barr from "./componets/Barr";
///list
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

function App() {
  const [name, setName] = useState("");
  const [listName, setListName] = useState([]);

  const handleAddName = () => {
    setListName((prev) => [...prev, name]);
    setName("");
  };
  const handleDeleteItem = (item) => {
    setListName((prev) => prev.toSpliced(item, 1));
  };

  const handleShuffle = () => {
    const newList = [...listName].sort(() => Math.random() - 0.5);
    setListName(newList);
  };
  const saveToLocalStorage = () => {
    localStorage.setItem("namesList", JSON.stringify(listName));
  };
  useEffect(() => {
    const storedValue = JSON.parse(localStorage.getItem("namesList"));
    setListName(storedValue?.length ? storedValue : []);
  }, []);
  return (
    <>
      <Barr />
      <Grid mt={10} container spacing={2}>
        <Grid
          spacing={2}
          direction="row"
          container
          alignItems="stretch"
          justifyContent="center"
          item
          xs={12}
        >
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Name"
              variant="outlined"
              autoComplete="off"
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  handleAddName();
                }
              }}
            />
          </Grid>
          <Grid
            item
            sx={{ display: "flex", alignItems: "center" }}
            xs={12}
            md={2}
          >
            <Button fullWidth onClick={handleAddName} variant="contained">
              Add
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2} item xs={12} md={8} justifyContent="center">
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              color="info"
              onClick={handleShuffle}
              variant="contained"
            >
              Shuffle
            </Button>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              color="warning"
              onClick={saveToLocalStorage}
              variant="contained"
            >
              Save
            </Button>
          </Grid>
        </Grid>
        <Grid container item xs={12} justifyContent="center">
          <Grid item xs={12} md={8}>
            <List sx={{ width: "100%" }}>
              {listName.map((name, index) => (
                <ListItem
                  key={`${name}-${index}`} // Asegurar clave única
                  disableGutters
                  secondaryAction={
                    <Button
                      color="error"
                      onClick={() => handleDeleteItem(index)} // Corregir typo
                      variant="contained"
                    >
                      Delete
                    </Button>
                  }
                >
                  <ListItemText primary={`${index + 1} - ${name}`} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
