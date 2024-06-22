import { useContext } from "react";
import { UserContext } from "../userContext";
import { Link, useParams } from "react-router-dom";

export function AccountPage() {
  const { ready, user } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  if (!ready) return <div>Waiting...</div>;
  if (ready && !user) return <Navigate to="/login" />;

  function linkClasses(type) {
    let base = "py-4 px-6 transition-all duration-300 ease-in-out";
    if (type === subpage) {
      base += " bg-primary text-white rounded-full shadow-md shadow-gray-300 ";
    } else {
      base +=
        " hover:bg-primary hover:text-slate-400 hover:scale-105 hover:rounded-full hover:shadow-md hover:shadow-gray-300";
    }
    return base;
  }

  return (
    console.log(linkClasses("bookings")),
    console.log(subpage),
    (
      <nav className="flex mt-10  gap-16 font-semibold text-grey-300 justify-center text-xl w-full h-full items-center ">
        <Link to={"/account"} className={linkClasses("profile")}>
          Profile
        </Link>
        <Link to={"/account/bookings"} className={linkClasses("bookings")}>
          Bookings
        </Link>
        <Link
          to={"/account/accomodations"}
          className={linkClasses("accomodations")}
        >
          Your Accomodations
        </Link>
      </nav>
    )
    // <div>
    //   Test account page, Hello{user.name} <div>Niggy</div>
    // </div>
  );
}
