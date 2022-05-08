// import { db, colRef } from './index';
// import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { colRef } from '../index';
import { addDoc, serverTimestamp } from 'firebase/firestore';

const addHazard = (hazardType, location, coordinates, moreInfo) => {
  const timestamp = serverTimestamp();
  const today = new Date();
  const dateUpdated = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();

  addDoc(colRef, {
    hazardType: hazardType,
    treated: false,
    createdAt: timestamp,
    updatedAt: timestamp,
    dateUpdated: dateUpdated,
    location: location,
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


const updateHazard = (isTreated) => {
  window.console.log('isTreated', isTreated);
  
  const today = new Date();
  const dateUpdated = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();
  
  const docRef = doc(db, 'hazards', isTreated);
  const isTrue = isTreated === 'true';
  
  updateDoc(docRef, {
    treated: isTrue,
    updatedAt: serverTimestamp(),
    dateUpdated
  })
    .then(() => {
      alert('Data Successfully Updated');
    })
    .catch((error) => {
      console.error('Error updating document: ', error);
    });
};


const deleteHazard = (hazard) => {
  docRef = doc(db, 'hazards', hazard);
  deleteDoc(docRef).then(() => {
    deleteHazardForm.reset()});
};

//queries
// top 10 hazards filtered by updatedAt coloumn
const getHazards = () => {
  const colRef = collection(db,'hazards')
  return query(colRef, orderBy('updatedAt', 'desc'), limit(10));
}

export { addHazard, deleteHazard, updateHazard, getHazards };
