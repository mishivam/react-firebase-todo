import React from "react";
import "./ToDo.css";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tooltip,
  Modal,
  Backdrop,
  makeStyles,
  ButtonGroup,
  Input,
  Fade,
  Button,
} from "@material-ui/core";
import { Edit, HighlightOff } from "@material-ui/icons";
import db from "./firebase";
import "./App.css";
import firebase from "firebase";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function ToDoComponent(props) {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState(props.todo.todo);
  const classes = useStyles();

  const deleteTodos = async (event) => {
    await db.collection("Todos").doc(props.todo.id).delete();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const updateTodo = async () => {
    await db.collection("Todos").doc(props.todo.id).set(
      {
        ToDo: input,
      },
      { merge: true }
    );
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        className={classes.modal}
        onClose={(e) => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 400,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2>Update Todo</h2>
            <Input
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <ButtonGroup aria-label="btn-grp">
              <Button variant="contained" onClick={(e) => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="contained" onClick={updateTodo} color="primary">
                Update
              </Button>
            </ButtonGroup>
          </div>
        </Fade>
      </Modal>

      <List className="todoComp">
        <ListItem>
          <ListItemText
            primary={"📃\u00A0" + props.todo.todo}
            secondary={"🕐\u00A0" + Date(props.todo.timestamp)}
          />
          <Tooltip title="Edit this todo ?">
            <IconButton aria-label="Edit" onClick={handleOpen}>
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Remove Todo">
            <IconButton aria-label="delete" onClick={deleteTodos}>
              <HighlightOff />
            </IconButton>
          </Tooltip>
        </ListItem>
      </List>
    </>
  );
}

export default ToDoComponent;
