import { useContext, useState } from "react";
import { UserContext } from "../userContext";
import { Link, Navigate, redirect, useParams } from "react-router-dom";
import axios from "axios";
import AccomodationPage from "./AccomodationPage";

export function AccountPage() {
  const [Redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  if (!ready) return <div>Waiting...</div>;
  if (ready && !user && !Redirect) return <Navigate to="/login" />;

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  if (Redirect) {
    return <Navigate to={Redirect} />;
  }

  function linkClasses(type) {
    let base =
      "py-4 px-6 transition-all duration-300 ease-in-out flex items-center gap-1";
    if (type === subpage) {
      base += " bg-primary text-white rounded-full shadow-md shadow-gray-300 ";
    } else {
      base +=
        " hover:bg-primary hover:text-slate-400 hover:scale-105 hover:rounded-full shadow-md shadow-gray-400 bg-gray-300 rounded-full font-medium text-slate-600";
    }
    return base;
  }

  return (
    <div>
      <nav className="flex mt-10  gap-16 font-semibold text-grey-300 justify-center text-xl w-full h-full items-center mb-6">
        <Link to={"/account"} className={linkClasses("profile")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-7"
          >
            <path
              fillRule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              clipRule="evenodd"
            />
          </svg>
          Profile
        </Link>
        <Link to={"/account/bookings"} className={linkClasses("bookings")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-7"
          >
            <path
              fillRule="evenodd"
              d="M2.625 6.75a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0A.75.75 0 0 1 8.25 6h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM2.625 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12A.75.75 0 0 1 7.5 12Zm-4.875 5.25a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75Z"
              clipRule="evenodd"
            />
          </svg>
          Bookings
        </Link>
        <Link
          to={"/account/accomodations"}
          className={linkClasses("accomodations")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-8 mr-2"
          >
            <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
            <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
          </svg>
          Your Accomodations
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className="flex justify-center h-full w-full">
          <div className=" flex justify-start text-xl font-bold gap-4 flex-col items-left">
            <div>
              {" "}
              <span className="self-center">Hello </span>
              <span className="text-primary text-3xl pb-2">{user.name}</span>
            </div>
            <div>Email: {user.email}</div>
            <button
              onClick={logout}
              className="text-xl p-2 bg-primary text-white rounded-full"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {subpage === "accomodations" && <AccomodationPage />}
    </div>
  );
}
