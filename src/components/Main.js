import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {} from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import { useRoute } from "../../router";

import db from "../firebase/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(db);

const Main = () => {
  const [user, setUser] = useState(null);
  const state = useSelector((state) => state);
  console.log("state", state);

  const authStateChanged = async () => {
    try {
      onAuthStateChanged(auth, (user) => {
        setUser(user);
        console.log(user, "- it's user-APP :");
      });
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

  authStateChanged();

  const routing = useRoute(user);

  useEffect(() => {}, []);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
