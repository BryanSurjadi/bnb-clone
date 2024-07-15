// src/pages/BookingDetailsPage.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
    <div>
      <h1>Booking Details</h1>
      <p>Place: {booking.place}</p>
      <p>Check-in: {booking.checkIn}</p>
      <p>Check-out: {booking.checkOut}</p>
      <p>Guests: {booking.guests}</p>
      <p>Price: ${booking.price}</p>
      <p>Name: {booking.name}</p>
      <p>Phone: {booking.phone}</p>
    </div>
  );
};

export default BookingDetailsPage;
