import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKENDURL}/auth`,
});

export const googleAuth = (code: string) => {
  return api.post("/google", { code });
};