import React from "react";
import { Container, Box } from "@mui/material";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Layout = ({ children }) => {
  const { me } = useSelector((state) => state.user);
  let navigate = useNavigate();

  useEffect(() => {
    if (!me) {
      navigate("/movie/signIn");
    }
  }, [me]);
  return (
    <Box sx={{ backgroundColor: "#fffff0", minHeight: "100vh" }}>
      <Container maxWidth="lg" sx={{ padding: 0 }}>
        <Header />
        <Box sx={{ minHeight: "calc(100vh - 160px)" }}>{children}</Box>{" "}
        <Footer />
      </Container>
    </Box>
  );
};

export default Layout;
