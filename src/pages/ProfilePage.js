/* eslint-disable */
import { LoadingButton } from '@mui/lab';
import { Card, Grid, InputLabel, TextField, Box, Modal } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoadingAnimation from 'src/components/LoadingAnimation';
import Iconify from '../components/iconify';
import { clearErrors, loadUser } from '../redux/Actions/userAction';
import { errorToast, successToast } from '../utils/Toast';

const contentDesign = {
  fontSize: '18px',
  fontWeight: '500',
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '10px',
  padding: '5px 32px',
};
const ProfilePage = () => {
  const { isLoading, isAuthenticated, user, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  /* 
=========== API Called================
*/

  const changePasswordAPI = async (updateData) => {
    try {
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.put(`${BASE_URL}user/auth/changePassword`, updateData, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      // setAllUserList(data.result);
      // setFilterData(data.result);
      return data;
    } catch (error) {
      return error.response.data;
    }
  };

  const UploadFile = async (id, imageData) => {
    try {
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.post(`${BASE_URL}user/profile/${id}`, imageData, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
          'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
        },
      });
      if (data.success) {
        dispatch(loadUser());
      }
      return data;
    } catch (error) {
      console.log('🤩 ~ file: UserPage.js:180 ~ updateUserData ~ error', error.response.data);
      return error.response.data;
    }
  };

  useEffect(() => {
    if (error) {
      const errMsg = error.includes('JsonWebTokenError') ? 'Session Time Out Please Login Again' : error;
      errorToast(errMsg);
      if (!isLoading) {
        navigate('/login', { replace: true });
      }
      dispatch(clearErrors());
    }
    if (!isLoading && !isAuthenticated) {
      navigate('/login', { replace: true });
    } else if (!isLoading && isAuthenticated) {
      dispatch(loadUser());
    }
    if (!isLoading && isAuthenticated) {
      setFetchData(user);
      if (user.profileImg) {
        setAvatarPreview(user?.profileImg?.url);
      }
    }
  }, [error, dispatch]);

  const [avatarPreview, setAvatarPreview] = useState('/assets/images/avatars/avatar_18.jpg');

  const [fetchData, setFetchData] = useState();
  console.log('🤩 ~ file: ProfilePage.js:109 ~ ProfilePage ~ fetchData:', fetchData);

  const responseData = [
    {
      title: 'Name',
      content: `${fetchData?.firstName.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
        letter.toUpperCase()
      )} ${fetchData?.lastName.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())}`,
    },
    {
      title: 'Email',
      content: `${fetchData?.email}`,
    },
    {
      title: 'Contact',
      content: `${fetchData?.phoneNumber}`,
    },
    {
      title: 'Address Information',
      content: `${fetchData?.state.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
        letter.toUpperCase()
      )}, ${fetchData?.country.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())}`,
    },
    {
      title: 'Account Create Date',
      content: `${moment(fetchData?.createdAt).format('LL')}`,
    },
  ];
  const [passwordModel, setPasswordModel] = useState(false);
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setnewPassword] = useState();
  const [confirmPassword, setconfirmPassword] = useState();
  const handlePasswordChange = async () => {
    const changePasswordData = {
      oldPassword,
      newPassword,
      confirmPassword,
    };
    const changePasswordAPIResult = await changePasswordAPI(changePasswordData);
    if (changePasswordAPIResult.success === true) {
      successToast('Password Changed Successfully');
    } else {
      errorToast(changePasswordAPIResult.message);
    }
    setPasswordModel(false);
    console.log(
      '🤩 ~ file: ProfilePage.js:122 ~ handlePasswordChange ~ changePasswordAPIResult',
      changePasswordAPIResult
    );
  };

  const [editModel, setEditModel] = useState(false);
  const [image, setImage] = useState();
  const handleEditProfile = () => {};

  const uploadImage = async (e) => {
    const { name, value } = e.target;
    if (name === 'image') {
      setAvatarPreview(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
    if (image && image) {
      console.log('🤩 ~ file: ProfilePage.js:172 ~ uploadImage ~ image', image);
      const storedData = new FormData();
      storedData.append('profile', image);
      UploadFile(fetchData._id, storedData);
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Card sx={{ py: 2, px: 3 }}>
                <h1>User Profile</h1>
                <Grid item xs={12} md={12}>
                  <Card>
                    <Box
                      sx={{
                        display: 'grid',
                        columnGap: 2,
                        rowGap: 3,
                        gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', lg: '1fr 2fr' },
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginBottom: '40px',
                          width: '100%',
                        }}
                      >
                        <InputLabel htmlFor="ImageUpload">
                          <div style={{ position: 'relative' }}>
                            <img
                              src={avatarPreview}
                              alt="Avatar Preview"
                              className="img-fluid"
                              style={{
                                width: '200px',
                                borderRadius: '50%',
                                height: '200px',
                                border: '1px solid #dbdbdb',
                                objectFit: 'contain',
                              }}
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = '/assets/images/avatars/avatar_18.jpg';
                              }}
                            />
                          </div>
                        </InputLabel>
                        <input
                          type="file"
                          name="image"
                          accept="image/*"
                          style={{ display: 'none' }}
                          id="ImageUpload"
                          onChange={(e) => uploadImage(e)}
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', margin: '10px 30px' }}>
                        {!isLoading &&
                          user &&
                          responseData.map((result) => {
                            return (
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  width: '100%',
                                }}
                              >
                                <h3>{result?.title}</h3>
                                <p style={contentDesign}>{result?.content}</p>
                              </div>
                            );
                          })}
                      </div>
                    </Box>
                  </Card>
                  <div
                    style={{
                      marginTop: '30px',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      opacity: 1,
                    }}
                  >
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      style={{
                        background: '#db3a34',
                        padding: '10px 20px',
                        opacity: 1,
                        marginRight: '20px',
                        cursor: 'pointer',
                      }}
                      onClick={() => setPasswordModel(true)}
                    >
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginRight: '10px',
                        }}
                      >
                        <Iconify icon="mdi:password-reset" style={{ marginRight: '10px' }} />
                        Change Password
                      </span>
                    </LoadingButton>
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      style={{
                        background: '#084c61',
                        display: 'none',
                        padding: '10px 20px',
                        opacity: 1,
                        marginRight: '20px',
                        cursor: 'pointer',
                      }}
                      onClick={() => setEditModel(true)}
                    >
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginRight: '10px',
                        }}
                      >
                        <Iconify icon="material-symbols:edit" style={{ marginRight: '10px' }} />
                        Edit Profile
                      </span>
                    </LoadingButton>
                  </div>
                </Grid>
              </Card>
            </Grid>
            <Modal
              open={passwordModel}
              onClose={() => setPasswordModel(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <h3>Change Password</h3>
                <div style={{ margin: '10px', display: 'flex', justifyContent: 'center' }}>
                  <TextField
                    type="password"
                    id="outlined-email"
                    label="Old Password"
                    variant="outlined"
                    style={{ width: '90%' }}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div style={{ margin: '10px', display: 'flex', justifyContent: 'center' }}>
                  <TextField
                    type="password"
                    id="outlined-email"
                    label="New Password"
                    variant="outlined"
                    style={{ width: '90%' }}
                    value={newPassword}
                    onChange={(e) => setnewPassword(e.target.value)}
                  />
                </div>
                <div style={{ margin: '10px', display: 'flex', justifyContent: 'center' }}>
                  <TextField
                    type="password"
                    id="outlined-email"
                    label="Confirm Password"
                    variant="outlined"
                    style={{ width: '90%' }}
                    value={confirmPassword}
                    onChange={(e) => setconfirmPassword(e.target.value)}
                  />
                </div>
                <div style={{ margin: '10px', display: 'flex', justifyContent: 'center', marginLeft: '25px' }}>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    style={{
                      background: '#db3a34',
                      padding: '10px 20px',
                      marginRight: '20px',
                      width: '90%',
                    }}
                    onClick={() => handlePasswordChange()}
                  >
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginRight: '10px',
                      }}
                    >
                      <Iconify icon="mdi:password-reset" style={{ marginRight: '10px' }} />
                      Change Password
                    </span>
                  </LoadingButton>
                </div>
              </Box>
            </Modal>
            <Modal
              open={editModel}
              onClose={() => setEditModel(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <h1>Edit Profile</h1>
              </Box>
            </Modal>
          </Grid>
        </>
      )}
    </>
  );
};

export default ProfilePage;
