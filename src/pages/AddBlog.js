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
  CircularProgress,
} from '@mui/material';
import { Country, State } from 'country-state-city';
import Lottie from 'react-lottie';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
// import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Iconify from '../components/iconify';
// import { AddUser } from '../redux/Actions/userAction';
import errAnimationData from '../lotties/error.json';
import successAnimationData from '../lotties/success.json';
import { AddUser } from '../redux/Actions/userAction';

import Cookies from 'js-cookie';
import axios from 'axios';
import 'jodit';
import 'jodit/build/jodit.min.css';
import JoditEditor from 'jodit-react';
import LoadingAnimation from 'src/components/LoadingAnimation';
import { errorToast, successToast } from 'src/utils/Toast';
// import { Navigation } from '@mui/icons-material';

const animatedComponents = makeAnimated();

const editorConfig = {
  readonly: false,
  toolbar: true,
  spellcheck: true,
  language: 'en',
  toolbarButtonSize: 'medium',
  toolbarAdaptive: false,
  showCharsCounter: true,
  showWordsCounter: true,
  showXPathInStatusbar: false,
  askBeforePasteHTML: true,
  askBeforePasteFromWord: true,
  //defaultActionOnPaste: "insert_clear_html",

  width: '100%',
  height: 300,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '30px',
  p: 4,
};

const customStyles = {
  container: (base, state) => {
    return {
      ...base,
      zIndex: state.isFocused ? '999' : '1',
    };
  },
};

