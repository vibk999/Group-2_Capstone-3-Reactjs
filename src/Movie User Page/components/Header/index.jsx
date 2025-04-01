import React, { Fragment, useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  MenuItem,
  Menu,
} from "@mui/material";
import { AccountCircle, Movie } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { fetchMe } from "../../store/action/auth";
import { setMe } from "../../store/reducers/userSlice";
import { NavLink } from "react-router";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { accountInfor } = useSelector((state) => state.user); // lấy thông tin user từ redux store
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    localStorage.removeItem("USER");
    dispatch(setMe(null));
    window.location.href = "/movie/signIn";
  };

  useEffect(() => {
    dispatch(fetchMe()); // Lấy thông tin người dùng khi component mount
  }, [dispatch]);

  return (
    <AppBar position="static">
      <Toolbar>
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <IconButton color="inherit">
            <Movie />
          </IconButton>
        </NavLink>

        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            color: "#ffffff",
            fontSize: "18px",
            opacity: 1,
          }}
        >
          Booking Movie
        </Typography>

        {accountInfor ? (
          <Fragment>
            <Button
              id="basic-button"
              aria-controls="basic-menu"
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ fontSize: "30px", color: "#fff" }}
            >
              <AccountCircle sx={{ fontSize: "50px", margin: "0px" }} />
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "#fff",
                  marginLeft: "10px",
                  "&:hover": { color: "#00ffff" },
                }}
              >
                {accountInfor.hoTen}
              </Typography>
            </Button>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>
                <NavLink
                  to="/movie/myAccount"
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  My Profile
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleLogOut}>
                <NavLink
                  to="/movie/signin"
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  Logout
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <NavLink
                  to="/movie"
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  Close
                </NavLink>
              </MenuItem>
            </Menu>
          </Fragment>
        ) : (
          <Fragment>
            <NavLink to="/movie/signin" style={linkStyle}>
              Đăng nhập
            </NavLink>
            <NavLink to="/movie/signup" style={linkStyle}>
              Đăng kí
            </NavLink>
          </Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
};

const linkStyle = {
  color: "#fff",
  marginLeft: "20px",
  fontSize: "18px",
  textDecoration: "none",
  "&:hover": {
    color: "#00ffff",
  },
};

export default Header;
