import { Button, TextField } from "@mui/material";
import { useState } from "react";

export const NoteForm = ({
  handleCreateNote,
  handleUpdateNote,
  note,
  mode = "create",
}) => {
  const [content, setContent] = useState(note?.content || "");
  const [title, setTitle] = useState(note?.title || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "create") {
      handleCreateNote(title, content);
    } else {
      handleUpdateNote(note.id, title, content);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
          minRows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter note content"
          sx={{ marginBottom: "10px" }}
        />
      </div>
      <Button type="submit" variant="contained">
        {mode === "create" ? "Create Note" : "Save Note"}
      </Button>
    </form>
  );
};
