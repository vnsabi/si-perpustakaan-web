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
import MDButton from "components/MDButton";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar"
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import MDInput from "components/MDInput";

// Data
import booksTableData from "layouts/books/data/booksTableData";
import swal from 'sweetalert';
import axios from 'axios';
import { baseUrl } from 'common/baseUrl';
import { authenticate } from 'common/authenticate';

function Books() {

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
    await getBooks()
  }, [])


  // BOOKS
  const [showAdd, setShowAdd] = useState(false)
  const [title, setTite] = useState(null);
  const [code, setCode] = useState(null);
  const [qty, setQty] = useState(0);
  const [publisher, setPublisher] = useState(null);
  const [author, setAuthor] = useState(null);
  const [publishYear, setPublishYear] = useState(null);
  const [ebook, setEbook] = useState(null);
  const [ebookName, setEbookName] = useState('');

  const [books, setBooks] = useState([]);
  const [titleSearch, setTitleSearch] = useState('');

  const { columns, rows } = booksTableData(books);

  const getBooks = async (titleSearchVal) => {
    try {
      let url = baseUrl + '/books';
      if(titleSearchVal) {
        url = baseUrl + `/books?title=${titleSearchVal}`
      }
      let response = await axios({
        method: "GET",
        url,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      let booksData = response.data.data;
      setBooks(booksData)
      return;
    } catch(error) {
      console.log(error)
      return;
    }

  }
  
  const search = () => {
    getBooks(titleSearch);
  }

  const create = () => {
    if(
      !title ||
      !qty ||
      !publisher ||
      !author ||
      !publishYear
    ) {
      swal("Oops!", "Some field are missing!", "warning");
      return;
    }
    let payload = {
      title,
      quantity: qty,
      publisher,
      author,
      publishYear
    };
    axios({
      method: "POST",
      url: baseUrl + '/books/create',
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      if(ebook) {
        let response = res.data.data;
        let bookId = response.id;
        upload(bookId);
        return;
      }
      
      swal("Yes!", "Create book successfully", "success");
      window.location.reload(false);
      return;
    })
    .catch((err) => {
      swal("Oops!", "Something went wrong!", "error");
      return
    })
  }

  const upload = (bookId) => {
    const formData = new FormData();
    formData.append('bookId', bookId);
    formData.append('file', ebook);
    axios({
      method: "POST",
      url: baseUrl + '/books/upload',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res) => {
      swal("Yes!", "Create book with file successfully", "success");
      window.location.reload(false);
      return;
    })
    .catch((err) => {
      swal("Oops!", "Something went wrong when upload!", "error");
      return
    })
  }
  
  const handleUploadedEbook = (file) => {
    setEbook(file);
    setEbookName(file.name);
  }

  if(
    !books || 
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
                  Create new book
                </MDTypography>
                <MDTypography display="block" variant="button" color="white" my={1}>
                  Enter new book data
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form">
  
                  <MDBox mb={2}>
                    <MDInput 
                      type="text" 
                      label="Title" 
                      variant="standard" 
                      fullWidth 
                      // value={username}
                      onChange={(e) => setTite(e.target.value)}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text" 
                      label="Publisher" 
                      variant="standard" 
                      fullWidth 
                      // value={password}
                      onChange={(e) => setPublisher(e.target.value)}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text" 
                      label="Author" 
                      variant="standard" 
                      fullWidth 
                      // value={password}
                      onChange={(e) => setAuthor(e.target.value)}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text" 
                      label="Publish Year" 
                      variant="standard" 
                      fullWidth 
                      // value={password}
                      onChange={(e) => setPublishYear(e.target.value)}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="number" 
                      label="Quantity" 
                      variant="standard" 
                      fullWidth 
                      // value={password}
                      onChange={(e) => setQty(Number(e.target.value))}
                    />
                  </MDBox>

                  <MDBox mt={4} mb={1}>
                    <Grid container>
                      <Grid item xs={6} p={1}>
                        <MDButton
                          variant="gradient" 
                          color="info" 
                          component="label"
                        >
                          Upload E-Book
                          <input
                            type="file"
                            hidden
                            onChange={(e) => handleUploadedEbook(e.target.files[0])}
                          />
                        </MDButton>
                      </Grid>
                      <Grid item xs={6} p={1}>
                        <MDTypography display="block" variant="button" my={1}>
                          {ebookName}
                        </MDTypography>
                      </Grid>
                    </Grid>
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
                  Books Menu
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <Grid container ml={2}>
                  <Grid item>
                    <MDInput label="Search book" onChange={(e) => setTitleSearch(e.target.value)} />
                  </Grid>
                  <Grid item ml={1}>
                    <MDButton
                      onClick={search}
                      color="success"
                    >
                      search
                    </MDButton>
                  </Grid>
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

export default Books;
