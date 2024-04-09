import Button from "@mui/material/Button";
import * as React from 'react'

import Box from "@mui/material/Box";

import styles from './CustomButton.module.css'

const CustomButton = ({handleOnClick, text, isFile = false, uploadContent, component}) => {
  return (
    <Button
      onClick={handleOnClick}
      fullWidth
      variant="contained"
      className={styles.button}
      component={component}
    >
      <Box style={{fontSize: '12px'}}>{text}</Box>
      {
        isFile
          ?
          <input
            hidden
            accept="image/*"
            type="file"
            multiple={false}
            max={1}
            onChange={uploadContent}
          />
          :
          <></>
      }
    </Button>
  )
}

export default CustomButton