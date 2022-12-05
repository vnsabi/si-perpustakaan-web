/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Images
import { dateFormatter } from 'common/dateFormat';

export default function data(admins) {

  function Text({ 
    value, 
  }) {
    return (
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {value}
        </MDTypography>
      </MDBox>
    );
  }

  const renderRows = () => {
    return admins.map((val, idx) => {
      return {
        name: <Text 
          value={val.name} 
        />,
        registerDate: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {dateFormatter(val.createdAt)}
          </MDTypography>
        ),
      }
    })
  }
  
  if(!admins.length) {
    return {
      columns: [
        { Header: "name", accessor: "name", width: "30%", align: "left" },
        { Header: "register date", accessor: "registerDate", align: "center" }
      ],
  
      rows: [],
    }
  }

  return {
    columns: [
      { Header: "name", accessor: "name", width: "30%", align: "left" },
      { Header: "register date", accessor: "registerDate", align: "center" }
    ],

    rows: renderRows(),
  };
}