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

// react components
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

import { authenticate } from 'common/authenticate';
import swal from 'sweetalert';
import axios from 'axios';
import { baseUrl } from 'common/baseUrl';

function Cover() {
  let navigate = useNavigate();
  let token = localStorage.getItem('auth');
  const [authenticated, setAuthenticated] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const createAdmin = () => {
    if(
      !username ||
      !password
    ) {
      swal("Oops!", "Some field are missing!", "warning");
      return;
    }

    let payload = {
      name: username,
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
      setUsername('');
      setPassword('');
      swal("Yes!", "Create admin successfully", "success");

      return navigate("/dashboard-admin");
    }).catch((err) => {
      setUsername('');
      setPassword('');
      swal("Oops!", "Something went wrong!", "error");
      return;
    })
  }

  useEffect(async() => {
    let authenticatedData = await authenticate(token);
    if(!authenticatedData) {
      setAuthenticated(false);
      return navigate("/authentication/sign-in");
    }

    if(authenticatedData.role === "user") {
      setAuthenticated(false);
      return navigate("/dashboard");
    }

    setAuthenticated(true);
  }, [])

  if(!authenticated) {
    return (
      <div></div>
    )
  }

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Create new admin
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter name and password to register admin
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password" 
                label="Password" 
                variant="standard" 
                fullWidth 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </MDBox>
{/* 
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox> */}
            <MDBox mt={4} mb={1}>
              <MDButton 
                variant="gradient" 
                color="info" 
                fullWidth
                onClick={createAdmin}
              >
                create admin
              </MDButton>
            </MDBox>
            {/* <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In Admin
                </MDTypography>
              </MDTypography>
            </MDBox> */}
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
