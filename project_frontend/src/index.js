import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "fa-icons";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import GameVideo from "./Components/GameVideo";


const client = new ApolloClient({
  uri: "http://localhost:3003/graphql",
  cache: new InMemoryCache(),
});


const client4000 = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    
      <ApolloProvider client={client4000}>
        <GameVideo />
      </ApolloProvider>
      </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
