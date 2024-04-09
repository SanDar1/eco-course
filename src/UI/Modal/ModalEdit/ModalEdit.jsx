import * as React from 'react';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import CustomButton from "../../Inputs/CustomButton/CustomButton";
import Tooltip from "@mui/material/Tooltip";
import {createTheme} from "@mui/material/styles";
import IconButton from '@mui/material/IconButton'
import {styled} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'

import styles from './ModalEdit.module.css'
import ViolationCategory from "../../../components/ViolationComponent/ViolationCategory";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#007a80',
    },
    secondary: {
      main: '#00575d',
    },
  },
})

const StyledIconButton = styled(IconButton)`
  ${({theme}) => `
  cursor: pointer;
  background-color: ${theme.palette.primary.main};
  transition: ${theme.transitions.create(['background-color', 'transform'], {
    duration: theme.transitions.duration.standard,
  })};
  &:hover {
    background-color: ${theme.palette.secondary.main};
    transform: scale(1.2);
  }
  `}
`

const ModalEdit = ({
                     open,
                     data = null,
                     modalFields,
                     handleDelete = null,
                     handleSave = null,
                     handleClose,
                     customStyle = null,
                     extraParams = false,
                     img,
                     extraGovFields,
                     roleGov
                   }) => {

  return (
    <>
      <Modal
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
              {
                extraParams
                  ?
                  'Подробная информация'
                  :
                  'Редактирование'
              }
              {
                handleDelete
                &&
                <Tooltip title="Удалить">
                  <StyledIconButton onClick={handleDelete} theme={customTheme} sx={{float: 'right'}}>
                    <DeleteIcon style={{color: "white"}}/>
                  </StyledIconButton>
                </Tooltip>
              }
            </Typography>
            {img ?
              <CustomButton text={'Скачать и посмотреть изображение'} />
              :
              <></>
            }
            {
              data
                ?
                modalFields(data)
                :
                <br/>
            }
            {
              extraParams
                ?
                <>
                  {
                    extraGovFields.buttonsProps && roleGov
                      ?
                      <Box>
                        <Box style={{
                          float: "left",
                          width: '300px'
                        }}>
                          <ViolationCategory categoryProps={extraGovFields.categoryProps}/>
                        </Box>
                        <Box style={{
                          float: "right",
                          width: '300px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center'
                        }}>
                          {
                            extraGovFields.buttonsProps.map(bp =>
                              bp.visible
                                ?
                                <Box style={{marginLeft: '25%'}}>
                                  <CustomButton
                                    handleOnClick={bp.onClick}
                                    text={bp.text}
                                  />
                                </Box>
                                :
                                <></>
                            )
                          }
                        </Box>
                      </Box>
                      :
                      <></>
                  }
                  <CustomButton
                    handleOnClick={handleClose}
                    style={{width: '20%', float: 'left'}}
                    text={roleGov ? 'Закрыть' : 'ОК'}
                  />
                </>
                :
                <>
                  <CustomButton
                    handleOnClick={handleSave}
                    text={'Подтвердить'}
                  />
                  <CustomButton
                    handleOnClick={handleClose}
                    text={'Отмена'}
                  />
                </>
            }
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

export default ModalEdit