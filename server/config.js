var config = {
  apiKey: "AIzaSyDeUjr9VbZOtYzIdog3l9yaORQ1Mcdlu2A",
  authDomain: "p5agotchi.firebaseapp.com",
  databaseURL: "https://p5agotchi.firebaseio.com",
  projectId: "p5agotchi",
  storageBucket: "p5agotchi.appspot.com",
  messagingSenderId: "954265631660"
};

firebase.initializeApp(config);
var db = firebase.firestore();
var currUser;
