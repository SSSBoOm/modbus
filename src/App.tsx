import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Booking from "./pages/Booking";
import Index from "./pages/Index";

function App() {
    return (
        <div className="text-sm md:text-base">
            <BrowserRouter>
                {/* <BrowserRouter basename={import.meta.env.VITE_BASE_PATH}> */}
                <Navbar />
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
