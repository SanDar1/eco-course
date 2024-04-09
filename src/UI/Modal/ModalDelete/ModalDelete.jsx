import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import CustomButton from "../../Inputs/CustomButton/CustomButton";

import styles from './ModalDelete.module.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ModalDelete = ({ text, handleAccept, handleClose, open }) => {
  return (
    <div>
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
            <CustomButton
              handleOnClick={handleAccept}
              text={'Подтвердить'}
            />
            <CustomButton
              handleOnClick={handleClose}
              text={'Отмена'}
            />
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default ModalDelete