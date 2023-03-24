/* eslint-disable */
import { sentenceCase } from 'change-case';
import { Helmet } from 'react-helmet-async';
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
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import moment from 'moment';
// components

import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import Label from '../components/label';
// sections
import LoadingAnimation from '../components/LoadingAnimation';
import NoRecordFound from 'src/components/NoRecordFound';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'Id', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'phoneNumber', label: 'Phone', alignRight: false },
  { id: 'experiance', label: 'Experiance', alignRight: false },
  { id: 'resume', label: 'Resume', alignRight: false },
  { id: 'createdAt', label: 'Applied At', alignRight: false },
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
  const [allUserList, setAllUserList] = useState();
  const [filterData, setFilterData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [searchString, setsearchString] = useState('');

  const fetchUser = async (jobId) => {
    try {
      setIsLoading(true);
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.get(`${BASE_URL}carrier/admin/candidate?job_id=${jobId}`, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      console.log('🤩 ~ file: UserPage.js:113 ~ fetchUser ~ data', data);
      setAllUserList(data.result);
      setFilterData(data.result);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const { id } = useParams();
  React.useEffect(() => {
    if (id && id) {
      fetchUser(id);
    }
  }, []);

  const doSearchName = (searchQuery) => {
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
            item.email?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
            item.phoneNumber?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
            item.experiance?.toLowerCase()?.includes(searchQuery.toLowerCase())
          );
        });

      setFilterData(AllFilterArray);
    }
  };

  return (
    <>
      <Helmet>
        <title> Candidate | React Trainee </title>
      </Helmet>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <>
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                Applied Candidates
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
                    {filterData && filterData.length == 0 ? (
                      <NoRecordFound />
                    ) : (
                      <>
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
                        {filterData?.map((tableData, index) => {
                          const { _id, firstName, lastName, email, phoneNumber, experiance, createdAt, attachment } =
                            tableData;
                          return (
                            <TableBody key={_id}>
                              <TableRow hover>
                                <TableCell align="left">{index + 1}</TableCell>
                                <TableCell align="left">{`${firstName} ${lastName}`}</TableCell>

                                <TableCell align="left">
                                  <div style={{ width: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {email}
                                  </div>
                                </TableCell>
                                <TableCell align="left">{phoneNumber}</TableCell>
                                <TableCell align="left">{experiance}</TableCell>
                                <TableCell align="left" style={{ textTransform: 'capitalize' }}>
                                  <a
                                    href={
                                      attachment?.url
                                        ? attachment?.url?.split('/upload/')[0] +
                                          '/upload/fl_attachment/' +
                                          attachment?.url?.split('/upload/')[1]
                                        : ''
                                    }
                                    download={attachment?.fileName}
                                  >
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                      <Label color={'info'} style={{ cursor: 'pointer' }} title={attachment?.fileName}>
                                        <Iconify icon="material-symbols:sim-card-download-rounded" />
                                        {attachment?.fileName
                                          ? attachment?.fileName?.length > 10
                                            ? `${attachment?.fileName?.substr(0, 10)}...`
                                            : sentenceCase(attachment.fileName)
                                          : ''}
                                      </Label>
                                      <Label color={'success'} style={{ cursor: 'pointer' }}>
                                        ({attachment?.fileSize})
                                      </Label>
                                    </div>
                                  </a>
                                </TableCell>

                                <TableCell align="left">{moment(createdAt).format('DD MMM YYYY ')}</TableCell>
                              </TableRow>
                            </TableBody>
                          );
                        })}
                      </>
                    )}
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
