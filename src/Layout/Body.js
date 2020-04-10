import React, { Component } from "react";
import SimpleTabs from "../components/tabs";
import Input from "./Input";

export default class Body extends Component {
  render() {
    return (
      <div className="app-body">
        <div>
          <Input model={this.props.model} />;
        </div>
        <div>
          <SimpleTabs model={this.props.model} />;
        </div>
      </div>
    );
  }
}
