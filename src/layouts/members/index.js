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

// Data
import authorsTableData from "layouts/books/data/authorsTableData";
import projectsTableData from "layouts/books/data/projectsTableData";
import MDInput from "components/MDInput";
import swal from 'sweetalert';
import axios from 'axios';
import { baseUrl } from 'common/baseUrl';

function Members() {
  const [showAdd, setShowAdd] = useState(false)

  const [books, setBooks] = useState([]);
  const [titleSearch, setTitleSearch] = useState('');
  
  const token = localStorage.getItem('auth');
  const { columns, rows } = authorsTableData(books);
  const { columns: pColumns, rows: pRows } = projectsTableData();

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

  const getMembers = async () => {
    try {
      let url = baseUrl + '/users';
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
                  Members Menu
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <Grid container ml={2}>
                  <Grid item>
                    <MDInput label="Search member" onChange={(e) => setTitleSearch(e.target.value)} />
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
              >
                <MDTypography variant="h6" color="white">
                  Projects Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
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

export default Members;
