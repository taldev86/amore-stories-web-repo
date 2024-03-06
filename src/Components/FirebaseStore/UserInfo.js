import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const UserInfo = async () => {

  const db = getFirestore();

  const userLocalData = localStorage.getItem("user")
  const userParsed = JSON.parse(userLocalData)
  if (!userParsed) {
    return null
  }
  else {

    try {
      const userRef = doc(db, 'users', userParsed.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = ({ uid: userParsed.uid, email: userSnap.data().email, ...userSnap.data() });
        return data
      } else {
        console.log('User document does not exist');
        return null
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null
    }
  }



};

export default UserInfo;
