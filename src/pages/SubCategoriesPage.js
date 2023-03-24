/* eslint-disable */
import { sentenceCase } from 'change-case';
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import React, { useState } from 'react';
import Select from 'react-select';
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
import { LoadingButton } from '@mui/lab';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import swal from 'sweetalert';
// components

import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import Label from '../components/label';
import { errorToast, successToast } from 'src/utils/Toast';
import LoadingAnimation from 'src/components/LoadingAnimation';
// sections

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'Sr No', alignRight: false },
  { id: 'title', label: 'Subcategory Title', alignRight: false },
  { id: 'Category', label: 'Category Name', alignRight: false },
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
  p: 4,
};

export default function SubCategoriesPage() {
  const [open, setOpen] = useState(null);

  const [CategoryList, setCategoryList] = useState();
  const [filterData, setFilterData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchString, setsearchString] = useState('');
  const [Modalopen, setModalopen] = useState(false);
  const [UpdateModalopen, setUpdateModalopen] = useState(false);
  const [UpdateData, setUpdateData] = useState();

  // New
  const [subCategory, setSubCategory] = useState('');
  const [editsubCategory, seteditSubCategory] = useState('');
  const [Categorydropdown, setCategorydropdown] = useState('');
  const [CategoryIdDropdown, setCategoryIdDropdown] = useState('');
  const [catData, setcatData] = useState();

  const [editCategorydropdown, seteditCategorydropdown] = useState('');
  const [editCategoryIdDropdown, seteditCategoryIdDropdown] = useState('');

  const fetchCategory = async () => {
    try {
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

      let dropDownData = [];
      data &&
        data?.result.map((mapdata) => {
          console.log(mapdata);
          if (mapdata.isActive) {
            return dropDownData.push({
              name: '',
              label: mapdata.catTitle,
              value: mapdata._id,
            });
          }
        });
      setcatData(dropDownData);
      return data;
    } catch (error) {
      return error.response.data;
    }
  };

  const fetchSubCategory = async () => {
    try {
      setIsLoading(true);
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.get(`${BASE_URL}category/subcategory/all`, {
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

  const addSubCategory = async (id, subCatData) => {
    try {
      setAddLoader(true);
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.post(`${BASE_URL}category/subcategory?cat_id=${id}`, subCatData, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      console.log('🤩 ~ file: CategoriesPage.js:121 ~ addCategory ~ data', data);
      setModalopen(false);
      setSubCategory('');
      setAddLoader(false);
      return data;
    } catch (error) {
      setAddLoader(false);
      return error.response.data;
    }
  };

  const updateSubCategory = async (id, updatedData) => {
    try {
      setEditLoader(true);
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.put(`${BASE_URL}category/subcategory/${id}`, updatedData, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      console.log('🤩 ~ file: CategoriesPage.js:145 ~ updateCategory ~ data', data);
      setUpdateModalopen(false);
      seteditCategoryIdDropdown('');
      seteditCategorydropdown('');
      seteditSubCategory('');
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

      const { data } = await axios.delete(`${BASE_URL}category/subcategory/${id}`, {
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

      const { data } = await axios.patch(`${BASE_URL}category/subcategory/${id}`, bearerToken, {
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
      seteditCategoryIdDropdown('');
      seteditCategorydropdown('');
      seteditSubCategory('');
    } else {
      setUpdateModalopen(true);
    }
  };

  const setEditId = (idData) => {
    // console.log('===================================', idData);
    setUpdateData(idData);
  };

  React.useEffect(() => {
    fetchCategory();
    fetchSubCategory();
  }, []);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const doSearchName = (searchQuery) => {
    if (searchQuery != '') {
      const AllFilterArray =
        CategoryList &&
        CategoryList.filter((item) => {
          return (
            item.subTitle?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
            item.categories?.catTitle?.toLowerCase()?.includes(searchQuery.toLowerCase())
            // item.subTitle?.toLowerCase()?.includes(searchQuery.toLowerCase())
          );
        });

      setFilterData(AllFilterArray);
    } else {
      setFilterData(CategoryList);
    }
  };

  const handleDropDown = (data) => {
    console.log(data);
    setCategoryIdDropdown(data.value);
  };

  const handleEditDropDown = (data) => {
    console.log(data);
    seteditCategoryIdDropdown(data.value);
    seteditCategorydropdown(data.label);
  };

  const handleSubmit = async () => {
    const addSubCatResult = await addSubCategory(CategoryIdDropdown, { subTitle: subCategory });
    console.log('🤩 ~ file: CategoriesPage.js:289 ~ handleSubmit ~ addSubCatResult', addSubCatResult);
    if (addSubCatResult.success) {
      successToast('Category Added Successfully');
      setUpdateData('');
      fetchSubCategory();
    } else {
      errorToast(addSubCatResult.message);
    }
  };

  const handleUpdate = async () => {
    const editCatResult = await updateSubCategory(UpdateData._id, {
      catTitle: editsubCategory,
      categoriesId: editCategoryIdDropdown,
    });
    console.log('🤩 ~ file: CategoriesPage.js:289 ~ handleSubmit ~ editCatResult', editCatResult);
    if (editCatResult.success) {
      successToast('Sub Category Edited Successfully');
      setUpdateData('');
      fetchSubCategory();
    } else {
      errorToast(editCatResult.message);
    }
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
      if (willDelete) {
        const result = await removeUser(id);
        if (result.success === true) {
          fetchCategory();
          fetchSubCategory();
          successToast('Subcategory deleted successfully');
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
      text: 'Are you sure you want to change the access of this categories?',
      icon: 'info',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const result = await doTogglerCall(id);
        if (result?.success) {
          successToast('Status Changed Successfully');
          fetchSubCategory();
          fetchCategory();
        } else {
          swal('Something Went Wrong Please try after some time', {
            icon: 'error',
          });
        }
      }
    });
  };

  return (
    <>
      <Helmet>
        <title> Subcategories | React Trainee </title>
      </Helmet>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <>
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                Sub Categories
              </Typography>
              <Button
                variant="contained"
                onClick={() => setModalopen(true)}
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Add Subcategory
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
                      onClick={(e) => {
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
                      const { _id, categories, subTitle, isActive, createdAt } = tableData;
                      return (
                        <TableBody key={_id}>
                          <TableRow hover>
                            <TableCell align="left">{index + 1}</TableCell>
                            <TableCell align="left" style={{ textTransform: 'capitalize' }}>
                              {subTitle}
                            </TableCell>
                            <TableCell align="left" style={{ textTransform: 'capitalize' }}>
                              {categories ? (
                                categories.catTitle
                              ) : (
                                <Label color={'error'}>{sentenceCase('removed')}</Label>
                              )}
                            </TableCell>
                            <TableCell align="left" style={{ color: 'red' }}>
                              {categories ? '' : <Iconify icon={'gg:danger'} style={{ marginRight: '10px' }} />}
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
                seteditCategoryIdDropdown(UpdateData.categories ? UpdateData.categories._id : '');
                seteditCategorydropdown(UpdateData.categories ? UpdateData.categories.catTitle : '');
                seteditSubCategory(UpdateData.subTitle);
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
                  <h3>Create Subcategory</h3>
                  <TextField
                    id="outlined-firstname"
                    label="Subcategory Title"
                    variant="outlined"
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                  />
                  <div style={{ marginTop: '20px' }}>
                    <Select
                      placeholder="Select Category"
                      styles={{}}
                      options={catData}
                      onChange={(e) => {
                        handleDropDown(e);
                      }}
                    />
                    <p style={{ marginLeft: '5px', fontSize: '12px' }}>
                      Not able to find your categories?{' '}
                      <Link to={'/dashboard/category'} style={{ color: 'blue', textDecoration: 'underline' }}>
                        Add new one
                      </Link>
                    </p>
                  </div>
                  <div
                    style={{
                      marginTop: '30px',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      opacity: subCategory.trim().length > 0 ? 1 : 0.5,
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
                          cursor: subCategory.trim().length > 0 ? 'pointer' : 'not-allowed',
                        }}
                        onClick={() => handleSubmit()}
                      >
                        Add Subcategory
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
                  <h3>Edit Subcategory</h3>
                  <TextField
                    id="outlined-firstname"
                    label="Subcategory Title"
                    variant="outlined"
                    value={editsubCategory}
                    onChange={(e) => seteditSubCategory(e.target.value)}
                  />
                  <div style={{ marginTop: '20px' }}>
                    <Select
                      placeholder="Select Category"
                      styles={{ padding: '50px' }}
                      value={{ label: editCategorydropdown, value: editCategoryIdDropdown }}
                      options={catData}
                      onChange={(e) => {
                        handleEditDropDown(e);
                      }}
                    />
                    <p style={{ marginLeft: '5px', fontSize: '12px' }}>
                      Not able to find your categories?{' '}
                      <Link to={'/dashboard/category'} style={{ color: 'blue', textDecoration: 'underline' }}>
                        Add new one
                      </Link>
                    </p>
                  </div>
                  <div
                    style={{
                      marginTop: '30px',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      opacity:
                        editCategorydropdown?.trim()?.length > 0 && editsubCategory?.trim()?.length > 0 ? 1 : 0.5,
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
                          cursor:
                            editCategorydropdown?.trim()?.length > 0 && editsubCategory?.trim()?.length > 0
                              ? 'pointer'
                              : 'not-allowed',
                        }}
                        onClick={() => handleUpdate()}
                      >
                        Edit Subcategory
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
