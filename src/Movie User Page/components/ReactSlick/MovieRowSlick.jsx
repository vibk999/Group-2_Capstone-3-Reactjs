import React from "react";
import { Container, Grid } from "@mui/material";
import Slider from "react-slick";
import MovieItem2 from "../MovieItem2";
import { useSelector } from "react-redux";

const MovieRowSlick = () => {
  const { movieList } = useSelector((state) => state.movie);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Container>
      <div style={{ width: "100%" }}>
        <Slider {...settings}>
          {movieList &&
            movieList.map((item) => {
              if (item.sapChieu) {
                return (
                  <Grid key={item.maPhim} style={{ marginRight: "60px" }}>
                    <MovieItem2 item={item} />
                  </Grid>
                );
              }
              return null;
            })}
        </Slider>
      </div>
    </Container>
  );
};

export default MovieRowSlick;
