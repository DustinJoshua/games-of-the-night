import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  teamSelectBtn: {
    backgroundColor: "primary",
    color: "blue",
  },
  teamSelect: {
    display: "flex",
    justifyContent: "space-around",
    padding: ".5rem",
    width: "50%",
    margin: "auto",
  },
  leftLine: {
    backgroundColor: "black",
    width: "7px",
    marginTop: "-8px",
    marginBottom: "-8px",
  },
  rightLine: {
    backgroundColor: "black",
    width: "7px",
    marginTop: "-8px",
    marginBottom: "-8px",
  },
}));

const FilterTeamSelect = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    props.onTeamChange(event);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.teamSelect}>
      <div className={classes.leftLine}></div>
      <Button color="primary" variant="outlined" onClick={handleClickOpen}>
        Filter By Team
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Choose a Team</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-dialog-native">Team</InputLabel>
              <Select
                native
                value={props.selectedTeam}
                onChange={handleChange}
                input={<Input id="demo-dialog-native" />}
              >
                <option aria-label="None" value={""} />
                <option value={""}>All Teams</option>
                <option value={"Atlanta Hawks"}>Atlanta Hawks</option>
                <option value={"Boston Celtics"}>Boston Celtics</option>
                <option value={"Brooklyn Nets"}>Brooklyn Nets</option>
                <option value={"Charlotte Hornets"}>Charlotte Hornets</option>
                <option value={"Chicago Bulls"}>Chicago Bulls</option>
                <option value={"Cleveland Cavaliers"}>
                  Cleveland Cavaliers
                </option>
                <option value={"Dallas Mavericks"}>Dallas Mavericks</option>
                <option value={"Denver Nuggets"}>Denver Nuggets</option>
                <option value={"Detroit Pistons"}>Detroit Pistons</option>
                <option value={"Golden State Warriors"}>
                  Golden State Warriors
                </option>
                <option value={"Houston Rockets"}>Houston Rockets</option>
                <option value={"Indiana Pacers"}>Indiana Pacers</option>
                <option value={"Los Angeles Clippers"}>
                  Los Angeles Clippers
                </option>
                <option value={"Los Angeles Lakers"}>Los Angeles Lakers</option>
                <option value={"Memphis Grizzlies"}>Memphis Grizzlies</option>
                <option value={"Miami Heat"}>Miami Heat</option>
                <option value={"Milwaukee Bucks"}>Milwaukee Bucks</option>
                <option value={"Minnesota Timberwolves"}>
                  Minnesota Timberwolves
                </option>
                <option value={"New Orleans Pelicans"}>
                  New Orleans Pelicans
                </option>
                <option value={"New York Knicks"}>New York Knicks</option>
                <option value={"Oklahoma City Thunder"}>
                  Oklahoma City Thunder
                </option>
                <option value={"Orlando Magic"}>Orlando Magic</option>
                <option value={"Philadelphia 76ers"}>Philadelphia 76ers</option>
                <option value={"Phoenix Suns"}>Phoenix Suns</option>
                <option value={"Portland Trail Blazers"}>
                  Portland Trail Blazers
                </option>
                <option value={"Sacramento Kings"}>Sacramento Kings</option>
                <option value={"San Antonio Spurs"}>San Antonio Spurs</option>
                <option value={"Toronto Raptors"}>Toronto Raptors</option>
                <option value={"Utah Jazz"}>Utah Jazz</option>
                <option value={"Washington Wizards"}>Washington Wizards</option>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <div className={classes.leftLine}></div>
    </div>
  );
};

export default FilterTeamSelect;
