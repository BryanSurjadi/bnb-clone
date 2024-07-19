import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

const BookingDetailsPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get(`/bookings/${id}`);
        setBooking(response.data);
      } catch (err) {
        console.error("Error fetching booking details:", err);
      }
    };

    fetchBooking();
  }, [id]);

  if (!booking) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Booking Details</h1>
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-2xl font-semibold mb-2">{booking.place.title}</h2>
        <p className="text-gray-600 mb-4">{booking.place.address}</p>
        <img
          src={"http://localhost:3000/uploads/" + booking.place.photos[0]}
          className="w-full h-full object-cover rounded-lg mb-4"
        />
        <p className="text-lg">
          <span className="font-semibold">Check-in:</span>{" "}
          {format(new Date(booking.checkIn), "yyyy-MM-dd")}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Check-out:</span>{" "}
          {format(new Date(booking.checkOut), "yyyy-MM-dd")}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Guests:</span> {booking.guests}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Total Price:</span> ${booking.price}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Booked by:</span> {booking.name}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Contact:</span> {booking.phone}
        </p>
      </div>
    </div>
  );
};

export default BookingDetailsPage;
