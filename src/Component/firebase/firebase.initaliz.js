import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config"

const intalizeAuthentication = () => {
     initializeApp(firebaseConfig);

};

export default intalizeAuthentication;