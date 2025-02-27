import { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Paper,
  Checkbox,
  Button,
  ButtonGroup,
} from "@mui/material";
import PropTypes from "prop-types";

function DataTable({ dataList, setListName, handleDeleteItem }) {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleMoveRowUp = (index) => {
    if (index === 0) return; // No mover si es la primera fila

    const newData = [...dataList];
    [newData[index], newData[index - 1]] = [newData[index - 1], newData[index]];
    setListName(newData);
  };
  const handleMoveRowUpToTop = (index) => {
    if (index === 0) return; // No mover si es la primera fila

    const newData = [...dataList];
    const item = newData.splice(index, 1);
    newData.unshift(item);
    setListName(newData);
  };
  const handleMoveRowDown = (index) => {
    if (index === dataList.length - 1) return;

    const newData = [...dataList];
    [newData[index], newData[index + 1]] = [newData[index + 1], newData[index]];
    setListName(newData);
  };
  const handleMoveRowUpToDown = (index) => {
    if (index === dataList.length - 1) return;

    const newData = [...dataList];
    const item = newData.splice(index, 1);
    newData.push(item);
    setListName(newData);
  };
  return (
    <>
      {dataList.length > 0 ? (
        <Paper
          sx={{
            boxShadow: 5,
            marginTop: "0.5rem",
            width: "100%",
            overflow: "hidden",
            paddingTop: "0.5rem",
          }}
        >
          <TableContainer sx={{ maxHeight: 740 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Move</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow hover key={`${index}`} tabIndex={-1}>
                      <TableCell padding="checkbox" align="center">
                        <Checkbox />
                      </TableCell>
                      <TableCell align="center">
                        {index + 1} - {row}
                      </TableCell>
                      <TableCell align="center">
                        <ButtonGroup
                          variant="contained"
                          aria-label="Basic button group"
                        >
                          <Button onClick={() => handleMoveRowUp(index)}>
                            ↑
                          </Button>
                          <Button onClick={() => handleMoveRowUpToTop(index)}>
                            ⤒
                          </Button>
                          <Button onClick={() => handleMoveRowDown(index)}>
                            ↓
                          </Button>
                          <Button onClick={() => handleMoveRowUpToDown(index)}>
                            ⤓
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          color="error"
                          onClick={() => handleDeleteItem(index)} // Corregir typo
                          variant="contained"
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={dataList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <></>
      )}
    </>
  );
}

DataTable.propTypes = {
  dataList: PropTypes.array.isRequired,
  handleDeleteItem: PropTypes.func.isRequired,
  setListName: PropTypes.func.isRequired,
};
export default DataTable;
