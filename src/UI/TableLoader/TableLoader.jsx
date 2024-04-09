import React from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Skeleton} from "@mui/material";
import TableBody from "@mui/material/TableBody";


import styles from './TableLoader.module.css'


const TableLoader = ({ tHeaders }) => {
  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={tHeaders.length} className={styles.tableCell}>
          <Skeleton animation={'wave'} sx={{height: '5vh', margin: 2}}/>
          <Skeleton animation={'wave'} sx={{height: '5vh', margin: 2}}/>
          <Skeleton animation={'wave'} sx={{height: '5vh', margin: 2}}/>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default TableLoader;