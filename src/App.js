import Button from "@mui/material/Button";
import { useState } from "react";
import "./App.css";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function App() {
  const [notes, setNotes] = useState([]);
  console.log(notes);
  return (
    <div className="App">
      <header>
        <Button
          onClick={() => {
            setNotes((prevNotes) => [
              ...prevNotes,
              { title: "Example note", date: new Date() },
            ]);
          }}
          variant="contained"
        >
          Create Note
        </Button>
      </header>
      <main>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {notes.map((note, index) => (
            <Grid xs={2} sm={4} md={3} key={index}>
              <Item>
                <div>{note.title}</div>
                <div>{note.date.toLocaleString("en-GB")}</div>
              </Item>
            </Grid>
          ))}
        </Grid>
      </main>
    </div>
  );
}

export default App;
