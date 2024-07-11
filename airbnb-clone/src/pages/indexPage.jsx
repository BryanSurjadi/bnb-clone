import axios from "axios";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const [listing, setListing] = useState([]);
  useEffect(() => {
    axios.get("places").then((response) => {
      setListing(response.data);
    });
  });
  return (
    <div className="grid grid-cols-3 gap-y-8 gap-x-4 md:grid-cols-4 lg:grid-cols-6 py-10 px-10">
      {listing.length > 0 &&
        listing.map((listing) => (
          <div className="flex flex-col cursor-pointer">
            <img
              src={`http://localhost:3000/uploads/${listing.photos[0]}`}
              className="h-72 w-fill object-cover rounded-2xl mb-4"
            ></img>
            <div className="text-black text-lg font-semibold flex flex-row justify-between flex-3/4 pb-2">
              {listing.address}
              <div className="text-gray-400 flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 mr-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                    clipRule="evenodd"
                  />
                </svg>
                {listing.maxGuests}
              </div>
            </div>
            <span className="text-sm  text-gray-400 ">{listing.title}</span>
            <span className="text-md font-semibold text-black flex-right pt-1">
              $ {listing.price} / nights
            </span>
          </div>
        ))}
    </div>
  );
}
