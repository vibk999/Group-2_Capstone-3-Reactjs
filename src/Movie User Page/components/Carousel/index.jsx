import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovieBanner } from "../../store/action/movie";
import Carousel from "react-material-ui-carousel";
import ItemCarousel from "./ItemCarousel";

const CarouselBanner = () => {
  const dispatch = useDispatch();
  const { movieBanner } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(fetchMovieBanner());
  }, [dispatch]);

  return (
    <Carousel>
      {movieBanner.map((item) => (
        <ItemCarousel key={item.maBanner} item={item} />
      ))}
    </Carousel>
  );
};

export default CarouselBanner;
