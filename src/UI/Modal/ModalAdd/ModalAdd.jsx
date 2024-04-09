import React from 'react';
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CustomButton from "../../Inputs/CustomButton/CustomButton";

import styles from './ModalAdd.module.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '45vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const ModalAdd = ({
                    open,
                    handleSave,
                    handleClose,
                    data,
                    modalFields,
                    customStyle = null
                  }) => {
  return (
    <>
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
          <Box sx={customStyle ? customStyle : style}>
            <Typography
              variant="h6"
              component="h2"
              className={styles.typTitle}
            >
              Добавление
            </Typography>
            {
              data !== undefined ?
                modalFields(data)
                :
                <br/>
            }
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

export default ModalAdd;