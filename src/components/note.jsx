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
      <div>{new Date(note.date).toLocaleString("en-GB")}</div>
      <div>{note.title}</div>
      <div>{note.content}</div>
      {note.updateDate ? (
        <div>
          Updated at: {new Date(note.updateDate).toLocaleString("en-GB")}
        </div>
      ) : null}
      <Button onClick={handleDelete} variant="contained" color="error">
        Delete
      </Button>
    </>
  );
};
