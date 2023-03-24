/* eslint-disable */
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { Grid, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
// components
// sections
import { AppOrderTimeline } from '../sections/@dashboard/app';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import LoadingAnimation from 'src/components/LoadingAnimation';
import NoRecordFound from 'src/components/NoRecordFound';

export default function UserActivity() {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState();
  const [userDetails, setuserDetails] = useState();
  const doFetchAllUsers = async (id) => {
    console.log('Func Executed');
    try {
      setIsLoading(true);
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.get(`${BASE_URL}activity/${id}`, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      console.log('🤩 ~ file: ActivityCardList.js:26 ~ doFetchAllUsers ~ data', data);
      if (data?.result?.Result.message == 'No records found') {
        setUserData([]);
      } else {
        setUserData(data?.result?.Result);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const doFetchUsers = async (id) => {
    console.log('Func Executed');
    try {
      // setIsLoading(true);
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.get(`${BASE_URL}user/${id}`, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      console.log('🤩 ~ file: ActivityCardList.js:26 ~ doFetchAllUsers ~ data', data);
      setuserDetails(data?.result);
      // setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const { id } = useParams();
  console.log('🤩 ~ file: UserActivity.js:42 ~ UserActivity ~ id', id);

  useEffect(() => {
    if (id && id) {
      doFetchAllUsers(id);
      doFetchUsers(id);
    }
  }, []);
  return (
    <>
      <Helmet>
        <title> Activity | React Trainee </title>
      </Helmet>

      {isLoading ? (
        <LoadingAnimation />
      ) : userData && userData.length == 0 ? (
        <NoRecordFound />
      ) : (
        <Container maxWidth="xl">
          {userData && userData.length != 0 ? (
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={8}>
                {userData ? (
                  <AppOrderTimeline
                    title={`${userDetails.firstName} ${userDetails.lastName} Activity List`}
                    list={userData?.map((mapData, index) => ({
                      id: mapData._id,
                      title: [mapData.logMessage],
                      type: `order${index + 1}`,
                      time: mapData.createdAt,
                    }))}
                  />
                ) : null}
              </Grid>
            </Grid>
          ) : (
            <NoRecordFound />
          )}
        </Container>
      )}
    </>
  );
}
