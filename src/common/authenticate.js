import axios from "axios";
import { baseUrl } from "./baseUrl";

export async function authenticate(token) {
  if(!token) return null;
  try {
    let response = await axios({
        method: "POST",
        url: baseUrl + '/auth/authenticate',
        headers: {
          Authorization: `Bearer ${token}`
        }
    });
    return response.data;
  } catch(error) {
    return null;
  }
}