import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AccomodationForm from "./AccomodationForm";

export default function AccomodationPage() {
  const { action } = useParams();
  const [accomodations, setAccomodations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccomodations = async () => {
      try {
        const response = await axios.get("/accomodations");
        setAccomodations(response.data);
      } catch (e) {
        alert("failed to fetch Accomodations");
      }
    };
    fetchAccomodations();
  }, []);

  const reduceDesc = (desc, length) => {
    if (desc.length > length) {
      return desc.substring(0, length) + "....";
    }
    return desc;
  };

  return (
    <div>
      {action !== "new" && action !== "edit" && (
        <div className="flex w-full h-full gap-6 flex-col items-center justify-center">
          <Link
            to="/account/accomodations/new"
            className=" flex text-xl py-4 px-6 bg-primary text-white rounded-full gap-2 items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-8"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                clipRule="evenodd"
              />
            </svg>
            Insert New Accomodations
          </Link>
          <div className=" w-full h-auto p-2 mt-4 grid grid-cols-5 md:grid-cols-3 gap-4 ">
            {accomodations.length > 0 &&
              accomodations.map((accomodations) => (
                <Link
                  to={`/account/accomodations/edit/${accomodations._id}`}
                  key={accomodations._id}
                  className="flex border rounded-2xl shadow-md shadow-gray-300 p-2 cursor-pointer bg-gray-50"
                >
                  <div className="w-62 h-48 shrink-0 overflow-hidden border rounded-xl">
                    <img
                      src={`http://localhost:3000/uploads/${accomodations.photos[0]}`}
                      className="w-full h-full object-cover rounded-xl shrink-0 "
                    />
                  </div>
                  <div className="ml-4 mt-2 text-2xl text-primary font-semibold flex flex-col justify-align items-left text-left">
                    {accomodations.title}
                    <span className="flex text-xl text-gray-500">
                      $ {accomodations.price}
                    </span>
                    <span className="flex text-sm  text-black">
                      {accomodations.address}
                    </span>
                    <span className="flex text-sm  text-gray-500">
                      {reduceDesc(accomodations.desc, 150)}
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
      {action === "new" && <AccomodationForm />}
      {action === "edit" && <AccomodationForm />}
    </div>
  );
}
