/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar"
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// Data
import borrowingsTableData from "layouts/borrowings/data/borrowingsTableData";
import swal from 'sweetalert';
import axios from 'axios';
import { baseUrl } from 'common/baseUrl';
import SelectedBookList from './list';

// Date Picker
import dayjs from 'dayjs';
import MaterialUIPickers from './datePicker';
import { authenticate } from 'common/authenticate';

function Borrowings() { 

  // AUTH
  let navigate = useNavigate();
  const token = localStorage.getItem('auth');
  const [authenticated, setAuthenticated] = useState(false);


  useEffect(async () => {
    let authenticatedData = await authenticate(token);
    if(!authenticatedData) {
      return navigate("/main-page");
    }

    if(authenticatedData.role === "user") {
      return navigate("/dashboard");
    }

    setAuthenticated(true);
    await getBorrowings();
  }, [])

  // BORROWINGS
  const [showAdd, setShowAdd] = useState(false);

  const [borrowings, setBorrowings] = useState([]);
  
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [mappingUsers, setMappingUsers] = useState([]);

  const [code, setCode] = useState("");
  
  // const [expired, setExpired] = useState(dayjs('2014-08-18T21:11:54'));
  const [expiredDate, setExpiredDate] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [mappingBooks, setMappingBooks] = useState([]);
  const { columns, rows } = borrowingsTableData(borrowings);

  const getBorrowings = async () => {
    try {
      let url = baseUrl + '/borrowings';
      let response = await axios({
        method: "GET",
        url,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      let borrowingsData = response.data.data;
      setBorrowings(borrowingsData);
      await getMappingUsers();
    } catch(error) {
      console.log(error)
      return;
    }
  }

  const getMappingBooks = async () => {
    try {
      let url = baseUrl + '/borrowings/mappingBooks';
      let response = await axios({
        method: "GET",
        url,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      let booksMappingData = response.data.data;
      setMappingBooks(booksMappingData)
      return;
    } catch(error) {
      console.log(error)
      return;
    }
  }

  const getMappingUsers = async () => {
    try {
      let url = baseUrl + '/borrowings/mappingUsers';
      let response = await axios({
        method: "GET",
        url,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      let usersMappingData = response.data.data;
      setMappingUsers(usersMappingData);
      await getMappingBooks();
      return;
    } catch(error) {
      console.log(error)
      return;
    }
  }

  const create = () => {
    if(
      !selectedUserId ||
      !selectedBooks.length ||
      !expiredDate
    ) {
      swal("Oops!", "Some field are missing!", "warning");
      return;
    }

    let payload = {
      userId: selectedUserId,
      expiredAt: expiredDate,
      booksData: selectedBooks,
    };
    axios({
      method: "POST",
      url: baseUrl + '/borrowings/create',
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      swal("Yes!", "Create borrowing successfully", "success");
      window.location.reload(false);
      return;
    })
    .catch((err) => {
      swal("Oops!", "Something went wrong!", "error");
      return
    })
  }

  const handleSelectUser = (val) => {
    setSelectedUser(val);
    setSelectedUserId(val.id);
  }

  const handleSelectBook = (val) => {
    setSelectedBook({
      id: val.id,
      title: val.title,
      code,
      quantityFromDB: val.quantity,
      quantity: 1
    });
  }

  const handleAddBook = (val) => {
    let selectedBooksState = [...selectedBooks];
    let checkExist = selectedBooksState.find(function(valBook) {
      return valBook.id === val.id
    });
    if(checkExist) return;
    if(!selectedBook) return;
    if(!code) return;
    setSelectedBook(null);
    selectedBook.code = code;
    selectedBooksState.push(selectedBook);
    setCode("");
    setSelectedBooks(selectedBooksState);
  }

  const handleChangeExpiredDate = (expDate) => {
    let formatted = dayjs(expDate).format("YYYY-MM-DD")
    setExpiredDate(formatted);
  };

  function UserSelect() {
    return (
      <Autocomplete
        disablePortal
        onChange={(e, selectedVal) => handleSelectUser(selectedVal)}
        value={selectedUser ? selectedUser.label : ''}
        id="combo-box-demo"
        options={mappingUsers}
        fullWidth
        renderInput={(params) => <TextField {...params} label="Users" />}
      />
    );
  }

  function BookSelect() {
    return (
      <Autocomplete
        disablePortal
        onChange={(e, selectedVal) => handleSelectBook(selectedVal)}
        value={selectedBook ? selectedBook.title : ''}
        id="combo-box-demo"
        options={mappingBooks}
        fullWidth
        renderInput={(params) => <TextField {...params} label="Book" />}
      />
    );
  }
  
  function renderBooksList() {
    return selectedBooks.map((val) => {
      console.log(val, "VAL>>>>")
      return (
        <SelectedBookList 
          id={val.id}
          title={val.title}
          code={val.code}
          quantityFromDB={val.quantityFromDB}
          deleteSelectedBook={deleteSelectedBook}
          handleSelectedBookQty={handleSelectedBookQty}
        />
      )
    });
  }

  function handleSelectedBookQty(
    id, 
    qty 
  ) {
    let copiedSelectedBooks = [...selectedBooks];
    let index = copiedSelectedBooks.findIndex(val => {
      return val.id === id
    });
    copiedSelectedBooks[index].quantity = qty;
  }

  function deleteSelectedBook(id) {
    let copiedSelectedBooks = [...selectedBooks];
    let filterNotDeleted = copiedSelectedBooks.filter(function(val) {
      return val.id !== id
    });
    setSelectedBooks(filterNotDeleted);
  }

  if(
    !mappingBooks ||
    !authenticated  
  ) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>

          {
            showAdd
            ?
            <>
            <Grid item xs={6}>
            <Card>
              <MDBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                mx={2}
                mt={-3}
                textAlign="center"
                id="create_new_book"
              >
                <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Create new borrowing
                </MDTypography>
                <MDTypography display="block" variant="button" color="white" my={1}>
                  Enter new borrowing data
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form">
  
                  <MDBox mb={2}>
                    <UserSelect />
                  </MDBox>

                  <MDBox mb={2}>
                    <BookSelect />
                  </MDBox>

                  <MDBox mb={2}>
                    <MDInput 
                      type="text" 
                      label="Code" 
                      variant="outlined" 
                      fullWidth 
                      value={code}
                      // value={username}
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </MDBox>

                  <MDBox mb={8}>  
                    <MDButton 
                      variant="gradient" 
                      color="info" 
                      fullWidth
                      onClick={handleAddBook}
                    >
                      add
                    </MDButton>
                  </MDBox>

                  <MDBox mb={2}>
                    {/* <DatePicker selected={startDate} onChange={handleChangeExpired} /> */}
                    <MaterialUIPickers 
                      expiredDate={expiredDate}
                      handleChangeExpiredDate={handleChangeExpiredDate}
                    />
                  </MDBox>

                  <MDBox mt={4} mb={1}>
                    <Grid container>
                      <Grid item xs={6} p={1}>
                        <MDButton 
                          variant="gradient" 
                          color="info" 
                          fullWidth
                          onClick={create}
                        >
                          create
                        </MDButton>
                      </Grid>
                      <Grid item xs={6} p={1}>
                        <MDButton 
                          variant="gradient" 
                          color="error" 
                          fullWidth
                          onClick={() => setShowAdd(false)}
                        >
                          cancel
                        </MDButton>
                      </Grid>
                    </Grid>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
            </Grid>

            <Grid item xs={6}>
              <Grid item xs={12} xl={12}>

                {/* BOOK LIST */}
                <Card sx={{ height: "100%", boxShadow: "none" }}>
                  <MDBox pt={2} px={2}>
                    <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                      selected book
                    </MDTypography>
                  </MDBox>
                  <MDBox p={2}>
                    <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                      {renderBooksList()}
                    </MDBox>
                  </MDBox>
                </Card>
                {/* BOOK LIST */}

              </Grid>
            </Grid>
            </>
            :
            <></>
          }

          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                id="list_books"
              >
                <MDTypography variant="h6" color="white">
                  Borrowing Menu
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <Grid container ml={2}>
                  {/* <Grid item>
                    <MDInput 
                      label="Search borrowing" 
                      // onChange={(e) => setTitleSearch(e.target.value)} 
                    />
                  </Grid>
                  <Grid item ml={1}>
                    <MDButton
                      onClick={search}
                      color="success"
                    >
                      search
                    </MDButton>
                  </Grid> */}
                  <Grid item ml={1}>
                    {
                      showAdd
                      ?
                      <></>
                      :
                      <MDButton
                        color="info"
                        onClick={() => setShowAdd(true)}
                      >
                        add
                      </MDButton>
                    }
                  </Grid>
                </Grid>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>

        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Borrowings;
