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
import { TextField } from "@mui/material";

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

const initialNotes = JSON.parse(localStorage.getItem("notes") || "[]");

function App() {
  //     state , setState
  const [notes, setNotes] = useState(initialNotes);
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [selectedNoteId, setSelectedNoteId] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log(notes);

  const handleCreateNote = (e) => {
    e.preventDefault();
    setNotes((prevNotes) => {
      const updatedNotes = [
        ...prevNotes,
        {
          id: Math.random(),
          title: title,
          content: content,
          date: new Date(),
        },
      ];
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return updatedNotes;
    });
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
      setNotes((prevNotes) => {
        const notesAfterDeletion = prevNotes.filter((n) => n.id !== id);
        localStorage.setItem("notes", JSON.stringify(notesAfterDeletion));
        return notesAfterDeletion;
      });
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
        <form onSubmit={handleCreateNote}>
          <div>
            <TextField
              id="standard-multiline-flexible"
              label="Title"
              multiline
              maxRows={4}
              value={title}
              placeholder="Enter Title"
              onChange={(e) => setTitle(e.target.value)}
              sx={{ marginBottom: "10px" }}
            />
          </div>
          <div>
            <TextField
              id="outlined-multiline-static"
              label="Content"
              multiline
              required
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter note content"
              sx={{ marginBottom: "10px" }}
            />
          </div>
          <Button type="submit" variant="contained">
            Create Note
          </Button>
        </form>
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
