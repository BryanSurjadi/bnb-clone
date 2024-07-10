import axios from "axios";
import { useEffect, useState } from "react";
import Perks from "../Perks";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function AccomodationForm() {
  const { id } = useParams();
  // console.log(id);
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
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/accomodations/${id}`).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDesc(data.desc);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckin(data.checkIn);
      setCheckout(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

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
    const accomodationData = {
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
    };

    if (id) {
      //do update
      try {
        await axios.put(`/accomodations/${id}`, {
          id,
          ...accomodationData,
        });
        alert("Accomodation Updated");
        setRedirect(true);
      } catch (err) {
        alert("Accomodation Update Failed");
      }
    } else {
      try {
        await axios.post("/accomodations", accomodationData);
        alert("Task successful");
        setRedirect(true);
      } catch (err) {
        alert("Task failed");
      }
    }
  }

  if (redirect) {
    navigate("/account/accomodations");
    window.location.reload();
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
        const { files } = response.data;
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
    <>
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
                      <div className="h-fill w-fill relative" key={link}>
                        <img
                          src={"http://localhost:3000/uploads/" + link}
                          className="h-full w-full object-cover rounded-xl border "
                        />
                        <button
                          className="translate-x-1/4 -translate-y-1/3 transform right-0 top-0 p-3 absolute rounded-2xl bg-primary text-white"
                          onClick={() =>
                            setAddedPhotos(
                              addedPhotos.filter((item) => item !== link)
                            )
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        {link === addedPhotos[0] && (
                          <div
                            className="-translate-x-10 -translate-y-1/3 transform right-0 top-0 p-3 absolute rounded-2xl bg-primary text-white"
                            onClick={() => setAddedPhotos([...addedPhotos])}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="size-6"
                            >
                              <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                              <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                            </svg>
                          </div>
                        )}
                        {link !== addedPhotos[0] && (
                          <div
                            className="-translate-x-10 -translate-y-1/3 transform right-0 top-0 p-3 absolute rounded-2xl bg-primary text-white"
                            onClick={() =>
                              setAddedPhotos((prev) => [
                                link,
                                ...prev.filter((item) => item !== link),
                                // add the removed item back to the start of the array
                              ])
                            }
                          >
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
                                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    ))}

                  <label className=" cursor-pointer border bg-transparent rounded-3xl text-gray-500 px-4 py-2 flex items-center gap-3 justify-center hover:bg-gray-200">
                    <input
                      type="file"
                      className="hidden"
                      multiple
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
                {inputHeader("Description", "Add a description of your place")}
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
    </>
  );
}
