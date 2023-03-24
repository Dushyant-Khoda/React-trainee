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
  CircularProgress,
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

export default function CategoriesPage() {
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

      const { data } = await axios.get(`${BASE_URL}category`, {
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

  const [addLoader, setAddLoader] = useState(false);
  const [editLoader, setEditLoader] = useState(false);

  const addCategory = async (catData) => {
    try {
      setAddLoader(true);
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.post(`${BASE_URL}category`, catData, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      console.log('🤩 ~ file: CategoriesPage.js:121 ~ addCategory ~ data', data);
      setModalopen(false);
      setcatTitle('');
      setAddLoader(false);
      return data;
    } catch (error) {
      return error.response.data;
    }
  };

  const updateCategory = async (id, updatedData) => {
    try {
      setEditLoader(true);
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.put(`${BASE_URL}category/${id}`, updatedData, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      console.log('🤩 ~ file: CategoriesPage.js:145 ~ updateCategory ~ data', data);
      setUpdateModalopen(false);
      seteditcatTitle('');
      setEditLoader(false);
      return data;
    } catch (error) {
      setEditLoader(false);
      return error.response.data;
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

      const { data } = await axios.delete(`${BASE_URL}category/${id}`, {
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

      const { data } = await axios.patch(`${BASE_URL}category/${id}`, bearerToken, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
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
  const UpdateModalhandleClose = () => {
    if (UpdateModalopen) {
      setUpdateModalopen(false);
    } else {
      setUpdateModalopen(true);
    }
  };

  const setEditId = (idData) => {
    console.log('🤩 ~ file: CategoriesPage.js:185 ~ setEditId ~ idData', idData.catTitle);
    setUpdateData(idData);
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
          successToast('Category Deleted Successfully');
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
          successToast('Category Status Change Successfully');
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
          return item.catTitle?.toLowerCase()?.includes(searchQuery.toLowerCase());
        });
      setFilterData(AllFilterArray);
    } else {
      setFilterData(CategoryList);
    }
  };

  const handleSubmit = async () => {
    const addCatResult = await addCategory({ catTitle });
    console.log('🤩 ~ file: CategoriesPage.js:289 ~ handleSubmit ~ addCatResult', addCatResult);
    if (addCatResult.success) {
      successToast('Category Added Successfully');
      setUpdateData('');
      fetchCategory();
    } else {
      errorToast(addCatResult.message);
    }
  };

  const handleUpdate = async () => {
    const editCatResult = await updateCategory(UpdateData._id, { catTitle: editcatTitle });
    console.log('🤩 ~ file: CategoriesPage.js:289 ~ handleSubmit ~ editCatResult', editCatResult);
    if (editCatResult.success) {
      successToast('Category Edited Successfully');
      setUpdateData('');
      fetchCategory();
    } else {
      errorToast(editCatResult.message);
    }
  };

  return (
    <>
      <Helmet>
        <title> Categories | React Trainee </title>
      </Helmet>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <>
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                Categories
              </Typography>
              <Button
                variant="contained"
                onClick={() => {
                  seteditcatTitle('');
                  setcatTitle('');
                  setModalopen(true);
                }}
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Add Category
              </Button>
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
                      const { _id, catTitle, isActive, createdAt } = tableData;
                      return (
                        <TableBody key={_id}>
                          <TableRow hover>
                            <TableCell align="left">{index + 1}</TableCell>
                            <TableCell align="left" style={{ textTransform: 'capitalize' }}>
                              {catTitle}
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
            anchorEl={open}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
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
                handleCloseMenu();
                setUpdateModalopen(true);
                seteditcatTitle(UpdateData.catTitle);
              }}
            >
              <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
              Edit
            </MenuItem>

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

          <Modal
            open={Modalopen}
            onClose={ModalhandleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <h3>Create Category</h3>
                  <TextField
                    id="outlined-firstname"
                    label="Category Title"
                    variant="outlined"
                    value={catTitle}
                    onChange={(e) => setcatTitle(e.target.value)}
                  />
                  <div
                    style={{
                      marginTop: '30px',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      opacity: catTitle.trim().length > 0 ? 1 : 0.5,
                    }}
                  >
                    {addLoader ? (
                      <CircularProgress />
                    ) : (
                      <LoadingButton
                        type="submit"
                        variant="contained"
                        style={{
                          background: '#6ab04c',
                          padding: '10px 20px',
                          opacity: 1,
                          cursor: catTitle.trim().length > 0 ? 'pointer' : 'not-allowed',
                        }}
                        onClick={() => handleSubmit()}
                      >
                        Add Category
                      </LoadingButton>
                    )}
                  </div>
                </div>
              </div>
            </Box>
          </Modal>

          <Modal
            open={UpdateModalopen}
            onClose={UpdateModalhandleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <h3>Edit Category</h3>
                  <TextField
                    id="outlined-firstname"
                    label="Category Title"
                    variant="outlined"
                    value={editcatTitle}
                    onChange={(e) => seteditcatTitle(e.target.value)}
                  />
                  <div
                    style={{
                      marginTop: '30px',
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                    {editLoader ? (
                      <CircularProgress />
                    ) : (
                      <LoadingButton
                        type="submit"
                        variant="contained"
                        style={{
                          background: '#FFC501',
                          padding: '10px 20px',
                          opacity: 1,
                          cursor: 'pointer',
                        }}
                        onClick={() => handleUpdate()}
                      >
                        Edit Category
                      </LoadingButton>
                    )}
                  </div>
                </div>
              </div>
            </Box>
          </Modal>
        </>
      )}
    </>
  );
}
