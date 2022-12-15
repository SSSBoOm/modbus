import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar, { NavbarAdmin } from "./components/Navbar";
import Booking from "./pages/Booking";
import ListBooking from "./pages/ListBooking";
import Index from "./pages/Index";
import IndexAdmin from "./pages/IndexAdmin";
import React from "react";
import AddPath from "./pages/AddPath";

function App() {
    const [isAdmin, setIdAdmin] = React.useState<boolean>(false);

    React.useEffect(() => {
        setIdAdmin(localStorage.getItem("role") ? (localStorage.getItem("role") === "1" ? (true) : (false)) : (false));
    });

    return (
        <div className="sm:text-sm md:text-md lg:text-base">
            <BrowserRouter>
                {/* <BrowserRouter basename={import.meta.env.VITE_BASE_PATH}> */}
                {
                    isAdmin ? (
                        <Admin/>
                    ) : (
                        <Guest />
                    )
                }
            </BrowserRouter>
        </div>
    );
}

const Guest = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/listbooking" element={<ListBooking />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
};

const Admin = () => {
    return (
        <div>
            {
                localStorage.getItem("role") !== "1" ? (<Navigate to="/" />) : (<></>)
            }
            <NavbarAdmin />
            <Routes>
                <Route path="/" element={<IndexAdmin />} />
                <Route path="/add" element={<AddPath />} />
                <Route path="*" element={<Navigate to="/admin" />} />
            </Routes>
        </div>
    );
};
export default App;
