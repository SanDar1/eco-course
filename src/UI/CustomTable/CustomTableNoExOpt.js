import React, {useState} from 'react';

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
import {visuallyHidden} from '@mui/utils';
import TableLoader from "../TableLoader/TableLoader";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }

  if (b[orderBy] > a[orderBy]) {
    return 1
  }

  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])

    if (order !== 0) {
      return order
    }

    return a[1] - b[1]
  })

  return stabilizedThis.map((el) => el[0])
}

function EnhancedTableHead({ order, orderBy, onRequestSort, tHeaders}) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

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
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function CustomTable({ tRows, tHeaders, setOpen, setSelected, tableRows, loading }) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (row) => {
    setOpen(true);
    setSelected(row);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tRows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              tHeaders={tHeaders}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={tRows.length}
            />
            {
              loading
                ?
                <TableLoader tHeaders={tHeaders} />
                :
                tRows !== []
                  ?
                  <TableBody>
                    {stableSort(tRows, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, key) =>
                        tableRows(handleClick, row, key)
                      )}
                    {emptyRows > 0 && (
                      <TableRow>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  :
                  <TableBody>
                    <TableRow>
                      Нет записей
                    </TableRow>
                  </TableBody>
            }
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={tRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default CustomTable