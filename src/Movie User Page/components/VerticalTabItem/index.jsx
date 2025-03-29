import React, { useState } from "react";
import {
  Box,
  Grid,
  Radio,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Delete, Shop } from "@mui/icons-material";
import { NavLink } from "react-router";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setTicketDetail } from "../../store/reducers/userSlice";

const VerticalTabItem = ({ lichPhimDaChon, tenCumRap, diaChi }) => {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState(-1);
  const [alertState, setAlertState] = useState(false);

  const handleChange = (event) => {
    setSelectedValue(Number(event.target.value));
  };

  const handleDelete = () => {
    setSelectedValue(-1);
  };
  const handleBooking = () => {
    if (selectedValue === -1) {
      setAlertState(true);
    } else {
      const { lstLichChieuTheoPhim, tenPhim, hinhAnh } = lichPhimDaChon;
      const bookingDetail = {
        tenPhim,
        hinhAnh,
        tenCumRap,
        diaChi,
        tenRap: lstLichChieuTheoPhim[selectedValue].tenRap,
        ngayChieuGioChieu:
          lstLichChieuTheoPhim[selectedValue].ngayChieuGioChieu,
        giaVe: lstLichChieuTheoPhim[selectedValue].giaVe,
      };
      dispatch(setTicketDetail(bookingDetail));
    }
  };

  const handleCloseAlert = () => {
    setAlertState(false);
  };

  const gridItemSx = {
    display: "flex",
    justifyContent: "flex-start",
    textAlign: "center",
    alignItems: "center",
    margin: "30px 0 20px",
    "& .typo": {
      color: "#4169e1",
      fontSize: "16px",
      fontWeight: "bold",
    },
  };

  const boxButtonSx = {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    marginTop: "20px",
    "& .buttonItem": {
      margin: "20px 20px",
    },
    "& .link": {
      textDecoration: "none",
    },
  };

  return (
    <Box>
      <Grid container spacing={3}>
        {lichPhimDaChon.lstLichChieuTheoPhim.map((item, i) => (
          <Grid key={item.maLichChieu} item xs={12} sm={6} sx={gridItemSx}>
            <Radio
              checked={selectedValue === i}
              onChange={handleChange}
              value={i}
              name="radio-buttons"
            />
            <Typography className="typo">
              {item.tenRap}: {moment(item.ngayChieuGioChieu).format("hh:mm A")}
            </Typography>
          </Grid>
        ))}
      </Grid>
      <Box sx={boxButtonSx}>
        {selectedValue === -1 ? (
          <Button
            onClick={handleBooking}
            className="buttonItem"
            color="secondary"
            variant="outlined"
            startIcon={<Shop />}
          >
            Đặt vé
          </Button>
        ) : (
          <NavLink
            className="link"
            to={`/movie/booking/${lichPhimDaChon.lstLichChieuTheoPhim[selectedValue].maLichChieu}`}
          >
            <Button
              onClick={handleBooking}
              className="buttonItem"
              color="secondary"
              variant="outlined"
              startIcon={<Shop />}
            >
              Đặt vé
            </Button>
          </NavLink>
        )}
        <Button
          onClick={handleDelete}
          className="buttonItem"
          color="secondary"
          variant="outlined"
          startIcon={<Delete />}
        >
          Hủy
        </Button>
      </Box>
      <Dialog
        open={alertState}
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Bạn có bỏ quên điều gì không?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Xin hãy chọn một rạp chiếu phim bạn yêu thích hoặc quay lại trang
            chủ để chọn một bộ phim khác. Xin cảm ơn S2 !!!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert} autoFocus>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VerticalTabItem;
