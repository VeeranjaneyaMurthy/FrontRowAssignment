import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { observer } from "mobx-react";

export default observer(
  class Input extends Component {
    handleTextArea = (e) => {
      this.props.model.setSnippet(e.target.value);
    };

    handleDescription = (e) => {
      this.props.model.setDescription(e.target.value);
    };

    handleTabTrigger = (e) => {
      this.props.model.setTabTrigger(e.target.value);
    };

    render() {
      return (
        <div className="input">
          <div className={"description-tab"}>
            <TextField
              label="Description"
              variant="outlined"
              className={"description"}
              value={this.props.model.getDescription()}
              onChange={this.handleDescription}
            />
            <TextField
              label="Tab Trigger"
              variant="outlined"
              value={this.props.model.getTabTrigger()}
              onChange={this.handleTabTrigger}
            />
          </div>
          <div className={"snippet"}>
            <TextField
              id="outlined-multiline-static"
              label="Your Snippet"
              multiline
              rows="10"
              variant="outlined"
              value={this.props.model.getSnippet()}
              onChange={this.handleTextArea}
            />
          </div>
        </div>
      );
    }
  }
);
