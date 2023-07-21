import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Todo from "../components/Todo";
import AddIcon from "@mui/icons-material/Add";

function Dashboard() {
  const navigate = useNavigate();
  const [User, setUser] = useState(null);
  const [Todos, setTodos] = useState(null);
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [TodoFetchCounter, setTodoFetchCounter] = useState(0);

  const userAuthenticated = async () => {
    try {
      const res = await fetch("/auth", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);
      setUser(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error.message);
      setUser(null);
      navigate("/login");
    }
  };

  useEffect(() => {
    userAuthenticated();
  }, []);

  const fetchTodos = async (userId) => {
    try {
      const res = await fetch("/todos", {
        method: "POST",
        body: JSON.stringify({
          userId,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      setTodos(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (User) {
      fetchTodos(User._id);
    }
  }, [User, TodoFetchCounter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch("/new", {
      method: "POST",
      body: JSON.stringify({
        _id: User._id,
        title: Title,
        description: Description,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(() => {
        console.log("todo added sucessful!");
        setTitle("");
        setDescription("");
        setTodoFetchCounter(TodoFetchCounter + 1);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="pt-5">
      <form
        className="flex flex-wrap justify-center mb-10"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap justify-center">
          <input
            type="text"
            placeholder="title"
            className="text-lg p-3 rounded-lg outline-none m-3 bg-[#394963]"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="description..."
            className="text-lg p-3 rounded-lg outline-none m-3 bg-[#394963]"
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">
          <AddIcon />
          <h1>Add Task</h1>
        </button>
      </form>

      {Todos &&
        Todos.map((e, i) => (
          <Todo
            TodoFetchCounter={TodoFetchCounter}
            setTodoFetchCounter={setTodoFetchCounter}
            title={e.title}
            description={e.description}
            key={e._id}
            todoId={e._id}
            userId={User._id}
            createdAt={e.createdAt}
            completed={e.completed}
          />
        ))}
    </div>
  );
}

export default Dashboard;
