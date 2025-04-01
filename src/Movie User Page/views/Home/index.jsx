import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material"; // Chuyển sang @mui/material vì Material-UI đã đổi tên.
import { MovieFilter } from "@mui/icons-material"; // Thay đổi import để phù hợp với MUI v5.
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieList } from "../../store/action/movie";
import MovieItem from "../../components/MovieItem";
import CarouselBanner from "../../components/Carousel";
import MovieRowSlick from "../../components/ReactSlick/MovieRowSlick";
import { styles } from "./style";
import Layout from "../../HOCs/Layout";
import Search from "../../components/Search";
import { fetchMe } from "../../store/action/auth";

export default function Home() {
  const [searching, setSearching] = useState(false);
  const [toggleRender, setToggleRender] = useState(false);

  const { movieList } = useSelector((state) => state.movie); // Truy xuất state từ Redux store.
  const dispatch = useDispatch();

  useEffect(() => {
    const tokenSignIn = localStorage.getItem("USER");
    if (tokenSignIn) {
      dispatch(fetchMe);
    }
    dispatch(fetchMovieList());
  }, [dispatch]);

  const checkSearching = (arrSearch) => {
    console.log("toggle", toggleRender);
    console.log("home check search", searching);

    if (arrSearch.length === 0) {
      console.log("arr length = 0");
      setSearching(false);
    } else {
      setSearching(true);
    }
    setToggleRender(!toggleRender); // Thay đổi trạng thái toggleRender.
  };

  return (
    <Layout>
      <CarouselBanner />

      <Search movieList={movieList} checkSearching={checkSearching} />

      {!searching ? (
        <Box>
          <Box sx={{ margin: "10px 20px" }}>
            <Typography sx={styles.textTitle} variant="h4">
              <MovieFilter sx={styles.icon} />
              Đang Chiếu
            </Typography>
            <Grid container spacing={2}>
              {movieList.map((item) => {
                if (item.dangChieu) {
                  return (
                    <Grid key={item.maPhim} xs={12} sm={6} md={3} item>
                      <MovieItem item={item} />
                    </Grid>
                  );
                } else return null;
              })}
            </Grid>
          </Box>

          <Box sx={{ margin: "10px 20px" }}>
            <Typography sx={styles.textTitle} variant="h4">
              <MovieFilter sx={styles.icon} />
              Sắp Chiếu
            </Typography>
            <MovieRowSlick movieList={movieList} />
          </Box>
        </Box>
      ) : null}
    </Layout>
  );
}
