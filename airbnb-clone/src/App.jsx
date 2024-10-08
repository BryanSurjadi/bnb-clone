import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import LoginPage from "./pages/LoginPage";
import IndexPage from "./pages/indexPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./userContext";
import { AccountPage } from "./pages/AccountPage";
import ListingPage from "./pages/ListingPage";
import BookingDetailsPage from "./pages/BookingDetails";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account/:subpage?" element={<AccountPage />} />
          <Route path="/account/:subpage/:action" element={<AccountPage />} />
          <Route
            path="/account/:subpage/:action/:id"
            element={<AccountPage />}
          />
          <Route path="/listing/:id?" element={<ListingPage />} />
          <Route
            path="/account/bookings/:id"
            element={<BookingDetailsPage />}
          />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
