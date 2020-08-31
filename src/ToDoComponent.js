import React from "react";
import "./ToDo.css";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { HighlightOff } from "@material-ui/icons";
import db from "./firebase";
import "./App.css";

function ToDoComponent(props) {
  const deleteTodos = async (event) => {
    await db.collection("Todos").doc(props.todo.id).delete();
  };

  return (
    <div>
      <List className="todoComp">
        <ListItem>
          <ListItemText
            primary={"📃\u00A0" + props.todo.todo}
            secondary={"🕐\u00A0" + Date(props.todo.timestamp)}
          />
          <Tooltip title="Remove Todo">
            <IconButton aria-label="delete" onClick={deleteTodos}>
              <HighlightOff />
            </IconButton>
          </Tooltip>
        </ListItem>
      </List>
    </div>
  );
}

export default ToDoComponent;
