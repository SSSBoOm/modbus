import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";

const Navbar = () => {
    const [responsive, setResponsive] = useState(false);
    const [open, setOpen] = useState(false);

    const [isLogin, setIsLogin] = useState<boolean>(false);

    const Logout = () => {
        localStorage.removeItem("accessToken");
        setIsLogin(false);
    };

    useEffect(() => {
        if (localStorage.getItem("accessToken") !== null) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, [localStorage.getItem("accessToken")]);

    return (
        <div className="flex flex-wrap place-items-center">
            {open ? (
                <>
                    <Login obj={open} setObj={setOpen} />
                </>
            ) : (
                <></>
            )}
            <section className="relative mx-auto">
                {/* <-- Left --> */}
                <nav className="flex justify-between bg-yellow-200 text-black w-screen">
                    <div className="px-5 xl:px-12 py-6 flex w-full items-center">
                        <Link
                            to="/"
                            className="text-3xl font-bold font-heading"
                        >
                            {/* <img className="h-9" src="logo.png" alt="logo"> */}
                            Logo Here
                        </Link>
                        {/* <!-- Middle --> */}
                        <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                            <li>
                                <Link
                                    to="/"
                                    className="p-3 text-blue-500 rounded-xl hover:bg-yellow-400 hover:border-2-yellow-400 hover:text-black"
                                >
                                    ประวัติการจอง
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/booking"
                                    className="p-3 text-blue-500 rounded-xl hover:bg-yellow-400 hover:border-2-yellow-400 hover:text-black"
                                >
                                    จอง
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/"
                                    className="p-3 text-blue-500 rounded-xl hover:bg-yellow-400 hover:border-2-yellow-400 hover:text-black"
                                >
                                    เช็ครอบ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/"
                                    className="p-3 text-blue-500 rounded-xl hover:bg-yellow-400 hover:border-2-yellow-400 hover:text-black"
                                >
                                    ติดต่อ
                                </Link>
                            </li>
                        </ul>
                        {/* <!-- Right --> */}
                        <div className="hidden xl:flex items-center space-x-5">
                            {/* <!-- Sign In / Register --> */}
                            {!isLogin ? (
                                <button
                                    className="font-semibold font-heading px-5 py-2 rounded-md bg-blue-300 border-2 border-blue-300 hover:bg-white hover:text-blue-500"
                                    onClick={() => setOpen(true)}
                                >
                                    Login
                                </button>
                            ) : (
                                <button
                                    className="font-semibold font-heading px-5 py-2 rounded-md bg-blue-300 border-2 border-blue-300 hover:bg-white hover:text-blue-500"
                                    onClick={Logout}
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    </div>
                    {/* <!-- Responsive navbar --> */}
                    <button
                        onClick={() => setResponsive(!responsive)}
                        className="navbar-burger self-center mr-12 xl:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 hover:text-gray-200"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </nav>
            </section>
            {responsive ? (
                <div className="w-full flex-wrap text-blue-500">
                    <Link
                        to="/"
                        className="flex justify-center p-4 bg-yellow-100 hover:bg-yellow-100"
                    >
                        ประวัติการจอง
                    </Link>
                    <Link
                        to="/booking"
                        className="flex justify-center p-4 bg-yellow-100 hover:bg-yellow-100"
                    >
                        จอง
                    </Link>
                    <Link
                        to="/"
                        className="flex justify-center p-4 bg-yellow-100 hover:bg-yellow-100"
                    >
                        เช็ครอบ
                    </Link>
                    <Link
                        to="/"
                        className="flex justify-center p-4 bg-yellow-100 hover:bg-yellow-100"
                    >
                        ติดต่อ
                    </Link>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default Navbar;
