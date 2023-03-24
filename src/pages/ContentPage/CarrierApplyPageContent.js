/* eslint-disable */
import { LoadingButton } from '@mui/lab';
import { Grid, TextField, Card, Box, CircularProgress, Divider } from '@mui/material';
// import { Box, Stack } from '@mui/system';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import LoadingAnimation from 'src/components/LoadingAnimation';

const CarrierApplyPageContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [homeContent, setHomeContent] = useState();
  const [addRecordLoader, setaddLoader] = useState(false);
  const [id, setid] = useState();

  /* herosection */
  const [atitle, asettitle] = useState('');
  const [adesc, asetdesc] = useState('');
  const [abtnTxt, asetbtnTxt] = useState('');
  const [abtnUrl, asetbtnUrl] = useState('');
  const [amainImg, asetmainImg] = useState('');

  /* section1 */
  const [btitle, bsettitle] = useState('');
  const [bdesc, bsetdesc] = useState('');
  const [bdesc2, bsetdesc2] = useState('');
  const [bdata, bsetdata] = useState('');
  const [bbtndata, bsetbtndata] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [metakeyword, setMetaKeyword] = useState('');

  const setStateData = (data) => {
    asettitle(data.heroSection.title);
    asetdesc(data.heroSection.subtitle);
    asetbtnTxt(data.heroSection.btnTxt);
    asetbtnUrl(data.heroSection.btnUrl);
    asetmainImg(data.heroSection.img);
    bsettitle(data.RolesSection.title);
    bsetdesc(data.RolesSection.desc);
    bsetdesc2(data.RolesSection.desc2);
    bsetdata(data?.RolesSection?.pointData);
    bsetbtndata(data?.RolesSection?.btnData);

    setMetaTitle(data?.metaTags?.metaTitle);
    setMetaDesc(data?.metaTags?.metaDesc);
    setMetaKeyword(data?.metaTags?.metakeyword);
  };

  const fetchContent = async () => {
    try {
      setIsLoading(true);
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.get(`${BASE_URL}content?page=carrierApply`, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      console.log('🤩 ~ file: HomePageContent.js:19 ~ fetchContent ~ data', data);
      setHomeContent(data.result.english.content);
      setStateData(data.result.english.content);
      setid(data.result._id);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const changeContent = async (id, updatedData) => {
    try {
      const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
      const bearerToken = Cookies.get('x-access-token')
        ? Cookies.get('x-access-token')
        : localStorage.getItem('x-access-token')
        ? localStorage.getItem('x-access-token')
        : null;

      const { data } = await axios.put(`${BASE_URL}content/${id}`, updatedData, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      return error.response.data;
    }
  };

  const handleSubmit = async () => {
    setaddLoader(true);
    const setFormData = {
      english: {
        pageTitle: 'carrerApplyPage',
        content: {
          heroSection: {
            title: atitle,
            subtitle: adesc,
            btnTxt: abtnTxt,
            btnUrl: abtnUrl,
            img: amainImg,
          },
          RolesSection: {
            title: btitle,
            desc: bdesc,
            desc2: bdesc2,
            pointData: bdata,
            btnData: bbtndata,
          },
          metaTags: {
            metaTitle,
            metaDesc,
            metakeyword,
          },
        },
      },
    };
    console.log(setFormData);
    const updateResult = await changeContent(id, setFormData);
    setTimeout(() => {
      setaddLoader(false);
    }, 2500);
  };

  React.useEffect(() => {
    fetchContent();
  }, []);
  return (
    <div>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Card sx={{ py: 2, px: 3 }}>
                <h2>Hero Section</h2>
                <Grid item xs={12} md={12}>
                  <div style={{ padding: '0px 40px', display: 'flex', flexDirection: 'column' }}>
                    <TextField
                      name="email"
                      label="Title"
                      value={atitle}
                      style={{ margin: '10px' }}
                      onChange={(e) => {
                        asettitle(e.target.value);
                      }}
                    />
                    <TextField
                      name="title"
                      label="Description"
                      value={adesc}
                      style={{ margin: '10px' }}
                      onChange={(e) => {
                        asetdesc(e.target.value);
                      }}
                    />
                    <TextField
                      name="title"
                      label="Button Text"
                      value={abtnTxt}
                      style={{ margin: '10px' }}
                      onChange={(e) => {
                        asetbtnTxt(e.target.value);
                      }}
                    />
                    <TextField
                      name="title"
                      label="Routes"
                      value={abtnUrl}
                      style={{ margin: '10px' }}
                      onChange={(e) => {
                        asetbtnUrl(e.target.value);
                      }}
                    />
                    <TextField
                      name="title"
                      label="main Img"
                      value={amainImg}
                      style={{ margin: '10px' }}
                      onChange={(e) => {
                        asetmainImg(e.target.value);
                      }}
                    />
                  </div>
                </Grid>
              </Card>
            </Grid>
          </Grid>

          <div style={{ marginTop: '50px' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ py: 2, px: 3 }}>
                  <h2>Section 1</h2>
                  <Grid item xs={12} md={12}>
                    <div style={{ padding: '0px 40px', display: 'flex', flexDirection: 'column' }}>
                      <TextField
                        name="email"
                        label="Title"
                        value={btitle}
                        style={{ margin: '10px' }}
                        onChange={(e) => {
                          bsettitle(e.target.value);
                        }}
                      />
                      <TextField
                        name="title"
                        label="Description"
                        value={bdesc}
                        style={{ margin: '10px' }}
                        onChange={(e) => {
                          bsetdesc(e.target.value);
                        }}
                      />
                      <TextField
                        name="title"
                        label="Description 2"
                        value={bdesc2}
                        style={{ margin: '10px' }}
                        onChange={(e) => {
                          bsetdesc2(e.target.value);
                        }}
                      />
                      {bdata.map((cardData, index) => {
                        return (
                          <div>
                            {index === 0 ? '' : <Divider style={{ marginTop: '18px' }} />}
                            <TextField
                              name="email"
                              label="Title"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.title}
                              onChange={(e) => {
                                const value = e.target.value;
                                const dta = [...bdata];
                                dta[index].title = value;
                                bsetdata(dta);
                              }}
                            />

                            <TextField
                              name="email"
                              label="Icon"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.icon}
                              onChange={(e) => {
                                const value = e.target.value;
                                const dta = [...bdata];
                                dta[index].icon = value;
                                bsetdata(dta);
                              }}
                            />
                          </div>
                        );
                      })}

                      <h3>Button Data </h3>

                      {bbtndata.map((cardData, index) => {
                        return (
                          <div>
                            {index === 0 ? '' : <Divider style={{ marginTop: '18px' }} />}
                            <TextField
                              name="email"
                              label="Title"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.title}
                              onChange={(e) => {
                                const value = e.target.value;
                                const dta = [...bbtndata];
                                dta[index].title = value;
                                bsetbtndata(dta);
                              }}
                            />

                            <TextField
                              name="email"
                              label="Routes"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.routes}
                              onChange={(e) => {
                                const value = e.target.value;
                                const dta = [...bbtndata];
                                dta[index].routes = value;
                                bsetbtndata(dta);
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </div>

          <div style={{ marginTop: '50px' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ py: 2, px: 3 }}>
                  <h2>Meta Data Section</h2>
                  <Grid item xs={12} md={12}>
                    <div style={{ padding: '0px 40px' }}>
                      <TextField
                        name="email"
                        label={`Meta Title`}
                        style={{ width: '100%', marginTop: '24px' }}
                        value={metaTitle}
                        onChange={(e) => {
                          setMetaTitle(e.target.value);
                          // esetdata[index].title(e.target.value);
                        }}
                      />
                      <TextField
                        name="email"
                        label={`Meta Description`}
                        style={{ width: '100%', marginTop: '24px' }}
                        value={metaDesc}
                        onChange={(e) => {
                          setMetaDesc(e.target.value);
                          // esetdata[index].subTitle(e.target.value);
                        }}
                      />
                      <TextField
                        name="email"
                        label={`Meta Keyword`}
                        style={{ width: '100%', marginTop: '24px' }}
                        value={metakeyword}
                        onChange={(e) => {
                          setMetaKeyword(e.target.value);
                          // esetdata[index].subTitle(e.target.value);
                        }}
                      />
                    </div>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </div>

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
                  background: '#FFC501',
                  padding: '10px 20px',
                  opacity: 1,
                }}
                onClick={() => handleSubmit()}
              >
                Edit Page Content
              </LoadingButton>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CarrierApplyPageContent;
