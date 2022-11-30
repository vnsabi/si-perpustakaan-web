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
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDButton from "components/MDButton";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar"
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// Data
import membersTableData from "layouts/members/data/membersTableData";
import projectsTableData from "layouts/members/data/projectsTableData";
import MDInput from "components/MDInput";
import swal from 'sweetalert';
import axios from 'axios';
import { baseUrl } from 'common/baseUrl';

function Members() {

  const [members, setMembers] = useState([]);
  const [filterDDLClass, setFilterDDLClass] = useState([]);
  const [filterDDLStudy, setFilterDDLStudy] = useState([]);
  const [filterDDLBatch, setFilterDDLBatch] = useState([]);
  const [nameSearch, setNameSearch] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [studyFilter, setStudyFilter] = useState('');
  const [batchFilter, setBatchFilter] = useState('');
  const [filterMember, setFilterMember] = useState({});
  
  const token = localStorage.getItem('auth');
  const { columns, rows } = membersTableData(members);
  const { columns: pColumns, rows: pRows } = projectsTableData();

  const getMembers = async (payload) => {
    try {
      let url = baseUrl + '/users';
      let response = await axios({
        method: "POST",
        url,
        data: payload,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      let membersData = response.data.data;
      setMembers(membersData)
      return;
    } catch(error) {
      return;
    }
  }
  
  const getFilterDDL = async () => {
    try {
      let url = baseUrl + '/users/filterDDL';
      let response = await axios({
        method: "GET",
        url,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      let classData = response.data.data.classData;
      let studyData = response.data.data.studyData;
      let batchData = response.data.data.batchData;
      setFilterDDLClass(classData);
      setFilterDDLStudy(studyData);
      setFilterDDLBatch(batchData);
      await getMembers();
      return;
    } catch(error) {
      return;
    }
  }

  const search = () => {
    let filter = Object.assign({}, filterMember);
    filter.name = nameSearch;
    setFilterMember(filter);
    getMembers(filter);
  }

  const clear = () => {
    setClassFilter('');
    setStudyFilter('');
    setBatchFilter('');
    setFilterMember({})
    getMembers({});
  }

  useEffect(async () => {
    await getFilterDDL()
  }, [])

  const handleChangeClass = (val) => {
    setClassFilter(val);
    let filter = Object.assign({}, filterMember);
    filter.className = val;
    setFilterMember(filter);
    getMembers(filter);
  };

  const handleChangeStudy = (val) => {
    setStudyFilter(val);
    let filter = Object.assign({}, filterMember);
    filter.study = val;
    setFilterMember(filter);
    getMembers(filter);
  };

  const handleChangeBatch = (val) => {
    setBatchFilter(val);
    let filter = Object.assign({}, filterMember);
    filter.batch = val;
    setFilterMember(filter);
    getMembers(filter);
  };

  const SelectClass = () => {
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Class</InputLabel>
          <Select
            labelId="member-filter-class"
            id="member-filter-class"
            value={classFilter}
            label="Class"
            onChange={(e) => handleChangeClass(e.target.value)}
            style={{
              height: 40
            }}
          >
            {
              filterDDLClass.map((val, idx) => {
                return (
                  <MenuItem value={val.class} key={idx}>{val.class}</MenuItem>
                )
              })
            }
          </Select>
        </FormControl>
      </Box>
    )
  }
  
  const SelectStudy = () => {
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Study</InputLabel>
          <Select
            labelId="member-filter-study"
            id="member-filter-study"
            value={studyFilter}
            label="Study"
            onChange={(e) => handleChangeStudy(e.target.value)}
            style={{
              height: 40
            }}
          >
            {
              filterDDLStudy.map((val, idx) => {
                return (
                  <MenuItem value={val.study} key={idx}>{val.study}</MenuItem>
                )
              })
            }
          </Select>
        </FormControl>
      </Box>
    )
  }

  const SelectBatch = () => {
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Batch</InputLabel>
          <Select
            labelId="member-filter-batch"
            id="member-filter-batch"
            value={batchFilter}
            label="Batch"
            onChange={(e) => handleChangeBatch(e.target.value)}
            style={{
              height: 40
            }}
          >
            {
              filterDDLBatch.map((val, idx) => {
                return (
                  <MenuItem value={val.batch} key={idx}>{val.batch}</MenuItem>
                )
              })
            }
          </Select>
        </FormControl>
      </Box>
    )
  }
  
  if(!members) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
      </DashboardLayout>
    )
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>

          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                id="list_members"
              >
                <MDTypography variant="h6" color="white">
                  Members Menu
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <Grid container ml={2}>

                  <Grid item>
                    <MDInput label="Search member" onChange={(e) => setNameSearch(e.target.value)} />
                  </Grid>
                  <Grid item ml={1}>
                    <MDButton
                      onClick={search}
                      color="success"
                    >
                      search
                    </MDButton>
                  </Grid>

                  <Grid item ml={15} >
                    <SelectClass />
                  </Grid>

                  <Grid item ml={1} >
                    <SelectStudy />
                  </Grid>

                  <Grid item ml={1} >
                    <SelectBatch />
                  </Grid>

                  <Grid item ml={1}>
                    <MDButton
                      onClick={clear}
                      color="error"
                    >
                      clear
                    </MDButton>
                  </Grid>

                </Grid>


                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Projects Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>

        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Members;
