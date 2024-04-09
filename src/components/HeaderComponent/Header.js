import React from 'react';
import {Box, Typography} from "@mui/material";
import styles from './Header.module.css'

const Header = () => {
  return (
    <Box className={styles.contentHeader}>
      <Typography className={styles.hTxt}>
        Экологический проект
      </Typography>
    </Box>
  );
};

export default Header;