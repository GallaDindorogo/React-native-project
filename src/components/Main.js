import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {} from "react-native";

import { NavigationContainer } from "@react-navigation/native";

// import db from "../firebase/config";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRoute } from "../../router";
import { authStateChangeUser } from "../Redux/auth/authOperation";

const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const routing = useRoute(stateChange);
  console.log("stateChange, routing:", stateChange);

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
