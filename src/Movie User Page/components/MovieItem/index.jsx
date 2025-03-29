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
import { Rating } from "@mui/material";
import { PlayCircleOutline } from "@mui/icons-material";
import Player from "../ReactPlayer";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(() => ({
  position: "relative",
  margin: "10px 20px",
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
      transform: "scale(1)",
    },
  },
}));

const StyledCardActions = styled(CardActions)(() => ({
  opacity: 0,
  display: "none",
  justifyContent: "center",
  textAlign: "center",
  alignItems: "center",
  height: "101px",
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
    padding: "10px 80px",
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
  top: 0,
  left: 0,
  backgroundColor: "rgba(0, 0, 0, 0.479)",
  width: "400px",
  height: "400px",
  transform: "scale(0)",
  transition: "all .5s",
  "& .icon": {
    position: "absolute",
    fontSize: "90px",
    top: 140,
    left: 100,
    color: "#ffefd5",
  },
}));

const StyledCardContent = styled(CardContent)(() => ({
  opacity: 1,
  height: "85px",
  transition: "all .5s",
  "& .text": {
    color: "#191970",
    fontWeight: "bold",
  },
}));

const MovieItem = ({ item }) => {
  const [open, setOpen] = useState(false);
  const { tenPhim, hinhAnh, maPhim, danhGia, trailer } = item;

  const toggleModal = () => setOpen(!open);

  return (
    <StyledCard style={{ maxWidth: 350 }}>
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
          <Box component="fieldset" mb={3} borderColor="transparent">
            <Rating name="customized-10" value={danhGia} max={10} readOnly />
          </Box>
        </StyledCardContent>
        <StyledCardActionAreaHover className="cardActionAreaHover">
          <Button onClick={toggleModal}>
            <PlayCircleOutline className="icon" />
          </Button>
          <Player open={open} toggleModal={toggleModal} url={trailer} />
        </StyledCardActionAreaHover>
      </CardActionArea>
      <StyledCardActions className="cardActions">
        <NavLink to={`/movie/detail/${maPhim}`} className="link">
          <Button className="button" size="small" color="primary">
            Mua Vé
          </Button>
        </NavLink>
      </StyledCardActions>
    </StyledCard>
  );
};

export default MovieItem;
