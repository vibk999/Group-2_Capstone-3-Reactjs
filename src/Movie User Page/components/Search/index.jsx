import React, { useState } from "react";
import { Box, Grid, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import MovieItem from "../MovieItem";

const Search = ({ movieList, checkSearching }) => {
  const [arrSearch, setArrSearch] = useState([]);

  const handleSearchChange = (event, value) => {
    console.log("search", event, value);
    setArrSearch([...value]);
    checkSearching(value);
  };

  return (
    <Box>
      <Grid sx={{ margin: "10px 30px", padding: "20px 50px" }}>
        <Autocomplete
          multiple
          id="tags-outlined"
          options={movieList}
          getOptionLabel={(option) => option.tenPhim}
          onChange={handleSearchChange}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Films"
              placeholder="Favorites"
            />
          )}
        />
      </Grid>
      <Grid container spacing={2}>
        {arrSearch.map((item) => (
          <Grid key={item.maPhim} item xs={12} sm={6} md={3}>
            <MovieItem item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Search;
