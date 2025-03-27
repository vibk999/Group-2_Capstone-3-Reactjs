import React, { useState } from "react";
import { Container, TextField, Button, withStyles } from "@material-ui/core";
import Header from "../../components/Header";
import { styles } from "./style";
import axios from "axios";
import { Modal } from "react-responsive-modal";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(styles);
const SignUp = () => {
  const classes = useStyles();
  const [formValue, setFormValue] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: null,
    maLoaiNguoiDung: "",
    hoTen: "",
  });
  const [open, setOpen] = useState(false);
  const [apiResult, setApiResult] = useState("");

  const onCloseModal = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios({
        method: "POST",
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy",
        data: formValue,
        headers: {
          TokenCybersoft: localStorage.getItem("tokenCyberSoft"),
        },
      });
      console.log("res sign up", res);
      setApiResult(res.data.message + " Vui lòng chuyển sang đăng nhập");
      setOpen(true);
    } catch (err) {
      console.log("err sign up", { ...err });
      setApiResult(err.response?.data?.content + " Đăng kí thất bại!!!");
      setOpen(true);
    }
  };

  const handleSetDefaultUser = () => {
    setFormValue({
      taiKhoan: "9988771",
      matKhau: "Huhu123",
      email: "hehe123@gmail.com",
      soDt: "0909123123",
      maNhom: null,
      maLoaiNguoiDung: "khachHang",
      hoTen: "Minh Long",
    });
  };

  return (
    <Container maxWidth="lg" style={{ padding: "0px" }}>
      <Header />
      <Container maxWidth="sm">
        <h1>Đăng Ký</h1>
        <form onSubmit={handleSubmit}>
          <div className={classes.formInput}>
            <TextField
              onChange={handleChange}
              name="taiKhoan"
              value={formValue.taiKhoan}
              fullWidth
              label="Tài khoản"
              variant="outlined"
            />
          </div>
          <div className={classes.formInput}>
            <TextField
              onChange={handleChange}
              name="matKhau"
              value={formValue.matKhau}
              fullWidth
              type="password"
              label="Mật khẩu"
              variant="outlined"
            />
          </div>
          <div className={classes.formInput}>
            <TextField
              onChange={handleChange}
              name="hoTen"
              value={formValue.hoTen}
              fullWidth
              label="Họ Tên"
              variant="outlined"
            />
          </div>
          <div className={classes.formInput}>
            <TextField
              onChange={handleChange}
              name="email"
              value={formValue.email}
              fullWidth
              label="Email"
              variant="outlined"
            />
          </div>
          <div className={classes.formInput}>
            <TextField
              onChange={handleChange}
              name="soDt"
              value={formValue.soDt}
              fullWidth
              label="Số ĐT"
              variant="outlined"
            />
          </div>
          <div>
            <Button type="submit" variant="contained" color="primary">
              Đăng Ký
            </Button>
            <Button
              onClick={handleSetDefaultUser}
              type="button"
              variant="contained"
              color="secondary"
            >
              Set Default User
            </Button>
          </div>
        </form>
      </Container>
      <Modal open={open} onClose={onCloseModal} center>
        <h2>{apiResult}</h2>
      </Modal>
    </Container>
  );
};

export default SignUp;
