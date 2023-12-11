import { defineStore } from 'pinia';
import {
  RecaptchaVerifier,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  browserLocalPersistence,
  setPersistence,
  signInWithPhoneNumber,
  User,
  PhoneAuthProvider,
  signInWithCredential,
} from 'firebase/auth';
import { ref } from 'vue';

export const useFirebase = defineStore('firebase', () => {
  const recaptchaVerifier = ref();
  const verificationId = ref();
  const credential = ref();

  const auth = getAuth();
  auth.languageCode = 'ko';

  async function emailLogin(email: string, password: string) {
    try {
      setPersistence(auth, browserLocalPersistence);
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async function logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async function phoneLoginRecap() {
    recaptchaVerifier.value = new RecaptchaVerifier(
      'recap-invisible',
      {
        size: 'invisible',
      },
      auth,
    );
  }

  async function sendAuthNumberText(
    phoneNumber: string | number,
    testIs: boolean,
  ) {
    try {
      const phoneNumberReplace = phoneNumber
        .toString()
        .replace(/-/g, '')
        .trim();
      const testNumber = '+16505559999';
      const result = await signInWithPhoneNumber(
        auth,
        testIs ? testNumber : phoneNumberReplace,
        recaptchaVerifier.value,
      );

      verificationId.value = result.verificationId;
    } catch (err) {
      recaptchaVerifier.value.reset();
    }
  }

  async function phoneLogin(authNumber: string | number) {
    const authNumberReplace = authNumber.toString().trim();

    credential.value = PhoneAuthProvider.credential(
      verificationId.value,
      authNumberReplace,
    );

    try {
      await signInWithCredential(auth, credential.value);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  function currentUser(): User | null {
    const user = auth.currentUser;
    return user || null;
  }

  return {
    emailLogin,
    logout,
    phoneLoginRecap,
    sendAuthNumberText,
    phoneLogin,
    currentUser,
  };
});
