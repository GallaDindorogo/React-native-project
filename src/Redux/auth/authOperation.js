import db from "../../firebase/config";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { authSlice } from "./authReducer";

const auth = getAuth(db);
console.log("auth", auth);

export const authSignUpUser =
  ({ email, password, username }) =>
  async (dispatch, getState) => {
    console.log("email, password, nickname", email, password, username);

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = await auth.currentUser;

      await updateProfile(user, {
        displayName: username,
      });

      const { uid, displayName } = await auth.currentUser;

      dispatch(
        authSlice.actions.updateUserProfile({
          userID: uid,
          username: displayName,
        })
      );

      console.log("user.id", user.uid);
      console.log("userName", user.displayName, user.displayName);
    } catch (error) {
      console.log("error Op", error);
      console.log("error Op.message", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    console.log("email, password", email, password);

    try {
      const user = await signInWithEmailAndPassword(auth, email, password);

      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {};
