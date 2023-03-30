import Button from "@mui/material/Button";
import { useState } from "react";
import "./App.css";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Note } from "./components/note";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function App() {
  //     state , setState
  const [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log(notes);

  const handleCreateNote = () => {
    setNotes((prevNotes) => [
      ...prevNotes,
      {
        id: Math.random(),
        title: "Note",
        content: "Example note",
        date: new Date(),
      },
    ]);
  };

  const handleDeleteNote = (id) => {
    try {
      const isApproved = window.confirm(
        "Are you sure you want to delete this note?"
      );

      if (!isApproved) {
        handleClose();
        return;
      }
      setNotes((prevNotes) => prevNotes.filter((n) => n.id !== id));
    } finally {
      handleClose();
    }
  };

  const handleItemClick = (id) => {
    setSelectedNoteId(id);
    handleOpen();
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
              <Item onClick={() => handleItemClick(note.id)}>
                <Note note={note} handleDeleteNote={handleDeleteNote} />
              </Item>
            </Grid>
          ))}
        </Grid>
      </main>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <Note
              note={notes.find((note) => note.id === selectedNoteId)}
              handleDeleteNote={handleDeleteNote}
            />
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default App;
