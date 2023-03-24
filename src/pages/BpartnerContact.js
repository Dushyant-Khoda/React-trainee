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
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'createdAt', label: 'Created At', alignRight: false },
  { id: 'message', label: 'Message', alignRight: false },
  { id: '' },
];

export default function BpartnerContact() {
  const [allUserList, setAllUserList] = useState();
  const [filterData, setFilterData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchString, setsearchString] = useState('');

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.get(`${BASE_URL}user/auth/contact?type=partner`, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      setAllUserList(data.result);
      setFilterData(data.result);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchUser();
  }, []);

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
            item.companySector?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
            item.phoneNumber?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
            item.email?.toLowerCase()?.includes(searchQuery.toLowerCase())
          );
        });

      setFilterData(AllFilterArray);
    }
  };

  return (
    <>
      <Helmet>
        <title> Become Our Partner User List | Key CMS Accounting </title>
      </Helmet>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <>
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                Become Our Partner User List
              </Typography>
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
                    {filterData.map((tableData) => {
                      /* Name Email Phone Sector Message Created */
                      const { _id, firstName, lastName, email, phoneNumber, companySector, message, createdAt, type } =
                        tableData;
                      return (
                        <TableBody key={_id}>
                          <TableRow hover>
                            <TableCell component="th" scope="row" padding="none">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Typography
                                  variant="subtitle2"
                                  style={{ marginLeft: '20px' }}
                                >{`${firstName} ${lastName}`}</Typography>
                              </Stack>
                            </TableCell>

                            <TableCell align="left">
                              <div style={{ width: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {email}
                              </div>
                            </TableCell>
                            <TableCell align="left">{phoneNumber}</TableCell>

                            <TableCell align="left">{companySector}</TableCell>
                            <TableCell align="left">{moment(createdAt).format('DD MMM YY')}</TableCell>
                            <TableCell align="left">{message}</TableCell>
                          </TableRow>
                        </TableBody>
                      );
                    })}
                  </Table>
                </TableContainer>
              </Scrollbar>
            </Card>
          </Container>
        </>
      )}
    </>
  );
}
