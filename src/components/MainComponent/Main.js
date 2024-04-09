import React from 'react';

import {Box, Typography} from "@mui/material";

import styles from "../UsersListComponent/UsersList.module.css";
const Main = () => {
  return (
    <Box className={styles.box}>
      <Typography
        component='div'
        className={styles.title}
      >
        Главная страница
      </Typography>
      <hr className={styles.hr}/>
    </Box>
  )
};

export default Main;