// src/services/authService.js
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const authService = () => {
  const auth = getAuth();

  const loginWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      return user;
    } catch (error) {
      throw error;
    }
  };

  return { loginWithEmailAndPassword };
};

export default authService;
