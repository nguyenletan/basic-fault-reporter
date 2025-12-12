import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  User,
  UserCredential,
} from 'firebase/auth';
import { auth } from '@/config/firebase';

export const authService = {
  // Sign up with email and password
  signUp: async (email: string, password: string): Promise<UserCredential> => {
    return await createUserWithEmailAndPassword(auth, email, password);
  },

  // Sign in with email and password
  signIn: async (email: string, password: string): Promise<UserCredential> => {
    return await signInWithEmailAndPassword(auth, email, password);
  },

  // Sign out
  signOut: async (): Promise<void> => {
    return await signOut(auth);
  },

  // Send password reset email
  resetPassword: async (email: string): Promise<void> => {
    return await sendPasswordResetEmail(auth, email);
  },

  // Get current user
  getCurrentUser: (): User | null => {
    return auth.currentUser;
  },

  // Send email verification
  sendVerificationEmail: async (user: User): Promise<void> => {
    return await sendEmailVerification(user);
  },
};
