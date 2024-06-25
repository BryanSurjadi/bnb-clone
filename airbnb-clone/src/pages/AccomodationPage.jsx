import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from "axios";

export default function AccomodationPage() {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photoLink, setPhotoLink] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [desc, setDesc] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [price, setPrice] = useState("");
  const [redirect, setRedirect] = useState(false);

  function inputLabel(text) {
    return (
      <label
        // htmlFor="email"
        className="text-3xl text-primary font-bold"
      >
        {text}
      </label>
    );
  }

  function inputDetails(text) {
    return <span className="text-sm text-gray-400 font-semibold">{text}</span>;
  }

  function inputHeader(label, desc) {
    return (
      <div className="flex flex-col">
        {inputLabel(label)}
        {inputDetails(desc)}
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post("/accomodations", {
        title,
        address,
        photos: addedPhotos,
        desc,
        perks,
        extraInfo,
        checkIn: checkin,
        checkOut: checkout,
        maxGuests,
        price,
      });
      alert("Task successful");
      setRedirect(true);
    } catch (err) {
      alert("Task failed");
    }
  }

  if (redirect) {
    return <Navigate to={"/account/accomodations/"} />;
  }

  async function uploadLink(ev) {
    ev.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    setAddedPhotos((prev) => {
      return [...prev, filename];
    });

    setPhotoLink("");
  }

  function uploadDevice(ev) {
    ev.preventDefault();
    const files = ev.target.files;
    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    axios
      .post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const { files } = response.data; // Assuming response.data is { files: [...] }
        if (Array.isArray(files)) {
          setAddedPhotos((prev) => [...prev, ...files]);
        } else {
          console.error("Unexpected response from server:", files);
        }
      })
      .catch((error) => {
        console.error("Error uploading files:", error);
      });
  }

  return (
    <div>
      {action !== "new" && (
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
          <div className="text-3xl">
            Testing ma nigga // my list of owned accomodation goes here
          </div>
        </div>
      )}

      {action === "new" && (
        <div>
          <div className="w-full h-fill flex justify-around mt-10">
            <div className="w-5/6 h-fill flex p-10 items-left border  rounded-xl shadow-md shadow-gray-300 flex-col ">
              <h1 className="text-6xl text-primary font-bold mb-10">
                Insert New Place
              </h1>
              <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
                <div className="flex flex-col">
                  {inputHeader("Title", "Add a title to your listing")}
                  <input
                    type="text"
                    placeholder="example: 3 Bedroom Villa in Bali"
                    value={title}
                    onChange={(ev) => setTitle(ev.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  {inputHeader("Address", "Add the address of your place")}
                  <input
                    type="text"
                    placeholder="example: Jl. Cempaka, Banjar Kumbuh, MAS, Kecamatan Ubud, Kabupaten Gianyar, Bali 80571"
                    value={address}
                    onChange={(ev) => setAddress(ev.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  {inputHeader(
                    "Photos",
                    "Add some pictures of your accomodation"
                  )}
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="Add using a link"
                      value={photoLink}
                      onChange={(ev) => setPhotoLink(ev.target.value)}
                    />
                    <button
                      className="border bg-gray-300 rounded-xl font-semibold  px-4 py-2 "
                      onClick={uploadLink}
                    >
                      Add&nbsp;Picture
                    </button>
                  </div>
                  <div className="mt-4 grid grid-cols-3 lg:grid-cols-6 md:grid-cols-4 gap-4 ">
                    {addedPhotos.length > 0 &&
                      addedPhotos.map((link) => (
                        <div className="h-fill w-fill" key={link}>
                          <img
                            src={"http://localhost:3000/uploads/" + link}
                            className="h-full w-full object-cover rounded-xl border "
                          />
                        </div>
                      ))}

                    <label className=" cursor-pointer border bg-transparent rounded-3xl text-gray-500 px-4 py-2 flex items-center gap-3 justify-center">
                      <input
                        type="file"
                        className="hidden"
                        onChange={uploadDevice}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-8 pr-2 border-r h-8 border-gray-300 "
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Upload
                    </label>
                  </div>
                </div>
                <div className="flex flex-col">
                  {inputHeader(
                    "Description",
                    "Add a description of your place"
                  )}
                  <textarea
                    value={desc}
                    onChange={(ev) => setDesc(ev.target.value)}
                  ></textarea>
                </div>
                <div className="flex flex-col">
                  {inputHeader("Perks", "Add the proper perks of your place")}
                  <Perks selected={perks} onChange={setPerks} />
                </div>
                <div className="flex flex-col">
                  {inputHeader(
                    "Additional Information",
                    "Add additional information of your accomodation such as house rules"
                  )}
                  <textarea
                    value={extraInfo}
                    onChange={(ev) => setExtraInfo(ev.target.value)}
                  ></textarea>
                </div>
                <div className="flex flex-col">
                  {inputHeader(
                    "Check-in, Check-out, & Max Guests",
                    "Adds detailed information about the property's check-in time, check-out time, and maximum guest count."
                  )}
                  <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
                    <div>
                      <h3 className="text-lg mt-3 font-semibold">Check-in</h3>
                      <input
                        type="number"
                        value={checkin}
                        onChange={(ev) => setCheckin(ev.target.value)}
                        placeholder="11.00"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg mt-3 font-semibold">Check-out</h3>
                      <input
                        type="number"
                        value={checkout}
                        onChange={(ev) => setCheckout(ev.target.value)}
                        placeholder="13.00"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg mt-3 font-semibold">
                        Maximum number of guest
                      </h3>
                      <input
                        type="number"
                        value={maxGuests}
                        onChange={(ev) => setMaxGuests(ev.target.value)}
                        placeholder="2"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  {inputHeader(
                    "Price",
                    "Add the price / night of your accomodation"
                  )}
                  <input
                    type="text"
                    placeholder="example : 1000"
                    value={price}
                    onChange={(ev) => setPrice(ev.target.value)}
                  />
                </div>
                <button className="primary mt-4">Submit Accomodation</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
