import { Button, List, ListItem, ListItemText } from "@mui/material";
import { doc, deleteDoc } from "firebase/firestore"; // Import deleteDoc and doc from firestore
import React from "react";
import db from "./firebase";

function Todo(props) {
  const handleDelete = async (id) => {
    // Create a document reference using the todo id
    const todoRef = doc(db, 'todos', id);
    await deleteDoc(todoRef); // Delete the document
  };

  return (
    <div>
      <List className="todo_list">
        {props.list.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemText primary={todo.todo} secondary="Deadline ⏱️"/>
            <Button onClick={() => handleDelete(todo.id)}>DELETE 🗑️</Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default Todo;
