import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAYRi_H14jrUQqGETVxuLc5X0Vp8aQ1Y7o",
  authDomain: "react-idp-demo.firebaseapp.com",
  projectId: "react-idp-demo",
  storageBucket: "react-idp-demo.appspot.com",
  messagingSenderId: "446799633647",
  appId: "1:446799633647:web:6a5020c2f9d13fa6280f1a",
  databaseURL: "https://react-idp-demo-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const firebaseDb = getDatabase(app);

export default firebaseDb;