import React from 'react';
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#a7b399',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#a7b399',
  },
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: '#a7b399',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#a7b399',
    },
  },
});

const CustomTextField = (props) => {
  return (
    <div>
      <CssTextField
        {...props}
      />
    </div>
  );
};

export default CustomTextField;