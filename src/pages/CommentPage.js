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
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'email', alignRight: false },
  { id: 'phone_number', label: 'Phone', alignRight: false },
  { id: 'website', label: 'Website', alignRight: false },
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

export default function CommentPage() {
  const [open, setOpen] = useState(null);

  const [filterData, setFilterData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchString, setsearchString] = useState('');
  const [UpdateModalopen, setUpdateModalopen] = useState(false);
  const [UpdateData, setUpdateData] = useState();

  const fetchEbook = async () => {
    try {
      setIsLoading(true);
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.get(`${BASE_URL}comment/list`, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      console.log('🤩 ~ file: CategoriesPage.js:112 ~ fetchEbook ~ data', data);
      setFilterData(data.result);
      setIsLoading(false);
      console.log('🤩 ~ file: UserPage.js:113 ~ fetchEbook ~ data', data);
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateModalhandleClose = () => {
    if (UpdateModalopen) {
      setUpdateModalopen(false);
      setUpdateData('');
    } else {
      setUpdateModalopen(true);
      // seteditcatTitle()
    }
  };

  const [activeLoader, setactiveLoader] = useState(false);

  const doActiveComment = async (id) => {
    try {
      setactiveLoader(true);
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.put(
        `${BASE_URL}comment/reply/${id}`,
        {
          isVisible: true,
          status: 'Accept',
        },
        {
          headers: {
            authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      console.log('🤩 ~ file: CategoriesPage.js:112 ~ fetchEbook ~ data', data);
      setFilterData(data.result);
      setactiveLoader(false);
      setUpdateModalopen(false);
      successToast('Comment Active Successfully');
      fetchEbook();
    } catch (error) {
      setactiveLoader(false);
      errorToast('Something Went Wrong');
      console.log(error);
    }
  };

  const deleteComment = async (id) => {
    try {
      setactiveLoader(true);
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.delete(`${BASE_URL}comment/remove/${id}`, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      console.log('🤩 ~ file: CategoriesPage.js:112 ~ fetchEbook ~ data', data);
      setFilterData(data.result);
      setactiveLoader(false);
      setUpdateModalopen(false);
      // successToast('Comment Deleted Successfully');
      fetchEbook();
      return data;
    } catch (error) {
      setactiveLoader(false);
      // errorToast('Something Went Wrong');
      console.log(error);
    }
  };

  const [addLoader, setAddLoader] = useState(false);

  const doReplyComment = async (id) => {
    try {
      setAddLoader(true);
      setactiveLoader(true);
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.put(
        `${BASE_URL}comment/reply/${id}`,
        {
          reply_message: commentMessage.trim(),
          isVisible: true,
          status: 'Accept',
        },
        {
          headers: {
            authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      console.log('🤩 ~ file: CategoriesPage.js:112 ~ fetchEbook ~ data', data);
      setFilterData(data.result);
      setactiveLoader(false);
      setUpdateModalopen(false);
      successToast('Comment Reply Added Successfully ');
      fetchEbook();
      setAddLoader(false);
      return data;
    } catch (error) {
      setactiveLoader(false);
      errorToast('Something Went Wrong');
      setAddLoader(false);
      console.log(error);
      return error.response.data;
    }
  };

  const doInactiveComment = async (id) => {
    try {
      setactiveLoader(true);
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.put(
        `${BASE_URL}comment/edit/${id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      console.log('🤩 ~ file: CategoriesPage.js:112 ~ fetchEbook ~ data', data);
      setFilterData(data.result);
      setactiveLoader(false);
      setUpdateModalopen(false);
      successToast('Comment Inactive Successfully');
      fetchEbook();
    } catch (error) {
      setactiveLoader(false);
      errorToast('Something Went Wrong');
      console.log(error);
    }
  };

  const setEditId = (idData) => {
    console.log('🤩 ~ file: CategoriesPage.js:185 ~ setEditId ~ idData', idData);
    setUpdateData(idData);
    setCommentMessage(idData?.reply_message);
  };

  React.useEffect(() => {
    fetchEbook();
    // setFiles([]);
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
      text: 'Once deleted, you will not be able to recover this comment!',
      icon: 'error',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const result = await deleteComment(id);
        if (result.success === true) {
          setUpdateData('');
          successToast('Comment Deleted Successfully');
          fetchEbook();
        } else {
          swal('Something Went Wrong Please try after some time', {
            icon: 'error',
          });
        }
      }
    });
  };

  const [commentMessage, setCommentMessage] = useState('');

  /* Show Three Button Change Status like Active Comment, Reject Comment, Delete Comment, Replay Message TextBox */

  return (
    <>
      <Helmet>
        <title> Comments | React Trainee </title>
      </Helmet>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <>
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                Comments
              </Typography>
            </Stack>

            <Card>
              <FormControl
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                variant="outlined"
              >
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
                      const { _id, name, phone_number, website, email, status, createdAt } = tableData;
                      return (
                        <TableBody key={_id}>
                          <TableRow hover>
                            <TableCell align="left">{index + 1}</TableCell>
                            <TableCell align="left" style={{ textTransform: 'capitalize' }}>
                              {name}
                            </TableCell>
                            <TableCell align="left">{email}</TableCell>
                            <TableCell align="left" style={{ textTransform: 'capitalize' }}>
                              {phone_number}
                            </TableCell>
                            <TableCell align="left" style={{ textTransform: 'capitalize' }}>
                              {website}
                            </TableCell>

                            <TableCell align="left">
                              <Label
                                color={
                                  status == 'pending'
                                    ? 'warning'
                                    : status == 'Accept'
                                    ? 'success'
                                    : status == 'Accept'
                                    ? 'error'
                                    : 'error'
                                }
                                style={{ cursor: 'pointer' }}
                              >
                                {sentenceCase(
                                  status == 'pending'
                                    ? status
                                    : status == 'Accept'
                                    ? status
                                    : status == 'Accept'
                                    ? status
                                    : status
                                )}
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
              sx={{ color: 'success.main' }}
              onClick={() => {
                handleCloseMenu();
                doActiveComment(UpdateData?._id);
              }}
            >
              <Iconify icon={'healthicons:i-documents-accepted'} sx={{ mr: 2 }} />
              Accept
            </MenuItem>
            <MenuItem
              sx={{ color: 'info.main' }}
              onClick={() => {
                handleCloseMenu();
                setUpdateModalopen(true);
              }}
            >
              <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
              View
            </MenuItem>

            <MenuItem
              sx={{ color: 'error.main' }}
              onClick={() => {
                handleCloseMenu();
                doInactiveComment(UpdateData?._id);
              }}
            >
              <Iconify icon={'charm:cross'} sx={{ mr: 2 }} />
              Reject
            </MenuItem>
            <MenuItem
              sx={{ color: 'warning.main' }}
              onClick={() => {
                handleCloseMenu();
                setUpdateModalopen(true);
              }}
            >
              <Iconify icon={'mdi:message-reply-text'} sx={{ mr: 2 }} />
              Reply
            </MenuItem>
            <MenuItem
              sx={{ color: 'error.main' }}
              onClick={() => {
                handleDelete(UpdateData?._id);
                handleCloseMenu();
              }}
            >
              <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
              Delete
            </MenuItem>
          </Popover>

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
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <h3>Comment Details</h3>
                    <Label
                      color={
                        UpdateData?.status == 'pending'
                          ? 'warning'
                          : UpdateData?.status == 'Accept'
                          ? 'success'
                          : UpdateData?.status == 'Accept'
                          ? 'error'
                          : 'error'
                      }
                      style={{ cursor: 'pointer', marginLeft: '10px' }}
                    >
                      {UpdateData?.status == 'pending'
                        ? UpdateData?.status
                        : UpdateData?.status == 'Accept'
                        ? UpdateData?.status
                        : UpdateData?.status == 'Accept'
                        ? UpdateData?.status
                        : UpdateData?.status}
                    </Label>
                  </div>
                  <div style={{ marginTop: '10px', wordWrap: 'break-word' }}>
                    <div style={{ display: 'flex', alignItems: 'center', lineHeight: 1 }}>
                      <div style={{ width: '50%' }}>
                        <h4>Name:</h4>
                      </div>
                      <div style={{ width: '50%' }}>
                        <p>{UpdateData?.name}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', lineHeight: 1 }}>
                      <div style={{ width: '50%' }}>
                        <h4>Email:</h4>
                      </div>
                      <div style={{ width: '50%' }}>
                        <p>{UpdateData?.email}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', lineHeight: 1 }}>
                      <div style={{ width: '50%' }}>
                        <h4>Phone Number:</h4>
                      </div>
                      <div style={{ width: '50%' }}>
                        <p>{UpdateData?.phone_number}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', lineHeight: 1 }}>
                      <div style={{ width: '50%' }}>
                        <h4>Website:</h4>
                      </div>
                      <div style={{ width: '50%' }}>
                        <p>{UpdateData?.website}</p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', lineHeight: 1 }}>
                      <div style={{ width: '50%' }}>
                        <h4>Blog Title:</h4>
                      </div>
                      <div style={{ width: '50%' }}>
                        <p>{UpdateData?.blog_id?.postTitle}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', lineHeight: 1 }}>
                      <div style={{ width: '50%' }}>
                        <h4>Blog Comment:</h4>
                      </div>
                      <div style={{ width: '50%' }}>
                        <p>{UpdateData?.comment}</p>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: '10px' }}>
                    <TextField
                      id="outlined-firstname"
                      label="Reply Comment"
                      variant="outlined"
                      style={{ width: '100%' }}
                      value={commentMessage}
                      onChange={(e) => setCommentMessage(e.target.value)}
                    />
                  </div>
                  {activeLoader ? (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '20px' }}>
                      <CircularProgress />
                    </div>
                  ) : (
                    <div
                      style={{
                        marginTop: '30px',
                        display: 'flex',
                        justifyContent: 'space-around',
                        opacity: 1,
                      }}
                    >
                      <LoadingButton
                        type="submit"
                        variant="contained"
                        style={{
                          background: '#6ab04c',
                          padding: '10px 20px',
                          opacity: 1,
                          cursor: 'pointer',
                          display: UpdateData?.status == 'Accept' ? 'none' : 'block',
                        }}
                        onClick={() => doActiveComment(UpdateData?._id)}
                      >
                        Accept
                      </LoadingButton>
                      <LoadingButton
                        type="submit"
                        variant="contained"
                        style={{
                          background: '#DC143C',
                          padding: '10px 20px',
                          opacity: 1,
                          cursor: 'pointer',
                          display: UpdateData?.status == 'Reject' ? 'none' : 'block',
                        }}
                        onClick={() => doInactiveComment(UpdateData?._id)}
                      >
                        Reject
                      </LoadingButton>
                      {addLoader ? (
                        <CircularProgress />
                      ) : (
                        <LoadingButton
                          type="submit"
                          variant="contained"
                          style={{
                            background: '#5783db',
                            padding: '10px 20px',
                            opacity: commentMessage?.trim() != '' ? 1 : 0.5,
                            cursor: commentMessage?.trim() != '' ? 'pointer' : 'not-allowed',
                          }}
                          onClick={() => doReplyComment(UpdateData?._id)}
                        >
                          Reply
                        </LoadingButton>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Box>
          </Modal>
        </>
      )}
    </>
  );
}
