import * as React from "react";

import { Provider } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";

import { useRoute } from "./router";
import { store } from "./src/Redux/store";

export default function App() {
  const routing = useRoute({});
  return (
    <Provider store={store}>
      <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
  );
}
