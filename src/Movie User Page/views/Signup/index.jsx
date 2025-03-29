import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Modal,
  styled,
} from "@mui/material";

import Header from "../../components/Header";
import axios from "axios";

const FormInput = styled(Box)({
  marginBottom: "20px",
});

const ModalContent = styled(Box)({
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "10px",
  textAlign: "center",
  margin: "auto",
  width: "100%",
  maxWidth: "400px",
});

const SignUp = () => {
  const [formValue, setFormValue] = useState({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    soDt: "",
    email: "",
    maNhom: "GP01",
  });
  const [open, setOpen] = useState(false);
  const [apiResult, setApiResult] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy",
        formValue,
        {
          headers: {
            TokenCybersoft: localStorage.getItem("tokenCyberSoft"),
          },
        }
      );
      setApiResult(res.data.message + " Vui lòng chuyển sang đăng nhập");
      setOpen(true);
    } catch (err) {
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

  const onCloseModal = () => setOpen(false);

  return (
    <Container maxWidth="lg" sx={{ padding: 0 }}>
      <Header />
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          Đăng Ký
        </Typography>
        <form onSubmit={handleSubmit}>
          {["taiKhoan", "matKhau", "hoTen", "email", "soDt"].map((field) => (
            <FormInput key={field}>
              <TextField
                name={field}
                type={field === "matKhau" ? "password" : "text"}
                label={field === "taiKhoan" ? "Tài khoản" : field}
                value={formValue[field]}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </FormInput>
          ))}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Đăng Ký
            </Button>
            <Button
              onClick={handleSetDefaultUser}
              variant="contained"
              color="secondary"
            >
              Set Default User
            </Button>
          </Box>
        </form>
      </Container>

      <Modal open={open} onClose={onCloseModal}>
        <ModalContent>
          <Typography variant="h6">{apiResult}</Typography>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default SignUp;
