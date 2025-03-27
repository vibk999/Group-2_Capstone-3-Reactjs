import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, withStyles } from "@material-ui/core";
import { MovieFilter } from "@material-ui/icons";
import { connect } from "react-redux";
import { fetchMovieList } from "../../store/action/movie";
import MovieItem from "../../components/MovieItem";
import CarouselBanner from "../../components/Carousel";
import MovieRowSlick from "../../components/ReactSlick/MovieRowSlick";
import { styles } from "./style";
import Layout from "../../HOCs/Layout";
import Search from "../../components/Search";

const Home = (props) => {
  const [searching, setSearching] = useState(false);
  const [toggleRender, setToggleRender] = useState(false);
  const { textTitle, icon } = props.classes;

  useEffect(() => {
    props.dispatch(fetchMovieList);
  }, [props]);

  const checkSearching = (arrSearch) => {
    console.log("toggleRender:", toggleRender);
    console.log("home check search:", searching);

    if (arrSearch.length === 0) {
      console.log("arr length = 0");
      setSearching(false);
    } else {
      setSearching(true);
    }
    setToggleRender(!toggleRender);
  };

  return (
    <Layout>
      <CarouselBanner />

      <Search movieList={props.movieList} checkSearching={checkSearching} />

      {!searching ? (
        <Box>
          <Box style={{ margin: "10px 20px" }}>
            <Typography className={textTitle} variant="h4">
              <MovieFilter className={icon} />
              Đang Chiếu
            </Typography>
            <Grid container spacing={2}>
              {props.movieList.map((item) =>
                item.dangChieu ? (
                  <Grid key={item.maPhim} xs={12} sm={6} md={3} item>
                    <MovieItem item={item} />
                  </Grid>
                ) : null
              )}
            </Grid>
          </Box>
          <Box style={{ margin: "10px 20px" }}>
            <Typography className={textTitle} variant="h4">
              <MovieFilter className={icon} />
              Sắp Chiếu
            </Typography>
            <MovieRowSlick movieList={props.movieList} />
          </Box>
        </Box>
      ) : (
        () => null
      )}
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  movieList: state.movie.movieList,
});

export default connect(mapStateToProps)(withStyles(styles)(Home));
