import { observable } from "mobx";

const ModelSnippet = observable({
  description: "",
  tagTrigger: "",
  snippet: "",
});

ModelSnippet.getSnippet = function () {
  return this.snippet;
};

ModelSnippet.setSnippet = function (value) {
  this.snippet = value;
};

ModelSnippet.setDescription = function (value) {
  this.description = value;
};

ModelSnippet.getDescription = function () {
  return this.description;
};

ModelSnippet.setTabTrigger = function (value) {
  this.tagTrigger = value;
};

ModelSnippet.getTabTrigger = function () {
  return this.tagTrigger;
};

export default ModelSnippet;
