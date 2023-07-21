import React, { useState } from "react";
import dayjs from "dayjs";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditBox from "./EditBox";

function Todo({
  title,
  description,
  todoId,
  userId,
  createdAt,
  completed,
  TodoFetchCounter,
  setTodoFetchCounter,
}) {
  const [Checked, setChecked] = useState(completed);
  const [ShowEditbox, setShowEditbox] = useState(false);

  const todoStatus = async () => {
    try {
      const res = await fetch(!Checked ? "/complete" : "/undocomplete", {
        method: "POST",
        body: JSON.stringify({
          userId,
          todoId,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteTodo = async () => {
    try {
      const res = await fetch("/delete", {
        method: "POST",
        body: JSON.stringify({
          userId,
          todoId,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      setTodoFetchCounter(TodoFetchCounter + 1);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-[#2a3547] p-5 m-5 rounded-xl flex flex-col">
      <div className="bg-[#202734] mb-3 p-3 rounded-lg pl-5">
        <h1 className="text-5xl font-bold mb-4">{title}</h1>
        <p className="text-lg">{description}</p>
      </div>
      <div className="flex justify-between">
        <div className=" flex items-center flex-wrap rounded-lg p-2 pl-3 bg-[#202734] mr-5">
          <FormControlLabel
            className="mx-2 pl-5"
            control={
              <Checkbox
                checked={Checked}
                onClick={() => {
                  todoStatus();
                  if (Checked === true) setChecked(false);
                  else setChecked(true);
                }}
                color="success"
                className="text-sm"
              />
            }
            label={Checked ? "Mark as not done!" : "Mark as done!"}
          />
          <div
            className="flex m-2 cursor-pointer"
            onClick={() => setShowEditbox(true)}
          >
            <EditIcon className="mx-2" />
            <p>Edit</p>
          </div>
          <div className="flex m-2 cursor-pointer" onClick={deleteTodo}>
            <DeleteIcon className="mx-2" />
            <p>Delete</p>
          </div>
        </div>
        <p className="text-sm text-right flex flex-col items-end">
          <span className="bg-blue-500 px-2 py-1 mb-3 rounded-lg">
            {createdAt && dayjs(createdAt).format("HH:mm")}
          </span>
          <span className="bg-blue-500 px-2 py-1 rounded-lg">
            {createdAt && dayjs(createdAt).format("DD MMMM YYYY")}
          </span>
        </p>
      </div>
      {ShowEditbox && (
        <EditBox
          TodoFetchCounter={TodoFetchCounter}
          setTodoFetchCounter={setTodoFetchCounter}
          title={title}
          description={description}
          setShowEditbox={setShowEditbox}
          userId={userId}
          todoId={todoId}
        />
      )}
    </div>
  );
}

export default Todo;
