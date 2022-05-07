import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app';
import { getFirestore, onSnapshot, query, orderBy, collection } from 'firebase/firestore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

const firebaseConfig = {
  apiKey: 'AIzaSyD5L8SHMTnWJ7gHR7zVULdEcdXBC8EoiKs',
  authDomain: 'wheel-share-a3ca2.firebaseapp.com',
  projectId: 'wheel-share-a3ca2',
  storageBucket: 'wheel-share-a3ca2.appspot.com',
  messagingSenderId: '1016229430424',
  appId: '1:1016229430424:web:cd580df4ea08d4a51a7ced',
  measurementId: 'G-KGSM2RZG1V'
};

initializeApp(firebaseConfig);
export const db = getFirestore();

//collection ref
export const colRef = collection(db, 'hazards');

//queries
const qTimeOrder = query(colRef, orderBy('updatedAt', 'desc')); //ordering db snapshot by timestamp in console

//real time collection data. sending a new snapshot every time there's a change in db
onSnapshot(qTimeOrder, (snapshot) => {
  let hazards = [];
  snapshot.docs.forEach((doc) => {
    hazards.push({ ...doc.data(), id: doc.id });
  });
  console.log(hazards);
});
