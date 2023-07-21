import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Cpassword, setCpassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch("https://mern-todo-server-rv4m.onrender.com/register", {
      method: "POST",
      body: JSON.stringify({
        name: Name,
        email: Email,
        password: Password,
        cpassword: Cpassword,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(() => {
        console.log("User registered sucessfully!");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.message);
        alert(`logIn failed, ${err.message}!!`);
      });
  };

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
      console.log(data);

      navigate("/");

      if (!res.status === 200) {
        navigate("/register");
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error.message);
      navigate("/register");
    }
  };

  useEffect(() => {
    userAuthenticated();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        method="POST"
        onSubmit={handleSubmit}
        className="flex flex-col text-white"
      >
        <input
          type="text"
          placeholder="name"
          value={Name}
          onChange={(e) => setName(e.target.value)}
          className="text-lg p-3 rounded-lg outline-none m-3 bg-[#394963]"
        />
        <input
          type="text"
          placeholder="email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-lg p-3 rounded-lg outline-none m-3 bg-[#394963]"
        />
        <input
          type="password"
          placeholder="password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-lg p-3 rounded-lg outline-none m-3 bg-[#394963]"
        />
        <input
          type="password"
          placeholder="confirm password"
          value={Cpassword}
          onChange={(e) => setCpassword(e.target.value)}
          className="text-lg p-3 rounded-lg outline-none m-3 bg-[#394963]"
        />

        <button
          type="submit"
          className="rounded-full bg-blue-500 text-white m-3 py-3 mx-10"
        >
          Register
        </button>
        <div className="flex">
          <h3 className="mr-2">Already have an account? </h3>
          <Link className="text-blue-500 underline" to={"/login"}>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
