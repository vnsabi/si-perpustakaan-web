/**
=========================================================
* SUKANA React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// SUKANA React components
import MDBox from "components/MDBox";

// SUKANA React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// SUKANA React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// SUKANA React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// SUKANA React routes
import { userRoutes, adminRoutes } from './routes';

// SUKANA React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import axios from "axios";
import { baseUrl } from "common/baseUrl";
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import RTL from "layouts/rtl";
import Billing from "layouts/billing";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import DashboardAdmin from "layouts/admin_dashboard";
import SignUpAdmin from "layouts/authentication/sign-up-admin";
import Admins from "layouts/admins";
import Books from "layouts/books";
import Members from "layouts/members";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [routes, setRoutes] = useState([]);
  const [role, setRole] = useState(null);
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  
  const getRoutes = async () => {
    let token = localStorage.getItem('auth');
    try {
      let response = await axios({
        method: "GET",
        url: baseUrl + '/auth/profile',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if(response.data.role === "admin") return {
        routesUsed: adminRoutes,
        roleUsed: "admin"
      };
      return { 
        routesUsed: userRoutes,
        roleUsed: "user"
      };
    } catch(error) {
      return { 
        routesUsed: userRoutes,
        roleUsed: null
      };
    }

  }

  useEffect(async () => {
    let { routesUsed, roleUsed } = await getRoutes();
    setRoutes(routesUsed);
    setRole(roleUsed);
  }, []);

  // const handleRoutes = () => {
  //   routes.map((route) => {
  //     if (route.collapse) {
  //       return getRoutes(route.collapse);
  //     }

  //     if (route.route) {
  //       return <Route exact path={route.route} element={route.component} key={route.key} />;
  //     }

  //     return null;
  //   });
  // }

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
        <CssBaseline />
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
              brandName="SUKANA"
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            <Configurator />
            {configsButton}
          </>
        )}
        {layout === "vr" && <Configurator />}
        <Routes>
          <Route exact path={'/dashboard'} element={<Dashboard />} key={"dashboard"} />
          <Route exact path={'/dashboard-admin'} element={<DashboardAdmin />} key={"dashboard-admin"} />
          <Route exact path={'/tables'} element={<Tables />} key={"tables"} />       
          <Route exact path={'/books'} element={<Books />} key={"books"} />        
          <Route exact path={'/members'} element={<Members />} key={"members"} />        
          <Route exact path={'/admins'} element={<Admins />} key={"admins"} />        
          <Route exact path={'/billing'} element={<Billing />} key={"billing"} />
          <Route exact path={'/rtl'} element={<RTL />} key={"rtl"} />
          <Route exact path={'/notifications'} element={<Notifications />} key={"notifications"} />
          <Route exact path={'/profile'} element={<Profile />} key={"profile"} />
          <Route exact path={'/profile'} element={<Profile />} key={"profile"} />
          <Route 
            exact 
            path={'/authentication/sign-in'} 
            element={
              <SignIn 
                routes={routes}
                setRoutes={setRoutes} 
                role={role} 
                setRole={setRole}
                getRoutes={getRoutes}
              />
            }
            key={"sign-in"} 
          />
          <Route exact path={'/authentication/sign-up'} element={<SignUp />} key={"sign-up"} />
          <Route exact path={'/create-new-admin'} element={<SignUpAdmin />} key={"create-new-admin"} />
          {
            !role
            ?
            <Route path="*" element={<Navigate to="/authentication/sign-in" />} />
            :
            <Route path="*" element={<Navigate to="/dashboard" />} />
          }
        </Routes>
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="PERPUSTAKAAN SMKN 3"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Routes>
        {/* {handleRoutes} */}
        <Route exact path={'/dashboard'} element={<Dashboard />} key={"dashboard"} />
        <Route exact path={'/dashboard-admin'} element={<DashboardAdmin />} key={"dashboard-admin"} />
        <Route exact path={'/tables'} element={<Tables />} key={"tables"} />        
        <Route exact path={'/books'} element={<Books />} key={"books"} />        
        <Route exact path={'/members'} element={<Members />} key={"members"} />        
        <Route exact path={'/admins'} element={<Admins />} key={"admins"} />        
        <Route exact path={'/billing'} element={<Billing />} key={"billing"} />
        <Route exact path={'/rtl'} element={<RTL />} key={"rtl"} />
        <Route exact path={'/notifications'} element={<Notifications />} key={"notifications"} />
        <Route exact path={'/profile'} element={<Profile />} key={"profile"} />
        <Route exact path={'/profile'} element={<Profile />} key={"profile"} />

        <Route 
          exact 
          path={'/authentication/sign-in'} 
          element={
            <SignIn 
              routes={routes}
              setRoutes={setRoutes} 
              role={role} 
              setRole={setRole}
              getRoutes={getRoutes}
            />
          }
          key={"sign-in"} 
        />
        <Route exact path={'/authentication/sign-up'} element={<SignUp />} key={"sign-up"} />
        <Route exact path={'/create-new-admin'} element={<SignUpAdmin />} key={"create-new-admin"} />
        {
          !role
          ?
          <Route path="*" element={<Navigate to="/authentication/sign-in" />} />
          :
          <Route path="*" element={<Navigate to="/dashboard" />} />
        }
      </Routes>
    </ThemeProvider>
  );
}
