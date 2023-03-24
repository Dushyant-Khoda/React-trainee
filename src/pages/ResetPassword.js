/* eslint-disable */
import { LoadingButton } from '@mui/lab';
import { Grid, TextField, Card, Box, CircularProgress, Divider } from '@mui/material';
// import { Box, Stack } from '@mui/system';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingAnimation from 'src/components/LoadingAnimation';
import { successToast } from 'src/utils/Toast';
import swal from 'sweetalert';

const BlogPageContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [homeContent, setHomeContent] = useState();
  const [addRecordLoader, setaddLoader] = useState(false);
  const [id, setid] = useState();

  //   const fetchContent = async () => {
  //     try {
  //       setIsLoading(true);
  //       const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
  //       const bearerToken = Cookies.get('x-access-token')
  //         ? Cookies.get('x-access-token')
  //         : localStorage.getItem('x-access-token')
  //         ? localStorage.getItem('x-access-token')
  //         : null;

  //       const { data } = await axios.get(`${BASE_URL}content?page=blog`, {
  //         headers: {
  //           authorization: `Bearer ${bearerToken}`,
  //         },
  //       });
  //       console.log('🤩 ~ file: HomePageContent.js:19 ~ fetchContent ~ data', data);
  //       setHomeContent(data.result.english.content);
  //       setStateData(data.result.english.content);
  //       setid(data.result._id);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //       setIsLoading(false);
  //     }
  //   };

  const changeContent = async (resetTokenData, updatedData) => {
    try {
      setaddLoader(true);
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const { data } = await axios.post(`${BASE_URL}auth/resetPassword/${resetTokenData}`, updatedData);
      setaddLoader(false);
      return data;
    } catch (error) {
      console.log(error);
      setaddLoader(false);
      return error.response.data;
    }
  };

  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setconfirmNewPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async () => {
    setaddLoader(true);
    const updateResult = await changeContent(resetToken, {
      password: newPassword,
      confirmPassword: confirmNewPassword,
    });
    if (updateResult.success == true) {
      successToast('Password Reset Successfully');
      navigate('/login', { replace: true });
    } else {
      swal(`${updateResult.message}`, {
        icon: 'error',
      });
    }
    setTimeout(() => {
      setaddLoader(false);
    }, 2500);
  };

  const [resetToken, setResetToken] = useState('');

  const { token } = useParams();

  React.useEffect(() => {
    if (token && token) {
      setResetToken(token);
    }
  });
  //   React.useEffect(() => {
  //     fetchContent();
  //   }, []);
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ padding: '75px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ py: 2, px: 3 }}>
              <h2>Reset Password</h2>
              <Grid item xs={12} md={12}>
                <div style={{ padding: '0px 40px', display: 'flex', flexDirection: 'column' }}>
                  <TextField
                    name="password"
                    label="New Password"
                    value={newPassword}
                    style={{ margin: '10px' }}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                  />
                  {newPassword.length < 8 ? (
                    <p style={{ color: '#eb4d4b' }}>Password Lenght Must be Greater Then 8</p>
                  ) : null}
                  <TextField
                    name="cpassword"
                    label="Confirm New Password"
                    value={confirmNewPassword}
                    style={{ margin: '10px' }}
                    onChange={(e) => {
                      setconfirmNewPassword(e.target.value);
                    }}
                  />

                  {newPassword.length > 3 && confirmNewPassword != newPassword ? (
                    <p style={{ color: '#eb4d4b' }}>New Password And Confirm Password Must Be Same </p>
                  ) : null}
                </div>
              </Grid>
              <div
                style={{
                  marginTop: '30px',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  opacity: 1,
                }}
              >
                {addRecordLoader ? (
                  <div style={{ marginRight: '50px' }}>
                    <CircularProgress />
                  </div>
                ) : (
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    style={{
                      background: '#6ab04c',
                      padding: '10px 20px',
                      opacity: newPassword.length > 8 && confirmNewPassword.length > 8 ? 1 : 0.75,
                      cursor: newPassword.length > 8 && confirmNewPassword.length > 8 ? 'pointer' : 'not-allowed',
                    }}
                    onClick={() => {
                      if (newPassword.length > 8 && confirmNewPassword.length > 8) {
                        handleSubmit();
                      } else {
                        swal('New Password And Confirm Password must be same & greater then 8 characters', {
                          icon: 'error',
                        });
                      }
                    }}
                  >
                    Reset Password
                  </LoadingButton>
                )}
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default BlogPageContent;
