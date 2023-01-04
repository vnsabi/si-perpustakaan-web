
import { useState } from 'react';

// Images
import MDButton from "components/MDButton";
import axios from 'axios';
import { baseUrl } from 'common/baseUrl';
import swal from 'sweetalert';

import { triggerBase64Download } from 'react-base64-downloader';

export default function DownloadSide({ 
  bookId
}) {
  
  const download = () => {
    let token = localStorage.getItem('auth');
    axios({
      method: "GET",
      url: baseUrl + `/books/download?bookId=${bookId}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      if(res.data.base64) {
        let base64 = res.data.base64;
        let filename = res.data.filename;
        let ebookElement = document.createElement("a"); //Create <a>
        ebookElement.href = "data:application/pdf;base64," + base64; //Image Base64 Goes here
        ebookElement.download = filename; //File name Here
        ebookElement.click(); //Downloaded file
        // triggerBase64Download(base64, filename);
        return;
      }

      swal("Oops!", "E-Book not uploaded yet!", "warning");
    })
    .catch((err) => {
      console.log(err)
      swal("Oops!", "Something went wrong!", "error");
      return
    })
  }
  
  return (
    <MDButton 
      variant="gradient" 
      color="success" 
      size="small"
      onClick={download}
    >
      Download
    </MDButton>
  )
}