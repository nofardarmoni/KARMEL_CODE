import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App/App";
import * as serviceWorker from "./serviceWorker";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { refetchInterval, staleTime } from "@constants";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval,
      staleTime
    },
  },
});

ReactDOM.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <App />

      <span style={{ direction: "ltr" }}>
        <ReactQueryDevtools />
      </span>
    </QueryClientProvider>
  </RecoilRoot>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
