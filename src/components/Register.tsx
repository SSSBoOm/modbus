import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";

const Register = ({
    obj,
    setObj,
    previous,
    setPrevious,
}: {
    obj?: boolean | string | number;
    setObj: React.Dispatch<React.SetStateAction<boolean>>;
    previous?: boolean | string | number;
    setPrevious: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [open, setOpen] = useState(true);
    const cancelButtonRef = useRef(null);

    const VEmail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const [username, setUsername] = useState(String);
    const [name, setName] = useState(String);
    const [surname, setSurname] = useState(String);
    const [email, setEmail] = useState(String);
    const [phonenumber, setPhonenumber] = useState(String);
    const [password, setPassword] = useState(String);

    const onSubmit = () => {
        if (
            name.length >= 1 &&
            surname.length >= 1 &&
            VEmail.test(email) === true &&
            phonenumber.split("")[0] === "0" &&
            phonenumber.length === 10 &&
            password.length >= 8
        ) {
            axios
                .post("https://api.modbus.sleepyboi.space/api/auth/signup", {
                    username: username,
                    name: name,
                    surname: surname,
                    email: email,
                    mobile: phonenumber,
                    password: password,
                })
                .then((result) => {
                    if (result.status === 200) {
                        // OK
                        alert("สร้างบัญชีผู้ใช้สำเร็จ");
                        setPrevious(!previous);
                    }
                })
                .catch((error) => {
                    // username
                    alert("ซื่อผู้ใช้งาน ถูกใช้ไปแล้ว");
                });
        } else {
            console.log("AAA");
        }
    };

    return (
        <Transition.Root show={true} as={Fragment}>
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
                                    {/* Previous */}
                                    <button
                                        type="button"
                                        className="absolute top-3 leftp-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                        data-modal-toggle="popup-modal"
                                        onClick={() => setPrevious(!previous)}
                                    >
                                        <svg
                                            aria-hidden="true"
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 30 30"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M26.025 14.496l-14.286-.001 6.366-6.366L15.979 6 5.975 16.003 15.971 26l2.129-2.129-6.367-6.366h14.29z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                        <span className="sr-only">
                                            Previous modal
                                        </span>
                                    </button>
                                    {/* Close */}
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
                                            MODBUS
                                        </Dialog.Title>
                                    </div>
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
                                                    //   console.log(userId);
                                                }}
                                            />
                                        </div>
                                        <div className="w-full m-2 px-12 py-4 flex justify-center">
                                            <input
                                                className="w-full border-b mr-2 outline-0 focus:border-black "
                                                type="text"
                                                placeholder="ชื่อ"
                                                onChange={(
                                                    e: React.FormEvent<HTMLInputElement>
                                                ) => {
                                                    setName(
                                                        e.currentTarget.value
                                                    );
                                                    //   console.log(name);
                                                }}
                                            />
                                            <input
                                                className="w-full border-b ml-2 outline-0 focus:border-black"
                                                type="text"
                                                placeholder="นามสกุล"
                                                onChange={(
                                                    e: React.FormEvent<HTMLInputElement>
                                                ) => {
                                                    setSurname(
                                                        e.currentTarget.value
                                                    );
                                                    //   console.log(surname);
                                                }}
                                            />
                                        </div>
                                        <div className="w-full m-2 px-12 py-4 flex justify-center">
                                            <input
                                                className="w-full border-b outline-0 focus:border-black"
                                                type="text"
                                                placeholder="อีเมล"
                                                onChange={(
                                                    e: React.FormEvent<HTMLInputElement>
                                                ) => {
                                                    setEmail(
                                                        e.currentTarget.value
                                                    );
                                                    //   console.log(email);
                                                }}
                                            />
                                        </div>
                                        <div className="w-full m-2 px-12 py-4 flex justify-center">
                                            <input
                                                className="w-full border-b outline-0 focus:border-black"
                                                type="text"
                                                placeholder="หมายเลขโทรศัพท์"
                                                onChange={(
                                                    e: React.FormEvent<HTMLInputElement>
                                                ) => {
                                                    setPhonenumber(
                                                        e.currentTarget.value
                                                    );
                                                    //   console.log(phonenumber);
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
                                                    //   console.log(password);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="flex justify-center m-4">
                                            <button
                                                type="button"
                                                className="inline-flex w-full justify-center rounded-xl bg-green-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 sm:ml-3 sm:w-auto sm:text-sm"
                                                onClick={onSubmit}
                                            >
                                                สมัครบัญชีใหม่
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

export default Register;
