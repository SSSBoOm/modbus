import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import Register from "./Register";

const Login = ({
    obj,
    setObj,
}: {
    obj?: boolean | string | number;
    setObj: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [open, setOpen] = useState(true);
    const [register, setRegister] = useState(false);
    const cancelButtonRef = useRef(null);

    const [username, setUsername] = useState(String);
    const [password, setPassword] = useState(String);

    const onSubmit = () => {
        axios
            .post("https://api.modbus.sleepyboi.space/api/auth/signin", {
                username: username,
                password: password,
            })
            .then((result) => {
                // console.log(res.data);
                if (result.status === 200) {
                    alert("สร้างบัญชีผู้ใช้สำเร็จ");
                    setObj(!obj);
                }
            })
            .catch((error) => {
                // username not found or password incorrect
                // if (
                //     error.response?.status == 400 ||
                //     error.response?.statusText != "OK"
                // ) {
                    alert("ไม่พบชื่อผู้ใช้งาน หรือ รหัสผ่่านไม่ถูกต้อง");
                // }
            });
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                initialFocus={cancelButtonRef}
                onClose={() => setOpen(true)}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="border border-black relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <button
                                        type="button"
                                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                        data-modal-toggle="popup-modal"
                                        onClick={() => setObj(!obj)}
                                    >
                                        <svg
                                            aria-hidden="true"
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                        <span className="sr-only">
                                            Close modal
                                        </span>
                                    </button>
                                    <div className="flex justify-center mt-2 sm:flex sm:items-start">
                                        <Dialog.Title
                                            as="h3"
                                            className="font-medium text-2xl leading-6 text-gray-900"
                                        >
                                            <div>MODBUS</div>
                                        </Dialog.Title>
                                    </div>
                                    {register ? (
                                        <>
                                            <Register
                                                obj={obj}
                                                setObj={setObj}
                                                previous={register}
                                                setPrevious={setRegister}
                                            />
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    <div className="pt-4 mb-2">
                                        <div className="w-full m-2 px-12 py-4 flex justify-center">
                                            <input
                                                className="w-full border-b outline-0 focus:border-black"
                                                type="text"
                                                placeholder="ชื่อผู้ใช้งาน"
                                                onChange={(
                                                    e: React.FormEvent<HTMLInputElement>
                                                ) => {
                                                    setUsername(
                                                        e.currentTarget.value
                                                    );
                                                    // console.log(userId);
                                                }}
                                            />
                                        </div>
                                        <div className="w-full m-2 px-12 py-4 flex justify-center">
                                            <input
                                                className="w-full border-b outline-0 focus:border-black"
                                                type="password"
                                                placeholder="รหัสผ่าน"
                                                onChange={(
                                                    e: React.FormEvent<HTMLInputElement>
                                                ) => {
                                                    setPassword(
                                                        e.currentTarget.value
                                                    );
                                                    // console.log(password);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="flex justify-center m-4">
                                            <button
                                                type="button"
                                                className="inline-flex w-full justify-center rounded-xl bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm"
                                                onClick={onSubmit}
                                            >
                                                เข้าสู่ระบบ
                                            </button>
                                            <button
                                                type="button"
                                                className="inline-flex w-full justify-center rounded-xl bg-green-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 sm:ml-3 sm:w-auto sm:text-sm"
                                                onClick={() => {
                                                    setRegister(true);
                                                }}
                                            >
                                                สร้างบัญชีใหม่
                                            </button>
                                        </div>
                                        <div className="flex justify-center m-2">
                                            <button
                                                type="button"
                                                className="inline-flex w-full justify-center px-4 py-2 text-base font-medium text-red-500 hover:text-red-700 sm:ml-3 sm:w-auto sm:text-sm"
                                            >
                                                ลืมรหัสผ่านใช่หรือไม่
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default Login;
