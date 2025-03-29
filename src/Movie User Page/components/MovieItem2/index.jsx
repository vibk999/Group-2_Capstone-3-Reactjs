import React, { useState } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import { NavLink } from "react-router";
import Player from "../ReactPlayer";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(() => ({
  position: "relative",
  margin: "10px 20px",
  maxWidth: 350,
  "&:hover": {
    "& .cardActions": {
      opacity: 1,
      display: "flex",
    },
    "& .cardContent": {
      opacity: 0,
      display: "none",
    },
    "& .cardActionAreaHover": {
      transform: "rotate(0deg)",
      opacity: 1,
    },
  },
}));

const StyledCardContent = styled(CardContent)(() => ({
  opacity: 1,
  height: "65px",
  transition: "all .5s",
  "& .text": {
    color: "#191970",
    fontWeight: "bold",
  },
}));

const StyledCardActions = styled(CardActions)(() => ({
  opacity: 0,
  display: "none",
  justifyContent: "center",
  textAlign: "center",
  alignItems: "center",
  height: "81px",
  transition: "all .5s",
  "& .button": {
    fontSize: "18px",
    fontWeight: "800",
    color: "#fff",
    textDecoration: "none",
    textTransform: "uppercase",
    backgroundColor: "#ff0e83",
    border: "1px solid #fff",
    outline: "none",
    padding: "10px 35px",
    borderRadius: "5px",
    transition: "all .5s",
    "&:hover": {
      color: "#ff0000",
      border: "2px solid #ff0e83",
      backgroundColor: "white",
    },
  },
  "& .link": {
    textDecoration: "none",
  },
}));

const StyledCardActionAreaHover = styled("div")(() => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  opacity: 0,
  backgroundColor: "rgba(0, 0, 0, 0.479)",
  width: "400px",
  height: "400px",
  transform: "rotate(3600deg)",
  transition: "all .5s",
  "& .content": {
    position: "absolute",
    bottom: 0,
    left: 0,
    padding: "0px 50px 15px 20px",
  },
  "& .textName": {
    fontSize: "30px",
    fontStyle: "italic",
    color: "#ffefd5",
  },
  "& .textDetail": {
    fontSize: "15px",
    fontWeight: "100",
    color: "#ffefd5",
  },
}));

const MovieItem2 = ({ item }) => {
  const [open, setOpen] = useState(false);
  const { tenPhim, hinhAnh, maPhim, moTa, trailer } = item;

  const toggleModal = () => setOpen(!open);

  return (
    <StyledCard>
      <CardActionArea>
        <CardMedia style={{ height: 400 }} image={hinhAnh} title={tenPhim} />
        <StyledCardContent className="cardContent">
          <Typography
            className="text"
            gutterBottom
            variant="h5"
            component="h2"
            noWrap
            align="center"
          >
            {tenPhim}
          </Typography>
        </StyledCardContent>
        <StyledCardActionAreaHover className="cardActionAreaHover">
          <div className="content">
            <h2 className="textName">{tenPhim}</h2>
            <p className="textDetail">{moTa.substr(0, 150) + "..."}</p>
          </div>
        </StyledCardActionAreaHover>
      </CardActionArea>
      <StyledCardActions className="cardActions">
        <NavLink to={`/movie/detail/${maPhim}`} className="link">
          <Button className="button" size="small" color="primary">
            Mua Vé
          </Button>
        </NavLink>
        <Button
          onClick={toggleModal}
          className="button"
          size="small"
          color="primary"
        >
          Trailer
        </Button>
        <Player open={open} toggleModal={toggleModal} url={trailer} />
      </StyledCardActions>
    </StyledCard>
  );
};

export default MovieItem2;
