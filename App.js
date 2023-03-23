import * as React from "react";
import { useState, useEffect } from "react";

import { Provider } from "react-redux";

import { store } from "./src/Redux/store";

import Main from "./src/components/Main";

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
