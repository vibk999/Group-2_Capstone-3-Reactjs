import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

const MyTicket = ({ hoTen, email, thongTinTungVe }) => {
  return (
    <Card sx={{ maxWidth: 350, minWidth: 350 }}>
      <CardHeader
        avatar={
          <Avatar
            alt="Khanh Vinh"
            src="https://variety.com/wp-content/uploads/2020/08/avatar-the-last-airbender-3.jpg"
            sx={{ width: 40, height: 40 }}
          />
        }
        title={hoTen}
        subheader={email}
      />
      <CardMedia
        component="img"
        height="400"
        image={thongTinTungVe.hinhAnh}
        alt={thongTinTungVe.maVe}
      />
      <CardContent>
        <Grid container>
          <Grid item xs={5}>
            <Typography sx={{ color: "#AED6F1", fontWeight: "800" }}>
              Hệ thống rạp
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography>
              : {thongTinTungVe.danhSachGhe[0].tenHeThongRap}
            </Typography>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={5}>
            <Typography sx={{ color: "#AED6F1", fontWeight: "800" }}>
              Tên rạp
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography>: {thongTinTungVe.danhSachGhe[0].tenRap}</Typography>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={5}>
            <Typography sx={{ color: "#AED6F1", fontWeight: "800" }}>
              Tên phim
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography>: {thongTinTungVe.tenPhim}</Typography>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={5}>
            <Typography sx={{ color: "#AED6F1", fontWeight: "800" }}>
              Thời lượng
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography>: {`${thongTinTungVe.thoiLuongPhim} min`}</Typography>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={5}>
            <Typography sx={{ color: "#AED6F1", fontWeight: "800" }}>
              Ghế
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography>
              :{" "}
              {thongTinTungVe.danhSachGhe.map((item, index) => (
                <span key={index}>[{item.tenGhe}] </span>
              ))}
            </Typography>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={5}>
            <Typography sx={{ color: "#AED6F1", fontWeight: "800" }}>
              Giá vé
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography>
              :{" "}
              {`${
                thongTinTungVe.giaVe * thongTinTungVe.danhSachGhe.length
              } VND`}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MyTicket;
