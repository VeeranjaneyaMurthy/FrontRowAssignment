import React from "react";
import Body from "./Layout/Body";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./App.css";
import Header from "./Layout/Header";
import MetaTags from "react-meta-tags";

export default function App(props) {
  return (
    <div className={"app"}>
      <MetaTags>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </MetaTags>
      <CssBaseline />
      <Header />
      <Body model={props.model} />
    </div>
  );
}
