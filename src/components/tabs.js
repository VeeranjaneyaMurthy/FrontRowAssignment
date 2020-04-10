import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { html } from "common-tags";
import { observer } from "mobx-react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const renderSublimeCodeSnippet = (snippet, tabtrigger, description) => {
  const regexpMagic = /(\$)([a-z(]+)([^$])/gi;
  const escapedSnippet = snippet.replace(regexpMagic, "\\$1$2$3");
  // prettier-ignore
  return html`
      <snippet>
        <content><![CDATA[
      ${escapedSnippet}
      ]]></content>
        <tabTrigger>${tabtrigger}</tabTrigger>
        <description>${description}</description>
        <!-- Optional: Set a scope to limit where the snippet will trigger -->
        <!-- <scope >source.python</scope > -->
      </snippet>`
};

const renderAtomSnippet = (snippet, tabtrigger, description) => {
  // prettier-ignore
  return html`
      '${description}':
        'prefix': '${tabtrigger}'
        'body': """
          ${snippet}"""`
};

const renderVsCodeSnippet = (snippet, tabtrigger, description) => {
  // escape " with \"
  // split lines by line-break
  const separatedSnippet = snippet
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .split("\n");
  const separatedSnippetLength = separatedSnippet.length;

  // add double quotes around each line apart from the last one
  const newSnippet = separatedSnippet.map((line, index) => {
    return index === separatedSnippetLength - 1 ? `"${line}"` : `"${line}",`;
  });
  // prettier-ignore
  return html`
      "${description}": {
        "prefix": "${tabtrigger}",
        "body": [
          ${newSnippet.join('\n')}
        ],
        "description": "${description}"
      }`
};

export default observer(function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Vs Code" {...a11yProps(0)} />
          <Tab label="Sublime Text" {...a11yProps(1)} />
          <Tab label="Atom" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel headerAlignment="center" value={value} index={0}>
        {renderVsCodeSnippet(
          props.model.getDescription(),
          props.model.getTabTrigger(),
          props.model.getSnippet()
        )}
      </TabPanel>
      <TabPanel headerAlignment="center" value={value} index={1}>
        {renderSublimeCodeSnippet(
          props.model.getDescription(),
          props.model.getTabTrigger(),
          props.model.getSnippet()
        )}
      </TabPanel>
      <TabPanel headerAlignment="center" value={value} index={2}>
        {renderAtomSnippet(
          props.model.getDescription(),
          props.model.getTabTrigger(),
          props.model.getSnippet()
        )}
      </TabPanel>
    </div>
  );
});
