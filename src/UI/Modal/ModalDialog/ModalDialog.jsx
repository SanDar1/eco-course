import React from 'react';
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {FormControl} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import CustomButton from "../../Inputs/CustomButton/CustomButton";

import styles from './ModalDialog.module.css'

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#c5c5c5',
    },
    secondary: {
      main: '#808080',
    },
  },
})

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const ModalDialog = ({ open, handleOpen, handleClose, handleSave, text, dialogFields }) => {
  return (
    <>
      <CustomButton
        handleOnClick={handleOpen}
        text={text}
        customTheme={customTheme}
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              textAlign='center'
              className={styles.txt}
            >
              {text}
            </Typography>
            <FormControl sx={{ m: 6 }}>
              {dialogFields}
            </FormControl>
            <CustomButton
              handleOnClick={handleSave}
              text={'Подтвердить'}
            />
            <CustomButton
              handleOnClick={handleClose}
              text={'Отмена'}
            />
          </Box>
        </Fade>
      </Modal>
    </>
  )
};

export default ModalDialog;