import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import Post from "../../common/routes/post";
import Failed from "../../common/components/failed";
import Success from "../../common/components/success";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 450,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Card = () => {
  const [change, setchange] = useState({});
  const [base, setbase] = useState("USD");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openMince, setOpenMince] = React.useState(false);
  const handleOpenMince = () => setOpenMince(true);
  const handleCloseMince = () => setOpenMince(false);
  const [erralert, Seterralert] = useState(false);
  const [succalert, Setsuccalert] = useState(false);
  const [transactions, Settransactions] = useState([]);
  const [msj, Setmsj] = useState("");
  const [soldval, Setsoldval] = useState(0);
  const [deposit, setdeposit] = useState({
    type: "+",
    value: "",
    to: "--",
    benefits: 0,
    note: "",
  });

  const [withdraw, setwithdraw] = useState({
    type: "-",
    value: "",
    to: "",
    benefits: "",
    note: "",
  });
  const clearForm = () => {
    setdeposit({
      type: "+",
      value: "",
      to: "--",
      benefits: 0,
    });
    setwithdraw({
      type: "-",
      value: "",
      to: "",
      benefits: "",
    });
  };

  useEffect(() => {
    axios
      .get(
        `https://v6.exchangerate-api.com/v6/cde91ad2098179627c347785/latest/${base}`
      )
      .then((response) => {
        setchange(response.data);
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  }, [base]);
  const handleInputChangeMince = (e) => {
    const { name, value } = e.target;
    setwithdraw({ ...withdraw, [name]: value });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setdeposit({ ...deposit, [name]: value });
  };

  const handleSubmitMince = async (e) => {
    e.preventDefault();
    try {
      const response = await Post("/addtransaction", withdraw);
      if (response.status === 200 && response.data.msj) {
        Setsoldval(soldval - withdraw.value);
        clearForm();
        Setsuccalert(true);
        Setmsj(response.data.msj);
        Settransactions((prevBlogs) => [
          ...prevBlogs,
          { ...withdraw, _id: response.data.tran._id },
        ]);
        setTimeout(() => {
          Setsuccalert(false);
          Setmsj("");
          handleCloseMince();
        }, 1000);
      }
    } catch (error) {
      clearForm();
      Seterralert(true);
      Setmsj("verify required fields or try again later");
      setTimeout(() => {
        Seterralert(false);
        Setmsj("");
      }, 1500);
    }
  };

  const fetchtrans = async () => {
    try {
      const response = await Post("/alltransactions", {
        verif: true,
      });
      if (response.data.all) {
        Settransactions(response.data.all);
      } else {
        Settransactions([]);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const sold = async () => {
    try {
      const response = await Post("/sold", {
        verif: true,
      });
      if (response.data.sold) {
        Setsoldval(response.data.sold.toFixed(4));
      } else {
        Setsoldval(0);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchtrans();
    sold();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Post("/addtransaction", deposit);

      if (response.status === 200 && response.data.msj) {
        Setsoldval(soldval + deposit.value);
        clearForm();
        Setsuccalert(true);
        Setmsj(response.data.msj);
        Settransactions((prevBlogs) => [
          ...prevBlogs,
          { ...deposit, _id: response.data.tran._id },
        ]);
        setTimeout(() => {
          Setsuccalert(false);
          Setmsj("");
          handleClose();
        }, 1000);
      }
    } catch (error) {
      clearForm();
      Seterralert(true);
      Setmsj("verify required fields or try again later");
      setTimeout(() => {
        Seterralert(false);
        Setmsj("");
      }, 1500);
    }
  };

  const columns = [
    { id: "type", label: "Type", align: "center" },
    { id: "value", label: "Value", align: "center" },
    { id: "to", label: "Beneficiary", align: "center" },
    { id: "benefits", label: "Benefits", align: "center" },
    { id: "createdAt", label: "Date & Time", align: "center" },
    { id: "note", label: "Notes", align: "center" },
  ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <div class="card">
          <div class="card__side card__side_front">
            <div class="flex__1">
              <p class="card__side__name-bank"></p>
              <div class="card__side__chip"></div>
              <p class="card__side__name-person">Digital Move Up</p>
            </div>
          </div>
          <div class="card__side card__side_back">
            <div class="card__side__black"></div>
            <p class="card__side__number">SOLD : {soldval} $</p>
            <div class="flex__2"></div>
            <p class="card__side__other-info">
              CARD BANK OF DIGITAL MOVE UP PLATEFORM | CBC | JARZOUNA 7021 | 2ND
              ETAGE | BIZERTE
            </p>
          </div>
        </div>

        <TableContainer>
          <Table sx={{ minWidth: 100 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  <b style={{ color: "#9C27B0" }}>Last UpDate</b>{" "}
                  {change.time_last_update_utc}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <b style={{ color: "#9C27B0" }}>1</b> {base}{" "}
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell>TND</StyledTableCell>
                <StyledTableCell align="center">
                  {change.conversion_rates?.TND}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell>USD</StyledTableCell>
                <StyledTableCell align="center">
                  {change.conversion_rates?.USD}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell>EUR</StyledTableCell>
                <StyledTableCell align="center">
                  {change.conversion_rates?.EUR}
                </StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell>QAR</StyledTableCell>
                <StyledTableCell align="center">
                  {change.conversion_rates?.QAR}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
          <div
            style={{
              marginTop: "20px",
              display: "grid",
              gridTemplateColumns: "repeat(7,1fr)",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <Button
              variant="contained"
              size="medium"
              color="secondary"
              onClick={() => {
                setbase("USD");
              }}
            >
              USD
            </Button>
            <Button
              variant="contained"
              size="medium"
              color="secondary"
              onClick={() => {
                setbase("TND");
              }}
            >
              TND
            </Button>
            <Button
              variant="contained"
              size="medium"
              color="secondary"
              onClick={() => {
                setbase("QAR");
              }}
            >
              QAR
            </Button>
            <Button
              variant="contained"
              size="medium"
              color="secondary"
              onClick={() => {
                setbase("EUR");
              }}
            >
              EUR
            </Button>
            <Button
              variant="contained"
              size="medium"
              color="secondary"
              onClick={() => {
                setbase("JPY");
              }}
            >
              JPY
            </Button>
            <Button
              variant="contained"
              size="medium"
              color="secondary"
              onClick={() => {
                setbase("CAD");
              }}
            >
              CAD
            </Button>
            <Button
              variant="contained"
              size="medium"
              color="secondary"
              onClick={() => {
                setbase("TRY");
              }}
            >
              TRY
            </Button>
          </div>
        </TableContainer>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          alignItems: "center",
          justifyItems: "center",
          gap: "50px",
          marginTop: "40px",
        }}
      >
        <Button
          onClick={handleOpen}
          style={{ width: "100%" }}
          variant="contained"
          color="success"
        >
          +
        </Button>
        <Button
          onClick={handleOpenMince}
          style={{ width: "100%" }}
          variant="contained"
          color="error"
        >
          -
        </Button>
      </div>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Deposit money
              </Typography>
              <br />

              <form onSubmit={handleSubmit}>
                <TextField
                  sx={{ width: "100%", mb: 3.5 }}
                  id="depos"
                  name="value"
                  placeholder="Value"
                  variant="standard"
                  type="number"
                  color="secondary"
                  value={deposit.value}
                  onChange={handleInputChange}
                />
                <TextField
                  sx={{ width: "100%", mb: 3.5 }}
                  id="note"
                  name="note"
                  placeholder="Keep Note"
                  variant="standard"
                  type="text"
                  color="secondary"
                  value={deposit.note}
                  onChange={handleInputChange}
                />

                {erralert && <Failed msj={msj} />}
                {succalert && <Success msj={msj} />}
                <br />
                <div style={{ float: "right" }}>
                  <Button
                    onClick={() => {
                      handleClose();
                      clearForm();
                    }}
                    style={{ marginRight: "15px" }}
                    variant="outlined"
                    size="medium"
                    color="secondary"
                  >
                    Cancel
                  </Button>
                  <Button
                    style={{ marginRight: "15px" }}
                    variant="contained"
                    size="medium"
                    color="secondary"
                    type="submit"
                  >
                    Save
                  </Button>
                </div>
              </form>
            </Box>
          </Fade>
        </Modal>
      </div>

      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openMince}
          onClose={handleCloseMince}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={openMince}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Withdraw money
              </Typography>
              <br />

              <form onSubmit={handleSubmitMince}>
                <TextField
                  sx={{ width: "100%", mb: 3.5 }}
                  id="value"
                  name="value"
                  placeholder="Value"
                  variant="standard"
                  type="number"
                  color="secondary"
                  value={withdraw.value}
                  onChange={handleInputChangeMince}
                />

                <TextField
                  sx={{ width: "100%", mb: 3.5 }}
                  id="beneficiary"
                  name="to"
                  placeholder="Beneficiary"
                  variant="standard"
                  color="secondary"
                  type="text"
                  value={withdraw.to}
                  onChange={handleInputChangeMince}
                />
                <TextField
                  sx={{ width: "100%", mb: 3.5 }}
                  id="benefits"
                  name="benefits"
                  placeholder="Benefits"
                  variant="standard"
                  type="number"
                  color="secondary"
                  value={withdraw.benefits}
                  onChange={handleInputChangeMince}
                />
                <TextField
                  sx={{ width: "100%", mb: 3.5 }}
                  id="note"
                  name="note"
                  placeholder="Keep Note"
                  variant="standard"
                  type="text"
                  color="secondary"
                  value={withdraw.note}
                  onChange={handleInputChangeMince}
                />

                {erralert && <Failed msj={msj} />}
                {succalert && <Success msj={msj} />}
                <br />
                <div style={{ float: "right" }}>
                  <Button
                    onClick={() => {
                      handleCloseMince();
                      clearForm();
                    }}
                    style={{ marginRight: "15px" }}
                    variant="outlined"
                    size="medium"
                    color="secondary"
                  >
                    Cancel
                  </Button>
                  <Button
                    style={{ marginRight: "15px" }}
                    variant="contained"
                    size="medium"
                    color="secondary"
                    type="submit"
                  >
                    Save
                  </Button>
                </div>
              </form>
            </Box>
          </Fade>
        </Modal>
      </div>

      <Paper sx={{ width: "100%", marginTop: "30px" }}>
        <TableContainer sx={{ maxHeight: 440, padding: 0 }}>
          <Table stickyHeader aria-label="sticky table" size="small">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }} // Removed top
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((transaction) => (
                  <TableRow
                    key={transaction._id}
                    sx={{
                      backgroundColor:
                        transaction.type === "+"
                          ? "rgba(144, 238, 144, 0.3)"
                          : "rgba(255, 182, 193, 0.3)",
                    }}
                  >
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align="center"
                        sx={{ padding: "8px" }}
                      >
                        {column.id === "benefits" || column.id === "value"
                          ? transaction[column.id] + " $"
                          : transaction[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={transactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default Card;
