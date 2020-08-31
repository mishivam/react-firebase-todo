import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Container,
} from "@material-ui/core";
import "./App.css";
import ToDoComponent from "./ToDoComponent";
import db from "./firebase";
import firebase from "firebase";

function App() {
  //hooks
  const [allTodos, setAllTodods] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    db.collection("Todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setAllTodods(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().ToDo,
            timestamp: doc.data().timestamp,
          }))
        );
      });
  }, []);

  console.log(allTodos);

  const addTodos = (event) => {
    event.preventDefault(); //this will not let the browser automatically refresh the browser when submitting the form...
    db.collection("Todos").add({
      ToDo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setAllTodods([...allTodos, input]);
    setInput("");
  };
  return (
    <div className="App">
      <Container maxWidth="md">
        <h1>
          Add Todos!..<span>🚀</span>
        </h1>
        <br />
        <br />
        <form className="mainContainer">
          <FormControl>
            <InputLabel>Enter Todos...</InputLabel>
            <Input
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
          </FormControl>
          <Button
            type="submit"
            onClick={addTodos}
            disabled={!input}
            variant="contained"
            color="primary"
          >
            Add Todo
          </Button>
          {/* <button type='submit' onClick={addTodos}>Add Todo</button> */}
        </form>
        <br />
        <br />
        <ul className="todolist">
          {allTodos.map((todoItem) => (
            <ToDoComponent todo={todoItem} />
          ))}
        </ul>
      </Container>
    </div>
  );
}

export default App;
