import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Box,
  Button,
  Avatar,
  Typography,
  List,
  ListItem,
  Divider,
  Tabs,
  Tab,
  styled,
} from "@mui/material";
import { Home } from "@mui/icons-material";
import { NavLink } from "react-router";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import AccountInfor from "../../components/AccountInfor";
import MyTicket from "../../components/MyTicket";
import moment from "moment";
import { fetchMe } from "../../store/action/auth";

// Styled components with MUI v5
const ColumnLeft = styled(Grid)({
  backgroundColor: "#34495E",
  display: "flex",
  justifyContent: "center",
  textAlign: "center",
  "& .boxItem": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "20px auto",
    "& .button": {
      fontWeight: "800",
      color: "#fff",
      textTransform: "uppercase",
      backgroundColor: "#ff0e83",
      border: "1px solid #fff",
      borderRadius: "100%",
      padding: "30px",
      transition: "all .5s",
      "&:hover": {
        color: "#ff0000",
        border: "2px solid #ff0e83",
        backgroundColor: "white",
      },
    },
    "& .link": {
      textDecoration: "none",
    },
    "& .listItem": {
      margin: "10px auto",
      backgroundColor: "#5D6D7E",
      textAlign: "center",
      "& .listText": {
        margin: "5px auto",
        color: "#D2B4DE",
        fontSize: "20px",
        fontWeight: "800",
        fontStyle: "italic",
      },
    },
  },
});

const ColumnRight = styled(Grid)({});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const MyAccount = () => {
  const dispatch = useDispatch();
  const { accountInfor } = useSelector((state) => state.user);

  const [selectedInfor, setSelectedInfor] = useState(true);
  const [value, setValue] = useState(0);

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderMyTicket = (account) => {
    const { hoTen, email, thongTinDatVe } = account;

    return (
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          height: 650,
          margin: "10px 10px 20px",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          {thongTinDatVe.map((item, i) => (
            <Tab
              key={i}
              sx={{ height: "100px" }}
              icon={<Avatar alt={item.tenPhim} src={item.hinhAnh} />}
              label={`${item.tenPhim} __ ${moment(item.ngayDat).format(
                "DD/MM"
              )}`}
              iconPosition="start"
              wrapped
              {...a11yProps(i)}
            />
          ))}
        </Tabs>

        {thongTinDatVe.map((item, i) => (
          <TabPanel key={i} value={value} index={i} sx={{ margin: "30px" }}>
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
        backgroundColor: "#fffff0",
        display: "flex",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Grid container>
        <ColumnLeft xs={2} md={3} item>
          <div style={{ margin: "5px" }}>
            <Box className="boxItem">
              <Avatar
                alt="Batman"
                src="../../../../public/IMG/avatar.jfif"
                sx={{ width: "250px", height: "250px", marginBottom: "20px" }}
              />
            </Box>
            <Box className="boxItem">
              <List
                sx={{
                  width: "100%",
                  minWidth: 280,
                  maxWidth: 400,
                  margin: "20px auto",
                }}
                component="nav"
                aria-label="mailbox folders"
              >
                <Divider />
                <ListItem
                  className="listItem"
                  button
                  onClick={() => setSelectedInfor(true)}
                >
                  <Typography className="listText">
                    Thông tin tài khoản
                  </Typography>
                </ListItem>
                <Divider />
                <ListItem
                  className="listItem"
                  button
                  onClick={() => setSelectedInfor(false)}
                  divider
                >
                  <Typography className="listText">Vé của tôi</Typography>
                </ListItem>
                <Divider />
              </List>
            </Box>
            <Box className="boxItem">
              <NavLink className="link" to="/movie">
                <Button className="button">
                  <Home sx={{ fontSize: "40px" }} />
                </Button>
              </NavLink>
            </Box>
          </div>
        </ColumnLeft>

        <ColumnRight xs={9} md={9} item>
          <div style={{ margin: "5px" }}>
            {selectedInfor ? (
              <AccountInfor account={accountInfor} />
            ) : (
              renderMyTicket(accountInfor)
            )}
          </div>
        </ColumnRight>
      </Grid>
    </Container>
  );
};

export default MyAccount;
