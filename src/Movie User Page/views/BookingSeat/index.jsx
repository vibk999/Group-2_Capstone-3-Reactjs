import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextareaAutosize,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCinemaListSeat, postDatVe } from "../../store/action/movie";
import { NavLink, useParams } from "react-router";
import Layout from "../../HOCs/Layout";
import { styles } from "./style";

function BookingSeat() {
  const dispatch = useDispatch();
  const { maLichChieu } = useParams();

  const [arrBooking, setArrBooking] = useState([]);
  const [danhSachGheDuocChon, setDanhSachGheDuocChon] = useState("");
  const [tongTien, setTongTien] = useState(0);
  const [filledEmail, setFilledEmail] = useState(false);
  const [filledPhone, setFilledPhone] = useState(false);
  const [filledPayment, setFilledPayment] = useState(false);
  const [alertState, setAlertState] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(false);
  const [payment, setPayment] = useState("");

  const { thongTinPhim, danhSachGhe } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(fetchCinemaListSeat(maLichChieu));
  }, [dispatch, maLichChieu]);

  const handleSeatButton = (seatSelected) => {
    const updatedArr = arrBooking.includes(seatSelected)
      ? arrBooking.filter((seat) => seat.maGhe !== seatSelected.maGhe)
      : [...arrBooking, seatSelected];

    // const danhSachVe = updatedArr.map((seat) => ({
    //   maGhe: seat.maGhe,
    //   giaVe: seat.giaVe,
    // }));

    const selectedSeatsText = updatedArr
      .map(
        (seat) =>
          `Ghế ${seat.tenGhe}, loại ${seat.loaiGhe}, Giá ${seat.giaVe} VND`
      )
      .join("\n");
    const totalCost = updatedArr.reduce((acc, seat) => acc + seat.giaVe, 0);

    setArrBooking(updatedArr);
    setDanhSachGheDuocChon(selectedSeatsText);
    setTongTien(`${totalCost} VND`);
    setSelectedSeat(updatedArr.length > 0);
  };

  const handlePaymentAlert = () => {
    if (filledEmail && filledPhone && filledPayment && selectedSeat) {
      dispatch(
        postDatVe({ maLichChieu: +maLichChieu, danhSachVe: arrBooking })
      );
    }
    setAlertState(true);
  };

  const renderButton = () =>
    danhSachGhe.map((item) => (
      <Grid className="seatItem" item xs={1} key={item.maGhe}>
        <Button
          className="button"
          onClick={() => handleSeatButton(item)}
          style={{
            backgroundColor: item.daDat
              ? "#E74C3C"
              : arrBooking.some((seat) => seat.maGhe === item.maGhe)
              ? "#2ECC71"
              : "#7F8C8D",
          }}
          disabled={item.daDat}
        >
          {item.tenGhe}
        </Button>
      </Grid>
    ));
  const {
    boxContainer,
    gridContainer,
    columnLeft,
    columnRight,
    listSeat,
    userInfor,
    boxPayButton,
  } = styles();
  return (
    <Layout>
      <Box className={boxContainer}>
        <Typography className="title">Seat Booking</Typography>
        <Grid container sx={gridContainer}>
          <Grid item xs={12} md={8} className={columnLeft}>
            <Typography className="screen">SCREEN</Typography>
            <Grid container className={listSeat}>
              {renderButton()}
            </Grid>
          </Grid>

          <Grid item xs={12} md={4} className={columnRight}>
            <Box className="boxItem">
              <Typography variant="h6">Thông tin phim</Typography>
              <Typography>Cụm rạp: {thongTinPhim.tenCumRap}</Typography>
              <Typography>Tên rạp: {thongTinPhim.tenRap}</Typography>
              <Typography>Tên phim: {thongTinPhim.tenPhim}</Typography>
              <Typography>Ngày chiếu: {thongTinPhim.ngayChieu}</Typography>
              <Typography>Giờ chiếu: {thongTinPhim.gioChieu}</Typography>
            </Box>

            <Box className="boxItem">
              <Typography variant="h6">
                Ghế đã chọn ({arrBooking.length})
              </Typography>
              <TextareaAutosize
                value={danhSachGheDuocChon}
                style={{ width: "100%" }}
              />
              <Typography variant="h6">Tổng tiền</Typography>
              <TextareaAutosize value={tongTien} style={{ width: "100%" }} />
            </Box>

            <Box className="boxItem">
              <TextField
                className={userInfor}
                label="Email"
                fullWidth
                onChange={(e) => setFilledEmail(!!e.target.value)}
              />
              <TextField
                className={userInfor}
                label="Phone"
                fullWidth
                onChange={(e) => setFilledPhone(!!e.target.value)}
              />
              <FormControl className={userInfor} fullWidth>
                <InputLabel>Payment</InputLabel>
                <Select
                  value={payment}
                  onChange={(e) =>
                    setPayment(e.target.value) ||
                    setFilledPayment(!!e.target.value)
                  }
                >
                  <MenuItem value="Momo">Momo</MenuItem>
                  <MenuItem value="ZaloPay">ZaloPay</MenuItem>
                  <MenuItem value="Visa">Visa</MenuItem>
                  <MenuItem value="Bank">Bank</MenuItem>
                  <MenuItem value="Cash">Cash</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box className={boxPayButton}>
              <Button onClick={handlePaymentAlert} variant="contained">
                Thanh Toán
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Dialog open={alertState} onClose={() => setAlertState(false)}>
          <DialogTitle>
            {filledEmail && filledPhone && filledPayment && selectedSeat
              ? "Thanh toán thành công !!!"
              : "Bạn có bỏ quên điều gì không?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {filledEmail && filledPhone && filledPayment && selectedSeat
                ? 'Để kiểm tra vé vui lòng truy cập "My Profile".'
                : "Xin hãy chọn chỗ ngồi và điền đầy đủ thông tin cá nhân trước khi thanh toán."}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAlertState(false)}>Đóng</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Layout>
  );
}

export default BookingSeat;
