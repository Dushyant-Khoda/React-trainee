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

const ServicePageContent = () => {
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
  const [bdata, bsetdata] = useState('');
  const [bbtnTxt, bsetbtnTxt] = useState('');
  const [bbtnRoutes, bsetbtnRoutes] = useState('');
  /* section2 */
  const [csubtitle, csetsubtitle] = useState('');
  const [ctitle, csettitle] = useState('');
  const [cdata, csetdata] = useState('');
  /* section3 */
  const [dsubtitle, dsetsubtitle] = useState('');
  const [dtitle, dsettitle] = useState('');
  const [dData, dsetData] = useState('');
  /* section4 */
  const [esubtitle, esetsubtitle] = useState('');
  const [etitle, esettitle] = useState('');
  const [eData, esetData] = useState('');
  const [emainBtn, esetmainBtn] = useState('');
  const [emainBtnRoute, esetmainBtnRoute] = useState('');
  const [emainImg, esetmainImg] = useState('');

  const [metaTitle, setMetaTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [metakeyword, setMetaKeyword] = useState('');

  const [addRecordLoader, setaddLoader] = useState(false);
  const [id, setid] = useState();
  // const [b, bset] = useState('');

  const setStateData = (data) => {
    /*  */
    asettitle(data.heroSection.title);
    asetdesc(data.heroSection.desc);
    asetbtnTxt(data.heroSection.btnTxt);
    asetbtnUrl(data.heroSection.btnUrl);
    asetmainImg(data.heroSection.mainImg);
    /*  */
    bsetsubtitle(data.section1.subtitle);
    bsettitle(data.section1.title);
    bsetdesc(data.section1.desc);
    bsetmainImg(data.section1.mainImg);
    bsetdata(data.section1.data);
    bsetbtnTxt(data.section1.btnTxt);
    bsetbtnRoutes(data.section1.routes);
    /*  */
    // csetdesc(data.section2.desc);
    // csetimg(data.section2.img);
    csetsubtitle(data.section2.subtitle);
    csettitle(data.section2.title);
    csetdata(data.section2.data);
    /*  */
    dsetsubtitle(data.section3.subtitle);
    dsettitle(data.section3.title);
    dsetData(data.section3.data);
    /*  */
    esetsubtitle(data.faqSection.subTitle);
    esettitle(data.faqSection.title);
    esetData(data.faqSection.texts);
    esetmainBtn(data.faqSection.mainBtn);
    esetmainBtnRoute(data?.faqSection?.mainBtnRoute);
    esetmainImg(data.faqSection.mainImg);

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

      const { data } = await axios.get(`${BASE_URL}content?page=ClinicsAccounting`, {
        headers: {
          authorization: `Bearer ${bearerToken}`,
        },
      });
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

    /* 
    atitle, adesc, abtnTxt, abtnUrl, amainImg, bsubtitle, btitle, bdesc, bmainImg, bdata, bbtnTxt, bbtnRoutes, csubtitle, ctitle, cdata, dsubtitle, dtitle, dData, esubtitle, etitle, eData, emainBtn, emainImg,     
    */
    const setFormData = {
      english: {
        pageTitle: 'ClinicsAccounting',
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
            mainImg: bmainImg,
            data: bdata,
            btnTxt: bbtnTxt,
            routes: bbtnRoutes,
          },
          section2: {
            subtitle: csubtitle,
            title: ctitle,
            data: cdata,
          },
          section3: {
            subtitle: dsubtitle,
            title: dtitle,
            data: dData,
          },
          faqSection: {
            subTitle: esubtitle,
            title: etitle,
            mainBtn: emainBtn,
            mainImg: emainImg,
            mainBtnRoutes: emainBtnRoute,
            texts: eData,
          },
          metaTags: {
            metaTitle,
            metaDesc,
            metakeyword,
          },
        },
      },
    };
    console.log('===========================================', setFormData);
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
                      <h5>Description</h5>
                      <JoditEditor
                        value={bdesc}
                        config={editorConfig}
                        onChange={(value) => bsetdesc(value)}
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
                        {/* <TextField
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

                        <TextField
                          name="email"
                          label="Button Text"
                          style={{ width: '100%' }}
                          value={bbtnTxt}
                          onChange={(e) => {
                            bsetbtnTxt(e.target.value);
                          }}
                        />
                        <TextField
                          name="email"
                          label="Button Routes"
                          style={{ width: '100%' }}
                          value={bbtnRoutes}
                          onChange={(e) => {
                            bsetbtnRoutes(e.target.value);
                          }}
                        />
                      </Box>
                      <h3>Card Data</h3>
                      {bdata?.map((cardData, index) => {
                        return (
                          <>
                            {index === 0 ? '' : <Divider style={{ marginTop: '18px' }} />}
                            <TextField
                              name="email"
                              label="Title"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.title}
                              onChange={(e) => {
                                let value = e.target.value;
                                let dta = [...bdata];
                                dta[index].title = value;
                                bsetdata(dta);
                                // csetdata(e.target.value);
                              }}
                            />

                            <TextField
                              name="email"
                              label="Image"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.img}
                              onChange={(e) => {
                                let value = e.target.value;
                                let dta = [...bdata];
                                dta[index].img = value;
                                bsetdata(dta);
                                // csetdata(e.target.value);
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
                          value={csubtitle}
                          onChange={(e) => {
                            csetsubtitle(e.target.value);
                          }}
                        />
                        <TextField
                          name="email"
                          label="Title"
                          style={{ width: '100%', marginTop: '24px' }}
                          value={ctitle}
                          onChange={(e) => {
                            csettitle(e.target.value);
                          }}
                        />
                      </Box>
                      <h3>Card Data</h3>
                      {cdata?.map((cardData, index) => {
                        return (
                          <>
                            {index === 0 ? '' : <Divider style={{ marginTop: '18px' }} />}
                            <TextField
                              name="email"
                              label="Title"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.title}
                              onChange={(e) => {
                                let value = e.target.value;
                                let dta = [...cdata];
                                dta[index].title = value;
                                csetdata(dta);
                                // csetdata(e.target.value);
                              }}
                            />
                            <TextField
                              name="email"
                              label="Description"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.desc}
                              onChange={(e) => {
                                let value = e.target.value;
                                let dta = [...cdata];
                                dta[index].desc = value;
                                csetdata(dta);
                                // csetdata(e.target.value);
                              }}
                            />
                            <TextField
                              name="email"
                              label="Image"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.img}
                              onChange={(e) => {
                                let value = e.target.value;
                                let dta = [...cdata];
                                dta[index].img = value;
                                csetdata(dta);
                                // csetdata(e.target.value);
                              }}
                            />
                            <TextField
                              name="email"
                              label="Button Text"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.btnTxt}
                              onChange={(e) => {
                                let value = e.target.value;
                                let dta = [...cdata];
                                dta[index].btnTxt = value;
                                csetdata(dta);
                                // csetdata(e.target.value);
                              }}
                            />
                            <TextField
                              name="email"
                              label="Button Routes"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData?.btnRoutes}
                              onChange={(e) => {
                                let value = e.target.value;
                                let dta = [...cdata];
                                dta[index].btnRoutes = value;
                                csetdata(dta);
                                // csetdata(e.target.value);
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
                      {dData.map((cardData, index) => {
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
                                label={`Card Image ${index + 1}`}
                                style={{ width: '100%', marginTop: '24px' }}
                                value={cardData.img}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  let dta = [...dData];
                                  dta[index].img = value;
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
                      <TextField
                        name="email"
                        label="Main Images Link"
                        style={{ width: '100%', marginTop: '24px' }}
                        value={emainImg}
                        onChange={(e) => {
                          esetmainImg(e.target.value);
                        }}
                      />
                      /*{' '}
                      <TextField
                        name="email"
                        label="Main button"
                        style={{ width: '100%', marginTop: '24px' }}
                        value={emainBtn}
                        onChange={(e) => {
                          esetmainBtn(e.target.value);
                        }}
                      />
                      <TextField
                        name="email"
                        label="Button Routes"
                        style={{ width: '100%', marginTop: '24px' }}
                        value={emainBtnRoute}
                        onChange={(e) => {
                          esetmainBtnRoute(e.target.value);
                        }}
                      />{' '}
                      */
                      {eData.map((cardData, index) => {
                        return (
                          <>
                            <Divider style={{ marginTop: '20px' }} />

                            <TextField
                              name="email"
                              label={` Question ${index + 1}`}
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.que}
                              onChange={(e) => {
                                let value = e.target.value;
                                let dta = [...eData];
                                dta[index].que = value;
                                esetData(dta);
                                // esetdata[index].title(e.target.value);
                              }}
                            />
                            <TextField
                              name="email"
                              label={`Answer ${index + 1}`}
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.ans}
                              onChange={(e) => {
                                let value = e.target.value;
                                let dta = [...eData];
                                dta[index].ans = value;
                                esetData(dta);
                                // esetdata[index].subTitle(e.target.value);
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

export default ServicePageContent;
