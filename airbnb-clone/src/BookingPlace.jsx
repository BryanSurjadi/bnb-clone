import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function BookingPlace({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [price, setPrice] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [id, setId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const threeDays = new Date();
    threeDays.setDate(threeDays.getDate() + 3);
    const defaultCO = threeDays.toISOString().split("T")[0];

    setCheckIn(today);
    setCheckOut(defaultCO);
  }, []);

  useEffect(() => {
    if (checkIn && checkOut) {
      const date1 = new Date(checkIn);
      const date2 = new Date(checkOut);
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setPrice(diffDays * place.price);
    }
  }, [checkIn, checkOut, place.price]);

  async function handleSubmit(e) {
    e.preventDefault();
    const booking = {
      place: place._id,
      checkIn,
      checkOut,
      guests,
      price,
      name,
      phone,
    };

    try {
      const response = await axios.post("/bookings", booking);
      console.log(response.data);
      setId(response.data._id);
      alert("Accomodations Booked");
      setRedirect(true);
    } catch (err) {
      console.log(err);
    }
  }

  if (redirect) {
    navigate(`/account/bookings/${id}`);
    window.location.reload();
  }

  return (
    <form
      className="shadow-md shadow-gray-400 rounded-3xl font-semibold gap-0 h-auto w-full opacity-100 flex flex-col "
      onSubmit={handleSubmit}
    >
      <p className="text-2xl h-auto w-full justify-start  p-6 items-end ">
        $ {place.price}{" "}
        <span className=" text-gray-500 font-normal text-base">/ night</span>
      </p>
      <div className="w-full p-6  flex flex-col  ">
        <div className="grid grid-cols-2 ">
          <div className="border border-gray-300 rounded-tl-2xl font-normal  p-4 ">
            Check-in
            <input
              type="date"
              value={checkIn}
              className=" m-0 p-2 w-full "
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="border border-gray-300 rounded-tr-2xl  font-normal p-4">
            Check-out
            <input
              type="date"
              className=" m-0 p-2 w-full "
              onChange={(e) => setCheckOut(e.target.value)}
              value={checkOut}
            />
          </div>
        </div>
        <div className="border border-gray-300  rounded-br-2xl rounded-bl-2xl  p-4">
          <div>
            Number of Guests
            <input
              type="number"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
          </div>
          <div>
            Name
            <input
              type="text"
              value={name}
              placeholder="John"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            Phone Number
            <input
              type="text"
              placeholder="082113461154"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
      </div>
      <button
        className="text-white bg-primary w-auto mx-6  rounded-2xl -mt-4 items-center p-6"
        type="submit"
      >
        Reserve
      </button>
      <p className="pl-6 text-small font-thin">*You won't be charged yet</p>
      <hr className="w-5/6  ml-6 my-4 border-2" />

      <p className="h-10 text-xl justify-around flex">
        <span className="underline">
          {" "}
          ${place.price} x{" "}
          {Math.ceil(
            (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
          )}{" "}
          nights
          {/*  it should be dates depending on the check in and check out , and i want to put default date as today for checkin and 3 days for checkout like set the state for that  */}{" "}
        </span>
        <span className="font-bold "> $ {price}</span>
      </p>
    </form>
  );
}
