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
import booksTableData from "layouts/user-books/data/booksTableData";
import swal from 'sweetalert';
import axios from 'axios';
import { baseUrl } from 'common/baseUrl';

function UserBooks() {
  const [showAdd, setShowAdd] = useState(false)
  const [title, setTite] = useState(null);
  const [code, setCode] = useState(null);
  const [qty, setQty] = useState(0);

  const [books, setBooks] = useState([]);
  const [titleSearch, setTitleSearch] = useState('');
  
  const token = localStorage.getItem('auth');
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

  useEffect(async () => {
    await getBooks()
  }, [])

  const create = () => {
    if(
      !title ||
      !code ||
      !qty
    ) {
      swal("Oops!", "Some field are missing!", "warning");
      return;
    }
    let payload = {
      title,
      code,
      quantity: qty
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
      swal("Yes!", "Create book successfully", "success");
      window.location.reload(false);
      return;
    })
    .catch((err) => {
      swal("Oops!", "Something went wrong!", "error");
      return
    })
  }
  
  if(!books) {
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

export default UserBooks;
