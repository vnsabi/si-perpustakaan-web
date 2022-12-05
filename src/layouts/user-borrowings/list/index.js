import { useState } from 'react';


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Grid from "@mui/material/Grid";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import swal from 'sweetalert';

export default function SelectedBookList({
  id,
  title,
  code,
  quantityFromDB,
  deleteSelectedBook,
  handleSelectedBookQty
}) {
  const [qty, setQty] = useState(1);

  function handleQty(val) {
    let qtyVal = parseInt(val);
    if(qtyVal > quantityFromDB) {
      swal("Oops!", "QTY out of stock!", "warning");
      return;
    }
    setQty(qtyVal)
    handleSelectedBookQty(id, parseInt(qtyVal));
  }

  return (
    <MDBox key={code} component="li" display="flex" alignItems="center" py={1} mb={1}>

      <Grid container>
        
        <Grid item xs={7}>
          <MDBox display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center">
            <MDTypography variant="button" fontWeight="medium">
              {title}
            </MDTypography>
            <MDTypography variant="caption" color="text">
              {code}
            </MDTypography>
          </MDBox>
        </Grid>

        <Grid item xs={5}>
          <MDBox>
            <Grid container>

              <Grid item xs={5} mr={1}>
                <MDBox mb={2}>
                  <MDInput 
                    type="number" 
                    label="QTY" 
                    fullWidth 
                    onChange={(e) => handleQty(e.target.value)}
                    value={qty}
                  />
                </MDBox>
              </Grid>

              <Grid item xs={5}>
                <MDBox>
                  <MDButton 
                    variant="gradient" 
                    color="error" 
                    fullWidth
                    onClick={() => deleteSelectedBook(id)}
                  >
                    delete
                  </MDButton>
                </MDBox>
              </Grid>

            </Grid>
          </MDBox>
        </Grid>

      </Grid>


    </MDBox>
  )
}