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

// Data
import adminsTableData from "layouts/admins/data/adminsTableData";
import MDInput from "components/MDInput";
import swal from 'sweetalert';
import axios from 'axios';
import { baseUrl } from 'common/baseUrl';
import { authenticate } from 'common/authenticate';

function Admins() {

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
    await getAdmins();
  }, [])

  // ADMINS
  const [showAdd, setShowAdd] = useState(false)
  const [admins, setAdmins] = useState([]);
  const [nameSearch, setNameSearch] = useState('');

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  
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

  const createAdmin = () => {
    if(
      !name ||
      !password
    ) {
      swal("Oops!", "Some field are missing!", "warning");
      return;
    }

    let payload = {
      name,
      password
    };
    axios({
      method: "POST",
      url: baseUrl + '/admin/register',
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      swal("Yes!", "Create admin successfully", "success");
      window.location.reload(false);
    }).catch((err) => {
      swal("Oops!", "Something went wrong!", "error");
      return;
    })
  }
  
  if(!admins || !authenticate) {
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
                  Create new admin
                </MDTypography>
                <MDTypography display="block" variant="button" color="white" my={1}>
                  Enter new admin data
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form">
  
                  <MDBox mb={2}>
                    <MDInput 
                      type="text" 
                      label="Name" 
                      variant="standard" 
                      fullWidth 
                      // value={username}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="password" 
                      label="Password" 
                      variant="standard" 
                      fullWidth 
                      // value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </MDBox>

                  <MDBox mt={4} mb={1}>
                    <Grid container>
                      <Grid item xs={6} p={1}>
                        <MDButton 
                          variant="gradient" 
                          color="info" 
                          fullWidth
                          onClick={createAdmin}
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

export default Admins;
