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

import { useState, useEffect } from 'react';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Images
import ActionSide from './actionSide';
import axios from 'axios';
import { baseUrl } from 'common/baseUrl';
import { dateFormatter } from 'common/dateFormat';

export default function data() {
  const [books, setBooks] = useState([]);
  const token = localStorage.getItem('auth');
  const [ isEditActive, setIsEditActive ] = useState(false);

  const getBooks = async () => {
    try {
      let response = await axios({
        method: "GET",
        url: baseUrl + '/books',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      let booksData = response.data.data;
      let bookRows = [];
      for(let book of booksData) {
        bookRows.push(
          generateRow(
            book.title,
            book.code,
            book.quantity,
            book.createdAt
          )
        )
      }
      setBooks(bookRows);
      return;
    } catch(error) {
      console.log(error)
      return;
    }

  }

  useEffect(async () => {
    await getBooks()
  }, [])

  const Text = ({ value }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {value}
        </MDTypography>
    </MDBox>
  );

  const generateRow = (
    title,
    code,
    quantity,
    createdAt
  ) => {
    return {
      title: <Text value={title} />,
      code: <Text value={code} />,
      qty: <Text value={quantity} />,
      // function: <Job title="Manager" description="Organization" />,
      // status: (
      //   <MDBox ml={-1}>
      //     <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
      //   </MDBox>
      // ),
      createdDate: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {dateFormatter(createdAt)}
        </MDTypography>
      ),

      action: <ActionSide />,
    }
  }

  return {
    columns: [
      { Header: "title", accessor: "title", width: "30%", align: "left" },
      { Header: "code", accessor: "code", align: "center" },
      { Header: "qty", accessor: "qty", align: "center" },
      { Header: "created at", accessor: "createdDate", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: books,
  };
}