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

// Images
import axios from 'axios';
import { baseUrl } from 'common/baseUrl';
import { dateFormatter } from 'common/dateFormat';
import MDInput from "components/MDInput";
import swal from 'sweetalert';
import DownloadSide from './downloadSide';

export default function data(books) {
  const [editedBookId, setEditedBookId] = useState(0);
  function Title({ 
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

  function Code({ 
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

  function Qty({ 
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
    return books.map((val, idx) => {
      return {
        title: <Title 
          value={val.title}
        />,
        qty: <Qty 
          value={val.quantity}
        />,
        createdDate: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {dateFormatter(val.createdAt)}
          </MDTypography>
        ),

        download: <DownloadSide 
          bookId={val.id}
        />
      }
    })
  }
  
  if(!books.length) {
    return {
      columns: [
        { Header: "title", accessor: "title", width: "30%", align: "left" },
        { Header: "qty", accessor: "qty", align: "center" },
        { Header: "created at", accessor: "createdDate", align: "center" },
        { Header: "download", accessor: "download", align: "center", },
      ],
  
      rows: [],
    }
  }

  return {
    columns: [
      { Header: "title", accessor: "title", width: "30%", align: "left" },
      { Header: "qty", accessor: "qty", align: "center" },
      { Header: "created at", accessor: "createdDate", align: "center" },
      { Header: "download", accessor: "download", align: "center", },
    ],

    rows: renderRows(),
  };
}