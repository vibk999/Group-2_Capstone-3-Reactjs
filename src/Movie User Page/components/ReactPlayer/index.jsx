import React from "react";
import ReactPlayer from "react-player";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const Player = ({ open, toggleModal, url }) => {
  return (
    <Modal
      showCloseIcon
      open={open}
      onClose={toggleModal}
      styles={{
        modal: {
          maxWidth: "unset",
          width: "100%",
          padding: "unset",
        },
        overlay: {
          background: "rgba(0, 0, 0, 0.5)",
        },
        closeButton: {
          background: "yellow",
        },
      }}
      center
    >
      <ReactPlayer url={url} width="100%" height="calc(100vh - 100px)" />
    </Modal>
  );
};

export default Player;
