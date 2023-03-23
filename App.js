import * as React from "react";
import { useState } from "react";

import { Provider } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";

import { useRoute } from "./router";
import { store } from "./src/Redux/store";
import db from "./src/firebase/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(db);

export default function App() {
  const [user, setUser] = useState(null);

  const authStateChanged = async () => {
    try {
      onAuthStateChanged(auth, (user) => {
        setUser(user);
        console.log(user, "- єто APP :");
      });
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

  authStateChanged();

  const routing = useRoute(user);

  return (
    <Provider store={store}>
      <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
  );
}
