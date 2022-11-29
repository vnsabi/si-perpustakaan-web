
import { useState } from 'react';

// Images
import MDButton from "components/MDButton";
import { Grid } from "@mui/material";

export default function ActionSide({ 
  bookId,
  title,
  code,
  qty, 

  titleEdit,
  codeEdit,
  qtyEdit,

  setBookId,
  editedBookId,
  update,

  getBookById,

  deleteBook
}) {
  const [ isEditActive, setIsEditActive ] = useState(false);
  
  const setIsEdit = (activeStatus) => {
    setIsEditActive(activeStatus);
    if(activeStatus) {
      titleEdit = title;
      codeEdit = code;
      qtyEdit = qty;
      setBookId(bookId);
      getBookById(bookId)
      return;
    }

    setBookId(null);
    return;
  }
  
  return (
    <Grid container>
      <Grid item xs={6}>
        {
          isEditActive &&
          editedBookId === bookId
          ?
          <MDButton 
            variant="gradient" 
            color="info" 
            size="small"
            onClick={update}
          >
            Save
          </MDButton>
          :
          <MDButton 
            variant="gradient" 
            color="info" 
            size="small"
            onClick={() => setIsEdit(true)}
          >
            Edit
        </MDButton>
        }
      </Grid>
      <Grid item xs={6}>
        {
          isEditActive &&
          editedBookId === bookId
          ?
          <MDButton 
            variant="gradient" 
            color="error" 
            size="small"
            onClick={() => setIsEdit(false)}
          >
            Cancel
          </MDButton>
          :
          <MDButton 
            variant="gradient" 
            color="error" 
            size="small"
            onClick={() => deleteBook(bookId)}
          >
            Delete
          </MDButton>
        }
      </Grid>
    </Grid>
  )
}