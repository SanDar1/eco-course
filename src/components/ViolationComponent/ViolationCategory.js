import React from 'react';

import {FormControl, FormHelperText, InputLabel, MenuItem, Select} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import styles from './Violation.module.css'

const ViolationCategory = (categoryProps) => {
  return (
    <Box className={styles.selectCategoryStatus}>
      <Typography className={styles.instructTxt}>
        Категория:
        <br/>
        <Typography className={styles.categoryTxt}>
          {categoryProps.categoryProps.category}
        </Typography>
      </Typography>
      <FormControl sx={{mt: 2}}>
        <InputLabel>Достоверность категории</InputLabel>
        <Select
          value={categoryProps.categoryProps.categoryStatus}
          label={'Достоверность категории'}
          onChange={categoryProps.categoryProps.handleChangeCategory}
          fullWidth
        >
          <MenuItem value={-1}><em>Не выбрано</em></MenuItem>
          <MenuItem value={1}> Подтверждена </MenuItem>
          <MenuItem value={0}> Отклонена </MenuItem>
        </Select>
        <FormHelperText style={{color: categoryProps.categoryProps.formHelperText.error ? 'red' : 'gray'}}>
          {categoryProps.categoryProps.formHelperText.text}
        </FormHelperText>
      </FormControl>
    </Box>
  );
};

export default ViolationCategory;