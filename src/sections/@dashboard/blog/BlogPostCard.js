/* eslint-disable */
import PropTypes from 'prop-types';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent, Button, Drawer } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
//
import SvgColor from '../../../components/svg-color';
import Iconify from '../../../components/iconify';
import { LoadingButton } from '@mui/lab';
import Label from '../../../components/label';
import { sentenceCase } from 'change-case';
import CreateBlog from 'src/pages/AddBlog';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const StyledTitle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const StyledInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function BlogPostCard({ key, post, index, blogToggler, deleteBlog }) {
  const navigation = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [blogData, setBlogData] = useState();
  const { _id, thumbImage, postTitle, user, createdAt, subCategory, isActive } = post;
  const latestPostLarge = '';
  const latestPost = '';

  const getPost = (postData) => {
    console.log(postData);
    // setBlogData(postData);
    // setOpenDrawer(true);
    // <CreateBlog />;
  };

  // const getList = () => (
  //   <div style={{ width: 350 }}>
  //     {/* <div onClick={() => setOpenDrawer(false)}> */}
  //     {/* </div> */}
  //     <CreateBlog blogData={blogData} />
  //   </div>
  // );

  return (
    <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      <Card sx={{ position: 'relative' }}>
        <StyledCardMedia
          sx={{
            ...((latestPostLarge || latestPost) && {
              pt: 'calc(100% * 4 / 3)',
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
            }),
            ...(latestPostLarge && {
              pt: {
                xs: 'calc(100% * 4 / 3)',
                sm: 'calc(100% * 3 / 4.66)',
              },
            }),
          }}
        >
          <SvgColor
            color="paper"
            src="/assets/icons/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute',
              color: 'background.paper',
              ...((latestPostLarge || latestPost) && { display: 'none' }),
            }}
          />
          <StyledAvatar
            alt={user.firstName}
            src={user && user.profileImg ? user.profileImg.url : '/assets/images/avatars/avatar_18.jpg'}
            sx={{
              ...((latestPostLarge || latestPost) && {
                zIndex: 9,
                top: 24,
                left: 24,
                width: 40,
                height: 40,
              }),
            }}
          />

          <StyledCover alt={postTitle} src={thumbImage.url} />
        </StyledCardMedia>

        <CardContent
          sx={{
            pt: 4,
            ...((latestPostLarge || latestPost) && {
              bottom: 0,
              width: '100%',
              position: 'absolute',
            }),
          }}
        >
          <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
            {fDate(createdAt)}
          </Typography>

          <StyledTitle
            color="inherit"
            variant="subtitle2"
            underline="hover"
            sx={{
              ...(latestPostLarge && { typography: 'h5' }),
              ...((latestPostLarge || latestPost) && {
                color: 'common.white',
                cursor: 'pointer',
              }),
            }}
            onClick={() => {
              navigation(`/dashboard/edit/${_id}`);
              getPost(post);
            }}
            style={{ cursor: 'pointer', textTransform: 'capitalize', fontSize: '16px' }}
          >
            {postTitle}
          </StyledTitle>
          <Typography
            gutterBottom
            variant="caption"
            sx={{ color: 'text.disabled', display: 'block' }}
            style={{ textTransform: 'capitalize' }}
          >
            <span style={{ fontWeight: 'bold', color: '#000' }}>Category</span> {subCategory?.subTitle}
          </Typography>
          <div
            style={{
              marginTop: '30px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              opacity: 1,
            }}
          >
            <div>
              <Label
                color={isActive ? 'success' : 'error'}
                style={{ cursor: 'pointer' }}
                onClick={() => blogToggler(_id)}
              >
                {sentenceCase(isActive ? 'active' : 'inactive')}
              </Label>
            </div>
            <LoadingButton
              type="submit"
              variant="contained"
              style={{
                background: '#D22B2B',
                padding: '10px 20px',
                opacity: 1,
              }}
              onClick={() => deleteBlog(_id)}
            >
              Delete Post
            </LoadingButton>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}
