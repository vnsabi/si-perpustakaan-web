// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Images
import { dateFormatter } from 'common/dateFormat';
import BorrowingsBookModal from "./showBookModal";

export default function data(borrowings) {
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
    return borrowings.map((val, idx) => {
      return {
        bookCount: <Text 
          value={val.booksData.length}
        />,
        member: <Text 
          value={val.userName}
          />,
        createdBy: <Text 
          value={val.createdBy}
        />,
        expiredDate: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {dateFormatter(val.expiredAt)}
          </MDTypography>
        ),
        createdDate: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {dateFormatter(val.createdAt)}
          </MDTypography>
        ),
        action: <BorrowingsBookModal 
          booksData={val.booksData}
          borrowingId={val.id}
        />,
      }
    })
  }
  
  if(!borrowings.length) {
    return {
      columns: [
        { Header: "book count", accessor: "bookCount", width: "30%", align: "left" },
        { Header: "member", accessor: "member", align: "center" },
        { Header: "created by", accessor: "createdBy", align: "center" },
        { Header: "expired at", accessor: "expiredDate", align: "center" },
        { Header: "created at", accessor: "createdDate", align: "center" },
        { Header: "action", accessor: "action", align: "center" },
      ],
  
      rows: [],
    }
  }

  return {
    columns: [
      { Header: "book count", accessor: "bookCount", width: "30%", align: "left" },
      { Header: "member", accessor: "member", align: "center" },
      { Header: "created by", accessor: "createdBy", align: "center" },
      { Header: "expired at", accessor: "expiredDate", align: "center" },
      { Header: "created at", accessor: "createdDate", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: renderRows(),
  };
}