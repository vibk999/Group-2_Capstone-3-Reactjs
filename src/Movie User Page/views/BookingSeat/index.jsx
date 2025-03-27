import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  withStyles,
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
} from "@material-ui/core";
import Layout from "../../HOCs/Layout";
import { styles } from "./style";
import { connect } from "react-redux";
import { fetchCinemaListSeat, postDatVe } from "../../store/action/movie";
import { NavLink } from "react-router-dom";

const BookingSeat = (props) => {
  const [arrBooking, setArrBooking] = useState([]);
  const [danhSachGheDuocChon, setDanhSachGheDuocChon] = useState("");
  const [tongTien, setTongTien] = useState(0);
  const [selectedSeat, setSelectedSeat] = useState(false);
  const [filledEmail, setFilledEmail] = useState(false);
  const [filledPhone, setFilledPhone] = useState(false);
  const [filledPayment, setFilledPayment] = useState(false);
  const [alertState, setAlertState] = useState(false);
  const [dataPOST, setDataPOST] = useState({
    maLichChieu: 0,
    danhSachVe: [{ maGhe: 0, giaVe: 0 }],
  });

  const {
    boxContainer,
    gridContainer,
    columnLeft,
    columnRight,
    listSeat,
    userInfor,
    boxPayButton,
  } = props.classes;
  const { tenCumRap, tenRap, tenPhim, ngayChieu, gioChieu } =
    props.thongTinPhim;

  useEffect(() => {
    const maLichChieu = props.match.params.maLichChieu;
    props.dispatch(fetchCinemaListSeat(maLichChieu));
  }, [props.match.params.maLichChieu, props.dispatch]);

  const handleEmailChange = (event) => setFilledEmail(!!event.target.value);
  const handlePhoneChange = (event) => setFilledPhone(!!event.target.value);
  const handlePaymentChange = (event) => setFilledPayment(!!event.target.value);

  const handlePaymentAlert = () => {
    if (filledEmail && filledPhone && filledPayment && selectedSeat) {
      props.dispatch(postDatVe(dataPOST));
    }
    setAlertState(true);
  };

  const handleCloseAlert = () => setAlertState(false);

  const handleSeatButton = (seatSelected) => {
    const updatedArr = [...arrBooking];
    const data = {
      maLichChieu: +props.match.params.maLichChieu,
      danhSachVe: [],
    };
    let seatString = "",
      totalCost = 0,
      selected = false;

    const index = updatedArr.findIndex(
      (seat) => seat.maGhe === seatSelected.maGhe
    );
    if (index === -1) updatedArr.push(seatSelected);
    else updatedArr.splice(index, 1);

    updatedArr.forEach((seat) => {
      seatString += `Ghế ${seat.tenGhe}, loại ${seat.loaiGhe}, Giá ${seat.giaVe} VND \n`;
      totalCost += seat.giaVe;
      data.danhSachVe.push({ maGhe: seat.maGhe, giaVe: seat.giaVe });
    });

    if (totalCost !== 0) selected = true;
    setArrBooking(updatedArr);
    setDanhSachGheDuocChon(seatString);
    setTongTien(totalCost + " VND");
    setSelectedSeat(selected);
    setDataPOST(data);
  };

  const renderDialogContent = () => (
    <Dialog
      open={alertState}
      onClose={handleCloseAlert}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {filledEmail && filledPhone && filledPayment && selectedSeat
          ? "Thanh toán thành công !!!"
          : "Bạn có bỏ quên điều gì không?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {filledEmail && filledPhone && filledPayment && selectedSeat
            ? "Để kiểm tra vé vui lòng truy cập 'My Profile'."
            : "Xin hãy chọn chỗ ngồi và điền đầy đủ thông tin cá nhân trước khi thanh toán. Xin cảm ơn S2 !!!"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {filledEmail && filledPhone && filledPayment && selectedSeat ? (
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <Button onClick={handleCloseAlert} autoFocus>
              Đóng
            </Button>
          </NavLink>
        ) : (
          <Button onClick={handleCloseAlert} autoFocus>
            Đóng
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );

  return (
    <Layout>
      <Box className={boxContainer}>
        <Typography className="title">Seat Booking</Typography>
        <Grid className={gridContainer} container>
          {/* Render Ghế */}
          <Grid item xs={12} md={8} className={columnLeft}>
            <Typography className="screen">SCREEN</Typography>
            <Grid container className={listSeat}>
              {props.danhSachGhe.map((item) => (
                <Grid key={item.maGhe} item xs={1} className="seatItem">
                  <Button
                    className="button"
                    onClick={() => !item.daDat && handleSeatButton(item)}
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
              ))}
            </Grid>
          </Grid>
          {/* Render thông tin */}
          <Grid item xs={12} md={4} className={columnRight}>
            <Box className="boxItem">
              <Grid container>
                <Grid item xs={4}>
                  <Typography style={{ color: "#AED6F1", fontWeight: "800" }}>
                    Cụm rạp
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>: {tenCumRap}</Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={4}>
                  <Typography style={{ color: "#AED6F1", fontWeight: "800" }}>
                    Tên rạp
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>: {tenRap}</Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={4}>
                  <Typography style={{ color: "#AED6F1", fontWeight: "800" }}>
                    Tên phim
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>: {tenPhim}</Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={4}>
                  <Typography style={{ color: "#AED6F1", fontWeight: "800" }}>
                    Ngày chiếu
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>: {ngayChieu} </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={4}>
                  <Typography style={{ color: "#AED6F1", fontWeight: "800" }}>
                    Giờ chiếu
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>: {gioChieu}</Typography>
                </Grid>
              </Grid>
            </Box>
            <Box className="boxItem">
              <Typography style={{ color: "#AED6F1", fontWeight: "800" }}>
                Ghế đã chọn ({arrBooking.length})
              </Typography>
              <TextareaAutosize
                maxRows={4}
                aria-label="maximum height"
                placeholder="Danh sách ghế được chọn"
                defaultValue={danhSachGheDuocChon}
                style={{ width: "100%" }}
              />
              <Typography style={{ color: "#AED6F1", fontWeight: "800" }}>
                Tổng tiền
              </Typography>
              <TextareaAutosize
                maxRows={2}
                aria-label="empty textarea"
                defaultValue={tongTien}
                style={{ width: "100%" }}
              />
            </Box>
            <Box className="boxItem">
              <Grid className={userInfor}>
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  fullWidth={true}
                  required={true}
                  onChange={handleEmailChange}
                />
              </Grid>
              <Grid className={userInfor}>
                <TextField
                  id="outlined-basic"
                  label="Phone"
                  variant="outlined"
                  fullWidth={true}
                  required={true}
                  onChange={handlePhoneChange}
                />
              </Grid>
              <Grid className={userInfor}>
                <FormControl
                  xs={{ m: 1, minWidth: 200 }}
                  variant="outlined"
                  fullWidth={true}
                  required={true}
                >
                  <InputLabel id="demo-simple-select-helper-label">
                    Payment
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={filledPayment}
                    label="Age"
                    onChange={handlePaymentChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="Momo">Momo</MenuItem>
                    <MenuItem value="ZaloPay">ZaloPay</MenuItem>
                    <MenuItem value="Visa">Visa</MenuItem>
                    <MenuItem value="Bank">Bank</MenuItem>
                    <MenuItem value="Cash">Cash</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Box>
            <Box className="boxItem">
              <Grid container style={{ marginBottom: "10px" }}>
                <Grid item xs={2}>
                  <Typography
                    style={{
                      backgroundColor: "#E74C3C",
                      width: "35px",
                      height: "35px",
                    }}
                  ></Typography>
                </Grid>
                <Grid item xs={10}>
                  <Typography style={{ paddingTop: "6px" }}>
                    Ghế đã đặt
                  </Typography>
                </Grid>
              </Grid>
              <Grid container style={{ marginBottom: "10px" }}>
                <Grid item xs={2}>
                  <Typography
                    style={{
                      backgroundColor: "#2ECC71",
                      width: "35px",
                      height: "35px",
                    }}
                  ></Typography>
                </Grid>
                <Grid item xs={10}>
                  <Typography style={{ paddingTop: "6px" }}>
                    Ghế đang chọn{" "}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container style={{ marginBottom: "10px" }}>
                <Grid item xs={2}>
                  <Typography
                    style={{
                      backgroundColor: "#7F8C8D",
                      width: "35px",
                      height: "35px",
                    }}
                  ></Typography>
                </Grid>
                <Grid item xs={10}>
                  <Typography style={{ paddingTop: "6px" }}>
                    Ghế chưa đặt{" "}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Box className={boxPayButton}>
          <Button
            onClick={handlePaymentAlert}
            className="button"
            size="small"
            color="primary"
          >
            Thanh Toán
          </Button>
          {renderDialogContent()}
        </Box>
      </Box>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  thongTinPhim: state.movie.thongTinPhim,
  danhSachGhe: state.movie.danhSachGhe,
});

export default connect(mapStateToProps)(withStyles(styles)(BookingSeat));
