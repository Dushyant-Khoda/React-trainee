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

const AccountPayAndReceivablesService = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [homeContent, setHomeContent] = useState();

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
  const [bmainImg, bsetmainImg] = useState('');
  /* section2 */
  const [cdesc, csetdesc] = useState('');
  const [cimg, csetimg] = useState('');
  const [cbtnTxt, csetbtnTxt] = useState('');
  const [cbtnRoutes, csetbtnRoutes] = useState('');
  /* section3 */
  const [dsubtitle, dsetsubtitle] = useState('');
  const [dtitle, dsettitle] = useState('');
  const [dData, dsetData] = useState('');
  /* section4 */
  const [esubtitle, esetsubtitle] = useState('');
  const [etitle, esettitle] = useState('');
  const [eData, esetData] = useState('');
  /* faqSection */
  const [fsubtitle, fsetsubtitle] = useState('');
  const [ftitle, fsettitle] = useState('');
  const [fData, fsetData] = useState('');
  const [fmainBtn, fsetmainBtn] = useState('');

  const [addRecordLoader, setaddLoader] = useState(false);
  const [id, setid] = useState();
  // const [b, bset] = useState('');

  const [metaTitle, setMetaTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [metakeyword, setMetaKeyword] = useState('');
  const setStateData = (data) => {
    /*  */
    // debugger;
    asettitle(data.herosection.title);
    asetdesc(data.herosection.desc);
    asetbtnTxt(data.herosection.btnTxt);
    asetbtnUrl(data.herosection.btnUrl);
    asetmainImg(data.herosection.mainImg);
    /*  */
    bsetsubtitle(data.section1.subtitle);
    bsettitle(data.section1.title);
    bsetdesc(data.section1.desc);
    bsetmainImg(data.section1.mainImg);
    /*  */
    csetdesc(data.section2.desc);
    csetimg(data.section2.img);
    csetbtnTxt(data?.section2?.btnTxt);
    csetbtnRoutes(data?.section2?.btnRoutes);

    /*  */
    dsetsubtitle(data.section3.subtitle);
    dsettitle(data.section3.title);
    dsetData(data.section3.data);
    /*  */
    esetsubtitle(data.section4.subtitle);
    esettitle(data.section4.title);
    esetData(data.section4.data);
    /*  */
    fsetsubtitle(data.faqSection.subtitle);
    fsettitle(data.faqSection.title);
    fsetmainBtn(data.faqSection.mainBtn);
    fsetData(data.faqSection.texts);

    // setMetaData(data?.metaTags?.data);
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

      const { data } = await axios.get(`${BASE_URL}content?page=VirtualAccountingServices`, {
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
        pageTitle: 'VirtualAccountingServices',
        content: {
          herosection: {
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
            mainImg: bmainImg,
          },
          section2: {
            desc: cdesc,
            img: cimg,
            btnTxt: cbtnTxt,
            btnRoutes: cbtnRoutes,
          },
          section3: {
            subtitle: dsubtitle,
            title: dtitle,
            data: dData,
          },
          section4: {
            subtitle: esubtitle,
            title: etitle,
            data: eData,
          },
          faqSection: {
            subTitle: fsubtitle,
            title: ftitle,
            mainBtn: fmainBtn,
            texts: fData,
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
                  <div style={{ padding: '0px 40px' }}>
                    <TextField
                      name="email"
                      style={{ width: '100%' }}
                      label="Main Image URL"
                      value={amainImg}
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
                        {/*    <TextField
                          name="email"
                          label="Description"
                          style={{ width: '100%', marginTop: '24px' }}
                          value={bdesc}
                          onChange={(e) => {
                            bsetdesc(e.target.value);
                          }}
                        /> */}
                        <TextField
                          name="email"
                          label="Main image"
                          style={{ width: '100%', marginTop: '24px' }}
                          value={bmainImg}
                          onChange={(e) => {
                            bsetmainImg(e.target.value);
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
                      <h5>Description</h5>
                      <JoditEditor
                        value={cdesc}
                        config={editorConfig}
                        onChange={(value) => csetdesc(value)}
                        style={{ width: '100%' }}
                      />
                      <Box
                        sx={{
                          display: 'grid',
                          columnGap: 2,
                          rowGap: 3,
                          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                        }}
                      >
                        {/* <TextField
                          name="email"
                          label="Description"
                          style={{ width: '100%', marginTop: '24px' }}
                          value={cdesc}
                          onChange={(e) => {
                            csetdesc(e.target.value);
                          }}
                        /> */}
                        <TextField
                          name="email"
                          label="Image"
                          style={{ width: '100%', marginTop: '24px' }}
                          value={cimg}
                          onChange={(e) => {
                            csetimg(e.target.value);
                          }}
                        />
                        <TextField
                          name="email"
                          label="Button Text"
                          style={{ width: '100%', marginTop: '24px' }}
                          value={cbtnTxt}
                          onChange={(e) => {
                            csetbtnTxt(e.target.value);
                          }}
                        />
                        <TextField
                          name="email"
                          label="Button Routes"
                          style={{ width: '100%', marginTop: '24px' }}
                          value={cbtnRoutes}
                          onChange={(e) => {
                            csetbtnRoutes(e.target.value);
                          }}
                        />
                      </Box>
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
                        value={dtitle}
                        onChange={(e) => {
                          dsettitle(e.target.value);
                        }}
                      />
                      <TextField
                        name="email"
                        label="Sub title"
                        style={{ width: '100%', marginTop: '24px' }}
                        value={dsubtitle}
                        onChange={(e) => {
                          dsetsubtitle(e.target.value);
                        }}
                      />
                      {dData?.map((cardData, index) => {
                        // debugger;
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
                                  let dta = [...dData];
                                  dta[index].title = value;
                                  dsetData(dta);
                                  // esetdata[index].title(e.target.value);
                                }}
                              />
                              <TextField
                                name="email"
                                label={`Card Description ${index + 1}`}
                                style={{ width: '100%', marginTop: '24px' }}
                                value={cardData.desc}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  let dta = [...dData];
                                  dta[index].desc = value;
                                  dsetData(dta);
                                  // esetdata[index].subTitle(e.target.value);
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
                      {eData.map((cardData, index) => {
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
                                  let dta = [...eData];
                                  dta[index].title = value;
                                  esetData(dta);
                                  // esetdata[index].title(e.target.value);
                                }}
                              />
                              <TextField
                                name="email"
                                label={`Card Image ${index + 1}`}
                                style={{ width: '100%', marginTop: '24px' }}
                                value={cardData.img}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  let dta = [...eData];
                                  dta[index].img = value;
                                  esetData(dta);
                                  // esetdata[index].subTitle(e.target.value);
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

          {/* FAQs */}
          <div style={{ marginTop: '50px' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ py: 2, px: 3 }}>
                  <h2>Frequently Asked Questions</h2>
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
                          value={ftitle}
                          onChange={(e) => {
                            fsettitle(e.target.value);
                          }}
                        />
                        <TextField
                          name="email"
                          label="Sub Title"
                          style={{ width: '100%', marginTop: '24px' }}
                          value={fsubtitle}
                          onChange={(e) => {
                            fsetsubtitle(e.target.value);
                          }}
                        />
                      </Box>
                      <TextField
                        name="email"
                        label="Main Button"
                        style={{ width: '100%', marginTop: '24px' }}
                        value={fmainBtn}
                        onChange={(e) => {
                          fsetmainBtn(e.target.value);
                        }}
                      />
                      {/* kcardData */}
                      <h3>Card Section </h3>
                      {fData.map((cardData, index) => {
                        // console.log(cardData, index);
                        return (
                          <>
                            <Divider style={{ marginTop: '20px' }} />
                            <TextField
                              name="email"
                              label={`Question ${index + 1}`}
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.que}
                              onChange={(e) => {
                                let value = e.target.value;
                                let dta = [...fData];
                                dta[index].que = value;
                                fsetData(dta);
                                // ksetcardData[index]?.que(e.target.value);
                              }}
                            />
                            <TextField
                              name="email"
                              label={`Answer`}
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.ans}
                              onChange={(e) => {
                                let value = e.target.value;
                                let dta = [...fData];
                                dta[index].ans = value;
                                fsetData(dta);
                                // ksetcardData[index]?.ans(e.target.value);
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

export default AccountPayAndReceivablesService;
