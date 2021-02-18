import firebase from "firebase";

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

export default firebase;
