import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Link, useNavigate } from "react-router-dom";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit'; // Import Edit icon
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchallInfluencers, selectInfluencerState } from "../../api/influencers";

const columns = [
  { id: 'name', label: 'Influencer Name', minWidth: 170 },
  { id: 'no_of_followers', label: 'Followers', minWidth: 100, align: 'right', format: (value) => value.toLocaleString('en-US') },
  { id: 'location', label: 'Location', minWidth: 170, align: 'right' },
  {
    id: 'askamount',
    label: 'Collaboration Fee',
    minWidth: 100,
    align: 'right',
    format: (value) => `₹${value.toLocaleString('en-IN')}`,  // Use 'en-IN' for Indian number formatting
  },
  { id: 'instagram_username', label: 'Profile Link', minWidth: 100, align: 'center' },
  { id: 'whatsappnumber', label: 'WhatsApp', minWidth: 100, align: 'center' },
  { id: 'actions', label: 'Actions', minWidth: 200, align: 'center' },
];

function InfluencerTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const influencer = useSelector(selectInfluencerState).influencer;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowClick = (id) => {
    navigate(`/influencers/profile/${id}`);
  };

  const handleEditClick = (id) => {
    navigate(`/influencers/edit/${id}`);
  };

  useEffect(() => {
    dispatch(fetchallInfluencers());
  }, [dispatch]);

  return (
    <div>
      <div className="inline">
        <div className="flex justify-end mt-24">
          <Link to="add-influencer">
            <button
              type="button"
              className="text-white font-semibold bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              + Add Influencer
            </button>
          </Link>
        </div>
        <Paper sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader aria-label="influencer table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
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
                {influencer.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row._id}
                    onClick={() => handleRowClick(row._id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'instagram_username' ? (
                            <a href={`https://www.instagram.com/${value}`} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer">🔗</a>
                          ) : column.id === 'whatsappnumber' ? (
                            <a
                              href={`https://wa.me/${value}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              style={{ color: 'green' }}
                            >
                              <WhatsAppIcon />
                            </a>
                          ) : column.id === 'actions' ? (
                            <>
                              <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevent row click event
                                  navigate(`assigncollab/${row._id}`); // Redirect to the new page with influencer ID
                                }}
                                style={{ marginRight: 8 }}
                              >
                                Assign Collab
                              </Button>
                              <Button
                                variant="outlined"
                                color="secondary"
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditClick(row._id);
                                }}
                              >
                                <EditIcon fontSize="small" />
                              </Button>
                            </>
                          ) : column.format && typeof value === 'number' ? (
                            column.format(value)
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={influencer.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
}

export default InfluencerTable;