const CreateBlog = ({ blogData }) => {
  const [countryData, setCountryData] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { isLoading, isAuthenticated, user, error } = useSelector((state) => state.user);

  const [postTitle, setpostTitle] = useState('');
  const [postDesc, setpostDesc] = useState('');
  const [content, setcontent] = useState('');
  const [post_slug, setpost_slug] = useState('');
  const [tags, settags] = useState('');
  const [metaTitle, setmetaTitle] = useState('');
  const [metaDesc, setmetaDesc] = useState('');
  const [metaKeyword, setmetaKeyword] = useState('');
  const [catId, setCatId] = useState();
  const [CategoryIdDropdown, setCategoryIdDropdown] = useState();
  const [CategoryValueDropdown, setCategoryValueDropdown] = useState();
  const [catData, setcatData] = useState();
  const [isUpdate, setisUpdate] = useState(false);

  const [addBlogLoader, setAddBlogLoader] = useState(false);
  const [editBlogLoader, setEditBlogLoader] = useState(false);
  const [fetcher, setFetcher] = useState(false);

  const [releventGroup, setReleventGroup] = useState();

  const [check, setCheck] = useState();

  const [avatarPreview, setAvatarPreview] = useState('/assets/images/avatars/avatar_18.jpg');
  const [image, setImage] = useState('');

  const [releventBlogOne, setreleventBlogOne] = useState();
  const [releventBlogTwo, setreleventBlogTwo] = useState();
  const [releventBlogThree, setreleventBlogThree] = useState();
  const [releventBlogFour, setreleventBlogFour] = useState();
  const [releventBlogOneId, setreleventBlogOneId] = useState();
  const [releventBlogTwoId, setreleventBlogTwoId] = useState();
  const [releventBlogThreeId, setreleventBlogThreeId] = useState();
  const [releventBlogFourId, setreleventBlogFourId] = useState();

  /* Modal States */
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [errMsg, setErrMsg] = React.useState('');
  const [successMsg, setSuccessMsg] = React.useState('');
  const [blogId, setBlogId] = React.useState('');

  const addBlog = async (id, Blogdata) => {
    try {
      setAddBlogLoader(true);
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.post(`${BASE_URL}blog?cat_id=${id}`, Blogdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${bearerToken}`,
        },
      });
      setAddBlogLoader(false);
      return data;
    } catch (error) {
      setAddBlogLoader(false);
      return error.response.data;
    }
  };

  const fetchCategories = async () => {
    try {
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.get(`${BASE_URL}category/subcategory/all`, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });

      let dropDownData = [];
      data &&
        data?.result.map((mapdata) => {
          if (mapdata.isActive) {
            return dropDownData.push({
              name: '',
              label: mapdata.subTitle,
              value: mapdata._id,
            });
          }
        });
      setcatData(dropDownData);
      return data;
    } catch (error) {
      return error.response.data;
    }
  };

  const doUploadImageUpload = async (id, imageData) => {
    try {
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const newImageData = new FormData();
      newImageData.append('blog_img', imageData);
      newImageData.append('type', 'editImage');
      const { data } = await axios.post(`${BASE_URL}blog/${id}`, newImageData, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
        onUploadProgress: (progressEvent) => console.log(progressEvent.loaded),
      });
      return data;
    } catch (error) {
      return error?.response?.data;
    }
  };

  const doFetchAllBlogData = async () => {
    try {
      // debugger;
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;
      // debugger;
      const { data } = await axios.get(`${BASE_URL}blog/list/admin/blog`, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      // debugger;
      let newData = data?.result?.map((mapData) => {
        return {
          label: mapData.postTitle,
          value: mapData._id,
        };
      });
      setReleventGroup(newData);
      return data;
    } catch (error) {
      return error?.response?.data;
    }
  };

  const [BlogReleventData, setBlogReleventData] = useState();

  const doFetchBlogData = async () => {
    try {
      // debugger;
      setFetcher(true);
      // if (releventGroup && releventGroup !== undefined) {
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.get(`${BASE_URL}blog/${id}`, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      // console.log('🤩 ~ file: AddCarrier.js:110 ~ doFetchData ~ data', data);
      setUpdateData(data?.result);
      setBlogReleventData(data?.result?.ReleventBlog);
      // debugger;
      // setFetcher(false);
      setFetcher(false);
      return data;
    } catch (error) {
      setFetcher(false);
      return error?.response?.data;
    }
  };

  const handleReleventDropdown = (e) => {
    // debugger;
    console.log('=========================================>', e);
    // setCheck(e);
  };

  const handleDropdown = (data) => {
    setCategoryIdDropdown(data.label);
    setCategoryValueDropdown(data.value);
  };

  const editBlog = async (id, UpdatedData) => {
    try {
      // debugger;
      setEditBlogLoader(true);
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.put(`${BASE_URL}blog/${id}`, UpdatedData, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      setEditBlogLoader(false);
      return data;
    } catch (error) {
      setEditBlogLoader(false);
      return error.response.data;
    }
  };

  /* Image Uploading */
  // const handleImage = async (e) => {
  //   const { name, value } = e.target;
  //   if (name === 'image') {
  //     await setAvatarPreview(URL.createObjectURL(e.target.files[0]));
  //     await setImage(e.target.files[0]);
  //   }
  //   console.log('HandleImage Called', isUpdate);
  //   console.log('HandleImage Called 2', image);
  //   console.log('HandleImage Called 3', avatarPreview);
  //   if (isUpdate) {
  //     if (image && image != undefined) {
  //       await doUploadImageUpload(blogId);
  //     }
  //   }
  // };

  const handleSubmit = async () => {
    /* 
    postTitle,
      content,
      post_slug,
      cat_id: CategoryValueDropdown,
      metaTitle,
      metaDesc,
      metaKeyword,
      ReleventBlog: [releventBlogOneId, releventBlogTwoId, releventBlogThreeId, releventBlogFourId],
    
    */
    const storedData = new FormData();
    storedData.append('postTitle', postTitle);
    // storedData.append('postDesc', postDesc);
    storedData.append('content', content);
    storedData.append('post_slug', postTitle);
    const tagsArr = tags.split(',');
    // tagsArr.map((tagdata, index) => {
    //   return storedData.append(`tags[${index}]`, tagdata);
    // });
    storedData.append('metaTitle', metaTitle);
    storedData.append('metaDesc', metaDesc);
    storedData.append('metaKeyword', metaKeyword);
    storedData.append('blogImg', image);
    if (releventBlogOneId != undefined) {
      storedData.append('ReleventBlog[0]', releventBlogOneId);
    }
    if (releventBlogTwoId != undefined) {
      storedData.append('ReleventBlog[1]', releventBlogTwoId);
    }
    if (releventBlogThreeId != undefined) {
      storedData.append('ReleventBlog[2]', releventBlogThreeId);
    }
    if (releventBlogFourId != undefined) {
      storedData.append('ReleventBlog[3]', releventBlogFourId);
    }
    // storedData.append('blogImg', image);

    const addBlogresult = await addBlog(CategoryValueDropdown, storedData);
    if (addBlogresult.success) {
      setErrMsg('');
      setSuccessMsg(`Blog Created Successfully`);
      return setOpen(true);
    } else {
      setSuccessMsg('');
      setErrMsg(addBlogresult.message);
      return setOpen(true);
    }
  };

  /* 
  Lottie Configuration
  */
  const successDefaultOptions = {
    loop: true,
    autoplay: true,
    animationData: successAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const errDefaultOptions = {
    loop: true,
    autoplay: true,
    animationData: errAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const setUpdateData = async (updatedData) => {
    // debugger;
    const { _id, content, metaDesc, metaKeyword, metaTitle, postDesc, postTitle, subCategory, tags, thumbImage } =
      updatedData;
    // console.log(
    //   '🤩 ~ =========================================file: AddBlog.js:270 ~ setUpdateData ~ updatedData',
    //   updatedData
    // );
    // debugger;
    setpostTitle(postTitle);
    setpostDesc(metaDesc);
    setcontent(content);
    setpost_slug(postTitle);
    setAvatarPreview(thumbImage.url);
    // settags(tags.toString());
    setmetaTitle(updatedData.metaTitle);
    setmetaDesc(updatedData.metaDesc);
    setmetaKeyword(updatedData.metaKeyword.toString());
    setCategoryIdDropdown(subCategory.subTitle);
    setCategoryValueDropdown(subCategory._id);
    // console.log(updatedData.ReleventBlog[0]);
    setreleventBlogOneId(updatedData.ReleventBlog[0] ? updatedData.ReleventBlog[0]._id : null);
    setreleventBlogOne(updatedData.ReleventBlog[0] ? updatedData.ReleventBlog[0].postTitle : null);
    // console.log(updatedData.ReleventBlog[1]);
    setreleventBlogTwoId(updatedData.ReleventBlog[1] ? updatedData.ReleventBlog[1]._id : null);
    setreleventBlogTwo(updatedData.ReleventBlog[1] ? updatedData.ReleventBlog[1].postTitle : null);
    // console.log(updatedData.ReleventBlog[2]);
    setreleventBlogThreeId(updatedData.ReleventBlog[2] ? updatedData.ReleventBlog[2]._id : null);
    setreleventBlogThree(updatedData.ReleventBlog[2] ? updatedData.ReleventBlog[2].postTitle : null);
    setreleventBlogFourId(updatedData.ReleventBlog[3] ? updatedData.ReleventBlog[3]._id : null);
    setreleventBlogFour(updatedData.ReleventBlog[3] ? updatedData.ReleventBlog[3].postTitle : null);
    // console.log(updatedData.ReleventBlog[3]);
    setBlogId(_id);
    setisUpdate(true);
  };

  const handleImageUpload = async (e) => {
    console.log(e);
    setImage(e);
    if (isUpdate) {
      await doUploadImageUpload(blogId, e);
    }
  };

  console.log(image);
  const handleEditSubmit = async () => {
    const editedData = {
      postTitle,
      content,
      post_slug: postTitle,
      cat_id: CategoryValueDropdown,
      metaTitle,
      metaDesc,
      metaKeyword,
      ReleventBlog: [releventBlogOneId, releventBlogTwoId, releventBlogThreeId, releventBlogFourId],
    };
    console.log(editedData);
    const doEditRecord = await editBlog(blogId, editedData);
    if (doEditRecord.success) {
      successToast('Blog Edited Successfully');
      navigate('/dashboard/blog', { replace: true });
    } else {
      errorToast(doEditRecord.message);
    }
    // console.log('🤩 ~ file: AddBlog.js:280 ~ handleEditSubmit ~ doEditRecord', doEditRecord);
  };

  const { id } = useParams();

  useEffect(() => {
    doFetchAllBlogData();
    fetchCategories();
    setTimeout(() => {
      if (id && id) {
        doFetchBlogData(id);
      }
    }, 500);
    // if (blogData) {
    //   setUpdateData(blogData);
    // }
  }, []);
  return (
    <div>
      {/*  
    <Button onClick={handleOpen}>Open modal</Button>
      */}
      {fetcher ? (
        <LoadingAnimation />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ py: 2, px: 3 }}>
              <h1>{isUpdate ? 'Edit Blog' : 'Add Blog'}</h1>
              <Grid item xs={12} md={12}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '40px',
                  }}
                >
                  <InputLabel htmlFor="ImageUpload">
                    <div style={{ position: 'relative' }}>
                      <img
                        src={avatarPreview}
                        alt="Avatar Preview"
                        className="img-fluid"
                        style={{
                          width: '100px',
                          borderRadius: '50%',
                          height: '100px',
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
                          bottom: '5px',
                          right: '5px',
                        }}
                      >
                        <div
                          style={{
                            width: '25px',
                            height: '25px',
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            color: 'white',
                            alignItems: 'center',
                            background: '#6ab04c ',
                          }}
                        >
                          <Iconify icon="eva:plus-fill" />
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
                    onChange={(e) => {
                      console.log(e.target.files[0]);
                      handleImageUpload(e.target.files[0]);
                      setAvatarPreview(URL.createObjectURL(e.target.files[0]));
                      // // const { name, value } = e.target;
                      // if (e.target.name === 'image') {
                      //   await setAvatarPreview(URL.createObjectURL(e.target.files[0]));
                      //   await setImage(e.target.files[0]);
                      // }
                      // console.log('HandleImage Called', isUpdate);
                      // console.log('HandleImage Called 2', image);
                      // console.log('HandleImage Called 3', avatarPreview);
                      // if (isUpdate) {
                      //   if (image && image != undefined) {
                      //     await doUploadImageUpload(blogId);
                      //   }
                      // }
                    }}
                  />
                </div>
                <Box
                  sx={{
                    display: 'grid',
                    columnGap: 2,
                    rowGap: 3,
                  }}
                >
                  <p style={{ color: 'red' }}>
                    Sometime images will not upload to cloudinary because of cloudinary free tier plan so try to upload
                    image more then once
                  </p>
                  <TextField
                    id="outlined-firstname"
                    label="Post Title"
                    variant="outlined"
                    value={postTitle}
                    onChange={(e) => setpostTitle(e.target.value)}
                  />
                  <TextField
                    id="outlined-content"
                    label="Meta Description"
                    variant="outlined"
                    value={metaDesc}
                    multiline
                    rows={4}
                    onChange={(e) => setmetaDesc(e.target.value)}
                  />
                  {/*  <TextField
                    id="outlined-lastname"
                    label="Post Description"
                    variant="outlined"
                    value={postDesc}
                    multiline
                    rows={4}
                    onChange={(e) => setpostDesc(e.target.value)}
                /> */}
                  <JoditEditor
                    value={content}
                    config={editorConfig}
                    onChange={(value) => setcontent(value)}
                    style={{ width: '100%' }}
                  />
                  {/* <TextField
                  id="outlined-content"
                  label="Content"
                  variant="outlined"
                  value={content}
                  multiline
                  rows={4}
                  onChange={(e) => setcontent(e.target.value)}
                /> */}
                  <div styles={{ padding: '50px' }}>
                    <h4>Select Subcategory</h4>
                    <Select
                      styles={customStyles}
                      placeholder="Select Subcategory"
                      value={{
                        label: CategoryIdDropdown ? CategoryIdDropdown : 'Select Category',
                        value: CategoryValueDropdown,
                      }}
                      options={catData}
                      onChange={(e) => {
                        handleDropdown(e);
                      }}
                    />
                    <p style={{ marginLeft: '5px' }}>
                      Not able to find your categories?
                      <Link to={'/dashboard/subcategory'} style={{ color: 'blue', textDecoration: 'underline' }}>
                        Add new one
                      </Link>
                    </p>
                  </div>
                  <div styles={{ padding: '50px' }}>
                    <h4>Select Relevent Blog 1</h4>
                    <Select
                      styles={customStyles}
                      placeholder="Select Relevent Blog"
                      value={{
                        label: releventBlogOne ? releventBlogOne : 'Select Relevent Blog',
                        value: releventBlogOneId,
                        type: 1,
                      }}
                      options={releventGroup}
                      onChange={(e) => {
                        setreleventBlogOne(e.label);
                        setreleventBlogOneId(e.value);
                      }}
                    />
                  </div>
                  <div styles={{ padding: '50px' }}>
                    <h4>Select Relevent Blog 2</h4>
                    <Select
                      styles={customStyles}
                      placeholder="Select Relevent Blog"
                      value={{
                        label: releventBlogTwo ? releventBlogTwo : 'Select Relevent Blog',
                        value: releventBlogTwoId,
                        type: 2,
                      }}
                      options={releventGroup}
                      onChange={(e) => {
                        setreleventBlogTwo(e.label);
                        setreleventBlogTwoId(e.value);
                      }}
                    />
                  </div>
                  <div styles={{ padding: '50px' }}>
                    <h4>Select Relevent Blog 3</h4>
                    <Select
                      styles={customStyles}
                      placeholder="Select Relevent Blog"
                      value={{
                        label: releventBlogThree ? releventBlogThree : 'Select Relevent Blog',
                        value: releventBlogThreeId,
                        type: 3,
                      }}
                      options={releventGroup}
                      onChange={(e) => {
                        setreleventBlogThree(e.label);
                        setreleventBlogThreeId(e.value);
                      }}
                    />
                  </div>
                  <div styles={{ padding: '50px' }}>
                    <h4>Select Relevent Blog 4</h4>
                    <Select
                      styles={customStyles}
                      placeholder="Select Relevent Blog"
                      value={{
                        label: releventBlogFour ? releventBlogFour : 'Select Relevent Blog',
                        value: releventBlogFourId,
                        type: 4,
                      }}
                      options={releventGroup}
                      onChange={(e) => {
                        setreleventBlogFour(e.label);
                        setreleventBlogFourId(e.value);
                      }}
                    />
                  </div>
                  {/* <TextField
                    id="outlined-firstname"
                    label="Post Slug"
                    variant="outlined"
                    value={post_slug}
                    onChange={(e) => setpost_slug(e.target.value)}
                    />  */}
                  {/* <TextField
                    id="outlined-tags"
                    label="Tags"
                    variant="outlined"
                    value={tags}
                    onChange={(e) => settags(e.target.value)}
                    /> */}
                  <TextField
                    id="outlined-content"
                    label="Meta Title"
                    variant="outlined"
                    value={metaTitle}
                    onChange={(e) => setmetaTitle(e.target.value)}
                  />

                  <TextField
                    id="outlined-content"
                    label="Meta Keywords"
                    variant="outlined"
                    value={metaKeyword}
                    onChange={(e) => setmetaKeyword(e.target.value)}
                  />
                </Box>

                {isUpdate ? (
                  <div
                    style={{
                      marginTop: '30px',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      opacity: 1,
                    }}
                  >
                    {editBlogLoader ? (
                      <CircularProgress />
                    ) : (
                      <LoadingButton
                        type="submit"
                        variant="contained"
                        style={{
                          background: '#FFC501',
                          padding: '10px 20px',
                          opacity: 1,
                        }}
                        onClick={() => handleEditSubmit()}
                      >
                        Edit Post
                      </LoadingButton>
                    )}
                  </div>
                ) : (
                  <div
                    style={{
                      marginTop: '30px',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      opacity: 1,
                    }}
                  >
                    {addBlogLoader ? (
                      <CircularProgress />
                    ) : (
                      <LoadingButton
                        type="submit"
                        variant="contained"
                        style={{
                          background: '#6ab04c',
                          padding: '10px 20px',
                          opacity: 1,
                        }}
                        onClick={() => handleSubmit()}
                      >
                        Create Post
                      </LoadingButton>
                    )}
                  </div>
                )}
              </Grid>
            </Card>
          </Grid>
        </Grid>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <Lottie options={errMsg.length > 0 ? errDefaultOptions : successDefaultOptions} height={200} width={200} />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                flexDirection: 'column',
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {successMsg && successMsg.includes('#') ? (
                  <div>
                    {successMsg.split('#')[0]} <span style={{ opacity: 0.6 }}>#{successMsg.split('#')[1]}</span>
                  </div>
                ) : (
                  successMsg
                )}

                {errMsg ? errMsg : ''}
              </Typography>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateBlog;
