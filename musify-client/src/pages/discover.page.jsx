import React from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  Grid,
  CssBaseline,
  Tab,
  Tabs,
  Typography,
  Box,
  Paper,
} from "@material-ui/core";
import DiscoverCard from "../components/discover/discover-card.component";

const useStyles = makeStyles((theme) => ({
  body: {
    background: "#ffffff",
    height: "100%",
  },
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(5),
  },
  tabPanel: {
    margin: theme.spacing(5),
    minHeight: "70vh",
  },
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={"span"} variant={"body2"}>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`,
  };
}

export default function DiscoverPage() {
  const classes = useStyles();
  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container component="main" className={classes.body}>
      <CssBaseline />
      <Paper square className={classes.root}>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
          centered
        >
          <Tab label="Following" value="one" />
          <Tab label="Popular" value="two" />
        </Tabs>
        <TabPanel
          value={value}
          index="one"
          {...a11yProps("one")}
          className={classes.tabPanel}
        >
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.searchResults}
          >
            <DiscoverCard />
            <DiscoverCard />
            <DiscoverCard />
            <DiscoverCard />
          </Grid>
        </TabPanel>
        <TabPanel
          value={value}
          index="two"
          {...a11yProps("two")}
          className={classes.tabPanel}
        >
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.searchResults}
          >
            <DiscoverCard />
            <DiscoverCard />
            <DiscoverCard />
            <DiscoverCard />
          </Grid>
        </TabPanel>
      </Paper>
    </Grid>
  );
}
