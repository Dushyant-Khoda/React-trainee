/* eslint-disable */
import { sentenceCase } from 'change-case';
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import React, { useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Popover,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  InputAdornment,
  OutlinedInput,
  FormControl,
  InputLabel,
  TableHead,
  Box,
  Modal,
  TextField,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import swal from 'sweetalert';
// components

import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import Label from '../components/label';
import { LoadingButton } from '@mui/lab';
import { errorToast, successToast } from 'src/utils/Toast';
import LoadingAnimation from 'src/components/LoadingAnimation';
// sections

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'Sr No', alignRight: false },
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'location', label: 'Location', alignRight: false },
  { id: 'isActive', label: 'Status', alignRight: false },
  { id: 'createdAt', label: 'Created At', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '12px',
  p: 2,
};

export default function CarrierPage() {
  const [open, setOpen] = useState(null);

  const [CategoryList, setCategoryList] = useState();
  const [filterData, setFilterData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchString, setsearchString] = useState('');
  const [Modalopen, setModalopen] = useState(false);
  const [UpdateModalopen, setUpdateModalopen] = useState(false);
  const [UpdateData, setUpdateData] = useState();

  const [catTitle, setcatTitle] = useState('');
  const [editcatTitle, seteditcatTitle] = useState('');

  const fetchCategory = async () => {
    try {
      setIsLoading(true);
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.get(`${BASE_URL}carrier/admin`, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      console.log('🤩 ~ file: CategoriesPage.js:112 ~ fetchCategory ~ data', data);
      setCategoryList(data.result);
      setFilterData(data.result);
      setIsLoading(false);
      console.log('🤩 ~ file: UserPage.js:113 ~ fetchCategory ~ data', data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeUser = async (id) => {
    try {
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.delete(`${BASE_URL}carrier/admin/${id}`, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      return data;
    } catch (error) {
      return error.response.data;
    }
  };

  const doTogglerCall = async (id) => {
    try {
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.put(`${BASE_URL}carrier/admin/toggler/${id}`, bearerToken, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      return data;
    } catch (error) {
      return error.response.data;
    }
  };

  const setEditId = (idData) => {
    setUpdateData(idData && idData);
  };

  React.useEffect(() => {
    fetchCategory();
  }, []);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleDelete = (id) => {
    console.log(id);
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this user!',
      icon: 'error',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      console.log('🤩 ~ file: UserPage.js:261 ~ handleDelete ~ willDelete', willDelete);
      if (willDelete) {
        const result = await removeUser(id);
        if (result.success === true) {
          setUpdateData('');
          successToast('Job Deleted Successfully');
          fetchCategory();
        } else {
          swal('Something Went Wrong Please try after some time', {
            icon: 'error',
          });
        }
      }
    });
  };

  const handleToggler = (id) => {
    swal({
      title: 'Are you sure?',
      text: 'Are you sure you want to change the access of this user?',
      icon: 'info',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const result = await doTogglerCall(id);
        if (result?.success) {
          setUpdateData('');
          successToast('Job Status Change Successfully');
          fetchCategory();
        } else {
          swal('Something Went Wrong Please try after some time', {
            icon: 'error',
          });
        }
      }
    });
  };

  const doSearchName = (searchQuery) => {
    console.log('🚀 ~ file: Project.jsx:302 ~ doSearchName ~ e', searchQuery.length);
    if (searchQuery != '') {
      const AllFilterArray =
        CategoryList &&
        CategoryList.filter((item) => {
          return item.title?.toLowerCase()?.includes(searchQuery.toLowerCase());
        });
      setFilterData(AllFilterArray);
    } else {
      setFilterData(CategoryList);
    }
  };

  return (
    <>
      <Helmet>
        <title> Careers User List | Key CMS Accounting </title>
      </Helmet>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <>
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                Careers User List
              </Typography>
              <Link to={'/dashboard/carrier/new'}>
                <Button
                  variant="contained"
                  onClick={() => {
                    seteditcatTitle('');
                    setcatTitle('');
                    setModalopen(true);
                  }}
                  startIcon={<Iconify icon="eva:plus-fill" />}
                >
                  Add Job
                </Button>
              </Link>
            </Stack>

            <Card>
              <FormControl
                sx={{
                  m: 1,
                  width: '50ch',
                  margin: '29px',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                variant="outlined"
              >
                <OutlinedInput
                  id="outlined-adornment-password"
                  value={searchString}
                  placeholder="Search Here..."
                  type="text"
                  startAdornment={
                    <InputAdornment position="start">
                      <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                    </InputAdornment>
                  }
                  onChange={(e) => {
                    doSearchName(e.target.value);
                    setsearchString(e.target.value);
                  }}
                />
                {searchString.length > 0 ? (
                  <div style={{ marginLeft: '40px' }}>
                    <Label
                      color={'error'}
                      style={{ padding: '20px', fontSize: '14px' }}
                      onClick={() => {
                        doSearchName('');
                        setsearchString('');
                      }}
                    >
                      <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 1 }} />
                      {sentenceCase('Clear')}
                    </Label>
                  </div>
                ) : (
                  ''
                )}
              </FormControl>
              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {TABLE_HEAD.map((headCell) => (
                          <TableCell
                            key={Math.floor(Math.random() * 10000)}
                            align={headCell.alignRight ? 'right' : 'left'}
                          >
                            <Box>{headCell.label}</Box>
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    {filterData.map((tableData, index) => {
                      const { _id, title, location, isActive, createdAt } = tableData;
                      return (
                        <TableBody key={_id}>
                          <TableRow hover>
                            <TableCell align="left">{index + 1}</TableCell>
                            <TableCell align="left" style={{ textTransform: 'capitalize' }}>
                              {title}
                            </TableCell>
                            <TableCell align="left" style={{ textTransform: 'capitalize' }}>
                              {location}
                            </TableCell>
                            <TableCell align="left">
                              <Label
                                color={isActive ? 'success' : 'error'}
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleToggler(_id)}
                              >
                                {sentenceCase(isActive ? 'active' : 'inactive')}
                              </Label>
                            </TableCell>
                            <TableCell align="left">{moment(createdAt).format('LL')}</TableCell>

                            <TableCell align="right">
                              <div>
                                <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                                  <Iconify
                                    icon={'eva:more-vertical-fill'}
                                    onClick={() => setEditId(tableData && tableData)}
                                  />
                                </IconButton>
                              </div>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      );
                    })}
                  </Table>
                </TableContainer>
              </Scrollbar>
            </Card>
          </Container>

          <Popover
            open={Boolean(open)}
            anchorEl={open}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: {
                p: 1,
                width: 180,
                '& .MuiMenuItem-root': {
                  px: 1,
                  typography: 'body2',
                  borderRadius: 0.75,
                },
              },
            }}
          >
            <Link to={`/dashboard/carrier/edit/${UpdateData?._id}`}>
              <MenuItem
                onClick={() => {
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                Edit
              </MenuItem>
            </Link>

            <Link to={`/dashboard/carrier/candidate/${UpdateData?._id}`}>
              <MenuItem
                onClick={() => {
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'gridicons:multiple-users'} sx={{ mr: 2 }} />
                View Candidate
              </MenuItem>
            </Link>

            <MenuItem
              sx={{ color: 'error.main' }}
              onClick={() => {
                handleDelete(UpdateData._id);
                handleCloseMenu();
              }}
            >
              <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
              Delete
            </MenuItem>
          </Popover>
        </>
      )}
    </>
  );
}
