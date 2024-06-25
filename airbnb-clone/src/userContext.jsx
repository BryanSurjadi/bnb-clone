import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!user) {
      axios
        .get("/profile", { withCredentials: true })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Failed to fetch profile:", error);
          setUser(null);
        })
        .finally(() => setReady(true));
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
