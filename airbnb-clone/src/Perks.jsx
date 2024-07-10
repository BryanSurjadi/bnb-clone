export default function Perks({ selected, onChange }) {
  function handleClick(e) {
    const { name, checked } = e.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange(selected.filter((item) => item !== name));
    }

    console.log([selected]);
  }

  return (
    <div className="grid grid-cols-3 md:grid-cols-4  gap-2 mt-3">
      <label className="flex border p-4 gap-4 items-center cursor-pointer">
        <input
          type="checkbox"
          name="wifi"
          onChange={handleClick}
          checked={selected.includes("wifi")}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M1.371 8.143c5.858-5.857 15.356-5.857 21.213 0a.75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.06 0c-4.98-4.979-13.053-4.979-18.032 0a.75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.182 3.182c4.1-4.1 10.749-4.1 14.85 0a.75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.062 0 8.25 8.25 0 0 0-11.667 0 .75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.204 3.182a6 6 0 0 1 8.486 0 .75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.061 0 3.75 3.75 0 0 0-5.304 0 .75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.182 3.182a1.5 1.5 0 0 1 2.122 0 .75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.061 0l-.53-.53a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
        <span>Wifi</span>
      </label>
      <label className="flex border p-4 gap-4 items-center cursor-pointer">
        <input
          type="checkbox"
          name="car"
          onChange={handleClick}
          checked={selected.includes("car")}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 1 1 6 0h3a.75.75 0 0 0 .75-.75V15Z" />
          <path d="M8.25 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0ZM15.75 6.75a.75.75 0 0 0-.75.75v11.25c0 .087.015.17.042.248a3 3 0 0 1 5.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 0 0-3.732-10.104 1.837 1.837 0 0 0-1.47-.725H15.75Z" />
          <path d="M19.5 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
        </svg>
        <span>Car Port</span>
      </label>
      <label className="flex border p-4 gap-4 items-center cursor-pointer">
        <input
          type="checkbox"
          name="pool"
          onChange={handleClick}
          checked={selected.includes("pool")}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="size-6"
        >
          <path
            fill="currentColor"
            d="M2 18v-2q.95 0 1.413-.5T5.35 15t1.938.5t1.362.5q.95 0 1.413-.5T12 15q1.425 0 1.938.5t1.412.5q.95 0 1.388-.5t1.912-.5t1.938.5T22 16v2q-1.425 0-1.937-.5T18.65 17t-1.362.5t-1.938.5q-1.425 0-1.937-.5T12 17q-.95 0-1.412.5T8.65 18t-1.912-.5T5.35 17t-1.412.5T2 18m0-4v-2q.95 0 1.413-.5T5.35 11q1.425 0 1.913.5t1.387.5q.95 0 1.412-.5T12 11q1.425 0 1.925.5t1.375.5q.95 0 1.412-.5t1.938-.5q1.425 0 1.938.5T22 12v2q-1.475 0-1.963-.5T18.65 13t-1.362.5t-1.938.5q-1.425 0-1.937-.5T12 13q-.95 0-1.388.5T8.7 14t-1.962-.5T5.35 13t-1.412.5T2 14m0-4V8q.95 0 1.413-.5T5.35 7q1.425 0 1.913.5T8.65 8q.95 0 1.412-.5T12 7q1.425 0 1.925.5T15.3 8q.95 0 1.412-.5T18.65 7q1.425 0 1.938.5T22 8v2q-1.475 0-1.963-.5T18.65 9t-1.362.5t-1.938.5q-1.425 0-1.937-.5T12 9q-.95 0-1.388.5T8.7 10t-1.962-.5T5.35 9t-1.412.5T2 10"
          ></path>
        </svg>
        <span>Swimming Pool</span>
      </label>
      <label className="flex border p-4 gap-4 items-center cursor-pointer">
        <input
          type="checkbox"
          name="tv"
          onChange={handleClick}
          checked={selected.includes("tv")}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path d="M19.5 6h-15v9h15V6Z" />
          <path
            fillRule="evenodd"
            d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v11.25C1.5 17.16 2.34 18 3.375 18H9.75v1.5H6A.75.75 0 0 0 6 21h12a.75.75 0 0 0 0-1.5h-3.75V18h6.375c1.035 0 1.875-.84 1.875-1.875V4.875C22.5 3.839 21.66 3 20.625 3H3.375Zm0 13.5h17.25a.375.375 0 0 0 .375-.375V4.875a.375.375 0 0 0-.375-.375H3.375A.375.375 0 0 0 3 4.875v11.25c0 .207.168.375.375.375Z"
            clipRule="evenodd"
          />
        </svg>

        <span>TV</span>
      </label>
      <label className="flex border p-4 gap-4 items-center cursor-pointer">
        <input
          type="checkbox"
          name="pets"
          onChange={handleClick}
          checked={selected.includes("pets")}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-6"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M18 4c-1.71 0-2.75.33-3.35.61C13.88 4.23 13 4 12 4s-1.88.23-2.65.61C8.75 4.33 7.71 4 6 4c-3 0-5 8-5 10c0 .83 1.32 1.59 3.14 1.9c.64 2.24 3.66 3.95 7.36 4.1v-4.28c-.59-.37-1.5-1.04-1.5-1.72c0-1 2-1 2-1s2 0 2 1c0 .68-.91 1.35-1.5 1.72V20c3.7-.15 6.72-1.86 7.36-4.1C21.68 15.59 23 14.83 23 14c0-2-2-10-5-10M4.15 13.87c-.5-.12-.89-.26-1.15-.37c.25-2.77 2.2-7.1 3.05-7.5c.54 0 .95.06 1.32.11c-2.1 2.31-2.93 5.93-3.22 7.76M9 12a1 1 0 0 1-1-1c0-.54.45-1 1-1a1 1 0 0 1 1 1c0 .56-.45 1-1 1m6 0a1 1 0 0 1-1-1c0-.54.45-1 1-1a1 1 0 0 1 1 1c0 .56-.45 1-1 1m4.85 1.87c-.29-1.83-1.12-5.45-3.22-7.76c.37-.05.78-.11 1.32-.11c.85.4 2.8 4.73 3.05 7.5c-.25.11-.64.25-1.15.37"
          ></path>
        </svg>
        <span>Pets Allowed</span>
      </label>
      <label className="flex border p-4 gap-4 items-center cursor-pointer">
        <input
          type="checkbox"
          name="balcony"
          onChange={handleClick}
          checked={selected.includes("balcony")}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-6"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 13v8m4-8v8m8-8v8m-4-8v8m8-8v8M2 21h20M2 13h20m-4-3V3.6a.6.6 0 0 0-.6-.6H6.6a.6.6 0 0 0-.6.6V10"
          ></path>
        </svg>
        <span>Balcony</span>
      </label>
    </div>
  );
}
