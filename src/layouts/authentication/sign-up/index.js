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

// react-router-dom components
import { Link } from "react-router-dom";
import { useState } from 'react';

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import axios from 'axios';

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { baseUrl } from "common/baseUrl";
import swal from "sweetalert";

function Cover() {

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [nisId, setNis] = useState(null);
  const [study, setStudy] = useState(null);
  const [className, setClassName] = useState(null);
  const [batch, setBatch] = useState(null);


  const register = () => {
    if(
      !name ||
      !email ||
      !password ||
      !nisId ||
      !study ||
      !className ||
      !batch
    ) {
      swal("Oops!", "Some field are missing!", "warning");
      return
    }
    let payload = {
      name,
      email,
      password,
      nisId,
      study,
      className,
      batch
    };
    axios.post(
      baseUrl + '/users/register',
      payload
    ).then(async (res) => {
      setName(null);
      setEmail(null);
      setPassword(null);
      setNis(null)
      setStudy(null)
      setClassName(null)
      setBatch(null)
      swal("Yes!", "Register success", "success");
      window.location.reload(false);
      return;
    }).catch((err) => {
      swal("Oops!", "Something went wrong!", "error");
      return;
    });
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
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput 
                onChange={(e) => setName(e.target.value)} 
                value={name}
                type="text" 
                label="Name" 
                variant="standard" 
                fullWidth 
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput 
                onChange={(e) => setEmail(e.target.value)} 
                value={email}
                type="email" 
                label="Email" 
                variant="standard" 
                fullWidth 
              />
            </MDBox>
            <MDBox mb={4}>
              <MDInput 
                onChange={(e) => setPassword(e.target.value)} 
                value={password}
                type="password" 
                label="Password" 
                variant="standard" 
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput 
                onChange={(e) => setNis(e.target.value)} 
                value={nisId}
                type="text" 
                label="NIS" 
                variant="standard" 
                fullWidth 
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput 
                onChange={(e) => setStudy(e.target.value)} 
                value={study}
                type="text" 
                label="Studi/Jurusan" 
                variant="standard" 
                fullWidth 
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput 
                onChange={(e) => setClassName(e.target.value)} 
                value={className}
                type="text" 
                label="Nama Kelas" 
                variant="standard" 
                fullWidth 
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput 
                onChange={(e) => setBatch(e.target.value)} 
                value={batch}
                type="text" 
                label="Angkatan" 
                variant="standard" 
                fullWidth 
              />
            </MDBox>


            {/* <MDBox display="flex" alignItems="center" ml={-1}>
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
              <MDButton onClick={() => register()} variant="gradient" color="info" fullWidth>
                sign up now
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
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
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
