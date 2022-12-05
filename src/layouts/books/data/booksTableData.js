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
import ActionSide from './actionSide';
import axios from 'axios';
import { baseUrl } from 'common/baseUrl';
import { dateFormatter } from 'common/dateFormat';
import MDInput from "components/MDInput";
import swal from 'sweetalert';

export default function data(books) {
  const [editedBookId, setEditedBookId] = useState(0);
  const [titlePlc, setTitlePlc] = useState('');
  const [codePlc, setCodePlc] = useState('');
  const [qtyPlc, setQtyPlc] = useState('');
  const token = localStorage.getItem('auth');

  let titleEdit = '';
  let codeEdit = '';
  let qtyEdit = 0;

  const getBookById = (id) => {
    if(id) {
      axios({
        method: "GET",
        url: baseUrl + '/books/' + id,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        let bookData = res.data;
        setTitlePlc(bookData.title);
        setCodePlc(bookData.code);
        setQtyPlc(bookData.quantity);
      })
      .catch((err) => {

      })
    }
  }

  const update = () => {
    if(
      !editedBookId
    ) {
      swal("Oops!", "Some field are missing!", "warning");
      return;
    }
    axios({
      method: "PUT",
      url: baseUrl + '/books/update',
      data: {
        bookId: editedBookId,
        title: titleEdit ? titleEdit : titlePlc,
        code: codeEdit ? codeEdit : codePlc,
        quantity: qtyEdit ? Number(qtyEdit) : qtyPlc
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      swal("Yes!", "Update book successfully", "success");
      window.location.reload(false);
      return;
    })
    .catch((err) => {
      swal("Oops!", "Something went wrong!", "error");
    })
  }

  const deleteBook = (bookId) => {
    swal("Are you sure you want to delete this book?", {
      buttons: ["No", "Yes"],
    }).then((res) => {
      if(res) {
        axios({
          method: "DELETE",
          url: baseUrl + '/books/' + bookId,
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((res) => {
          swal("Yes!", "Book deleted", "success");
          window.location.reload(false);
          return;
        })
        .catch((err) => {
          swal("Oops!", "Something went wrong!", "error");
        })
      }
    })
    .catch((err) => {
    });
  }

  const handleChangeTitle = (val) => {
    titleEdit = val;
  }

  const handleChangeCode = (val) => {
    codeEdit = val;
  }

  const handleChangeQty = (val) => {
    qtyEdit = val;
  }

  function Title({ 
    value, 
    bookId,
  }) {
    if(editedBookId === bookId) return (
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDInput 
          type="text"
          label="Title"
          placeholder={value} 
          variant="standard"
          onChange={(e) => handleChangeTitle(e.target.value ? e.target.value : value)}
        />
      </MDBox>
    )
  
    return (
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {value}
        </MDTypography>
      </MDBox>
    );
  }

  function Code({ 
    value, 
    bookId
  }) {
    if(editedBookId === bookId) return (
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDInput 
          type="text"
          placeholder={value} 
          variant="standard" 
          label="Code"
          onChange={(e) => handleChangeCode(e.target.value ? e.target.value : value)}
        />
      </MDBox>
    )
  
    return (
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {value}
        </MDTypography>
      </MDBox>
    );
  }

  function Qty({ 
    value, 
    bookId
  }) {
    if(editedBookId === bookId) return (
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDInput 
          type="number"
          label="Quantity"
          placeholder={value.toString()} 
          variant="standard" 
          onChange={(e) => handleChangeQty(e.target.value ? e.target.value : value)}
        />
      </MDBox>
    )
  
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
          bookId={val.id} 
          editedBookId={editedBookId}
        />,
        code: <Code 
          value={val.code} 
          bookId={val.id}
          editedBookId={editedBookId}
        />,
        qty: <Qty 
          value={val.quantity} 
          bookId={val.id}
          editedBookId={editedBookId}
        />,
        // function: <Job title="Manager" description="Organization" />,
        // status: (
        //   <MDBox ml={-1}>
        //     <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
        //   </MDBox>
        // ),
        createdDate: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {dateFormatter(val.createdAt)}
          </MDTypography>
        ),
  
        action: <ActionSide 
          bookId={val.id}
          title={val.title}
          code={val.code}
          qty={val.quantity}

          titleEdit={titleEdit}
          codeEdit={codeEdit}
          qtyEdit={qtyEdit}

          

          setBookId={setEditedBookId}
          editedBookId={editedBookId}
          update={update}

          getBookById={getBookById}

          deleteBook={deleteBook}
        />,
      }
    })
  }
  
  if(!books.length) {
    return {
      columns: [
        { Header: "title", accessor: "title", width: "30%", align: "left" },
        { Header: "code", accessor: "code", align: "center" },
        { Header: "qty", accessor: "qty", align: "center" },
        { Header: "created at", accessor: "createdDate", align: "center" },
        { Header: "action", accessor: "action", align: "center" },
      ],
  
      rows: [],
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

    rows: renderRows(),
  };
}