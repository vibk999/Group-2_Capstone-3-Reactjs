import React, { useState, useEffect } from "react";
import { fetchMovieCinema, fetchMovieDetail } from "../../store/action/movie";
import { connect } from "react-redux";
import {
  Box,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
  withStyles,
  Button,
  CardContent,
} from "@material-ui/core";
import { styles } from "./style";
import { Description } from "@material-ui/icons";
import VerticalTabs from "../../components/VerticalTabs";
import Layout from "../../HOCs/Layout";
import Player from "../../components/ReactPlayer";

const Detail = (props) => {
  const [open, setOpen] = useState(false);
  const { hinhAnh, maPhim, moTa, tenPhim, trailer } = props.movieDetail;
  const { detail, detailContent, boxButton } = props.classes;

  useEffect(() => {
    const movieId = props.match.params.id;
    props.dispatch(fetchMovieDetail(movieId));
    props.dispatch(fetchMovieCinema);
  }, [props]);

  const onOpenModal = () => {
    setOpen(!open);
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  return (
    <Layout>
      <Box className={detail}>
        <Grid container spacing={12}>
          <Grid item xs={12} md={6}>
            <CardActionArea>
              <CardMedia
                style={{ height: 700, width: 500, margin: "auto" }}
                image={hinhAnh}
                alt={maPhim}
              />
            </CardActionArea>
          </Grid>
          <Grid className={detailContent} item xs={12} md={6}>
            <CardContent>
              <Typography className="name">{tenPhim}</Typography>
              <Typography className="description">
                <Description />
                {moTa}
              </Typography>
            </CardContent>
            <Box className={boxButton}>
              <Button
                onClick={onOpenModal}
                className="button"
                size="small"
                color="primary"
              >
                Xem Trailer
              </Button>
              <Player open={open} toggleModal={onCloseModal} url={trailer} />
            </Box>
          </Grid>
        </Grid>
        <VerticalTabs
          movieCinemaList={props.movieCinemaList}
          movieDetail={props.movieDetail}
        />
      </Box>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  movieDetail: state.movie.movieDetail,
  movieCinemaList: state.movie.movieCinemaList,
});

export default connect(mapStateToProps)(withStyles(styles)(Detail));
