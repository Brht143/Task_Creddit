import axios from "axios";

const instance = axios.create({
  baseURL: "https://api-creddit.eapi.joincoded.com/posts",
});

instance.interceptors.response.use((response) => {
  return response.data;
});

export default instance;
