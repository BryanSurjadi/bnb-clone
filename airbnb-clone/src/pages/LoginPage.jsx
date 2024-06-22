import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../userContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { setUser } = useContext(UserContext);
  async function handleLogin(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post("/login", {
        email,
        password,
      });
      if (response.data.success) {
        setUser(response.data.user);
        alert("Login Successful");
        setRedirect(true);
      } else {
        alert("Login Failed: " + response.data.message);
      }
    } catch (e) {
      alert("Login Failed: " + e.response.data.message);
    }
  }

  //klo bener user pw ny redirect ke sni
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="w-full h-screen flex justify-center items-center justify-around -mt-20">
      <div className="w-1/4 h-auto flex p-10 items-left border  rounded-xl shadow-md shadow-gray-300 flex-col ">
        <h1 className="text-6xl text-primary font-bold mb-10">Login</h1>
        <form className="flex flex-col gap-4 w-full" onSubmit={handleLogin}>
          <div className="flex flex-col h-full w-full  rounded-3xl ">
            <label htmlFor="email" className="text-lg text-primary font-bold">
              Email
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
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
              placeholder="******"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </div>
          <button className="primary mt-4">Login</button>
        </form>
        <div className="text-center pt-6 text-lg text-gray-500">
          Don't Have an account?
          <Link to={"/register"} className="text-primary font-bold">
            {" "}
            Sign Up here
          </Link>
        </div>
      </div>
    </div>
  );
}
