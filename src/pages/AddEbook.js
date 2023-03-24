/* eslint-disable */
import { LoadingButton } from '@mui/lab';
import { Card, Grid, IconButton, TextField, CircularProgress } from '@mui/material';
import Cookies from 'js-cookie';
import axios from 'axios';
import React, { useState } from 'react';
import Select from 'react-select';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Iconify from '../components/iconify';
// import { AddUser } from '../redux/Actions/userAction';
import 'jodit';
import 'jodit/build/jodit.min.css';
import { errorToast, successToast } from 'src/utils/Toast';
import Loader from 'src/components/Loading';
import FileUpload from 'react-material-file-upload';

const customStyles = {
  container: (base, state) => {
    return {
      ...base,
      zIndex: state.isFocused ? '999' : '1',
    };
  },
};
const Createebook = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const [imageLink, setimageLink] = useState('');
  const [recordId, setRecordId] = useState('');
  const [isEditedData, setIsEditedData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [catData, setcatData] = useState();
  const [metaTitle, setmetaTitle] = useState('');
  const [metaDesc, setmetaDesc] = useState('');
  const [metaKeyword, setmetaKeyword] = useState('');
  const [CategoryIdDropdown, setCategoryIdDropdown] = useState();
  const [CategoryValueDropdown, setCategoryValueDropdown] = useState();
  const [releventGroup, setReleventGroup] = useState();

  const [releventBlogOne, setreleventBlogOne] = useState();
  const [releventBlogTwo, setreleventBlogTwo] = useState();
  const [releventBlogThree, setreleventBlogThree] = useState();
  const [releventBlogFour, setreleventBlogFour] = useState();
  const [releventBlogOneId, setreleventBlogOneId] = useState();
  const [releventBlogTwoId, setreleventBlogTwoId] = useState();
  const [releventBlogThreeId, setreleventBlogThreeId] = useState();
  const [releventBlogFourId, setreleventBlogFourId] = useState();
  const navigate = useNavigate();

  const doStoreDetails = async (record) => {
    try {
      setIsLoading(true);
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      console.log('🤩 ~ file: AddCarrier.js:75 ~ doStoreDetails ~ bearerToken', bearerToken);
      const { data } = await axios.post(`${BASE_URL}content/uploads`, record, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      console.log('🤩 ~ file: AddCarrier.js:83 ~ doStoreDetails ~ data', data);
      setIsLoading(false);
      return data;
    } catch (error) {
      setIsLoading(false);
      return error?.response?.data;
    }
  };

  const { id } = useParams();

  React.useEffect(() => {
    doFetchAllBlogData();
    // doFetchAllBlogData();
    fetchCategories();
    if (id && id) {
      doFetchData(id);
    }
  }, []);

  const doFetchData = async (id) => {
    try {
      setFetchLoading(true);
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.get(`${BASE_URL}content/upload/${id}`, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      console.log('🤩 ~ file: AddCarrier.js:110 ~ doFetchData ~ data', data);
      setIsEditedData(true);
      setTitle(data?.result?.title);
      setDesc(data?.result?.desc);
      setTags(data?.result?.tags.toString());
      //   setContent(data?.result?.content);
      setimageLink(data?.result?.imageUrl);
      //   setLinkdinLink(data?.result?.indeedLink);
      setRecordId(data?.result?._id);
      setmetaDesc(data?.result?.metaDesc);
      setmetaTitle(data?.result?.metaTitle);
      setmetaKeyword(data?.result?.metaKeyword);
      setCategoryIdDropdown(data?.result?.subCategory.subTitle);
      setCategoryValueDropdown(data?.result?.subCategory._id);
      seteditFiles(data?.result?.attachment);
      setfileSuccess(true);
      setreleventBlogOne(data?.result?.ReleventDocs[0].title);
      setreleventBlogOneId(data?.result?.ReleventDocs[0]._id);
      setreleventBlogTwo(data?.result?.ReleventDocs[1].title);
      setreleventBlogTwoId(data?.result?.ReleventDocs[1]._id);
      setreleventBlogThree(data?.result?.ReleventDocs[2].title);
      setreleventBlogThreeId(data?.result?.ReleventDocs[2]._id);
      setreleventBlogFour(data?.result?.ReleventDocs[3].title);
      setreleventBlogFourId(data?.result?.ReleventDocs[3]._id);
      setFetchLoading(false);
      return data;
    } catch (error) {
      setFetchLoading(false);
      return error?.response?.data;
    }
  };

  const doEditData = async (id, updatedRecord) => {
    try {
      setIsLoading(true);
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      console.log('🤩 ~ file: AddCarrier.js:75 ~ doStoreDetails ~ bearerToken', bearerToken);
      const { data } = await axios.put(`${BASE_URL}content/upload/${id}`, updatedRecord, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      setIsLoading(false);
      return data;
    } catch (error) {
      setIsLoading(false);
      return error?.response?.data;
    }
  };

  const handleSubmit = async () => {
    let newStore = new FormData();
    newStore.append('title', title);
    newStore.append('metaTitle', metaTitle);
    newStore.append('metaDesc', metaDesc);
    newStore.append('metaKeyword', metaKeyword);
    newStore.append('subCategory', CategoryValueDropdown);
    if (attachment != undefined) {
      newStore.append('attachment', attachment);
    }
    newStore.append('imageUrl', imageLink);
    if (releventBlogOneId != undefined) {
      newStore.append('ReleventDocs[0]', releventBlogOneId);
    }
    if (releventBlogTwoId != undefined) {
      newStore.append('ReleventDocs[1]', releventBlogTwoId);
    }
    if (releventBlogThreeId != undefined) {
      newStore.append('ReleventDocs[2]', releventBlogThreeId);
    }
    if (releventBlogFourId != undefined) {
      newStore.append('ReleventDocs[3]', releventBlogFourId);
    }
    newStore.append('type', 'ebook');
    const tagsArr = tags.split(',');
    tagsArr.map((tagdata, index) => {
      return newStore.append(`tags[${index}]`, tagdata);
    });
    // const data = {
    //   title,
    //   metaTitle,
    //   metaDesc,
    //   metaKeyword,
    //   subCategory: CategoryValueDropdown,
    //   ReleventDocs: [releventBlogTwoId, releventBlogFourId, releventBlogOneId, releventBlogThreeId],
    //   tags: tags.includes(',') ? tags.split(',') : [tags],
    //   attachment,
    //   imageUrl: imageLink,
    //   type: 'ebook',
    // };
    let storeResult;
    if (!isEditedData) {
      storeResult = await doStoreDetails(newStore);
    } else {
      storeResult = await doEditData(recordId, newStore);
    }
    if (storeResult?.success) {
      navigate('/dashboard/ebook', { replace: true });
      successToast(isEditedData ? 'ebook Updated Successfully' : 'ebook Added Successfully');
    } else {
      errorToast('Something went wrong');
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
      const { data } = await axios.get(`${BASE_URL}content/admin/list?type=ebook`, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      // debugger;
      let newData = data?.result?.map((mapData) => {
        return {
          label: mapData.title,
          value: mapData._id,
        };
      });
      setReleventGroup(newData);
      // debugger;
      return data;
    } catch (error) {
      return error?.response?.data;
    }
  };

  const [files, setFiles] = useState([]);
  const [editfiles, seteditFiles] = useState();
  const [fileErrMessage, setFileErrMessage] = useState();
  const [fileSuccess, setfileSuccess] = useState(false);
  const [attachment, setAttachment] = useState();
  const checkfiles = (fileData) => {
    console.log('=============================', fileData[0]?.name, fileData[0]?.type);
    if (fileData[0]?.name.split('.').pop() == 'pdf') {
      setFiles(fileData);
      setAttachment(fileData[0]);
      setfileSuccess(true);
    } else {
      setFileErrMessage('File Not Supported');
      setfileSuccess(false);
    }
  };

  function formatFileSize(bytes, decimalPoint) {
    if (bytes == 0) return '0 Bytes';
    var k = 1000,
      dm = decimalPoint || 2,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  return (
    <div>
      {/*  
    <Button onClick={handleOpen}>Open modal</Button>
      */}
      {fetchLoading ? (
        <Loader />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ py: 2, px: 3 }}>
              <h1>{isEditedData ? 'Edit ebook' : ' Add ebook'} </h1>
              <Grid item xs={12} md={12}>
                <TextField
                  id="outlined-firstname"
                  label="Title"
                  variant="outlined"
                  value={title}
                  style={{ width: '100%', marginTop: '24px' }}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                  id="outlined-content"
                  label="Meta Title"
                  variant="outlined"
                  value={metaTitle}
                  style={{ width: '100%', marginTop: '24px' }}
                  onChange={(e) => setmetaTitle(e.target.value)}
                />

                <TextField
                  id="outlined-content"
                  label="Meta Keywords"
                  variant="outlined"
                  value={metaKeyword}
                  style={{ width: '100%', marginTop: '24px' }}
                  onChange={(e) => setmetaKeyword(e.target.value)}
                />

                <TextField
                  id="outlined-content"
                  label="Meta Description"
                  variant="outlined"
                  value={metaDesc}
                  style={{ width: '100%', marginTop: '24px' }}
                  multiline
                  rows={4}
                  onChange={(e) => setmetaDesc(e.target.value)}
                />
                <TextField
                  id="outlined-lastname"
                  label="Tags"
                  variant="outlined"
                  style={{ width: '100%', marginTop: '24px' }}
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
                <TextField
                  id="outlined-lastname"
                  label="Image Link"
                  variant="outlined"
                  style={{ width: '100%', marginTop: '24px' }}
                  value={imageLink}
                  onChange={(e) => setimageLink(e.target.value)}
                />
                <div styles={{ padding: '50px' }}>
                  <h4>Select Subcategory</h4>
                  <Select
                    styles={customStyles}
                    placeholder="Select Category"
                    value={{
                      label: CategoryIdDropdown ? CategoryIdDropdown : 'Select Category',
                      value: CategoryValueDropdown,
                    }}
                    options={catData}
                    onChange={(e) => {
                      setCategoryIdDropdown(e.label);
                      setCategoryValueDropdown(e.value);
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
                  <h4>Select Relevent Content 1</h4>
                  <Select
                    styles={customStyles}
                    placeholder="Select Relevent Blog"
                    value={{
                      label: releventBlogOne ? releventBlogOne : 'Select Relevent Content',
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
                  <h4>Select Relevent Content 2</h4>
                  <Select
                    styles={customStyles}
                    placeholder="Select Relevent Blog"
                    value={{
                      label: releventBlogTwo ? releventBlogTwo : 'Select Relevent Content',
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
                  <h4>Select Relevent Content 3</h4>
                  <Select
                    styles={customStyles}
                    placeholder="Select Relevent Blog"
                    value={{
                      label: releventBlogThree ? releventBlogThree : 'Select Relevent Content',
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
                  <h4>Select Relevent Content 4</h4>
                  <Select
                    styles={customStyles}
                    placeholder="Select Relevent Blog"
                    value={{
                      label: releventBlogFour ? releventBlogFour : 'Select Relevent Content',
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

                <h3>Attachment</h3>

                {files && files?.length > 0 ? (
                  <>
                    <div
                      style={{
                        marginTop: '20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderRadius: '50px',
                        background: '#62cd42',
                        color: '#ffffff',
                      }}
                    >
                      <div style={{ width: '90%', display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
                        <Iconify icon="fluent:document-pdf-20-filled" />
                        <p>{files[0]?.name?.length > 10 ? files[0]?.name?.substring(0, 10) + '...' : files[0]?.name}</p>
                        <p style={{ marginLeft: '10px' }}>({formatFileSize(files[0].size)})</p>
                      </div>
                      <div style={{ width: '10%', display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                        <IconButton
                          aria-label="upload picture"
                          style={{ color: '#FFFFFF' }}
                          component="label"
                          onClick={() => setFiles([])}
                        >
                          <Iconify icon="game-icons:cancel" />
                        </IconButton>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {isEditedData ? (
                  <div
                    style={{
                      borderRadius: '50px',
                    }}
                  >
                    <div style={{ width: '90%', display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
                      <Iconify icon="fluent:document-pdf-20-filled" />
                      <p>
                        {editfiles?.fileName?.length > 10
                          ? editfiles?.fileName?.substring(0, 10) + '...'
                          : editfiles?.fileName}
                      </p>
                      <p style={{ marginLeft: '10px' }}>({editfiles?.fileSize})</p>
                    </div>
                  </div>
                ) : null}

                <div style={{ marginTop: '20px' }}>
                  <FileUpload value={files} onChange={(e) => checkfiles(e)} />
                </div>
                {!fileSuccess ? (
                  <div style={{ color: 'red', display: 'flex', justifyContent: 'center', fontSize: '14px' }}>
                    {fileErrMessage}
                    {'      '}
                  </div>
                ) : (
                  ''
                )}
                <div>
                  <p style={{ color: '#FF0000' }}>*please upload attachment only in .pdf formate</p>
                </div>

                <div
                  style={{
                    marginTop: '30px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    opacity: title?.trim() !== '' && tags?.trim() !== '' ? 1 : 0.5,
                  }}
                >
                  {isLoading ? (
                    <div style={{ marginRight: '50px' }}>
                      <CircularProgress />
                    </div>
                  ) : (
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      style={{
                        background: isEditedData ? '#FFC501' : '#6ab04c',
                        padding: '10px 20px',
                        opacity: 1,
                        cursor: title?.trim() !== '' && tags?.trim() !== '' ? 'pointer' : 'not-allowed',
                      }}
                      onClick={() => handleSubmit()}
                    >
                      {isEditedData ? 'Edit ebook' : 'Create ebook'}
                    </LoadingButton>
                  )}
                </div>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Createebook;
