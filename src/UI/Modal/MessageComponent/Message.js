import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import CustomButton from "../../Inputs/CustomButton/CustomButton";

import styles from './MessageComponent.module.css'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Message = ({
                   visible,
                   handleClose,
                   text
                 }) => {
  return (
    <div>
      <Dialog
        open={visible}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className={styles.dialogTitle}>{text}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <CustomButton
              text={'ОК'}
              style={{width: '40%'}}
              handleOnClick={handleClose}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Message;