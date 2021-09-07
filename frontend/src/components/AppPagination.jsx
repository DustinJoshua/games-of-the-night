import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 200,
    backgroundColor: "white",
    padding: "10px 80px",
    color: "white",
    width: "100%",
    opacity: "89%",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    opacity: "100%",
    width: "100%",
    maxWidth: "900px",
    margin: "auto",
    backgroundColor: "blue",
  },
}));

const AppPagination = (props) => {
  const classes = useStyles();
  const { onPageChange, totalGames, pageSize } = props;
  const pages = Math.ceil(totalGames / pageSize);

  return (
    <div className={classes.container}>
      <div className={classes.root}>
        <Pagination
          onChange={(e) => onPageChange(e.target.textContent)}
          style={{ display: "flex", justifyContent: "center" }}
          variant="outlined"
          shape="rounded"
          color="primary"
          hideNextButton={true}
          hidePrevButton={true}
          count={pages}
        />
      </div>
    </div>
  );
};

export default AppPagination;
