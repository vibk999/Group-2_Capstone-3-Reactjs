import React, { useState } from "react";
import { TextField, Container, Button } from "@material-ui/core";
import Header from "../../components/Header";
import { signIn } from "../../store/action/auth";
import { connect } from "react-redux";

const SignIn = (props) => {
  const [formSignIn, setFormSignIn] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  const handleChange = (event) => {
    console.log(event.target.name, event.target.value);
    setFormSignIn({
      ...formSignIn,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.dispatch(
      signIn(formSignIn, () => {
        props.history.push("/");
      })
    );
  };

  const handleSetDefaultUser = () => {
    setFormSignIn({
      taiKhoan: "danhngo2302",
      matKhau: "12345678",
    });
  };

  return (
    <Container maxWidth="lg" style={{ padding: "0px" }}>
      <Header />
      <h1 style={{ textAlign: "center" }}>Đăng Nhập</h1>
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
            <Button type="submit" variant="contained" color="primary">
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

export default connect()(SignIn);
