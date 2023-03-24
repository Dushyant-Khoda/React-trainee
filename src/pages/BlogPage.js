/* eslint-disable */
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography, Modal, Box } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
// components
import Iconify from '../components/iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';
import Cookies from 'js-cookie';
import axios from 'axios';
import { AppWidgetSummary } from '../sections/@dashboard/app';
import swal from 'sweetalert';
import { successToast } from 'src/utils/Toast';
import LoadingAnimation from 'src/components/LoadingAnimation';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '12px',
  p: 4,
};

export default function BlogPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [allBlog, setAllBlog] = useState();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const fetchBlogData = async () => {
    try {
      setIsLoading(true);
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;
      const { data } = await axios.get(`${BASE_URL}blog`, {
        headers: { authorization: `Bearer ${bearerToken}` },
      });
      // setOpenDrawer(false);
      setAllBlog(data.result);
      // setFilterData(data.result);
      setIsLoading(false);
      console.log('🤩 ~ file: UserPage.js:113 ~ fetchUser ~ data', data);
    } catch (error) {
      console.log(error);
    }
  };

  const doTogglerCall = async (id) => {
    try {
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.patch(`${BASE_URL}blog/${id}`, bearerToken, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      return data;
    } catch (error) {
      return error.response.data;
    }
  };

  const removeUser = async (id) => {
    try {
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.delete(`${BASE_URL}blog/${id}`, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      return data;
    } catch (error) {
      return error.response.data;
    }
  };

  const blogToggler = (id) => {
    swal({
      title: 'Are you sure?',
      text: 'Are you sure you want to change the access of this Blog?',
      icon: 'info',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        console.log('🤩 ~ file: BlogPage.js:107 ~ blogToggler ~ willDelete', willDelete);
        const result = await doTogglerCall(id);
        if (result?.success) {
          successToast('Blog Status Change Successfully');
          fetchBlogData();
        } else {
          swal('Something Went Wrong Please try after some time', {
            icon: 'error',
          });
        }
      }
    });
  };

  const deleteBlog = (id) => {
    console.log(id);
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this blog!',
      icon: 'error',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const result = await removeUser(id);
        if (result.success === true) {
          successToast('Blog Deleted Successfully');
          fetchBlogData();
        } else {
          swal('Something Went Wrong Please try after some time', {
            icon: 'error',
          });
        }
      }
    });
  };

  // const updateBlog = (id, updateData) => {};
  // console.log('🤩 ~ file: BlogPage.js:65 ~ BlogPage ~ id, updateData', id, updateData);

  // const updateImage = (id, updatedImage) => {};
  // console.log('🤩 ~ file: BlogPage.js:68 ~ BlogPage ~ id, updatedImage', id, updatedImage);

  useEffect(() => {
    fetchBlogData();
  }, []);
  return (
    <>
      <Helmet>
        <title> Blog | Key CMS Accounting </title>
      </Helmet>
      {isLoading ? (
        <div>
          <LoadingAnimation />
        </div>
      ) : (
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Blog
            </Typography>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => setOpen(true)}>
              Add Post
            </Button>
          </Stack>

          {/* <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
            <BlogPostsSearch posts={POSTS} />
      </Stack> */}

          <Grid container spacing={3}>
            {allBlog &&
              allBlog.map((post, index) => {
                return (
                  <BlogPostCard
                    key={index}
                    post={post}
                    index={index}
                    blogToggler={blogToggler}
                    deleteBlog={deleteBlog}
                  />
                );
              })}
          </Grid>
        </Container>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <div
              style={{
                display: 'flex',
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                  <Link to={'/dashboard/category'}>
                    <AppWidgetSummary title="Categories" color="info" small={'true'} icon="eva:plus-fill" />
                  </Link>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Link to={'/dashboard/subcategory'}>
                    <AppWidgetSummary title="Sub Categories" color="success" small={'true'} icon="eva:plus-fill" />
                  </Link>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Link to={'/dashboard/addblog'}>
                    <AppWidgetSummary title="Blog" color="warning" small={'true'} icon="eva:plus-fill" />
                  </Link>
                </Grid>
              </Grid>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
