import axios from "axios";

const API = axios.create({
  baseURL: "http://13.206.194.73:8000",
});

export default API;
