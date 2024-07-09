import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
const apiKey = import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "medistan-62fdc.firebaseapp.com",
  projectId: "medistan-62fdc",
  storageBucket: "medistan-62fdc.appspot.com",
  messagingSenderId: "525748056960",
  appId: "1:525748056960:web:7a0da9753eb1decb70c765",
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = async () => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey:
        "BPCZ33LkE2ClxMKA1RK2YFL3sR6dvpu60qAxRekkKjrqXEp-wk7RiSrp0iXcfYfCx9Ho7tHnkoAqKxvDVxoP6TU",
      serviceWorkerRegistration: await navigator.serviceWorker.ready,
    });

    if (currentToken) {
      return currentToken;
    } else {
      console.log(
        "No registration token available. Request permission to generate one."
      );
    }
  } catch (err) {
    console.log("An error occurred while retrieving token. ", err);
  }
};

export const onMessageListener = (callback = () => false) =>
  // new Promise((resolve) => {
  onMessage(messaging, (payload) => {
    console.log("payload", payload);
    // resolve(payload);
    // });
    callback(payload);
  });
