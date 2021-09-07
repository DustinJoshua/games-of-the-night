import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  appBar: {
    backgroundImage: "linear-gradient(blueviolet, rgb(110, 38, 177), black)",
    borderRadius: "0px 0px 8px 8px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "start",
    color: "white",
    margin: "auto",
    borderBottom: "1px solid rgb(65, 28, 99)",
  },
}));

const Navbar = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h4">Games Of The Night</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
