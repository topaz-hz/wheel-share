// import { db, colRef } from './index';
// import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { colRef } from '../index';
import { addDoc, serverTimestamp } from 'firebase/firestore';

const addHazard = (hazardType, location, coordinates, moreInfo) => {
  const timestamp = serverTimestamp();
  const today = new Date();
  const dateUpdated = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();

  addDoc(colRef, {
    Description: hazardType,
    treated: false,
    createdAt: timestamp,
    updatedAt: timestamp,
    dateUpdated,
    location,
    coordinates: coordinates,
    info: moreInfo
  })
    .then(() => {
      alert('Data Successfully Submitted');
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
};

const deleteHazard = () => {};

const updateHazard = (isTreated) => {
  window.console.log('isTreated', isTreated);
  // const today = new Date();
  // const dateUpdated = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();
  //
  // const docRef = doc(db, 'hazards', isTreated);
  // const isTrue = isTreated === 'true';
  // updateDoc(docRef, {
  //   treated: isTrue,
  //   updatedAt: serverTimestamp(),
  //   dateUpdated
  // })
  //   .then(() => {
  //     alert('Data Successfully Updated');
  //   })
  //   .catch((error) => {
  //     console.error('Error updating document: ', error);
  //   });
};

//delete a document (hazard) by id//
// const deleteHazardForm = document.querySelector('.delete');
// deleteHazardForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const docRef = doc(db, 'hazards', deleteHazardForm.id.value);
//   deleteDoc(docRef).then(() => {
//     deleteHazardForm.reset();
//   });
// });

//edit
// const updateForm = document.querySelector('.update');
// updateForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//
//   const docRef = doc(db, 'hazards', updateForm.id.value);
//   var isTrue = updateForm.treated.value === 'true';
//   updateDoc(docRef, {
//     treated: isTrue,
//     updatedAt: serverTimestamp()
//   }).then(() => {
//     updateForm.reset();
//   });
// });

export { addHazard, deleteHazard, updateHazard };
