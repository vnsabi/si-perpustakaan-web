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
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// Data
import adminsTableData from "layouts/admins/data/adminsTableData";
import MDInput from "components/MDInput";
import swal from 'sweetalert';
import axios from 'axios';
import { baseUrl } from 'common/baseUrl';

function Admins() {

  const [admins, setAdmins] = useState([]);
  const [nameSearch, setNameSearch] = useState('');
  
  const token = localStorage.getItem('auth');
  const { columns, rows } = adminsTableData(admins);

  const getAdmins = async (name) => {
    try {
      let url = baseUrl + '/admin';
      if(name) url = url + `?name=${name}`;
      let response = await axios({
        method: "GET",
        url,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      let adminsData = response.data.data;
      setAdmins(adminsData)
    } catch(error) {
      return;
    }
  }

  const search = () => {
    getAdmins(nameSearch);
  }

  const clear = () => {
    getAdmins();
  }

  useEffect(async () => {
    await getAdmins()
  }, [])
  
  if(!admins) {
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
                id="list_members"
              >
                <MDTypography variant="h6" color="white">
                  Admins Menu
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <Grid container ml={2}>

                  <Grid item>
                    <MDInput label="Search admin" onChange={(e) => setNameSearch(e.target.value)} />
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
                    <MDButton
                      onClick={clear}
                      color="error"
                    >
                      clear
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

export default Admins;
