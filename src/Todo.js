import { List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import React from "react";

function Todo(props) {
  return (
    <div>
      <ul>
        {props.list.map((todo) => (
          <List className="todo_list">
            <ListItem>
              <ListItemAvatar></ListItemAvatar>
              <ListItemText primary={todo} secondary="Dummy Deadline ⏱️"/>
            </ListItem>
          </List>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
