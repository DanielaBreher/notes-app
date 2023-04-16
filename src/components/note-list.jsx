import Grid from "@mui/material/Unstable_Grid2";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Note } from "./note";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const NoteList = ({ notes, handleItemClick, handleDeleteNote }) => {
  return notes
    .filter((note) => !note.archived)
    .map((note) => (
      <Grid xs={2} sm={4} md={3} key={note.id}>
        <Item onClick={() => handleItemClick(note.id)}>
          <Note note={note} handleDeleteNote={handleDeleteNote} />
        </Item>
      </Grid>
    ));
};
