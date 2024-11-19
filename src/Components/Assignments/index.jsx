import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Tooltip } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllAssignments,
  selectAssignmentState,
} from "../../api/assignments";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "600px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function EnhancedTable() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { assignments } = useSelector(selectAssignmentState);

  const [open, setOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  useEffect(() => {
    dispatch(fetchAllAssignments());
  }, [dispatch]);

  const handleRowClick = (assignment) => {
    setSelectedAssignment(assignment);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAssignment(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "text-green-600 font-semibold";
      case "Pending":
        return "text-red-600 font-semibold";
      case "Visited":
        return "text-blue-600 font-semibold";
      default:
        return "text-gray-600";
    }
  };
  const HighlightText = styled("span")({
    fontWeight: "bold",
    color: "#3f51b5", // Blue color for emphasis
  });

  return (
    <div>
      <div className="mt-24 flex justify-end">
        <Link to="assign">
          <button
            type="button"
            className="text-white font-semibold bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 hidden " //remove hidden in case if we need button
          >
            + New Collab
          </button>
        </Link>
      </div>
      <TableContainer
        component={Paper}
        sx={{ marginLeft: "10px", marginRight: "20px" }}
      >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Visit ID</StyledTableCell>
              <StyledTableCell align="right">Cafe</StyledTableCell>
              <StyledTableCell align="right">Influencer</StyledTableCell>
              <StyledTableCell align="right">Date of Visit</StyledTableCell>
              <StyledTableCell align="right">Collab Status</StyledTableCell>
              <StyledTableCell align="right">Payment Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments?.map((assignment) => (
              <StyledTableRow
                key={assignment._id}
                onClick={() => handleRowClick(assignment)}
                style={{ cursor: "pointer" }}
              >
                <StyledTableCell component="th" scope="row">
                  {assignment?._id.slice(0, 8).toUpperCase()}  {/* Display only the first 8 characters */}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {assignment.cafe?.cafename || "N/A"}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {assignment.influencer?.name || "N/A"}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {new Date(assignment.visit_date).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell align="right" className={getStatusColor(assignment.all_status.visit_status ? "Visited" : "Not Visited")}>
                  {assignment.all_status.visit_status ? "Visited" : "Not Visited"}
                </StyledTableCell>
                <StyledTableCell align="right" className={getStatusColor(assignment.amount_paid_status ? "Paid" : "Pending")}>
                  {assignment.amount_paid_status ? "Paid" : "Pending"}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Viewing Details */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", top: 16, right: 16 }}
          >
            <CloseIcon />
          </IconButton>
          {console.log("edigo mawa influencer details,", selectedAssignment?.influencer)}
          {selectedAssignment && (
            <div className="space-y-6">
              <Typography variant="h4" component="h2" className="font-semibold text-blue-800">
                Here’s the Collaboration Overview
              </Typography>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Typography variant="body1" color="textSecondary">
                    <strong>Visit ID:</strong> {selectedAssignment?._id.slice(0, 8).toUpperCase()}
                  </Typography>
                </div>
                <div>
                  <Typography variant="body1" color="textSecondary">
                    <strong>Cafe:</strong> {selectedAssignment.cafe?.cafename || "Not available"}
                  </Typography>
                </div>
                <div>
                  <Typography variant="body1" color="textSecondary">
                    <strong>Influencer:</strong> {selectedAssignment.influencer?.name || "No name provided"}
                  </Typography>
                </div>
                <div>
                  <Typography variant="body1" color="textSecondary">
                    <strong>Visit Date:</strong> {new Date(selectedAssignment.visit_date).toLocaleDateString()}
                  </Typography>
                </div>
                <div>
                  <Typography variant="body1" color="textSecondary">
                    <strong>Deal Amount:</strong> ₹{selectedAssignment.deal_amount_for_collab || "Not specified"}
                  </Typography>
                </div>
                <div>
                  <Typography variant="body1" color="textSecondary">
                    <strong>Payment Status:</strong>{" "}
                    <span className={getStatusColor(selectedAssignment.amount_paid_status ? "Paid" : "Pending")}>
                      {selectedAssignment.amount_paid_status ? "Paid" : "Pending"}
                    </span>
                  </Typography>
                </div>
                <div className="col-span-2">
                  <Typography variant="body1" color="textSecondary">
                    <strong>Post Collaboration Comments:</strong> {selectedAssignment.post_collab_comments || "No comments yet."}
                  </Typography>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Link
                  to={`https://www.instagram.com/${selectedAssignment.influencer?.instagram_username}`}
                  onClick={(e) => e.stopPropagation()}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", marginRight: "16px" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="feather feather-edit"
                    fill="none"
                    height="24"
                    stroke="#0005F8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    style={{ marginRight: "" }}>
                    <g fill="none" fillRule="evenodd">
                      <path stroke="#0005F8" d="M6.5 2.5h11a4 4 0 0 1 4 4v11a4 4 0 0 1-4 4h-11a4 4 0 0 1-4-4v-11a4 4 0 0 1 4-4Z"></path>
                      <circle cx="12" cy="12" r="4.5" stroke="#0005F8"></circle>
                      <circle cx="18" cy="6" r="1" fill="#0005F8"></circle>
                    </g>
                  </svg>
                </Link>

                <Link
                  to={`https://wa.me/${selectedAssignment.influencer?.whatsappnumber}`

                  }
                  onClick={(e) => e.stopPropagation()}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", marginRight: "16px" }}
                >
                  <WhatsAppIcon sx={{ color: '#131bf0' }} />
                </Link>

                <Link
                  to={`edit-assignment/${selectedAssignment?._id}`}
                  variant="contained"
                  color="primary"

                  sx={{
                    transition: "all 0.3s ease",
                    display: "inline-flex",  // Makes button align with the icon
                    alignItems: "center",    // Vertically centers the button content
                    "&:hover": {
                      transform: "scale(1.05)",
                      backgroundColor: "#0056b3",
                    },
                  }}
                >
                  <svg
                    className="feather feather-edit"
                    fill="none"
                    height="23"
                    stroke="#0005F8"  // Set the same color as the Instagram icon
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginRight: "" }}
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </Link>


                {/* <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => alert("This collaboration will be deleted")}
                  sx={{
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      backgroundColor: "#ff4d4d",
                    },
                  }}
                >
                  Delete Collaboration
                </Button> */}
              </div>

              <div className="mt-6 text-center">
                <Typography variant="body2" color="textSecondary">
                  If everything has done from the influencer side, proceed payment.
                </Typography>
                <Link to="/assignments">
                  {/* <Button variant="text" color="primary" className="mt-4">
                    Go Back to All Collaborations
                  </Button> */}
                </Link>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
