import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
  Button,
  CardContent,
} from "@mui/material";
import { Description } from "@mui/icons-material";

import { fetchMovieDetail, fetchMovieCinema } from "../../store/action/movie"; // Redux Toolkit slice
import VerticalTabs from "../../components/VerticalTabs";
import Layout from "../../HOCs/Layout";
import Player from "../../components/ReactPlayer";
import { DetailContainer, BoxButton, DetailContent } from "./styles";
import { useParams } from "react-router";

const Detail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { movieDetail, movieCinemaList } = useSelector((state) => state.movie); // Redux state từ slice movie

  const [open, setOpen] = useState(false);

  // Hàm toggle modal
  const handleToggleModal = () => setOpen((prev) => !prev);

  useEffect(() => {
    const movieId = params.id;
    if (movieId) {
      dispatch(fetchMovieDetail(movieId));
    }
    dispatch(fetchMovieCinema());
  }, [dispatch, params.id]);

  const { hinhAnh, maPhim, moTa, tenPhim, trailer } = movieDetail;

  return (
    <Layout>
      <DetailContainer>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <CardActionArea>
              <CardMedia
                style={{ height: 700, width: 500, margin: "auto" }}
                image={hinhAnh}
                alt={maPhim}
              />
            </CardActionArea>
          </Grid>

          <DetailContent item xs={12} md={6}>
            <CardContent>
              <Typography variant="h4" className="name">
                {tenPhim}
              </Typography>
              <Typography variant="body1" className="description">
                <Description /> {moTa}
              </Typography>
            </CardContent>

            <BoxButton>
              <Button
                onClick={handleToggleModal}
                className="button"
                variant="contained"
                color="primary"
              >
                Xem Trailer
              </Button>
              <Player
                open={open}
                toggleModal={handleToggleModal}
                url={trailer}
              />
            </BoxButton>
          </DetailContent>
        </Grid>

        <VerticalTabs
          movieCinemaList={movieCinemaList}
          movieDetail={movieDetail}
        />
      </DetailContainer>
    </Layout>
  );
};

export default Detail;
