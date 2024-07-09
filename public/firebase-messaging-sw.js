// firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyAAB_wnysdMeiAe2X1pQ2X8xzDcmLzckus",
  authDomain: "medistan-62fdc.firebaseapp.com",
  projectId: "medistan-62fdc",
  storageBucket: "medistan-62fdc.appspot.com",
  messagingSenderId: "525748056960",
  appId: "1:525748056960:web:7a0da9753eb1decb70c765",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
