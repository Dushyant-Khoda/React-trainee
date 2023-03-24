/* eslint-disable */
import { LoadingButton } from '@mui/lab';
import { Grid, TextField, Card, Box, CircularProgress, Divider } from '@mui/material';
// import { Box, Stack } from '@mui/system';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import LoadingAnimation from 'src/components/LoadingAnimation';

const ContactPageContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [homeContent, setHomeContent] = useState();
  const [addRecordLoader, setaddLoader] = useState(false);
  const [id, setid] = useState();
  // Context States

  /* herosection */
  const [atitle, asettitle] = useState('');
  const [asubtitle, asetsubtitle] = useState('');
  const [aimg, asetimg] = useState('');
  /* section1 */
  const [bdata, bsetdata] = useState('');
  /* section2 */
  const [cdata, csetdata] = useState('');
  /* section3 */
  const [dimg, dsetimg] = useState('');

  const [metaTitle, setMetaTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [metakeyword, setMetaKeyword] = useState('');
  // const [b, bset] = useState('');

  const setStateData = (data) => {
    asettitle(data.heroSection.title);
    asetsubtitle(data.heroSection.subtitle);
    asetimg(data.heroSection.img);
    bsetdata(data.section1.data);
    csetdata(data.section2.data);
    dsetimg(data.section3.img);
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

      const { data } = await axios.get(`${BASE_URL}content?page=contactus`, {
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
      console.log('🤩 ~ file: HomePageContent.js:19 ~ fetchContent ~ data', data);
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
        pageTitle: 'ContactUsPage',
        content: {
          heroSection: {
            title: atitle,
            subTitle: asubtitle,
            img: aimg,
          },
          section1: {
            data: bdata,
          },
          section2: {
            data: cdata,
          },
          section3: {
            img: dimg,
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
        <>
          <LoadingAnimation />
        </>
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
                      label="Sub Title"
                      value={asubtitle}
                      style={{ margin: '10px' }}
                      onChange={(e) => {
                        asetsubtitle(e.target.value);
                      }}
                    />
                    <TextField
                      name="title"
                      label="Images"
                      value={aimg}
                      style={{ margin: '10px' }}
                      onChange={(e) => {
                        asetimg(e.target.value);
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
                      {bdata.map((cardData, index) => {
                        return (
                          <>
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
                              label="Image"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.img}
                              onChange={(e) => {
                                const value = e.target.value;
                                const dta = [...bdata];
                                dta[index].img = value;
                                bsetdata(dta);
                              }}
                            />
                            <TextField
                              name="email"
                              label="Description"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.desc}
                              onChange={(e) => {
                                const value = e.target.value;
                                const dta = [...bdata];
                                dta[index].desc = value;
                                bsetdata(dta);
                              }}
                            />
                          </>
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
                  <h2>Section 2</h2>
                  <Grid item xs={12} md={12}>
                    <div style={{ padding: '0px 40px', display: 'flex', flexDirection: 'column' }}>
                      {cdata.map((cardData, index) => {
                        return (
                          <>
                            {index === 0 ? '' : <Divider style={{ marginTop: '18px' }} />}
                            <TextField
                              name="email"
                              label="Title"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData?.title}
                              onChange={(e) => {
                                const value = e.target.value;
                                const dta = [...cdata];
                                dta[index].title = value;
                                csetdata(dta);
                              }}
                            />

                            <TextField
                              name="email"
                              label="Image"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData?.img}
                              onChange={(e) => {
                                const value = e.target.value;
                                const dta = [...cdata];
                                dta[index].img = value;
                                csetdata(dta);
                              }}
                            />
                            <TextField
                              name="email"
                              label="Description"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData?.desc}
                              onChange={(e) => {
                                const value = e.target.value;
                                const dta = [...cdata];
                                dta[index].desc = value;
                                csetdata(dta);
                              }}
                            />
                          </>
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
                  <h2>Section 3</h2>
                  <Grid item xs={12} md={12}>
                    <div style={{ padding: '0px 40px', display: 'flex', flexDirection: 'column' }}>
                      <TextField
                        name="title"
                        label="Image"
                        value={dimg}
                        style={{ margin: '10px' }}
                        onChange={(e) => {
                          dsetimg(e.target.value);
                        }}
                      />
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

export default ContactPageContent;
