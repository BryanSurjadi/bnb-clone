import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AccomodationPerk from "../AccomodationPerk";

export default function ListingPage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [viewPhotos, setViewPhotos] = useState(false);

  console.log(place);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/accomodations/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (viewPhotos) {
    return (
      <div className="text-3xl absolute left-0 top-0 h-auto w-full bg-black opacity-90 text-white flex justify-center">
        <div className="justify-around">
          <button
            className="font-semibold fixed top-10 right-10 p-2 flex items-center justify-center gap-2 rounded-2xl"
            onClick={() => setViewPhotos(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                clipRule="evenodd"
              />
            </svg>
            Close
          </button>
          <div className="grid grid-rows-1 inset-0 sm:grid-rows-2 md:grid-rows-3 lg:grid-rows-4 gap-2">
            {place.photos.length > 0 &&
              place.photos.map((photo) => (
                <div key={photo} className="w-auto h-auto object-cover ">
                  <img
                    className="h-7/8 w-full object-cover rounded placeholder-opacity-100"
                    src={`http://localhost:3000/uploads/${photo}`}
                    alt=""
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-2  w-full items-center justify-center flex ">
      {place !== null && (
        <div className="w-2/3 justify-center items-start flex flex-col ">
          <h1 className="font-semibold text-3xl">{place.title}</h1>

          {place.image !== null && (
            <div className="w-full mt-6 grid grid-cols-[1.5fr_0.75fr_0.75fr] gap-2 relative">
              <div className="row-span-2">
                <img
                  key={place.photos}
                  className="w-auto h-auto object-cover aspect-square rounded-tl-2xl rounded-bl-2xl"
                  src={`http://localhost:3000/uploads/${place.photos[0]}`}
                  alt=""
                />
              </div>
              <div className=" grid  ">
                <div className="overflow-hidden">
                  <img
                    key={place.photos}
                    className="w-auto h-auto object-cover aspect-square"
                    src={`http://localhost:3000/uploads/${place.photos[1]}`}
                    alt=""
                  />
                </div>
                <div className="overflow-hidden">
                  <img
                    key={place.photos}
                    className="w-auto h-auto object-cover aspect-square relative top-2"
                    src={`http://localhost:3000/uploads/${place.photos[2]}`}
                    alt=""
                  />
                </div>
              </div>
              <div className=" grid  ">
                <div className="overflow-hidden">
                  <img
                    key={place.photos}
                    className="w-auto h-auto object-cover aspect-square rounded-tr-2xl"
                    src={`http://localhost:3000/uploads/${place.photos[3]}`}
                    alt=""
                  />
                </div>
                <div className="overflow-hidden">
                  <img
                    key={place.photos}
                    className="w-auto h-auto object-cover aspect-square relative top-2  rounded-br-2xl"
                    src={`http://localhost:3000/uploads/${place.photos[4]}`}
                    alt=""
                  />
                </div>
              </div>
              <button
                className="absolute bottom-16 right-16 p-4 bg-gray-100 rounded-xl font-semibold border-slate-950 border shadow-slate-950 shadow-md flex  gap-1 "
                onClick={() => setViewPhotos(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                View All Photos
              </button>
            </div>
          )}
          <div className="mt-4 grid grid-cols-[2fr_1fr] justify-items-around w-full">
            <div className="flex flex-col justify-center items-start  ">
              <h2 className="text-2xl font-semibold ">{place.address}</h2>
              <div className="flex gap-2 justify-start items-start flex-col">
                <p className="font-small">
                  {place.maxGuests} guests &#x2022; $ {place.price}/nights
                </p>
                <hr className="w-5/6  my-4 border-2" />
                <p>
                  {" "}
                  Hosted By
                  <span className="font-bold"> {place.owner.name}</span>
                </p>
                <hr className="w-5/6  my-4 border-2" />
                <p className="font-small "> {place.desc}</p>
                <hr className="w-5/6  my-4 border-2" />
                <p>{place.extraInfo}</p>
                <div className="flex gap-6 flex-rows">
                  <p className="flex justify-center items-center gap-2">
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Checkin Time: {place.checkIn}
                  </p>
                  <p className="flex justify-center items-center gap-2">
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Checkout Time: {place.checkOut}
                  </p>
                  <p className="flex justify-center items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-5 mr-1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Maximum Number of Guests: {place.maxGuests}
                  </p>
                </div>
                <hr className="w-5/6  my-4 border-2" />
                <div className="font-bold text-2xl">What You'll Get</div>
                <AccomodationPerk
                  selectedPerks={place.perks}
                ></AccomodationPerk>
              </div>
            </div>
            <div className="flex flex-col gap-2 bg-blue-500">
              Buat price dll
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
