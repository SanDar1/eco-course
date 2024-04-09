import React from 'react';
import {Typography} from "@mui/material";
import CustomButton from "../../../UI/Inputs/CustomButton/CustomButton";

const ProfileInfo = ({info, printInfo, handleOnClick}) => {
  return (
    <div style={{margin: '5%'}}>
      <Typography style={{textAlign: 'center', fontSize: 20}}>Информация</Typography>
      {printInfo(info)}
      <CustomButton
        style={{width: '50%'}}
        text={'Редактировать'}
        handleOnClick={handleOnClick}
      />
    </div>
  );
};

export default ProfileInfo;