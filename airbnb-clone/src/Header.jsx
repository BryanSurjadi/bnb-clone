import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./userContext";

export default function Header() {
  const { user } = useContext(UserContext);
  return (
    <header className="mb-4 flex justify-between pl-6">
      <Link to={"/"} href="" className="flex items-center gap-2 justify-center">
        <img src="/logobnb.png" alt="" className="size-10" />
        <span className="font-bold text-2xl text-primary">AirBrY</span>
      </Link>

      <div className="flex justify-between gap-4 border border-gray-300 rounded-full py-2 px-4 items-center shadow-md shadow-gray-300">
        <div className="text-lg">Location</div>
        <div className="border-l h-8 border-gray-300"></div>
        <div className="text-lg">Date</div>
        <div className="border-l h-8 border-gray-300"></div>
        <div className="text-lg">Guests</div>
        <button className="bg-primary text-white font-bold w-full p-3 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>

      <div className="flex justify-between gap-4 border border-gray-300 rounded-full py-2 px-4 items-center font-bold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <Link
          to={user ? "/account" : "/login"}
          className="text-white bg-gray-500 rounded-full border border-gray-500 overflow-hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-8 relative top-1"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
        {!!user && <div>{user.name}</div>}
      </div>
    </header>
  );
}
