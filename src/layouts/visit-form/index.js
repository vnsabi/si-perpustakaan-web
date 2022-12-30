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
import MDInput from "components/MDInput";

// Data
import swal from 'sweetalert';
import axios from 'axios';
import { baseUrl } from 'common/baseUrl';
import { authenticate } from 'common/authenticate';

function VisitForm() {

  // AUTH
  let navigate = useNavigate();
  const token = localStorage.getItem('auth');
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(async () => {
    let authenticatedData = await authenticate(token);
    if(authenticatedData) {
      setAuthenticated(true);
      if(authenticatedData.role === "user") {
        return navigate("/dashboard");
      }

      if(authenticatedData.role === "admin") {
        return navigate("/dashboard-admin");
      }

    } else {
      setAuthenticated(false);
    }
  }, [])

  const [visitorName, setVisitorName] = useState('');
  const [className, setClassName] = useState('');
  const [visitReason, setVisitReason] = useState('');

  const create = () => {
    if(
      !visitorName ||
      !className ||
      !visitReason
    ) {
      swal("Oops!", "Some field are missing!", "warning");
      return;
    }
    let payload = {
      visitorName,
      className,
      visitReason
    };

    axios({
      method: "POST",
      url: baseUrl + '/visit-form/create',
      data: payload
    })
    .then((res) => {
      swal("Yes!", "Form input successfully", "success");
      setTimeout(() => {
        window.location.reload(false);
      }, 2000)
      return;
    })
    .catch((err) => {
      swal("Oops!", "Something went wrong!", "error");
      return
    })
  }

  if(authenticated) {
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
                Form Visitors
              </MDTypography>
              <MDTypography display="block" variant="button" color="white" my={1}>
                Input visit form data
              </MDTypography>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">

                <MDBox mb={2}>
                  <MDInput 
                    type="text" 
                    label="Visitor Name" 
                    variant="standard" 
                    fullWidth 
                    // value={username}
                    onChange={(e) => setVisitorName(e.target.value)}
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    type="text" 
                    label="Class Name" 
                    variant="standard" 
                    fullWidth 
                    // value={password}
                    onChange={(e) => setClassName(e.target.value)}
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    type="text" 
                    label="Visit Reason" 
                    variant="standard" 
                    fullWidth 
                    // value={password}
                    onChange={(e) => setVisitReason(e.target.value)}
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
                        input
                      </MDButton>
                    </Grid>
                  </Grid>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
          </Grid>


        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default VisitForm;
