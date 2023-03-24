/* eslint-disable */
import { sentenceCase } from 'change-case';
import { Helmet } from 'react-helmet-async';
import React, { useState } from 'react';
import Select from 'react-select';
// @mui
import {
  Card,
  Table,
  Stack,
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
  TableHead,
  Box,
  Modal,
  CircularProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { LoadingButton } from '@mui/lab';
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
  { id: 'title', label: 'Featured Blog Title', alignRight: false },
  { id: 'Category', label: 'Subcategory Name', alignRight: false },
  { id: 'position', label: 'Position', alignRight: false },
  { id: 'isActive', label: 'Blog Status', alignRight: false },
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

export default function FeaturedBlog() {
  const [open, setOpen] = useState(null);

  const [CategoryList, setCategoryList] = useState();
  const [filterData, setFilterData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchString, setsearchString] = useState('');
  const [Modalopen, setModalopen] = useState(false);
  const [UpdateData, setUpdateData] = useState();
  const fetchFeaturedBlog = async () => {
    try {
      setIsLoading(true);
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.get(`${BASE_URL}blog/featured`, {
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

  const addSubCategory = async (blogId, position) => {
    try {
      setAddLoader(true);
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.post(
        `${BASE_URL}blog/featured?blog_id=${blogId}&position=${position}`,
        { blogId, position },
        {
          headers: {
            authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      setModalopen(false);
      setBlogData('');
      setBlogDataId('');
      setPositionData('');
      setAddLoader(false);
      return data;
    } catch (error) {
      setAddLoader(false);
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

      const { data } = await axios.delete(`${BASE_URL}blog/featured/${id}`, {
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

  const setEditId = (idData) => {
    // console.log('===================================', idData);
    setUpdateData(idData);
  };

  React.useEffect(() => {
    doFetchAllBlogData();
    // fetchCategory();
    fetchFeaturedBlog();
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
            item.blog_id?.postTitle?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
            item.blog_id?.subCategoryTitle?.toLowerCase()?.includes(searchQuery.toLowerCase())
          );
        });

      setFilterData(AllFilterArray);
    } else {
      setFilterData(CategoryList);
    }
  };

  const [blogData, setBlogData] = useState();
  const [blogDataId, setBlogDataId] = useState();
  const [positionData, setPositionData] = useState();
  const handleBlogDropDown = (data) => {
    console.log(data);
    setBlogData(data.label);
    setBlogDataId(data.value);
  };
  const handlePositionDropDown = (data) => {
    console.log(data);
    setPositionData(data.value);
  };

  const handleSubmit = async () => {
    const addSubCatResult = await addSubCategory(blogDataId, positionData);
    console.log('🤩 ~ file: CategoriesPage.js:289 ~ handleSubmit ~ addSubCatResult', addSubCatResult);
    if (addSubCatResult.success) {
      successToast('Featured Blog Added Successfully');
      setUpdateData('');
      fetchFeaturedBlog();
    } else {
      errorToast(addSubCatResult.message);
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
          // fetchCategory();
          fetchFeaturedBlog();
          successToast('Featured Blog deleted successfully');
        } else {
          swal('Something Went Wrong Please try after some time', {
            icon: 'error',
          });
        }
      }
    });
  };

  const positionOption = [
    {
      label: 'Parent',
      value: 'Parent',
    },
    {
      label: 'Child',
      value: 'Child',
    },
  ];

  const [releventGroup, setReleventGroup] = useState();
  const doFetchAllBlogData = async () => {
    try {
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;
      const { data } = await axios.get(`${BASE_URL}blog/list/admin/blog`, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      let newData = data?.result?.map((mapData) => {
        return {
          label: mapData.postTitle,
          value: mapData._id,
        };
      });
      setReleventGroup(newData);
      return data;
    } catch (error) {
      return error?.response?.data;
    }
  };

  return (
    <>
      <Helmet>
        <title> Featured Blog | React Trainee </title>
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
                onClick={() => {
                  if (filterData && filterData.length == 4) {
                    swal('Please remove some blog to add new one', {
                      icon: 'error',
                    });
                  } else {
                    setModalopen(true);
                  }
                }}
                startIcon={<Iconify icon="eva:plus-fill" />}
                style={{
                  opacity: filterData && filterData.length == 4 ? 0.5 : 1,
                  cursor: filterData && filterData.length == 4 ? 'not-allowed' : 'pointer',
                }}
              >
                Add Featured Blog
              </Button>
            </Stack>
            <p style={{ color: 'red' }}>
              Please Remove Inactive Blogs because it dosen't show user side and your UI not look well
            </p>
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
                      const { _id, blog_id, position, createdAt } = tableData;
                      return (
                        <TableBody key={_id}>
                          <TableRow hover>
                            <TableCell align="left">{index + 1}</TableCell>
                            <TableCell align="left" style={{ textTransform: 'capitalize' }}>
                              {blog_id.postTitle}
                            </TableCell>
                            <TableCell align="left" style={{ textTransform: 'capitalize' }}>
                              {blog_id.subCategoryTitle}
                            </TableCell>
                            <TableCell align="left" style={{ color: 'red', textTransform: 'capitalize' }}>
                              {position}
                            </TableCell>

                            <TableCell align="left">
                              <Label color={blog_id.isActive ? 'success' : 'error'} style={{ cursor: 'pointer' }}>
                                {sentenceCase(blog_id.isActive ? 'active' : 'inactive')}
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
                  <h3>Add Featured Blog</h3>

                  <div style={{ marginTop: '20px' }}>
                    <Select
                      placeholder="Select Blog"
                      style={{ marginTop: '100px' }}
                      options={releventGroup}
                      onChange={(e) => {
                        // handleDropDown(e);
                        handleBlogDropDown(e);
                      }}
                    />
                    <p style={{ marginLeft: '5px', fontSize: '12px' }}>
                      Not able to find your Blog?{' '}
                      <Link to={'/dashboard/blog'} style={{ color: 'blue', textDecoration: 'underline' }}>
                        Add new one
                      </Link>
                    </p>
                  </div>
                  <div style={{ marginTop: '20px' }}>
                    <Select
                      placeholder="Select Position"
                      style={{ marginTop: '100px' }}
                      options={positionOption}
                      onChange={(e) => {
                        handlePositionDropDown(e);
                      }}
                    />
                  </div>
                  <div
                    style={{
                      marginTop: '30px',
                      display: 'flex',
                      justifyContent: 'flex-end',
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
                          cursor: 'pointer',
                        }}
                        onClick={() => handleSubmit()}
                      >
                        Add Featured Blog
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
