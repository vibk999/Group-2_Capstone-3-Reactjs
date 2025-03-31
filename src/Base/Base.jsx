import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  ImageList,
} from "@mui/material";

import { WidthFull } from "@mui/icons-material";

// Các trang cơ bản

function Base() {
  const navigate = useNavigate();
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Welcome! Choose a Page to Visit
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <Box
            component="img"
            sx={{
              height: 300,
              width: 450,
              maxHeight: { xs: 233, md: 300 },
              maxWidth: { xs: 310, md: 450 },
            }}
            alt="movie"
            src="/IMG/movie.png"
          />
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              textAlign: "center",
              backgroundColor: "#f5f5f5",
              cursor: "pointer",
              "&:hover": { backgroundColor: "#e0e0e0" },
            }}
            onClick={() => navigate("/movie")}
          >
            <Typography variant="h5">Go to Movie Page 🎬</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Click here to explore the latest movies!
            </Typography>
          </Paper>
        </Grid>

        {/* Khung 2 - Admin Page */}
        <Grid item xs={12} sm={6}>
          <Box
            component="img"
            sx={{
              height: 300,
              width: 450,
              maxHeight: { xs: 233, md: 300 },
              maxWidth: { xs: 310, md: 450 },
            }}
            alt="user"
            src="/IMG/user.png"
          />

          <Paper
            elevation={3}
            sx={{
              padding: 4,
              textAlign: "center",
              backgroundColor: "#f5f5f5",
              cursor: "pointer",
              "&:hover": { backgroundColor: "#e0e0e0" },
            }}
            onClick={() => navigate("/admin")}
          >
            <Typography variant="h5">Go to Admin Page 🛠️</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Click here to manage the site and users!
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Base;
