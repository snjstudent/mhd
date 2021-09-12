//refering : https://qiita.com/yono2844/items/94026dee72dfc254e89e

import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  footer: {
    color: "white",
    backgroundColor: "#e8e8e8",
    width: "100%",
    height: '4%',
    position: "fixed",
    bottom: 0,
    display: 'flex',
  },
});

const Footer = () => {
  const classes = useStyles();
  return <div className={classes.footer}>おなかすいた</div>;
};

export default Footer;