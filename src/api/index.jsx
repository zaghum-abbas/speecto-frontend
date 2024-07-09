import axios from "axios";
import { setToken } from "../utils/cookies";
import API from "../utils/axiosInstance";

const doctorLogin = async (val) => {
  try {
    const { data } = await axios.post(
      "http://localhost:4000/doctor/login",
      val
    );
    setToken(data.token);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

const fetchPatients = async () => {
  try {
    const data = await API.get("/doctor/patients");
    return data;
  } catch (error) {
    return error;
  }
};
const addPatients = async (val) => {
  try {
    const data = await API.post("/doctor/add-patient", val);
    return data;
  } catch (error) {
    return error;
  }
};
const saveFCM = async (val) => {
  try {
    const data = await API.post("/doctor/save-fcm-token", { token: val });
    return data;
  } catch (error) {
    return error;
  }
};

const removePatient = async (patientId) => {
  try {
    const data = await API.post("/doctor/remove-patient", { patientId });
    return data;
  } catch (error) {
    return error;
  }
};

const updatePatients = async (val) => {
  try {
    const data = await API.post("/doctor/update-patient", val);
    return data;
  } catch (error) {
    return error;
  }
};

const remindersSet = async (val) => {
  try {
    const data = await API.post("/doctor/set-reminder", val);
    return data;
  } catch (error) {
    return error;
  }
};


const logOut = async (val) => {
  try {
    const data = await API.post("/doctor/logout", { fcmToken: val });
    return data;
  } catch (error) {
    return error;
  }
};

export {
  fetchPatients,
  doctorLogin,
  saveFCM,
  logOut,
  remindersSet,
  addPatients,
  removePatient,
  updatePatients,

};
