import React, { useEffect, useState } from "react";
import { Button, InputLabel } from "@mui/material";
import { FormControl } from "@mui/material";
import { Input } from "@mui/material";

import "./App.css";
import Todo from "./Todo";
import { collection, onSnapshot, addDoc, serverTimestamp, query, orderBy } from "firebase/firestore"; // Import addDoc for adding documents
import db from "./firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const todosCollection = query(collection(db, 'todos'), orderBy('timestamp', 'asc')); // Correct usage of orderBy
    const unsubscribe = onSnapshot(todosCollection, (snapshot) => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo}))); // Include the document ID
    });
    return () => unsubscribe();
  }, []);

  const addTodo = async (event) => {
    event.preventDefault(); // prevent default submit action

    // Add a new todo to the 'todos' collection in Firestore
    await addDoc(collection(db, 'todos'), {
      todo: input,
      timestamp: serverTimestamp()
    });

    setInput("");
  };

  return (
    <div className="App">
      <h1>Creating a Todo App🍻</h1>

      <FormControl>
        <InputLabel>Write a Todo</InputLabel>
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
      </FormControl>
      
      <Button variant="contained" type="submit" onClick={addTodo} disabled={!input}>Add Todo</Button>

      <Todo list={todos} />
    </div>
  );
}

export default App;
