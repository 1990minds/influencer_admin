import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllHotels, selectHotelState,deleteHotel } from "../../api/hotels";

const columns = [
  { id: 'cafename', label: 'Cafe-Name', minWidth: 170 },
  { id: 'instagram_id', label: 'Instagram ID', minWidth: 100 },
  { id: 'followers', label: 'Followers', minWidth: 170, align: 'right', format: (value) => value.toLocaleString('en-US') },
  { id: 'phonenumber', label: 'Phone Number', minWidth: 170, align: 'right' },
  { id: 'location', label: 'Location', minWidth: 170, align: 'right' },
  { id: 'actions', label: 'Actions', minWidth: 170, align: 'center' }, ]

function Index() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { hotels } = useSelector(selectHotelState);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
      setLoading(true);
      dispatch(fetchAllHotels());
      setLoading(false);
  }, [dispatch]);

  const handleEdit = (hotelId) => {
    navigate(`edit-cafe/${hotelId}`); // Replace with your edit path
  };

  const handleDelete = (hotelId) => {
    if (window.confirm("Are you sure you want to delete this cafe?")) {
      dispatch(deleteHotel(hotelId));
      

      console.log("Deleting cafe with ID:", hotelId);
      window.location.reload()
    }
  };

  return (
    <div>
      <div className='inline'>
        <div className='flex justify-end mt-24'>
          <Link to="add-cafe">
            <button
              type="button"
              className="text-white font-semibold bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              + Add Cafe
            </button>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center mt-8">
            <CircularProgress />
          </div>
        ) : (
          <Paper sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 600 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns?.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {hotels?.length === 0 && !loading ? (
                    <TableRow>
                      <TableCell colSpan={columns?.length} align="center">
                        No cafes available.
                      </TableCell>
                    </TableRow>
                  ) : (
                    hotels?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((hotel) => (
                      <TableRow hover role="checkbox" tabIndex={-1} key={hotel._id}>
                        {columns.map((column) => {
                          if (column.id === 'actions') {
                            // Render action buttons in the 'Actions' column
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => handleEdit(hotel._id)}
                                  size="small"
                                  style={{ marginRight: '8px' }}
                                >
                                  Edit
                                </Button>
                                {/* <Button
                                  variant="contained"
                                  color="secondary"
                                  onClick={() => handleDelete(hotel._id)}
                                  size="small"
                                >
                                  Delete
                                </Button> */}
                              </TableCell>
                            );
                          }
                          const value = hotel[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value || '-'}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={hotels?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        )}
      </div>
    </div>
  );
}

export default Index;
