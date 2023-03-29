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

  const handleCreateNote = () => {
    setNotes((prevNotes) => [
      ...prevNotes,
      { id: Math.random(), title: "Example note", date: new Date() },
    ]);
  };

  const handleDeleteNote = (id) => {
    const isApproved = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!isApproved) {
      return;
    }
    setNotes((prevNotes) => prevNotes.filter((n) => n.id !== id));
  };

  return (
    <div className="App">
      <header>
        <Button onClick={handleCreateNote} variant="contained">
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
                <div>{note.date.toString().slice(0, 21)}</div>
                <Button
                  onClick={() => handleDeleteNote(note.id)}
                  variant="contained"
                  color="error"
                >
                  Delete
                </Button>
              </Item>
            </Grid>
          ))}
        </Grid>
      </main>
    </div>
  );
}

export default App;
