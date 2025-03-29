import React from "react";
import { Paper } from "@mui/material";

const carouselStyles = {
  height: "600px",
  color: "#ffffff",
  lineHeight: "160px",
  textAlign: "center",
  backgroundPosition: "center",
  backgroundSize: "100%",
  backgroundRepeat: "no-repeat",
};

const ItemCarousel = ({ item }) => {
  const { maPhim, hinhAnh } = item;

  return (
    <Paper style={{ ...carouselStyles, backgroundImage: `url(${hinhAnh})` }}>
      <img src={hinhAnh} alt={maPhim} style={{ width: "100%", opacity: 0 }} />
    </Paper>
  );
};

export default ItemCarousel;
