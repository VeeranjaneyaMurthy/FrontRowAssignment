import React from "react";
import { render } from "react-dom";

// import "normalize.css";
import "./index.css";
import App from "./App";
import ModelSnippet from "./model";

render(<App model={ModelSnippet} />, document.getElementById("root"));
