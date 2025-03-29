import React, { useState } from "react";
import { TextField, Container, Button, Typography } from "@mui/material"; // MUI v5
import Header from "../../components/Header";
import { useDispatch } from "react-redux";
import { signIn } from "../../store/action/auth";
import { useNavigate } from "react-router";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formSignIn, setFormSignIn] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormSignIn((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      signIn(formSignIn, () => {
        navigate("/movie");
      })
    );
  };

  const handleSetDefaultUser = () => {
    setFormSignIn({
      taiKhoan: "HoangNNT",
      matKhau: "12345678",
    });
  };

  return (
    <Container maxWidth="lg" sx={{ padding: 0 }}>
      <Header />
      <Typography variant="h4" align="center" gutterBottom>
        Đăng Nhập
      </Typography>
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 30 }}>
            <TextField
              onChange={handleChange}
              value={formSignIn.taiKhoan}
              name="taiKhoan"
              fullWidth
              label="Tài khoản"
              variant="outlined"
            />
          </div>
          <div style={{ marginBottom: 30 }}>
            <TextField
              onChange={handleChange}
              value={formSignIn.matKhau}
              name="matKhau"
              fullWidth
              label="Mật khẩu"
              variant="outlined"
              type="password"
            />
          </div>
          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mr: 2 }}
            >
              Đăng Nhập
            </Button>
            <Button
              type="button"
              onClick={handleSetDefaultUser}
              variant="contained"
              color="secondary"
            >
              Set Default User
            </Button>
          </div>
        </form>
      </Container>
    </Container>
  );
};

export default SignIn;
