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

import { useState, useEffect } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import axios from "axios";
import { baseUrl } from "common/baseUrl";
import swal from "sweetalert";
import { authenticate } from "common/authenticate";

function Basic({ routes, setRoutes, role, setRole, getRoutes }) {
  let navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(true);

  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = () => {
    if(
      !email ||
      !password
    ) {
      swal("Oops!", "Some field are missing!", "warning");
      return;
    }
    let payload = {
      email,
      password
    };
    axios({
      method: "POST",
      url: baseUrl + '/users/login',
      data: payload
    }).then(async (res) => {
      setEmail('');
      setPassword('');
      swal("Yes!", "Login successfully", "success");
      localStorage.setItem("auth", res.data.accessToken);
      
      let { routesUsed, roleUsed } = await getRoutes();
      setRoutes(routesUsed);
      setRole(roleUsed);
      return navigate("/dashboard");
    }).catch((err) => {
      setEmail('');
      setPassword('');
      swal("Oops!", "Something went wrong!", "error");
      return;
    });
  }

  const loginAdmin = () => {
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
      url: baseUrl + '/admin/login',
      data: payload
    }).then(async(res) => {
      setEmail(null);
      setPassword(null);
      swal("Yes!", "Login admin successfully", "success");
      localStorage.setItem("auth", res.data.accessToken);

      let { routesUsed, roleUsed } = await getRoutes();
      setRoutes(routesUsed);
      setRole(roleUsed);
      return navigate("/dashboard-admin");
    }).catch((err) => {
      console.log(err)
      swal("Oops!", "Something went wrong!", "error");
      return;
    });
  }

  const handleSetIsAdmin = () => setIsAdmin(!isAdmin);

  useEffect(async() => {
    let token = localStorage.getItem('auth');
    let authenticatedData = await authenticate(token);
    if(authenticatedData) {
      if(authenticatedData.role === "admin") {
        setAuthenticated(true);
        return navigate("/dashboard-admin");
      }

      setAuthenticated(true);
      return navigate("/dashboard");
    } 

    setAuthenticated(false);
  }, [])


  if(authenticated) {
    return (
      <div></div>
    )
  }

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in page
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            {
              isAdmin 
              ?
              <MDBox mb={2}>
                <MDInput type="text" value={username} onChange={(e) => setUsername(e.target.value)} label="Username" fullWidth />
              </MDBox>
              :
              <MDBox mb={2}>
                <MDInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} label="Email" fullWidth />
              </MDBox>
            }
            <MDBox mb={2}>
              <MDInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} label="Password" fullWidth />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={isAdmin} onChange={handleSetIsAdmin} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetIsAdmin}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Login as {isAdmin ? `Admin` : `User`}
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton onClick={isAdmin ? loginAdmin : loginUser} variant="gradient" color="info" fullWidth>
                sign in now
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up admin
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
