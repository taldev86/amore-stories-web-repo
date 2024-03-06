
import { getFirestore, collection, addDoc, doc, updateDoc,getDoc } from 'firebase/firestore';
const subscribeUId= "FQXZWXt9NTQdl8UYYrP1Da7Laeg2"
const getUserData = async (userId) => {
    try {
        // Get Firestore instance
        const db = getFirestore();

        // Reference to the user document
        const userRef = doc(db, 'users', userId);

        // Get the user document snapshot
        const userSnap = await getDoc(userRef);

        // Check if the user document exists
        if (userSnap.exists()) {
            // Get the user data
            const userData = userSnap.data();
            return userData;
        } else {
            console.log('User document not found');
            return null;
        }
    } catch (error) {
        console.error('Error getting user data:', error);
        return null;
    }
};

// Usage example
export default getUserData
