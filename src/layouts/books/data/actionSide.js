
import { useState } from 'react';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Images
import MDButton from "components/MDButton";
import { Grid } from "@mui/material";

export default function ActionSide() {
  const [ isEditActive, setIsEditActive ] = useState(false);
  
  const setIsEdit = (activeStatus) => {
    setIsEditActive(activeStatus);
  }
  
  return (
    <Grid container>
      <Grid item xs={6}>
        {
          isEditActive 
          ?
          <MDButton 
            variant="gradient" 
            color="info" 
            size="small"
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
          isEditActive 
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
          >
            Delete
          </MDButton>
        }
      </Grid>
    </Grid>
  )
}