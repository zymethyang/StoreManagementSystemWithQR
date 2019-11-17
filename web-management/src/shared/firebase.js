const firebase = require('firebase/app');
var firebaseConfig = {
    apiKey: "AIzaSyAQUcwITzyt55qx3RQxbtgZIcAcFuryZDc",
    authDomain: "storemanagement-69564.firebaseapp.com",
    databaseURL: "https://storemanagement-69564.firebaseio.com",
    projectId: "storemanagement-69564",
    storageBucket: "",
    messagingSenderId: "307060074692",
    appId: "1:307060074692:web:1e31bfb8349bc22f7fc191"
};

firebase.initializeApp(firebaseConfig);
module.exports = firebase;