import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration Successfull");
    } catch (e) {
      alert("Registration Failed, Email in use");
    }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center justify-around -mt-20">
      <div className="w-1/4 h-auto flex p-10 items-left border  rounded-xl shadow-md shadow-gray-300 flex-col ">
        <h1 className="text-6xl text-primary font-bold mb-10">Register</h1>
        <form className="flex flex-col gap-4 w-full" onSubmit={registerUser}>
          <div className="flex flex-col h-full w-full  rounded-3xl ">
            <label htmlFor="name" className="text-lg text-primary font-bold">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div className="flex flex-col h-full w-full  rounded-3xl ">
            <label htmlFor="email" className="text-lg text-primary font-bold">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              placeholder="example@email.com"
            />
          </div>
          <div className="flex flex-col h-full w-full  rounded-3xl ">
            <label
              htmlFor="passsword"
              className="text-lg text-primary font-bold"
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              placeholder="******"
            />
          </div>
          <button className="primary mt-4">Register</button>
        </form>
        <div className="text-center pt-6 text-lg text-gray-500">
          Already Have an account?
          <Link to={"/login"} className="text-primary font-bold">
            {" "}
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}
