import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Box,
  Button,
  withStyles,
  Avatar,
  Typography,
  List,
  ListItem,
  Divider,
  Tabs,
  Tab,
} from "@material-ui/core";
import { Home } from "@material-ui/icons";
import { styles } from "./style";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import AccountInfor from "../../components/AccountInfor";
import MyTicket from "../../components/MyTicket";
import { connect } from "react-redux";
import moment from "moment";
import { fetchMe } from "../../store/action/auth";

const MyAccount = ({ accountInfor, dispatch, classes }) => {
  const [selectedInfor, setSelectedInfor] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [value, setValue] = useState(0);

  const { columnLeft, columnRight } = classes;

  useEffect(() => {
    dispatch(fetchMe);
  }, [dispatch]);

  const handleSelectInfor = () => {
    setSelectedInfor(true);
    setSelectedTicket(false);
  };

  const handleSelectTicket = () => {
    setSelectedInfor(false);
    setSelectedTicket(true);
  };

  const handleChange = (event, newValue) => setValue(newValue);

  const renderMyticket = (account) => {
    const { hoTen, email, thongTinDatVe } = account;

    return (
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: 650,
          m: 2,
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          {thongTinDatVe.map((item, i) => (
            <Tab
              key={i}
              sx={{ height: 100 }}
              icon={<Avatar alt={item.tenPhim} src={item.hinhAnh} />}
              label={`${item.tenPhim} __ ${moment(item.ngayDat).format(
                "DD/MM"
              )}`}
              iconPosition="start"
              wrapped
            />
          ))}
        </Tabs>
        {thongTinDatVe.map((item, i) => (
          <TabPanel key={i} value={value} index={i} sx={{ m: 3 }}>
            <MyTicket hoTen={hoTen} email={email} thongTinTungVe={item} />
          </TabPanel>
        ))}
      </Box>
    );
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        bgcolor: "#fffff0",
        p: 0,
        display: "flex",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Grid container>
        <Grid className={columnLeft} xs={2} md={3} item>
          <Box sx={{ m: 1 }}>
            <Avatar
              alt="Vinh"
              src="https://img.vwassets.com/moviemill.com/vertical_3bc5e84d-de40-46a1-871c-46574b49a01c.jpg"
              sx={{ width: 250, height: 250, mb: 2 }}
            />
            <List
              sx={{
                width: "100%",
                minWidth: 280,
                maxWidth: 400,
                bgcolor: "background.paper",
                my: 2,
              }}
              component="nav"
            >
              <Divider />
              <ListItem button onClick={handleSelectInfor}>
                <Typography>Thông tin tài khoản</Typography>
              </ListItem>
              <Divider />
              <ListItem button divider onClick={handleSelectTicket}>
                <Typography>Vé của tôi</Typography>
              </ListItem>
              <Divider />
            </List>
            <Box sx={{ mt: 0 }}>
              <NavLink to="/">
                <Button size="small" color="primary">
                  <Home sx={{ fontSize: 40 }} />
                </Button>
              </NavLink>
            </Box>
          </Box>
        </Grid>
        <Grid className={columnRight} xs={9} md={9} item>
          <Box sx={{ m: 1 }}>
            {selectedInfor && <AccountInfor account={accountInfor} />}
            {selectedTicket && renderMyticket(accountInfor)}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  accountInfor: state.myAccount.accountInfor,
});

export default connect(mapStateToProps)(withStyles(styles)(MyAccount));
