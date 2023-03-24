/* eslint-disable */
import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { successToast } from '../../../utils/Toast';
// mocks_
import account from '../../../_mock/account';
import { logout } from 'src/redux/Actions/userAction';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
    url: '/dashboard/home',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
    url: '/dashboard/profile',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover({ setLogoutUser }) {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const logoutUser = () => {
    // window.localStorage.removeItem('user');
    window.localStorage.removeItem('x-access-token');
    setLogoutUser(true);
    dispatch(logout());
    successToast('😇 User logged out Successfully');
    navigate('/login', { replace: true });
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={user ? user?.profileImg?.url : account.photoURL} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user ? `${user?.firstName} ${user?.lastName}` : ''}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user ? user.email : ''}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option, index) => (
            <NavLink to={option.url} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
              <MenuItem key={option.label} onClick={handleClose}>
                {option.label}
              </MenuItem>
            </NavLink>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={() => {
            logoutUser();
          }}
          sx={{ m: 1 }}
        >
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
