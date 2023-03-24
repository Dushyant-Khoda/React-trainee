/* eslint-disable */
import { useEffect } from 'react';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
// components
import { errorToast, successToast } from '../utils/Toast';
import Iconify from '../components/iconify/Iconify';
// sections
import { AppWidgetSummary } from '../sections/@dashboard/app';
import { clearErrors, loadUser } from '../redux/Actions/userAction';
import LoadingAnimation from 'src/components/LoadingAnimation';
// import { loadUser } from '../redux/Actions/authAction';
// import { clearMessage } from '../redux/Reducers/messageSlice';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user, error, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      const errMsg =
        error.includes('JsonWebTokenError') || error.includes('TokenExpiredError') ? 'Session Time Out' : error;

      if (Cookies.get('x-access-token') || localStorage.getItem('x-access-token')) {
        errorToast(errMsg);
      }
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
    // dispatch(clearMessage());
  }, [error, dispatch]);

  return (
    <>
      <Helmet>
        <title> Dashboard | React App </title>
      </Helmet>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 5 }}>
            Hi, Welcome back {user && user ? `${user.firstName} ${user.lastName}` : null}
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Link to={'/dashboard/blog'}>
                <AppWidgetSummary title="Blogs" color="success" icon={'simple-icons:blogger'} />
              </Link>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Link to={'/dashboard/subcategory'}>
                <AppWidgetSummary title="Blog Subcategories" color="info" icon={'carbon:category'} />
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Link to={'/dashboard/category'}>
                <AppWidgetSummary title="Blog Categories" color="warning" icon={'carbon:category-new-each'} />
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Link to={'/dashboard/comments'}>
                <AppWidgetSummary title="Blogs Comments" color="error" icon={'majesticons:comments'} />
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Link to={'/dashboard/user'}>
                <AppWidgetSummary title="User" color="success" icon={'mdi:users-group'} />
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Link to={'/dashboard/activity'}>
                <AppWidgetSummary title="User Activity" color="info" icon={'tabler:activity-heartbeat'} />
              </Link>
            </Grid>
            {/*  <Grid item xs={12} sm={6} md={3}>
              <Link to={'/dashboard/feedback'}>
                <AppWidgetSummary title="Contact User List" color="warning" icon={'mdi:feedback-outline'} />
              </Link>
            </Grid> */}
            <Grid item xs={12} sm={6} md={3}>
              <Link to={'/dashboard/carrier'}>
                <AppWidgetSummary title="Career" color="error" icon={'mdi:resume'} />
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Link to={'/dashboard/ebook'}>
                <AppWidgetSummary title="Ebook" color="success" icon={'mdi:notebook-check'} />
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Link to={'/dashboard/checklist'}>
                <AppWidgetSummary title="Checklist" color="info" icon={'material-symbols:checklist'} />
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Link to={'/dashboard/infographics'}>
                <AppWidgetSummary title="Infographics" color="warning" icon={'fluent:diagram-24-regular'} />
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Link to={'/dashboard/casestudies'}>
                <AppWidgetSummary title="Case Studies" color="error" icon={'fluent-mdl2:test-case'} />
              </Link>
            </Grid>
            {/*  <Grid item xs={12} sm={6} md={3}>
              <Link to={'/dashboard/featured/blog'}>
                <AppWidgetSummary title="Featured Blog" color="success" icon={'mdi:feature-highlight'} />
              </Link>
            </Grid> */}
            {/*   <Grid item xs={12} sm={6} md={3}>
              <Link to={'/dashboard/become-our-partner-list'}>
                <AppWidgetSummary
                  title="Become Our Partner User List"
                  color="info"
                  icon={'material-symbols:checklist'}
                />
              </Link>
            </Grid> */}
          </Grid>
        </Container>
      )}
    </>
  );
}
