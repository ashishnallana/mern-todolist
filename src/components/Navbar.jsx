import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [User, setUser] = useState(null);

  const navigate = useNavigate();

  const userAuthenticated = async () => {
    try {
      const res = await fetch(
        "https://mern-todo-server-rv4m.onrender.com/auth",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await res.json();
      setUser(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = () => {
    fetch("https://mern-todo-server-rv4m.onrender.com/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        navigate("/login");
        setUser(null);
        if (!res.status === 200) {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    userAuthenticated();
  }, []);

  return (
    <div className="flex justify-between items-center px-3 py-2 bg-black">
      <h1 className="text-2xl font-bold">TODOLIST</h1>
      <div className="flex items-center">
        {User && (
          <div className="text-right cursor-pointer ml-5" onClick={logout}>
            <p className="text-sm opacity-50 ease-linear hover:opacity-80">
              {User ? "Logout" : "Login"}
            </p>
            <h2 className="text-sm">{User ? User.name : "Guest"}</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
