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

const OurStoryPageContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [homeContent, setHomeContent] = useState();

  // Context States

  /* herosection */
  const [atitle, asettitle] = useState('');
  const [adesc, asetdesc] = useState('');
  const [abtnTxt, asetbtnTxt] = useState('');
  const [abtnUrl, asetbtnUrl] = useState('');
  /* section1 */
  const [bsubtitle, bsetsubtitle] = useState('');
  const [btitle, bsettitle] = useState('');
  const [bdesc, bsetdesc] = useState('');
  // const [bdesc1, bsetdesc1] = useState('');
  // const [bdesc2, bsetdesc2] = useState('');
  const [bmainImg, bsetmainImg] = useState('');
  const [bbtnTxt, bsetbtnTxt] = useState('');
  const [bbtnUrl, bsetbtnUrl] = useState('');
  /* Section 2 */
  const [csubtitle, csetsubtitle] = useState('');
  const [ctitle, csettitle] = useState('');
  const [cdesc, csetdesc] = useState('');
  // const [cdesc1, csetdesc1] = useState('');
  const [cmainImg, csetmainImg] = useState('');
  /* Section 3 */
  const [dsubtitle1, dsetsubtitle1] = useState('');
  const [dTitle1, dsetTitle1] = useState('');
  const [dsubtitle2, dsetsubtitle2] = useState('');
  const [dTitle2, dsetTitle2] = useState('');
  const [dbtnTxt, dsetbtnTxt] = useState('');
  const [droutes, dsetroutes] = useState('');
  /* Section 4 */
  const [esubtitle, esetsubtitle] = useState('');
  const [etitle, esettitle] = useState('');
  const [edata, esetdata] = useState('');
  /* Section 5 */
  const [fsubtitle, fsetsubtitle] = useState('');
  const [ftitle, fsettitle] = useState('');
  const [fdata, fsetdata] = useState('');

  const [metaTitle, setMetaTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [metakeyword, setMetaKeyword] = useState('');

  const [addRecordLoader, setaddLoader] = useState(false);
  const [id, setid] = useState();
  // const [b, bset] = useState('');

  const setStateData = (data) => {
    asettitle(data.heroSection.title);
    asetdesc(data.heroSection.desc);
    asetbtnTxt(data.heroSection.btnTxt);
    asetbtnUrl(data.heroSection.btnUrl);
    bsetsubtitle(data.section1.subtitle);
    bsettitle(data.section1.title);
    bsetdesc(data.section1.desc);
    // bsetdesc1(data.section1.desc1);
    // bsetdesc2(data.section1.desc2);
    bsetmainImg(data.section1.mainImg);
    bsetbtnTxt(data.section1.btnTxt);
    bsetbtnUrl(data.section1.btnUrl);
    csetsubtitle(data.section2.subtitle);
    csettitle(data.section2.title);
    csetdesc(data.section2.desc);
    // csetdesc1(data.section2.desc1);
    csetmainImg(data.section2.mainImg);
    dsetsubtitle1(data.section3.subtitle1);
    dsetTitle1(data.section3.Title1);
    dsetsubtitle2(data.section3.subtitle2);
    dsetTitle2(data.section3.Title2);
    dsetbtnTxt(data.section3.btnTxt);
    dsetroutes(data.section3.routes);
    esetsubtitle(data.section4.subTitle);
    esettitle(data.section4.Title);
    esetdata(data.section4.data);
    fsetsubtitle(data.section5.subtitle);
    fsettitle(data.section5.title);
    fsetdata(data.section5.data);

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

      const { data } = await axios.get(`${BASE_URL}content?page=ourstory`, {
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
        pageTitle: 'OurStoryContent',
        content: {
          heroSection: {
            title: atitle,
            desc: adesc,
            btnTxt: abtnTxt,
            btnUrl: abtnUrl,
          },
          section1: {
            subtitle: bsubtitle,
            title: btitle,
            desc: bdesc,
            // desc1: bdesc1,
            // desc2: bdesc2,
            mainImg: bmainImg,
            btnTxt: bbtnTxt,
            btnUrl: bbtnUrl,
          },
          section2: {
            subtitle: csubtitle,
            title: ctitle,
            desc: cdesc,
            // desc1: cdesc1,
            mainImg: cmainImg,
          },
          section3: {
            subtitle1: dsubtitle1,
            Title1: dTitle1,
            subtitle2: dsubtitle2,
            Title2: dTitle2,
            btnTxt: dbtnTxt,
            routes: droutes,
          },
          section4: {
            subTitle: esubtitle,
            Title: etitle,
            data: edata,
          },
          section5: {
            subtitle: fsubtitle,
            title: ftitle,
            data: fdata,
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
                  <Box
                    sx={{
                      display: 'grid',
                      columnGap: 2,
                      rowGap: 3,
                      gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                      padding: 5,
                    }}
                  >
                    <TextField
                      name="email"
                      label="Title"
                      value={atitle}
                      onChange={(e) => {
                        asettitle(e.target.value);
                      }}
                    />
                    <TextField
                      name="title"
                      label="Description"
                      value={adesc}
                      onChange={(e) => {
                        asetdesc(e.target.value);
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: 'grid',
                      columnGap: 2,
                      rowGap: 3,
                      gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                      padding: 5,
                    }}
                  >
                    <TextField
                      name="email"
                      label="Button Text"
                      value={abtnTxt}
                      onChange={(e) => {
                        asetbtnTxt(e.target.value);
                      }}
                    />
                    <TextField
                      name="email"
                      label="Button Routes"
                      value={abtnUrl}
                      onChange={(e) => {
                        asetbtnUrl(e.target.value);
                      }}
                    />
                  </Box>
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
                    <div style={{ padding: '0px 40px' }}>
                      <Box
                        sx={{
                          display: 'grid',
                          columnGap: 2,
                          rowGap: 3,
                          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                        }}
                      >
                        <TextField
                          name="email"
                          label="Sub Title"
                          style={{ width: '100%', marginTop: '24px' }}
                          value={bsubtitle}
                          onChange={(e) => {
                            bsetsubtitle(e.target.value);
                          }}
                        />
                        <TextField
                          name="email"
                          label="Title"
                          style={{ width: '100%', marginTop: '24px' }}
                          value={btitle}
                          onChange={(e) => {
                            bsettitle(e.target.value);
                          }}
                        />

                        <TextField
                          name="email"
                          label="Main image"
                          style={{ width: '100%', marginTop: '24px' }}
                          value={bmainImg}
                          onChange={(e) => {
                            bsetmainImg(e.target.value);
                          }}
                        />
                        <TextField
                          name="email"
                          label="Button Text"
                          style={{ width: '100%', marginTop: '24px' }}
                          value={bbtnTxt}
                          onChange={(e) => {
                            bsetbtnTxt(e.target.value);
                          }}
                        />
                        <TextField
                          name="email"
                          label="Main Url"
                          style={{ width: '100%', marginTop: '24px' }}
                          value={bbtnUrl}
                          onChange={(e) => {
                            bsetbtnUrl(e.target.value);
                          }}
                        />
                      </Box>
                      <h5>Description</h5>

                      <JoditEditor
                        value={bdesc}
                        config={editorConfig}
                        onChange={(value) => bsetdesc(value)}
                        style={{ width: '100%' }}
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
                  <h2>Section 2</h2>
                  <Grid item xs={12} md={12}>
                    <div style={{ padding: '0px 40px' }}>
                      <Box
                        sx={{
                          display: 'grid',
                          columnGap: 2,
                          rowGap: 3,
                          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                        }}
                      >
                        <TextField
                          name="email"
                          label="Title"
                          style={{ width: '100%', marginTop: '24px' }}
                          value={ctitle}
                          onChange={(e) => {
                            csettitle(e.target.value);
                          }}
                        />
                        <TextField
                          name="email"
                          label="Sub Title"
                          style={{ width: '100%', marginTop: '24px' }}
                          value={csubtitle}
                          onChange={(e) => {
                            csetsubtitle(e.target.value);
                          }}
                        />
                        <TextField
                          name="email"
                          label="Image"
                          style={{ width: '100%', marginTop: '24px' }}
                          value={cmainImg}
                          onChange={(e) => {
                            csetmainImg(e.target.value);
                          }}
                        />
                      </Box>
                      <h5>Description</h5>
                      <JoditEditor
                        value={cdesc}
                        config={editorConfig}
                        onChange={(value) => csetdesc(value)}
                        style={{ width: '100%' }}
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
                  <h2>Section 3</h2>
                  <Grid item xs={12} md={12}>
                    <div style={{ padding: '0px 40px' }}>
                      <TextField
                        name="email"
                        label="Title"
                        style={{ width: '100%', marginTop: '24px' }}
                        value={dTitle1}
                        onChange={(e) => {
                          dsetTitle1(e.target.value);
                        }}
                      />
                      <TextField
                        name="email"
                        label="Title 2"
                        style={{ width: '100%', marginTop: '24px' }}
                        value={dTitle2}
                        onChange={(e) => {
                          dsetTitle2(e.target.value);
                        }}
                      />
                      <TextField
                        name="email"
                        label="Sub title"
                        style={{ width: '100%', marginTop: '24px' }}
                        value={dsubtitle1}
                        onChange={(e) => {
                          dsetsubtitle1(e.target.value);
                        }}
                      />
                      <TextField
                        name="email"
                        label="Sub title 2"
                        style={{ width: '100%', marginTop: '24px' }}
                        value={dsubtitle2}
                        onChange={(e) => {
                          dsetsubtitle2(e.target.value);
                        }}
                      />
                      <TextField
                        name="email"
                        label="Button Text"
                        style={{ width: '100%', marginTop: '24px' }}
                        value={dbtnTxt}
                        onChange={(e) => {
                          dsetbtnTxt(e.target.value);
                        }}
                      />
                      <TextField
                        name="email"
                        label="Button Routes"
                        style={{ width: '100%', marginTop: '24px' }}
                        value={droutes}
                        onChange={(e) => {
                          dsetroutes(e.target.value);
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
                  <h2>Section 4</h2>
                  <Grid item xs={12} md={12}>
                    <div style={{ padding: '0px 40px' }}>
                      <TextField
                        name="email"
                        label="Title"
                        style={{ width: '100%', marginTop: '24px' }}
                        value={etitle}
                        onChange={(e) => {
                          esettitle(e.target.value);
                        }}
                      />
                      <TextField
                        name="email"
                        label="Sub title"
                        style={{ width: '100%', marginTop: '24px' }}
                        value={esubtitle}
                        onChange={(e) => {
                          esetsubtitle(e.target.value);
                        }}
                      />
                      {/* Map Data #1 */}
                      {edata.map((cardData, index) => {
                        return (
                          <>
                            <Divider style={{ marginTop: '20px' }} />
                            <Box
                              sx={{
                                display: 'grid',
                                columnGap: 2,
                                rowGap: 3,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                              }}
                            >
                              <TextField
                                name="email"
                                label={`Card Title ${index + 1}`}
                                style={{ width: '100%', marginTop: '24px' }}
                                value={cardData.title}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  let dta = [...edata];
                                  dta[index].title = value;
                                  esetdata(dta);
                                }}
                              />
                              <TextField
                                name="email"
                                label={`Card Image ${index + 1}`}
                                style={{ width: '100%', marginTop: '24px' }}
                                value={cardData.img}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  let dta = [...edata];
                                  dta[index].img = value;
                                  esetdata(dta);
                                }}
                              />
                              <TextField
                                name="email"
                                label={`Card Subtitle ${index + 1}`}
                                style={{ width: '100%', marginTop: '24px' }}
                                value={cardData.subTitle}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  let dta = [...edata];
                                  dta[index].subTitle = value;
                                  esetdata(dta);
                                }}
                              />
                            </Box>
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
                  <h2>Section 5</h2>
                  <Grid item xs={12} md={12}>
                    <div style={{ padding: '0px 40px' }}>
                      <TextField
                        name="email"
                        label="Title"
                        style={{ width: '100%', marginTop: '24px' }}
                        value={ftitle}
                        onChange={(e) => {
                          fsettitle(e.target.value);
                        }}
                      />
                      <TextField
                        name="email"
                        label="Sub title"
                        style={{ width: '100%', marginTop: '24px' }}
                        value={fsubtitle}
                        onChange={(e) => {
                          fsetsubtitle(e.target.value);
                        }}
                      />
                      {/* Map Data #1 */}
                      {fdata.map((cardData, index) => {
                        return (
                          <>
                            <Divider style={{ marginTop: '20px' }} />
                            <Box
                              sx={{
                                display: 'grid',
                                columnGap: 2,
                                rowGap: 3,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                              }}
                            >
                              <TextField
                                name="email"
                                label={`Card Title ${index + 1}`}
                                style={{ width: '100%', marginTop: '24px' }}
                                value={cardData.title}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  let dta = [...fdata];
                                  dta[index].title = value;
                                  fsetdata(dta);
                                }}
                              />
                              <TextField
                                name="email"
                                label={`Card Image ${index + 1}`}
                                style={{ width: '100%', marginTop: '24px' }}
                                value={cardData.img}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  let dta = [...fdata];
                                  dta[index].img = value;
                                  fsetdata(dta);
                                }}
                              />
                              <TextField
                                name="email"
                                label={`Card Subtitle ${index + 1}`}
                                style={{ width: '100%', marginTop: '24px' }}
                                value={cardData.subtitle}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  let dta = [...fdata];
                                  dta[index].subtitle = value;
                                  fsetdata(dta);
                                }}
                              />
                            </Box>
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

          {/* Update Button */}
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

export default OurStoryPageContent;
