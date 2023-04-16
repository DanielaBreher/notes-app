import Button from "@mui/material/Button";
import { useState } from "react";
import "./App.css";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Note } from "./components/note";
import { NoteForm } from "./components/note-form";
import { NoteList } from "./components/note-list";

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
  const [editModalNote, setEditModalNote] = useState(false);

  const [selectedNoteId, setSelectedNoteId] = useState();

  const handleCreateNote = (title, content) => {
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

  const handleUpdateNote = (id, title, content) => {
    setNotes((prevNotes) => {
      // duplicate the array
      const updatedNotes = [...prevNotes];
      const index = prevNotes.findIndex((n) => n.id === id);
      updatedNotes[index].title = title;
      updatedNotes[index].content = content;
      updatedNotes[index].updateDate = new Date();
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return updatedNotes;
    });

    setOpen(false);
    setEditModalNote(false);
  };

  const handleAddToArchive = () => {
    setNotes((prevNotes) => {
      // duplicate the array
      const updatedNotes = [...prevNotes];
      const index = prevNotes.findIndex((n) => n.id === selectedNoteId);
      updatedNotes[index].archived = true;
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return updatedNotes;
    });

    setOpen(false);
    setEditModalNote(false);
  };

  const handleDeleteNote = (id) => {
    const isApproved = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!isApproved) {
      setOpen(false);
      return;
    }
    setNotes((prevNotes) => {
      const notesAfterDeletion = prevNotes.filter((n) => n.id !== id);
      localStorage.setItem("notes", JSON.stringify(notesAfterDeletion));
      return notesAfterDeletion;
    });
    setOpen(false);
  };

  const handleItemClick = (id) => {
    setSelectedNoteId(id);
    setOpen(true);
  };

  const selectedNote = notes.find((n) => n.id === selectedNoteId);

  return (
    <div className="App">
      <header>
        <NoteForm handleCreateNote={handleCreateNote} />
      </header>
      <main>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <NoteList
            notes={notes}
            handleItemClick={handleItemClick}
            handleDeleteNote={handleDeleteNote}
          />
        </Grid>
      </main>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {editModalNote ? (
              <NoteForm
                mode="update"
                note={selectedNote}
                handleUpdateNote={handleUpdateNote}
              />
            ) : (
              <>
                <Note
                  note={notes.find((note) => note.id === selectedNoteId)}
                  handleDeleteNote={handleDeleteNote}
                />
                <Button
                  variant="contained"
                  onClick={() => setEditModalNote(true)}
                >
                  Edit Note
                </Button>
                <Button variant="contained" onClick={handleAddToArchive}>
                  Move to archive
                </Button>
              </>
            )}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default App;
