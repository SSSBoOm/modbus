import axios from "axios";

const API_URL = "https://api.modbus.sleepyboi.space/api/auth";

export async function LoginService(username: string, password: string) {
  try {
    const res = await axios.post(API_URL + "/signin", {
      username: username,
      password: password,
    })
    return res.data;
  } catch (err) {
    return [];
  }
}

