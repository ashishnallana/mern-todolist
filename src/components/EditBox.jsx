import React, { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";

function EditBox({
  title,
  description,
  setShowEditbox,
  userId,
  todoId,
  TodoFetchCounter,
  setTodoFetchCounter,
}) {
  const [NewTitle, setNewTitle] = useState(title);
  const [NewDesc, setNewDesc] = useState(description);

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch("/edit", {
      method: "POST",
      body: JSON.stringify({
        userId,
        todoId,
        newTitle: NewTitle,
        newDesc: NewDesc,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(() => {
        console.log("todo update sucessful!");
        setShowEditbox(false);
        setTodoFetchCounter(TodoFetchCounter + 1);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="mt-5 rounded-lg py-3 bg-[#202734]">
      <form
        action=""
        className="flex flex-wrap justify-center "
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap justify-center">
          <input
            type="text"
            value={NewTitle}
            placeholder="Title"
            onChange={(e) => setNewTitle(e.target.value)}
            className="text-lg p-3 rounded-lg outline-none m-3 bg-[#394963]"
          />
          <input
            type="text"
            value={NewDesc}
            placeholder="Description"
            onChange={(e) => setNewDesc(e.target.value)}
            className="text-lg p-3 rounded-lg outline-none m-3 bg-[#394963]"
          />
        </div>
        <div className="flex">
          <button
            className="rounded-xl bg-blue-500 text-white  p-3 px-5 m-3"
            type="submit"
          >
            Submit
          </button>
          <button
            className="rounded-full bg-[#ff3434] text-white  p-3  m-3"
            onClick={() => setShowEditbox(false)}
          >
            <ClearIcon />
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditBox;
