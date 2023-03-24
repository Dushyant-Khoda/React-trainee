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
  Drawer,
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
// sections
import LoadingAnimation from '../components/LoadingAnimation';
import { UserListHead } from '../sections/@dashboard/user';
import EditUserDrawer from '../sections/@dashboard/user/EditUserDrawer';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'phoneNumber', label: 'Phone', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'isActive', label: 'Status', alignRight: false },
  { id: 'createdAt', label: 'Created At', alignRight: false },
  { id: '' },
];

const Drawerdata = [
  {
    name: 'Home',
  },
  { name: 'Inbox' },
  { name: 'Outbox' },
  { name: 'Sent mail' },
  { name: 'Draft' },
  { name: 'Trash' },
];

// ----------------------------------------------------------------------

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

export default function UserPage() {
  // const [open, setOpen] = useState(null);

  const [allUserList, setAllUserList] = useState();
  const [filterData, setFilterData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdateLoading, setIsUpdateLoading] = useState(true);
  const [searchString, setsearchString] = useState('');
  const [Modalopen, setModalopen] = useState(false);
  const [UpdateData, setUpdateData] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setlastname] = useState();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.get(`${BASE_URL}user/v2/users`, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      setOpenDrawer(false);
      setAllUserList(data.result);
      setFilterData(data.result);
      setIsLoading(false);
      console.log('🤩 ~ file: UserPage.js:113 ~ fetchUser ~ data', data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserData = async (id, updatedData) => {
    try {
      setIsUpdateLoading(true);
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.put(`${BASE_URL}user/${id}`, updatedData, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      // setAllUserList(data.result);
      // setFilterData(data.result);
      setIsUpdateLoading(false);
      return data;
    } catch (error) {
      return error.response.data;
    }
  };
  const removeUser = async (id) => {
    try {
      setIsUpdateLoading(true);
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.delete(`${BASE_URL}user/${id}`, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      // setAllUserList(data.result);
      // setFilterData(data.result);
      setIsUpdateLoading(false);
      return data;
    } catch (error) {
      return error.response.data;
    }
  };

  const doTogglerCall = async (id) => {
    try {
      setIsUpdateLoading(true);
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.patch(`${BASE_URL}user/active/${id}`, bearerToken, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      setIsUpdateLoading(false);
      return data;
    } catch (error) {
      return error.response.data;
    }
  };

  const ModalhandleClose = () => {
    if (Modalopen) {
      setModalopen(false);
    } else {
      setModalopen(true);
    }
  };

  const [openDrawer, setOpenDrawer] = useState(false);
  const drawerChanges = async (data) => {
    if (data.type !== 'obj') {
      data.delete('type');
      for (var [key, value] of data.entries()) {
        console.log(key, value);
      }
    } else {
      delete data.type;
      console.log(data);
    }
    console.log(data);
    const updateResult = await updateUserData(UpdateData._id, data);
    if (updateResult?.success === true) {
      await fetchUser();
    }
    // console.log('Changes FROM Drawer', data);
  };
  const closeDrawer = () => {
    setOpenDrawer(false);
  };
  const getList = () => (
    <div style={{ width: 350 }}>
      {/* <div onClick={() => setOpenDrawer(false)}> */}
      <EditUserDrawer data={UpdateData} changeFunc={drawerChanges} closeDrawer={closeDrawer} />
      {/* </div> */}
    </div>
  );

  const setEditId = (idData) => {
    setUpdateData(idData);
  };

  React.useEffect(() => {
    fetchUser();
  }, []);

  // const handleOpenMenu = (event) => {
  //   setOpen(event.currentTarget);
  // };

  // const handleCloseMenu = () => {
  //   setOpen(null);
  // };

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
          fetchUser();
        } else {
          swal('Something Went Wrong Please try after some time', {
            icon: 'error',
          });
        }
      } else {
        swal('Something Went Wrong Please try after some time', {
          icon: 'error',
        });
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
        console.log('🤩 ~ file: UserPage.js:285 ~ handleToggler ~ willDelete', willDelete);
        const result = await doTogglerCall(id);
        console.log('🤩 ~ file: UserPage.js:288 ~ handleToggler ~ result', result);
        fetchUser();
        if (result?.success) {
          fetchUser();
        }
      } else {
        swal('Something Went Wrong Please try after some time', {
          icon: 'error',
        });
      }
    });
  };

  const doSearchName = (searchQuery) => {
    console.log('🚀 ~ file: Project.jsx:302 ~ doSearchName ~ e', searchQuery.length);
    if (searchQuery.length === 0) {
      setFilterData(allUserList);
    }
    if (searchQuery.length > 0) {
      const AllFilterArray =
        allUserList &&
        allUserList.filter((item) => {
          return (
            item.firstName?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
            item.lastName?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
            item.country?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
            item.state?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
            item.company?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
            item.email?.toLowerCase()?.includes(searchQuery.toLowerCase())
          );
        });

      setFilterData(AllFilterArray);
    }
  };

  return (
    <>
      <Helmet>
        <title> User | React Trainee </title>
      </Helmet>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <>
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                User
              </Typography>
              <Link to={'/dashboard/adduser'}>
                <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                  New User
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
                            key={Math.floor(Math.random() * 10000) * Date.now()}
                            align={headCell.alignRight ? 'right' : 'left'}
                          >
                            <Box>{headCell.label}</Box>
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    {filterData.map((tableData) => {
                      const {
                        _id,
                        firstName,
                        lastName,
                        email,
                        phoneNumber,
                        country,
                        state,
                        role,
                        company,
                        isActive,
                        createdAt,
                        profileImg,
                      } = tableData;
                      return (
                        <TableBody key={_id}>
                          <TableRow hover>
                            <TableCell component="th" scope="row" padding="none">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Avatar
                                  alt={firstName}
                                  style={{ marginLeft: '20px', width: '25px', height: '25px' }}
                                  src={
                                    profileImg && profileImg.url
                                      ? profileImg.url
                                      : '/assets/images/avatars/avatar_18.jpg'
                                  }
                                />
                                <Typography variant="subtitle2">{`${firstName} ${lastName}`}</Typography>
                              </Stack>
                            </TableCell>

                            <TableCell align="left">
                              <div style={{ width: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {email}
                              </div>
                            </TableCell>
                            <TableCell align="left">{phoneNumber}</TableCell>

                            <TableCell align="left">{role}</TableCell>
                            <TableCell align="left">{company}</TableCell>
                            <TableCell align="left">
                              <Label
                                color={isActive ? 'success' : 'error'}
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleToggler(_id)}
                              >
                                {sentenceCase(isActive ? 'active' : 'inactive')}
                              </Label>
                            </TableCell>
                            <TableCell align="left">{moment(createdAt).format('MMM DD YY')}</TableCell>

                            <TableCell align="right">
                              <div>
                                <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                                  <Iconify icon={'eva:more-vertical-fill'} onClick={() => setEditId(tableData)} />
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
            anchorEl={anchorEl}
            onClose={() => handleClose()}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: {
                p: 1,
                width: 140,
                '& .MuiMenuItem-root': {
                  px: 1,
                  typography: 'body2',
                  borderRadius: 0.75,
                },
              },
            }}
          >
            <MenuItem
              onClick={() => {
                setOpenDrawer(true);
                // handleCloseMenu();
                handleClose();
              }}
            >
              <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
              Edit
            </MenuItem>

            <MenuItem
              sx={{ color: 'error.main' }}
              onClick={() => {
                handleDelete(UpdateData._id);
                handleClose();
                // handleCloseMenu();
              }}
            >
              <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
              Delete
            </MenuItem>
          </Popover>

          <Drawer open={openDrawer} anchor={'right'} onClose={() => setOpenDrawer(false)}>
            {getList()}
          </Drawer>
        </>
      )}
    </>
  );
}
