import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import styles from "./Header.module.css";

const Navbar = () => {
  return (
    <AppBar
      position="static"
      style={{
        backgroundImage:
          "linear-gradient(blueviolet, rgb(110, 38, 177), black)",
        borderRadius: "0px 0px 8px 8px",
      }}
    >
      <Toolbar className={styles.root}>
        <Typography variant="h4">Games Of The Night</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
