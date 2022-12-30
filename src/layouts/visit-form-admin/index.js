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
import visitFormsTableData from "layouts/visit-form-admin/data/visitFormsTableData";
import axios from 'axios';
import { baseUrl } from 'common/baseUrl';
import { authenticate } from 'common/authenticate';

function VisitFormAdmin() {

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
    await getVisitForm()
  }, [])


  // BOOKS
  const [showAdd, setShowAdd] = useState(false)

  const [visitForms, setVisitForms] = useState([]);
  const [titleSearch, setTitleSearch] = useState('');

  const { columns, rows } = visitFormsTableData(visitForms);

  const getVisitForm = async () => {
    try {
      let url = baseUrl + '/visit-form';
      let response = await axios({
        method: "GET",
        url,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      let visitFormData = response.data.data;
      setVisitForms(visitFormData)
      return;
    } catch(error) {
      console.log(error)
      return;
    }
  }

  if(
    !visitForms.length ||
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
                  Visit Form Menu
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
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

export default VisitFormAdmin;
