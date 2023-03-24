/* eslint-disable */
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Modal,
  Typography,
  Button,
  InputLabel,
  Stack,
  FormGroup,
  FormControlLabel,
  styled,
  Switch,
} from '@mui/material';
import Select from 'react-select';
import { Country, State } from 'country-state-city';
import Lottie from 'react-lottie';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { UploadFile } from '@mui/icons-material';
import Cookies from 'js-cookie';
import axios from 'axios';

import Iconify from '../../../components/iconify';
import { errorToast, successToast } from 'src/utils/Toast';
/* 
   <div style={{ margin: '10px 20px' }}>
            <Select
              menuPortalTarget={document.body}
              placeholder="Select Country"
              styles={{ padding: '50px' }}
              options={countryData && countryData}
              onChange={(e) => {
                handleDropdown(e);
              }}
            />
            {country && country ? (
              <Select
                menuPortalTarget={document.body}
                placeholder="Select State"
                styles={{ padding: '50px' }}
                options={StateData && StateData}
                onChange={(e) => {
                  handleDropdown(e);
                }}
              />
            ) : (
              ''
            )}
          </div>
*/

const EditUserDrawer = ({ data, changeFunc, closeDrawer }) => {
  //   Form State
  const [firstname, setFirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [phone, setphone] = useState('');
  const [company, setcompany] = useState('');
  const [active, setActive] = useState(false);
  const [role, setRole] = useState('');
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState('/assets/images/avatars/avatar_18.jpg');
  const [image, setImage] = useState();
  const doUploadFile = async (id, imgData) => {
    try {
      setIsUpdateLoading(true);
      // // debugger;
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const newImageContent = new FormData();
      newImageContent.append('profile', imgData);
      newImageContent.append('type', 'edit');
      const { data } = await axios.post(`${BASE_URL}user/profile/${id}`, newImageContent, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      // // debugger;
      // setAllUserList(data.result);
      // setFilterData(data.result);
      setIsUpdateLoading(false);
      successToast('Image Edited Successfully');
      console.log('🤩 ~ file: UserPage.js:179 ~ updateUserData ~ data', data);
    } catch (error) {
      // // debugger;
      errorToast('Image Edited Failed');
      console.log('🤩 ~ file: UserPage.js:180 ~ updateUserData ~ error', error.response.data);
    }
  };
  /* Image Uploading */
  const handleImage = async (e) => {
    const { name, value } = e.target;

    if (name === 'image') {
      setAvatarPreview(URL.createObjectURL(e.target.files[0]));

      setImage(e.target.files[0]);
      const storedData = new FormData();
      storedData.append('profile', e.target.files[0]);
      storedData.append('type', 'edit');

      doUploadFile(data._id, e.target.files[0]);
    }
  };

  React.useEffect(() => {
    if (data) {
      console.log(data);
      setFirstname(data.firstName);
      setlastname(data.lastName);
      setphone(data.phoneNumber);
      setcompany(data.company);
      setRole(data.role);
      setAvatarPreview(data?.profileImg ? data?.profileImg.url : '/assets/images/avatars/avatar_18.jpg');
      setActive(data.isActive);
    }
  }, []);

  const handleSubmit = async () => {
    const storedData = {
      type: 'obj',
      firstName: firstname,
      lastName: lastname,
      phoneNumber: phone,
      role,
      state: data.state,
      country: data.country,
      isActive: active,
      company,
    };
    changeFunc(storedData);
  };
  const handleSwitchChange = (e) => {
    setActive(e.target.checked);
  };

  const IOSSwitch = styled((props) => (
    <Switch
      checked={active}
      onChange={(e) => handleSwitchChange(e)}
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));
  const userRole = [
    { value: 'User', label: 'User' },
    { value: 'Content Writer', label: 'Content Writer' },
    { value: 'Developer', label: 'Developer' },
    { value: 'CEO', label: 'CEO' },
  ];
  const handleDropdownChange = (event) => {
    console.log(event);
    setRole(event.value);
  };

  const customStyles = {
    container: (base, state) => {
      return {
        ...base,
        zIndex: state.isFocused ? '999' : '1',
      };
    },
  };

  return (
    <div>
      <Card>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '5px',
          }}
        >
          <InputLabel htmlFor="ImageUpload">
            <div style={{ position: 'relative' }}>
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="img-fluid"
                style={{
                  width: '75px',
                  borderRadius: '50%',
                  height: '75px',
                  border: '1px solid #dbdbdb',
                  objectFit: 'contain',
                }}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = '/assets/images/avatars/avatar_18.jpg';
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  bottom: '0px',
                  right: '5px',
                }}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    color: 'white',
                    alignItems: 'center',
                    background: '#6ab04c ',
                  }}
                >
                  <Iconify style={{ fontSize: '8px', height: '16px', width: '16px' }} icon="eva:plus-fill" />
                </div>
              </span>
            </div>
          </InputLabel>
          <input
            type="file"
            name="image"
            accept="image/*"
            style={{ display: 'none' }}
            id="ImageUpload"
            onChange={(e) => handleImage(e)}
          />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <InputLabel>
              <h4>Email: dushyant@yopmail.com</h4>
            </InputLabel>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <TextField
            style={{ margin: '10px 20px' }}
            id="outlined-firstname"
            label="First Name"
            variant="outlined"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <TextField
            style={{ margin: '10px 20px' }}
            id="outlined-lastname"
            label="Last Name"
            variant="outlined"
            value={lastname}
            onChange={(e) => setlastname(e.target.value)}
          />
          <div style={{ margin: '0px 20px 10px' }}>
            <span style={{ fontSize: '12px', marginLeft: '10px' }}>Select User Role</span>
            <Select
              styles={customStyles}
              value={role ? [{ label: role }] : role}
              placeholder="Select User Role"
              options={userRole}
              defaultValue={role}
              onChange={(e) => handleDropdownChange(e)}
            />
          </div>

          <TextField
            style={{ margin: '10px 20px' }}
            id="outlined-pno"
            label="Phone Number"
            type="number"
            variant="outlined"
            value={phone}
            inputProps={{ minLength: 10, maxLength: 12 }}
            onChange={(e) => setphone(e.target.value)}
          />
          <TextField
            style={{ margin: '10px 20px' }}
            id="outlined-company"
            label="Company"
            variant="outlined"
            value={company}
            onChange={(e) => setcompany(e.target.value)}
          />

          <Stack direction="row" spacing={1} style={{ margin: '0px 30px' }} alignItems="center">
            <Typography style={{ color: 'red' }}>Inactive</Typography>
            <FormControlLabel control={<IOSSwitch sx={{ m: 1 }} defaultChecked />} />
            <Typography style={{ color: 'green' }}>Active</Typography>
          </Stack>
        </div>
      </Card>
      <div
        style={{
          marginTop: '30px',
          margin: '20px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <LoadingButton
          type="submit"
          variant="contained"
          style={{ background: '#FFC501', padding: '10px 20px', opacity: 1 }}
          onClick={() => handleSubmit()}
        >
          Edit User
        </LoadingButton>
        <LoadingButton
          type="submit"
          variant="contained"
          style={{ background: '#D65249', padding: '10px 20px', opacity: 1 }}
          onClick={() => closeDrawer()}
        >
          Close
        </LoadingButton>
      </div>
    </div>
  );
};

export default EditUserDrawer;
