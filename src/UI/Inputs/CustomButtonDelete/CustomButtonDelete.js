import React from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import {styled} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import styles from './CustomButtonDelete.module.css'

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

const CustomButtonDelete = ({ handleDelete,
                              customTheme }) => {
  return (
    <Tooltip title="Удалить">
      <StyledIconButton onClick={handleDelete} theme={customTheme} sx={{ float: 'right' }}>
        <DeleteIcon className={styles.deleteIcon}/>
      </StyledIconButton>
    </Tooltip>
  );
};

export default CustomButtonDelete;