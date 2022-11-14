import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Booking from "./pages/Booking";
import Index from "./pages/Index";

function App() {
    return (
        <div>
            <BrowserRouter basename={import.meta.env.VITE_BASE_PATH}>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
