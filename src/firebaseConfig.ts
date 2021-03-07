import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBUHmNHlurXkvkvxVfKfHeK-nyfMSpb-uA",
	authDomain: "city-quest-native.firebaseapp.com",
	projectId: "city-quest-native",
	storageBucket: "city-quest-native.appspot.com",
	messagingSenderId: "1047619952176",
	appId: "1:1047619952176:web:448dc5d4564c17613d17f5",
	measurementId: "G-G8KHGP2Y5Q"
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();
const analytics = firebase.analytics();

export { firebase, auth, db, analytics };
