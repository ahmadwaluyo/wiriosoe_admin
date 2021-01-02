import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDJ3aBbAlyDJBAmJ4F165tnul1PYmKrpu8",
  authDomain: "wiriosoedarmo-57c78.firebaseapp.com",
  databaseURL: "https://wiriosoedarmo-57c78.firebaseio.com",
  projectId: "wiriosoedarmo-57c78",
  storageBucket: "wiriosoedarmo-57c78.appspot.com",
  messagingSenderId: "1012816120038",
  appId: "1:1012816120038:web:0ba8afe8ebac74b4d0d327"
};

firebase.initializeApp(firebaseConfig)
const storage = firebase.storage()

export { storage, firebase as default }