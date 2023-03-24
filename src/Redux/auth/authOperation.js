import db from "../../firebase/config";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { authSlice } from "./authReducer";

const auth = getAuth(db);

console.log("getAuth(db)", auth);

const { updateUserProfile, authSignOut, authStateChange } = authSlice.actions;

export const authSignUpUser =
  ({ email, password, username }) =>
  async (dispatch, getState) => {
    console.log("SignUp", email, password, username);

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = await auth.currentUser;

      await updateProfile(user, {
        displayName: username,
      });

      const { uid, displayName } = await auth.currentUser;

      dispatch(
        updateUserProfile({
          userID: uid,
          username: displayName,
        })
      );
    } catch (error) {
      console.log("error Op", error);
      console.log("error Op.message", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    console.log("SignIn", email, password);

    try {
      const user = await signInWithEmailAndPassword(auth, email, password);

      console.log("sigIn user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth);
  dispatch(authSignOut());
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      const userUpdateProfile = {
        username: user.displayName,
        userID: user.uid,
        email: user.email,
      };
      const userStateChange = {
        stateChange: true,
      };

      dispatch(authStateChange(userStateChange));
      dispatch(updateUserProfile(userUpdateProfile));
      console.log(auth, "authStateChangeUser");
      console.log("userStateChange", userStateChange);
      console.log("userUpdateProfile:", userUpdateProfile);
    }
  });
};
