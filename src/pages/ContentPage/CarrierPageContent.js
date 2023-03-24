/* eslint-disable */
import { LoadingButton } from '@mui/lab';
import { Grid, TextField, Card, Box, CircularProgress, Divider } from '@mui/material';
// import { Box, Stack } from '@mui/system';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import LoadingAnimation from 'src/components/LoadingAnimation';
import JoditEditor from 'jodit-react';

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

const CarrierPageContent = () => {
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

  /* section1 */
  const [bsubtitle, bsetsubtitle] = useState('');
  const [btitle, bsettitle] = useState('');
  const [bdesc, bsetdesc] = useState('');
  // const [bdesc2, bsetdesc2] = useState('');
  // const [bdesc3, bsetdesc3] = useState('');
  const [bdata, bsetdata] = useState('');

  /* Section 2 */
  const [csubtitle, csetsubtitle] = useState('');
  const [ctitle, csettitle] = useState('');
  const [cdata, csetdata] = useState('');

  const [metaTitle, setMetaTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [metakeyword, setMetaKeyword] = useState('');

  const setStateData = (data) => {
    asettitle(data.heroSection.title);
    asetdesc(data.heroSection.desc);
    asetbtnTxt(data.heroSection.btnTxt);
    asetbtnUrl(data.heroSection.btnUrl);
    asetmainImg(data.heroSection.mainImg);
    bsetsubtitle(data.section1.subtitle);
    bsettitle(data.section1.title);
    bsetdesc(data.section1.desc);
    // bsetdesc2(data.section1.desc2);
    // bsetdesc3(data.section1.desc3);
    bsetdata(data?.section1?.data);
    csetsubtitle(data.section2.subtitle);
    csettitle(data.section2.title);
    csetdata(data?.section2?.data);

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

      const { data } = await axios.get(`${BASE_URL}content?page=carrier`, {
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
        pageTitle: 'carrierPage',
        content: {
          heroSection: {
            title: atitle,
            desc: adesc,
            btnTxt: abtnTxt,
            btnUrl: abtnUrl,
            mainImg: amainImg,
          },
          section1: {
            subtitle: bsubtitle,
            title: btitle,
            desc: bdesc,
            data: bdata,
          },
          section2: {
            subtitle: csubtitle,
            title: ctitle,
            data: cdata,
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
                        name="email"
                        label="Subtitle"
                        value={bsubtitle}
                        style={{ margin: '10px' }}
                        onChange={(e) => {
                          bsetsubtitle(e.target.value);
                        }}
                      />
                      {/* <TextField
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
                      <TextField
                        name="title"
                        label="Description 3"
                        value={bdesc3}
                        style={{ margin: '10px' }}
                        onChange={(e) => {
                          bsetdesc3(e.target.value);
                        }}
                      /> */}

                      <h5>Description</h5>
                      <JoditEditor
                        value={bdesc}
                        config={editorConfig}
                        onChange={(value) => bsetdesc(value)}
                        style={{ width: '100%' }}
                      />
                      {bdata?.map((cardData, index) => {
                        console.log(cardData);
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
                  <h2>Section 2</h2>
                  <Grid item xs={12} md={12}>
                    <div style={{ padding: '0px 40px', display: 'flex', flexDirection: 'column' }}>
                      <TextField
                        name="email"
                        label="Title"
                        value={ctitle}
                        style={{ margin: '10px' }}
                        onChange={(e) => {
                          csettitle(e.target.value);
                        }}
                      />
                      <TextField
                        name="email"
                        label="Subtitle"
                        value={csubtitle}
                        style={{ margin: '10px' }}
                        onChange={(e) => {
                          csetsubtitle(e.target.value);
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

export default CarrierPageContent;
