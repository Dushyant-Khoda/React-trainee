/* eslint-disable */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, CircularProgress, Modal, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
// import { toast, ToastContainer } from 'react-toastify';
// components
import Iconify from '../../../components/iconify';
import { errorToast, successToast } from '../../../utils/Toast';
import { clearErrors, login } from '../../../redux/Actions/userAction';
import axios from 'axios';

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

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user, error, isLoading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setemailValue] = useState('');
  const [password, setpasswordValue] = useState('');

  useEffect(() => {
    if (!isLoading && error) {
      const errMsg = error.includes('JsonWebTokenError') ? 'Session Time Out Please Login Again' : error;
      errorToast(errMsg);
      dispatch(clearErrors());
    }
    if (!isLoading && isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  const [loginLoading, setLoginLoading] = useState(false);
  const handleClick = () => {
    console.log(email, password);
    setLoginLoading(true);
    dispatch(login({ email, password }));
    if (!isLoading && isAuthenticated && user) {
      setLoginLoading(false);
      successToast('Login Successfully');
    }
    setLoginLoading(false);
  };

  const [forgetemail, setforgetemail] = useState('');
  const [editLoader, setEditLoader] = useState(false);

  const [UpdateModalopen, setUpdateModalopen] = useState(false);

  const doForgotPassword = async () => {
    try {
      setEditLoader(true);
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const { data } = await axios.post(`${BASE_URL}auth/forgotPassword`, { email: forgetemail });
      setEditLoader(false);
      setUpdateModalopen(false);
      setforgetemail('');
      console.log(data.success);

      return data;
    } catch (error) {
      console.log(error);
      setEditLoader(false);
      setUpdateModalopen(false);
      setforgetemail('');
      return error.response.data;
    }
  };

  const handleUpdate = async () => {
    const result = await doForgotPassword();
    if (result.success == true) {
      successToast(result.message);
    } else {
      errorToast(result.message);
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          value={email}
          on
          onChange={(e) => {
            setemailValue(e.target.value);
          }}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => {
            setpasswordValue(e.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Link variant="subtitle2" underline="hover">
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setUpdateModalopen(true);
            }}
          >
            Forgot password?
          </div>
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        style={{ opacity: isLoading ? 0.5 : 1 }}
        variant="contained"
        onClick={() => {
          handleClick();
        }}
      >
        {!isLoading ? 'Login' : <CircularProgress style={{ color: 'white', padding: 8 }} />}
      </LoadingButton>
      <Modal
        open={UpdateModalopen}
        onClose={() => {
          setUpdateModalopen(false);
          setforgetemail('');
        }}
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
              <h3>Forgot Password</h3>
              <TextField
                id="outlined-firstname"
                label="Email Address"
                variant="outlined"
                value={forgetemail}
                onChange={(e) => setforgetemail(e.target.value)}
              />

              <div
                style={{
                  marginTop: '30px',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  opacity: forgetemail?.trim()?.length > 0 ? 1 : 0.5,
                }}
              >
                {editLoader ? (
                  <CircularProgress />
                ) : (
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    style={{
                      background: '#6ab04c',
                      padding: '10px 20px',
                      opacity: 1,
                      cursor: forgetemail?.trim()?.length > 0 ? 'pointer' : 'not-allowed',
                    }}
                    onClick={() => handleUpdate()}
                  >
                    Forgot Password
                  </LoadingButton>
                )}
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
