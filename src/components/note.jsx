import { Button } from "@mui/material";

export const Note = ({ note, handleDeleteNote }) => {
  if (!note) {
    return null;
  }
  const handleDelete = (e) => {
    e.stopPropagation();
    handleDeleteNote(note.id);
  };

  return (
    <>
      <div>{note.date.toString().slice(0, 21)}</div>
      <div>{note.title}</div>
      <div>{note.content}</div>
      <Button onClick={handleDelete} variant="contained" color="error">
        Delete
      </Button>
    </>
  );
};
