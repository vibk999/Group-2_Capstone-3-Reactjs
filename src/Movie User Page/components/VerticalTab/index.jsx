import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Typography, Tab, Tabs, Avatar, Alert } from "@mui/material";
import VerticalTabItem from "../VerticalTabItem";

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

const VerticalTab = ({ lstCumRap, movieDetail }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 400,
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
        {lstCumRap.map((item, i) => (
          <Tab
            key={i}
            style={{ height: "100px" }}
            icon={<Avatar alt={item.maCumRap} src={item.hinhAnh} />}
            label={item.tenCumRap}
            iconPosition="start"
            wrapped={true}
            {...a11yProps(i)}
          />
        ))}
      </Tabs>

      {lstCumRap.map((item, i) => {
        const index = item.danhSachPhim.findIndex(
          (phim) => phim.maPhim === movieDetail.maPhim
        );
        return (
          <TabPanel key={i} value={value} index={i}>
            {index !== -1 ? (
              <>
                <Typography
                  sx={{
                    color: "#ff6347",
                    fontSize: "25px",
                    fontStyle: "italic",
                    fontWeight: "900",
                  }}
                >
                  {item.diaChi}
                </Typography>
                <VerticalTabItem
                  lichPhimDaChon={item.danhSachPhim[index]}
                  tenCumRap={item.tenCumRap}
                  diaChi={item.diaChi}
                />
              </>
            ) : (
              <Alert severity="info">Không có suất chiếu !!!</Alert>
            )}
          </TabPanel>
        );
      })}
    </Box>
  );
};

export default VerticalTab;
