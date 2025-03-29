import React from "react";
import { Box, Container, Grid, Link } from "@mui/material"; // Đổi sang @mui/material
import { Facebook, Twitter, Instagram } from "@mui/icons-material"; // Icons MUI v5

const Footer = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        marginTop: "50px",
        backgroundColor: "black",
        paddingTop: "5rem",
        paddingBottom: "5rem",
      }}
    >
      <Grid container spacing={5}>
        <Grid item xs={12} sm={3}>
          <Box
            sx={{
              fontSize: "20px",
              margin: 0,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#ec7532",
              paddingBottom: "10px",
              borderBottom: 1,
            }}
          >
            GET IN TOUCH
          </Box>
          <Box>
            <Link to="/movie" sx={linkStyle}>
              FAQs
            </Link>
          </Box>
          <Box>
            <Link to="/movie" sx={linkStyle}>
              Give us feedback
            </Link>
          </Box>
          <Box>
            <Link to="/movie" sx={linkStyle}>
              Contact us
            </Link>
          </Box>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Box sx={titleStyle}>ABOUT MOVIE STAR</Box>
          <Box>
            <Link to="/movie" sx={linkStyle}>
              About us
            </Link>
          </Box>
          <Box>
            <Link to="/movie" sx={linkStyle}>
              Find us
            </Link>
          </Box>
          <Box>
            <Link to="/movie" sx={linkStyle}>
              Schedule
            </Link>
          </Box>
          <Box>
            <Link to="/movie" sx={linkStyle}>
              News
            </Link>
          </Box>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Box sx={titleStyle}>LEGAL STUFF</Box>
          <Box>
            <Link to="/movie" sx={linkStyle}>
              Terms & Conditions
            </Link>
          </Box>
          <Box>
            <Link to="/movie" sx={linkStyle}>
              Privacy policy
            </Link>
          </Box>
          <Box>
            <Link to="/movie" sx={linkStyle}>
              Cookie policy
            </Link>
          </Box>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Box sx={titleStyle}>CONNECT WITH US</Box>
          <Box>
            <Link to="/movie" sx={linkStyle}>
              <Facebook /> Facebook
            </Link>
          </Box>
          <Box>
            <Link to="/movie" sx={linkStyle}>
              <Twitter /> Twitter
            </Link>
          </Box>
          <Box>
            <Link to="/movie" sx={linkStyle}>
              <Instagram /> Instagram
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

// Define reusable styles using sx prop objects
const titleStyle = {
  fontSize: "20px",
  margin: 0,
  letterSpacing: "2px",
  textTransform: "uppercase",
  color: "#ec7532",
  paddingBottom: "10px",
  borderBottom: 1,
};

const linkStyle = {
  fontSize: "13px",
  margin: 0,
  letterSpacing: "1.5px",
  color: "#fff",
  paddingTop: "10px",
  paddingLeft: "5px",
  display: "inline-block",
  textDecoration: "none",
};

export default Footer;
