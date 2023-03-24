/* eslint-disable */
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
// @mui
import { Container, Typography, Box, Card, Stack, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
// mock

import Iconify from '../components/iconify';
import Cookies from 'js-cookie';
import axios from 'axios';
import LoadingAnimation from 'src/components/LoadingAnimation';

const ActivityCardList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState();
  const doFetchAllUsers = async () => {
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
      console.log('🤩 ~ file: ActivityCardList.js:26 ~ doFetchAllUsers ~ data', data);
      setUserData(data?.result);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    doFetchAllUsers();
  }, []);
  return (
    <>
      <Helmet>
        <title> Activity | React Trainee </title>
      </Helmet>

      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <Container>
          <Typography variant="h4" sx={{ mb: 5 }}>
            User List
          </Typography>

          <Grid container spacing={3}>
            {userData &&
              userData?.map((mapData, index) => {
                return (
                  <Grid key={index} item xs={12} sm={6} md={3}>
                    <Link to={`/dashboard/activity/${mapData._id}`}>
                      <Card>
                        <Stack spacing={2} sx={{ p: 3 }}>
                          <div
                            style={{
                              height: '250px',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: '100%',
                              flexDirection: 'column',
                            }}
                          >
                            <img
                              src={
                                mapData?.profileImg?.url
                                  ? mapData?.profileImg?.url
                                  : '/assets/images/avatars/avatar_18.jpg'
                              }
                              style={{
                                width: '100px',
                                borderRadius: '50%',
                                height: '100px',
                                border: '1px solid #dbdbdb',
                                objectFit: 'cover',
                                backgroundPosition: 'center',
                              }}
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = '/assets/images/avatars/avatar_18.jpg';
                              }}
                            />

                            <Typography
                              style={{
                                textTransform: 'capitalize',
                                marginTop: '10px',
                                wordBreak: 'break-all',
                                textAlign: 'center',
                              }}
                              variant="subtitle2"
                              noWrap
                            >
                              {mapData?.firstName} {mapData?.lastName}
                            </Typography>

                            <p style={{ wordBreak: 'break-all', textAlign: 'center' }}>{mapData?.email}</p>
                          </div>
                        </Stack>
                      </Card>
                    </Link>
                  </Grid>
                );
              })}
          </Grid>
        </Container>
      )}
    </>
  );
};

export default ActivityCardList;
