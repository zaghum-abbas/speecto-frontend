import toast from "react-hot-toast";
import { getToken, removeToken } from "./cookies";
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
  timeout: 400000,
  headers: {
    Accept: "*",
    "Content-Type": "application/json",
  },
});

const HandleRequest = async (req) => {
  const token = getToken();

  if (!token) {
    window.location.href = "/login";
    removeToken();
    return;
  }
  req.headers["Authorizationh"] = token;
  return req;
};

const handleError = (error) => {
  if (error.response && error.response.status === 401) {
    removeToken();
    window.location.href = "/login";
    toast.error("Session expired. Please log in again.");
  }
  return Promise.reject(error);
};

const handleResponse = (response) => {
  return response.data;
};

API.interceptors.request.use(HandleRequest);

API.interceptors.response.use(handleResponse, handleError);

export default API;

// import toast from "react-hot-toast";
// import { getToken, removeToken, setToken } from "./cookies";
// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:4000",
//   withCredentials: true,
//   timeout: 400000,
//   headers: {
//     Accept: "*",
//     "Content-Type": "application/json",
//   },
// });

// const handleRequest = async (req) => {
//   const token = getToken();

//   if (!token) {
//     window.location.href = "/login";
//     removeToken();
//     return;
//   }
//   req.headers["Authorizationh"] = `Bearer ${token}`;
//   return req;
// };

// const refreshAccessToken = async () => {
//   try {
//     const response = await axios.post(
//       "http://localhost:4000/refresh-token",
//       {},
//       { withCredentials: true }
//     );
//     const newAccessToken = response.data.accessToken;
//     setToken(newAccessToken);
//     return newAccessToken;
//   } catch (error) {
//     console.error("Error refreshing access token:", error);
//     removeToken();
//     window.location.href = "/login";
//     toast.error("Session expired. Please log in again.");
//     throw error;
//   }
// };

// const handleError = async (error) => {
//   const originalRequest = error.config;

//   if (
//     error.response &&
//     error.response.status === 401 &&
//     !originalRequest._retry
//   ) {
//     originalRequest._retry = true;
//     try {
//       const newAccessToken = await refreshAccessToken();
//       originalRequest.headers["Authorizationh"] = `Bearer ${newAccessToken}`;
//       return axios(originalRequest);
//     } catch (refreshError) {
//       removeToken();
//       window.location.href = "/login";
//       toast.error("Session expired. Please log in again.");
//       return Promise.reject(refreshError);
//     }
//   }

//   return Promise.reject(error);
// };

// const handleResponse = (response) => {
//   return response.data;
// };

// API.interceptors.request.use(handleRequest);
// API.interceptors.response.use(handleResponse, handleError);

// export default API;
