import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Typography, Tab, Tabs, Avatar } from "@mui/material";
import VerticalTab from "../VerticalTab";

function TabPanel({ children, value, index, ...other }) {
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

const VerticalTabs = ({ movieCinemaList, movieDetail }) => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue); // Cập nhật value khi tab thay đổi
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 500,
        marginTop: "40px",
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
        {movieCinemaList.map((item, i) => (
          <Tab
            key={i}
            style={{ height: "80px" }}
            icon={<Avatar alt={item.maHeThongRap} src={item.logo} />}
            {...a11yProps(i)}
          />
        ))}
      </Tabs>

      {movieCinemaList.map((item, i) => (
        <TabPanel key={i} value={value} index={i}>
          <VerticalTab lstCumRap={item.lstCumRap} movieDetail={movieDetail} />
        </TabPanel>
      ))}
    </Box>
  );
};

VerticalTabs.propTypes = {
  movieCinemaList: PropTypes.array.isRequired,
  movieDetail: PropTypes.object.isRequired,
};

export default VerticalTabs;
