/* eslint-disable */
import { LoadingButton } from '@mui/lab';
import { Grid, TextField, Card, Box, CircularProgress, Divider } from '@mui/material';
// import { Box, Stack } from '@mui/system';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import LoadingAnimation from 'src/components/LoadingAnimation';

const CaseStudiesPageContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [homeContent, setHomeContent] = useState();
  const [addRecordLoader, setaddLoader] = useState(false);
  const [id, setid] = useState();
  // Context States

  /* herosection */
  const [atitle, asettitle] = useState('');
  const [adesc, asetdesc] = useState('');
  const [abtnTxt, asetbtnTxt] = useState('');
  const [abtnUrl, asetbtnUrl] = useState('');
  const [amainImg, asetmainImg] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [metakeyword, setMetaKeyword] = useState('');
  /* section1 */
  const [bdata, bsetdata] = useState('');

  const setStateData = (data) => {
    // // debugger;
    asettitle(data.herosection.title);
    asetdesc(data.herosection.desc);
    asetbtnTxt(data.herosection.btnTxt);
    asetbtnUrl(data.herosection.btnUrl);
    asetmainImg(data.herosection.mainImg);
    bsetdata(data?.section1?.data);
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

      const { data } = await axios.get(`${BASE_URL}content?page=casestudies`, {
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
        pageTitle: 'CaseStudiesPage',
        content: {
          herosection: {
            title: atitle,
            desc: adesc,
            btnTxt: abtnTxt,
            btnUrl: abtnUrl,
            mainImg: amainImg,
          },
          section1: {
            data: bdata,
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
                      label="Url"
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

          {/* <div style={{ marginTop: '50px' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ py: 2, px: 3 }}>
                  <h2>Section 1</h2>
                  <Grid item xs={12} md={12}>
                    <div style={{ padding: '0px 40px', display: 'flex', flexDirection: 'column' }}>
                      {bdata.map((cardData, index) => {
                        console.log(cardData);
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
                              label="Categories 1"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.cat[0]}
                              onChange={(e) => {
                                const value = e.target.value;
                                const dta = [...bdata];
                                dta[index].cat[0] = value;
                                bsetdata(dta);
                              }}
                            />
                            <TextField
                              name="email"
                              label="Categories 2"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.cat[1]}
                              onChange={(e) => {
                                const value = e.target.value;
                                const dta = [...bdata];
                                dta[index].cat[1] = value;
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
                            <TextField
                              name="email"
                              label="Button Text"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.btnTxt}
                              onChange={(e) => {
                                const value = e.target.value;
                                const dta = [...bdata];
                                dta[index].btnTxt = value;
                                bsetdata(dta);
                              }}
                            />
                            <TextField
                              name="email"
                              label="Button Routes"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.btnUrl}
                              onChange={(e) => {
                                const value = e.target.value;
                                const dta = [...bdata];
                                dta[index].btnUrl = value;
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
                          </>
                        );
                      })}
                    </div>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </div> */}

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

export default CaseStudiesPageContent;
