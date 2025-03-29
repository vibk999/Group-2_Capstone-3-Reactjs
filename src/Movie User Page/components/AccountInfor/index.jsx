import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  TextField,
  Box,
  Modal,
  Typography,
  styled,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchMe, updateAccountInfo } from "../../store/action/auth";

const FormInput = styled(Box)({
  marginBottom: "20px",
});

const ModalContent = styled(Box)({
  backgroundColor: "white",
  padding: "20px",
  textAlign: "center",
  borderRadius: "10px",
});

const AccountInfor = () => {
  const dispatch = useDispatch();
  const { accountInfor } = useSelector((state) => state.user);
  const [formValue, setFormValue] = useState({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    soDt: "",
    email: "",
    maLoaiNguoiDung: "",
    maNhom: "GP01",
  });
  const [open, setOpen] = useState(false);
  const [apiResult, setApiResult] = useState("");

  useEffect(() => {
    dispatch(fetchMe()); // Fetch thông tin tài khoản từ Redux store
  }, [dispatch]);

  useEffect(() => {
    if (accountInfor) {
      setFormValue({
        taiKhoan: accountInfor.taiKhoan || "",
        matKhau: accountInfor.matKhau || "",
        hoTen: accountInfor.hoTen || "",
        soDt: accountInfor.soDt || "",
        email: accountInfor.email || "",
        maLoaiNguoiDung: "khachHang",
        maNhom: "GP01",
      });
    }
  }, [accountInfor]);

  const handleChange = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await dispatch(updateAccountInfo(formValue));

    if (response.error) {
      setApiResult("Cập nhật thất bại: " + response.error.message);
    } else {
      setApiResult("Cập nhật thành công!");
    }
    setOpen(true);
  };

  const onCloseModal = () => setOpen(false);

  return (
    <Container maxWidth="lg" sx={{ padding: 0, marginTop: "100px" }}>
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit}>
          {["taiKhoan", "matKhau", "hoTen", "email", "soDt"].map((field) => (
            <FormInput key={field}>
              <TextField
                onChange={handleChange}
                name={field}
                value={formValue[field]}
                fullWidth
                type={field === "matKhau" ? "password" : "text"}
                label={field === "taiKhoan" ? "Tài khoản" : field}
                variant="outlined"
              />
            </FormInput>
          ))}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button type="submit" variant="contained" color="primary">
              Cập nhật
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

export default AccountInfor;
