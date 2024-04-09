import React from 'react';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import TableLoader from "../../UI/TableLoader/TableLoader";

export function EnhancedTableHead({ tHeaders,
                             filterRow,
                             handleSort,
                             extraOptions }) {
  return (
    <TableHead
      style={{
        backgroundColor: 'lightgray',
      }}
    >
      <TableRow>
        {tHeaders.map(headCell => (
          <TableCell
            key={headCell.id}
            sortDirection={extraOptions.sort === headCell.id ? extraOptions.order : false}
          >
            <TableSortLabel
              active={extraOptions.sort === headCell.id}
              direction={extraOptions.sort === headCell.id ? extraOptions.order : 'asc'}
              onClick={() => handleSort(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
{/*      {
        filterRow()
      }*/}
    </TableHead>
  );
}

function CustomTable({  tRows,
                        countRows,
                        tHeaders,
                        setOpen,
                        setSelected,
                        tableRows,
                        filterRow = null,
                        loading,
                        extraOptions,
                        setExtraOptions}) {

/*  const handleSort = (sortProp) => {
    setExtraOptions({
      ...extraOptions,
      order: extraOptions.order === 'asc' ? 'desc' : 'asc',
      sort: sortProp
    })
  }*/

  const handleClick = (row) => {
    setOpen(true);
    setSelected(row);
  };

  const handleChangePage = (event, newPage) => {
    setExtraOptions({
      ...extraOptions,
      page: newPage
    })
  };

  const handleChangeRowsPerPage = (event) => {
    setExtraOptions({
      ...extraOptions,
      size: parseInt(event.target.value, 10),
      page: 0
    })
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    extraOptions.page > 0 ? Math.max(0, (1 + extraOptions.page) * extraOptions.size - tRows.length) : 0;

  return (
    <Box sx={{width: '100%'}}>
      <Paper sx={{width: '100%', mb: 2}}>
        <TableContainer>
          <Table
            sx={{minWidth: 750}}
          >
            <EnhancedTableHead
              tHeaders={tHeaders}
              rowCount={tRows.length}
              filterRow={filterRow}
              extraOptions={extraOptions}
              setExtraOptions={setExtraOptions}
            />
            {
              loading
                ?
                <TableLoader tHeaders={tHeaders} />
                :
                tRows !== []
                  ?
                  <TableBody>
                    {tRows.map((row) => {
                      return tableRows(handleClick, row, row.id)
                    })}
                    {emptyRows > 0 && (
                      <TableRow>
                        <TableCell colSpan={tHeaders.length}/>
                      </TableRow>
                    )}
                  </TableBody>
                  :
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={tHeaders.length} style={{textAlign: 'center'}}>
                        Нет записей
                      </TableCell>
                    </TableRow>
                  </TableBody>
            }
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={countRows ? countRows : 0}
          rowsPerPage={extraOptions.size !== null ? extraOptions.size : 10}
          page={extraOptions.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default CustomTable
