import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCxxXwoTSEl_oy-QdGEoI0gNoO8K4eXlio",
  authDomain: "fitneogin-f73c6.firebaseapp.com",
  databaseURL: "https://fitneogin-f73c6.firebaseio.com",
  projectId: "fitneogin-f73c6",
  storageBucket: "fitneogin-f73c6.appspot.com",
  messagingSenderId: "259574704016",
  appId: "1:259574704016:web:44a9d11d3cb4e18c5cf515",
  measurementId: "G-33KBFP2E5R"
};

firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebase.auth;
