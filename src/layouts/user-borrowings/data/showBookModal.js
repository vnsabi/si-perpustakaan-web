import * as React from 'react';
import MDBox from "components/MDBox";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MDTypography from "components/MDTypography";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BorrowingsBookModal({
  booksData
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const renderBooks = () => {
    return booksData.map((val) => {
      return (
        <MDBox 
          display="flex" 
          flexDirection="column" 
          alignItems="flex-start" 
          justifyContent="center"
          marginTop={2}
          marginBottom={2}
        >
          <MDTypography variant="button" fontWeight="medium">
            {val.title} 
          </MDTypography>
          <MDTypography variant="caption" color="text">
            {val.code}
          </MDTypography>
          <MDTypography variant="caption" color="text">
            Quantity: {val.quantity} pcs
          </MDTypography>
        </MDBox>
      );
    })
  }

  return (
    <div>
      <Button onClick={handleOpen}>SHOW DETAIL</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Borrowing Books
          </Typography>

          {renderBooks()}

        </Box>
      </Modal>
    </div>
  );
}