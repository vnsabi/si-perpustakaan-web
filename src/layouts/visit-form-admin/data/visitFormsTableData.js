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

import { useState } from 'react';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";


export default function data(visitForms) {

  function Text({ 
    value
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
    return visitForms.map((val, idx) => {
      return {
        visitorName: <Text 
          value={val.visitorName} 
        />,
        className: <Text 
          value={val.className} 
        />,
        visitReason: <Text 
          value={val.visitReason}
        />,
      }
    })
  }
  
  if(!visitForms.length) {
    return {
      columns: [
        { Header: "visitor name", accessor: "visitorName", width: "15%", align: "left" },
        { Header: "class name", accessor: "className", align: "center" },
        { Header: "visit reason", accessor: "visitReason", align: "center" }
      ],
  
      rows: [],
    }
  }

  return {
    columns: [
      { Header: "visitor name", accessor: "visitorName", width: "15%", align: "left" },
      { Header: "class name", accessor: "className", align: "center" },
      { Header: "visit reason", accessor: "visitReason", align: "center" }
    ],

    rows: renderRows(),
  };
}