import React from 'react';
import styles from "../Profile.module.css";
import {Avatar, IconButton, Tooltip, Typography} from "@mui/material";
import CustomButton from "../../../UI/Inputs/CustomButton/CustomButton";
import DeleteIcon from '@mui/icons-material/Delete';

const ProfileAvatar = ({ imgData, handleOnClickRemove, uploadContent }) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <Typography style={{textAlign: 'center', fontSize: 20, margin: '5%'}}>Фотография</Typography>
      <div className={styles.avatarDiv}>
        {
          imgData
          ?
            imgData
            :
            <Avatar
              sx={{
                width: "300px",
                height: "300px"
              }}
            />
        }
      </div>
      {
        imgData
          ?
          <div className={styles.rmImg}>
            <Tooltip title="Нажмите, чтобы удалить фотографию">
              <IconButton color="success" component="label" onClick={handleOnClickRemove}>
                <DeleteIcon sx={{color: 'red', fontSize: '5vh'}} />
              </IconButton>
            </Tooltip>
          </div>
          :
          <CustomButton
            text={'Изменить фотографию'}
            style={{width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
            component="label"
            isFile={true}
            uploadContent={uploadContent}
          />
      }
    </div>
  );
};

export default ProfileAvatar;