import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import TrendingDownIcon from "@material-ui/icons/TrendingDown";
import { IconButton, CircularProgress } from "@material-ui/core";
import { useState } from "react";
import axios from "axios";
// import CardActions from "@material-ui/core/CardActions";
// import Collapse from "@material-ui/core/Collapse";
// import clsx from "clsx";
// import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "auto",
    width: "330px",
    margin: "1rem",
    boxShadow: "2px 2px 22px 2px #888",
  },
  media1: {
    height: 170,
    width: "50%",
  },
  media2: {
    height: 170,
    width: "50%",
  },
  expand: {
    transform: "rotate(0deg)",
    margin: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    margin: "auto",
  },
  cardContainer: {
    backgroundColor: "#eee",
  },
  ratingContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  upVote: {
    marginLeft: "2rem",
  },
  downVote: {
    marginRight: "2rem",
  },
  infoContainer: {
    display: "flex",
    margin: ".5rem",
  },
}));

export default function GameCard(props) {
  const classes = useStyles();
  const {
    homeTeam,
    awayTeam,
    homeImg,
    awayImg,
    date,
    gameId,
    rating: initialRating,
  } = props;

  const [rating, setRating] = useState(initialRating);
  // const [expanded, setExpanded] = useState(false);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  const handleUpvoteClick = () => {
    setRating((prevRating) => prevRating + 1);
    const rating = axios.put(`/api/games/upvote/${gameId}`);
    console.log(rating);
  };

  const handleDownvoteClick = () => {
    setRating((prevRating) => prevRating - 1);
    const rating = axios.put(`/api/games/downvote/${gameId}`);
    console.log(rating);
  };

  return (
    <Card className={classes.root}>
      <div className={classes.cardContainer}>
        <div className={classes.ratingContainer}>
          <IconButton className={classes.upVote} onClick={handleUpvoteClick}>
            <TrendingUpIcon fontSize="large" color="primary" />
          </IconButton>
          <h2>{rating}</h2>
          <IconButton
            className={classes.downVote}
            onClick={handleDownvoteClick}
          >
            <TrendingDownIcon fontSize="large" color="secondary" />
          </IconButton>
        </div>
        <div>
          <CardActionArea>
            <div className={classes.infoContainer}>
              {homeImg ? (
                <CardMedia
                  className={classes.media1}
                  image={homeImg}
                  title={`${homeTeam}`}
                />
              ) : (
                <CircularProgress />
              )}
              {awayImg ? (
                <CardMedia
                  className={classes.media2}
                  image={awayImg}
                  title={`${awayTeam}`}
                />
              ) : (
                <CircularProgress />
              )}
            </div>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                align="center"
              >
                {`${homeTeam}`}
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                align="center"
              >
                {`vs`}
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                align="center"
              >
                {`${awayTeam}`}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {date}
              </Typography>
            </CardContent>
          </CardActionArea>
          {/* <CardActions>
            <Button
              size="small"
              color="secondary"
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              (Spoilers!) Comments (Spoilers!)
            </Button>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Card style={{ padding: ".5rem" }}>
                <div
                  style={{
                    display: "flex",
                    alignContent: "center",
                    borderBottom: "1px solid blueviolet",
                    paddingBottom: ".2rem",
                  }}
                >
                  <Avatar />{" "}
                  <Typography paragraph style={{ margin: ".5rem" }}>
                    Dustin Lott
                  </Typography>
                </div>
                <Typography paragraph style={{ marginTop: ".5rem" }}>
                  Great game. Starts a little slow, but the ending is worth it.
                </Typography>
              </Card>
            </CardContent>
          </Collapse> */}
        </div>
      </div>
    </Card>
  );
}
