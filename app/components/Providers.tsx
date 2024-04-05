"use client";
import React from "react";
import { ThemeProvider } from "next-themes";
import store from "..//store/store";
import { Provider } from "react-redux";

const Providers = ({ children }: { children: any }) => {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </Provider>
  );
};

export default Providers;
