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

const HomePageContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [homeContent, setHomeContent] = useState();

  // Context States

  /* Hero Section  */
  const [asubtitle1, asetsubtitle1] = useState('');
  const [atitle, asettitle] = useState('');
  const [asubTitle, asetsubTitle] = useState('');
  const [abtnTxt, asetbtnTxt] = useState('');
  const [abtnUrl, asetbtnUrl] = useState('');
  const [amainImg, asetmainImg] = useState('');
  /*Section 1  */
  const [bmainTitle, bsetmainTitle] = useState('');
  const [btitle, bsettitle] = useState('');
  const [bmain_images, bsetmain_images] = useState('');
  // map1
  const [bimgData, bsetimgData] = useState('');
  /*Section 2  */
  const [cmainTitle, csetmainTitle] = useState('');
  const [ctitle, csettitle] = useState('');
  const [cmain_images, csetmain_images] = useState('');
  // map1
  const [cimgData, csetimgData] = useState('');
  /*dynamicHeading  */
  const [dtitle, dsettitle] = useState('');
  const [dbtnTxt, dsetbtnTxt] = useState('');
  const [dbtnUrl, dsetbtnUrl] = useState('');
  /*serviceSection  */
  const [esubtitle, esetsubtitle] = useState('');
  const [etitle, esettitle] = useState('');
  const [edata, esetdata] = useState('');
  /*companyChoose  */
  const [fsubtitle, fsetsubtitle] = useState('');
  const [ftitle, fsettitle] = useState('');
  const [flastDesc, fsetlastDesc] = useState('');
  const [fbtnTxt, fsetbtnTxt] = useState('');
  const [fbtnUrl, fsetbtnUrl] = useState('');
  const [fmainImg, fsetmainImg] = useState('');
  const [fdata, fsetdata] = useState('');
  /*SliderSection1  */
  const [gsubtitle, gsetsubtitle] = useState('');
  const [gtitle, gsettitle] = useState('');
  const [gimgData, gsetimgData] = useState('');
  const [gcardData, gsetcardData] = useState('');
  /*workSection  */
  const [hsubtitle, hsetsubtitle] = useState('');
  const [htitle, hsettitle] = useState('');
  const [hdesc, hsetdesc] = useState('');
  const [hdesc2, hsetdesc2] = useState('');
  const [hmainImg, hsetmainImg] = useState('');
  const [hcontent, hsetcontent] = useState('');
  const [hcontent2, hsetcontent2] = useState('');
  const [hcontenttitle, hsetcontenttitle] = useState('');
  const [hbtn2Txt, hsetbtn2Txt] = useState('');
  const [hbtnTxt, hsetbtnTxt] = useState('');
  const [hbtnRoutes, hsetbtnRoutes] = useState('');
  /*section3  */
  const [ibtnTitle, isetbtnTitle] = useState('');
  const [ibtnRoutes, isetbtnRoutes] = useState('');
  const [isoftTxt, isetsoftTxt] = useState('');
  const [ititle, isettitle] = useState('');
  const [iData, isetData] = useState('');
  /*latestResource  */
  const [jsubtitle, jsetsubtitle] = useState('');
  const [jtitle, jsettitle] = useState('');
  const [jcardData, jsetcardData] = useState('');
  /*Faq  */
  const [ksubtitle, ksetsubtitle] = useState('');
  const [ktitle, ksettitle] = useState('');
  const [kmainBtn, ksetmainBtn] = useState('');
  const [kcardData, ksetcardData] = useState('');
  const [kmainBtnRoute, ksetmainBtnRoute] = useState('');

  const [metaTitle, setMetaTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [metakeyword, setMetaKeyword] = useState('');

  const [addRecordLoader, setaddLoader] = useState(false);
  const [id, setid] = useState();
  // const [b, bset] = useState('');

  const setStateData = (data) => {
    // Hero Section
    asetsubtitle1(data?.heroSection?.subtitle1);
    asettitle(data?.heroSection?.title);
    asetsubTitle(data?.heroSection?.subTitle);
    asetbtnTxt(data?.heroSection?.btnTxt);
    asetbtnUrl(data?.heroSection?.btnUrl);
    asetmainImg(data?.heroSection?.mainImg);
    // section1
    bsetmainTitle(data?.section1?.mainTitle);
    bsettitle(data?.section1?.title);
    bsetmain_images(data?.section1?.main_images);
    bsetimgData(data?.section1?.data);

    // section2
    csetmainTitle(data?.section2?.mainTitle);
    csettitle(data?.section2?.title);
    csetmain_images(data?.section2?.main_images);
    csetimgData(data?.section2?.data);

    //
    dsettitle(data?.dynamicHeading?.title);
    dsetbtnTxt(data?.dynamicHeading?.btnTxt);
    dsetbtnUrl(data?.dynamicHeading?.btnRoutes);

    //
    esetsubtitle(data?.serviceSection?.subtitle);
    esettitle(data?.serviceSection?.title);
    esetdata(data?.serviceSection?.data);

    //
    fsetsubtitle(data?.companyChoose?.subtitle);
    fsettitle(data?.companyChoose?.title);
    fsetlastDesc(data?.companyChoose?.lastDesc);
    fsetbtnTxt(data?.companyChoose?.btnTxt);
    fsetbtnUrl(data?.companyChoose?.btnUrl);
    fsetmainImg(data?.companyChoose?.mainImg);
    // fsetdata(data?.companyChoose?.data);

    //
    gsetsubtitle(data?.SliderSection1?.subtitle);
    gsettitle(data?.SliderSection1?.title);
    gsetimgData(data?.SliderSection1?.imgData);
    gsetcardData(data?.SliderSection1?.cardData);

    //
    hsetsubtitle(data?.workSection?.subtitle);
    hsettitle(data?.workSection?.title);
    hsetdesc(data?.workSection?.desc);
    hsetdesc2(data?.workSection?.desc2);
    hsetmainImg(data?.workSection?.mainImg);
    hsetcontent(data?.workSection?.contents[0]);
    hsetcontent2(data?.workSection?.contents[1]);
    hsetcontenttitle(data?.workSection?.contentTitle); // new state
    hsetbtn2Txt(data?.workSection?.btn2Txt);
    hsetbtnTxt(data?.workSection?.btnTxt);
    hsetbtnRoutes(data?.workSection?.btnRoutes);

    //
    isetbtnTitle(data?.section3?.btnTitle);
    isetsoftTxt(data?.section3?.softTxt);
    isettitle(data?.section3?.title);
    isetData(data?.section3?.imgData);
    //
    jsetsubtitle(data?.latestResource?.subtitle);
    jsettitle(data?.latestResource?.title);
    jsetcardData(data?.latestResource?.card);
    //
    ksetsubtitle(data?.Faq?.subTitle);
    ksettitle(data?.Faq?.title);
    ksetmainBtn(data?.Faq?.mainBtn);
    ksetcardData(data?.Faq?.texts);
    ksetmainBtnRoute(data?.faqSection?.mainBtnRoute);

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

      const { data } = await axios.get(`${BASE_URL}content?page=home`, {
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
        pageTitle: 'HomePageContent',
        content: {
          heroSection: {
            subtitle1: asubtitle1,
            title: atitle,
            subTitle: asubTitle,
            btnTxt: abtnTxt,
            btnUrl: abtnUrl,
            mainImg: amainImg,
          },
          section1: {
            mainTitle: bmainTitle,
            title: btitle,
            main_images: bmain_images,
            data: bimgData,
          },
          section2: {
            mainTitle: cmainTitle,
            title: ctitle,
            main_images: cmain_images,
            data: cimgData,
          },
          dynamicHeading: {
            title: dtitle,
            btnTxt: dbtnTxt,
            btnRoutes: dbtnUrl,
          },
          serviceSection: {
            subtitle: esubtitle,
            title: etitle,
            data: edata,
          },
          companyChoose: {
            subtitle: fsubtitle,
            title: ftitle,
            lastDesc: flastDesc,
            btnTxt: fbtnTxt,
            btnUrl: fbtnUrl,
            mainImg: fmainImg,
            // data: fdata,
          },
          SliderSection1: {
            subtitle: gsubtitle,
            title: gtitle,
            imgData: gimgData,
            cardData: gcardData,
          },
          workSection: {
            subtitle: hsubtitle,
            title: htitle,
            desc: hdesc,
            mainImg: hmainImg,
            contents: [hcontent, hcontent2],
            contentTitle: hcontenttitle,
            btn2Txt: hbtn2Txt,
            btnTxt: hbtnTxt,
            btnRoutes: hbtnRoutes,
          },
          section3: {
            btnTitle: ibtnTitle,
            btnRoutes: ibtnRoutes,
            softTxt: isoftTxt,
            title: ititle,
            imgData: iData,
          },
          latestResource: {
            subtitle: jsubtitle,
            title: jtitle,
            card: jcardData,
          },
          Faq: {
            subTitle: ksubtitle,
            title: ktitle,
            mainBtn: kmainBtn,
            mainBtnRoutes: kmainBtnRoute,
            texts: kcardData,
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
                      label="Sub Title #1"
                      value={asubtitle1}
                      onChange={(e) => {
                        asetsubtitle1(e.target.value);
                      }}
                    />
                    <TextField
                      name="title"
                      label="Title"
                      value={atitle}
                      onChange={(e) => {
                        asettitle(e.target.value);
                      }}
                    />
                  </Box>

                  <div style={{ padding: '0px 40px' }}>
                    <TextField
                      name="email"
                      label="Sub Title"
                      style={{ width: '100%' }}
                      value={asubTitle}
                      multiline
                      rows={4}
                      onChange={(e) => {
                        asetsubTitle(e.target.value);
                      }}
                    />
                  </div>
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
                          label="Main Title"
                          style={{ width: '100%', marginTop: '24px' }}
                          value={bmainTitle}
                          onChange={(e) => {
                            bsetmainTitle(e.target.value);
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
                      </Box>
                      <TextField
                        name="email"
                        label="Main Images"
                        style={{ width: '100%', marginTop: '24px' }}
                        value={bmain_images}
                        onChange={(e) => {
                          bsetmain_images(e.target.value);
                        }}
                      />
                      <h3>Image Data</h3>
                      {bimgData.map((cardData, index) => {
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
                                defaultValue={cardData.title}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  let dta = [...bimgData];
                                  dta[index].title = value;
                                  bsetimgData(dta);
                                }}
                              />
                              <TextField
                                name="email"
                                label={`Card Image ${index + 1}`}
                                style={{ width: '100%', marginTop: '24px' }}
                                defaultValue={cardData.img}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  let dta = [...bimgData];
                                  dta[index].img = value;
                                  bsetimgData(dta);
                                }}
                              />
                              <TextField
                                name="email"
                                label={`Card Subtitle ${index + 1}`}
                                style={{ width: '100%' }}
                                defaultValue={cardData.subTitle}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  let dta = [...bimgData];
                                  dta[index].subTitle = value;
                                  bsetimgData(dta);
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
                          label="Main Title"
                          style={{ width: '100%', marginTop: '24px' }}
                          value={cmainTitle}
                          onChange={(e) => {
                            csetmainTitle(e.target.value);
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
                      <TextField
                        name="email"
                        label="Main Images"
                        style={{ width: '100%', marginTop: '24px' }}
                        value={cmain_images}
                        onChange={(e) => {
                          csetmain_images(e.target.value);
                        }}
                      />
                      <h3>Image Data</h3>
                      {cimgData.map((cardData, index) => {
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
                                defaultValue={cardData.title}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  let dta = [...cimgData];
                                  dta[index].title = value;
                                  csetimgData(dta);
                                }}
                              />
                              <TextField
                                name="email"
                                label={`Image ${index + 1}`}
                                style={{ width: '100%', marginTop: '24px' }}
                                defaultValue={cardData.img}
                                onChange={(e) => {
                                  console.log(cardData, cimgData);
                                  let value = e.target.value;
                                  let dta = [...cimgData];
                                  dta[index].img = value;
                                  csetimgData(dta);
                                  // csetimgData[index].img(e.target.value);
                                }}
                              />
                              <TextField
                                name="email"
                                label={`Sub Title ${index + 1}`}
                                style={{ width: '100%' }}
                                defaultValue={cardData.subTitle}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  let dta = [...cimgData];
                                  dta[index].subTitle = value;
                                  csetimgData(dta);
                                  // csetimgData[index].subTitle(e.target.value);
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
                  <h2>Dynamic Heading</h2>
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
                          value={dbtnUrl}
                          onChange={(e) => {
                            dsetbtnUrl(e.target.value);
                          }}
                        />
                      </Box>
                    </div>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </div>

          {/* Service Section */}
          <div style={{ marginTop: '50px' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ py: 2, px: 3 }}>
                  <h2>Service Section</h2>
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
                          value={esubtitle}
                          onChange={(e) => {
                            esetsubtitle(e.target.value);
                          }}
                        />
                      </Box>
                      <h3>Card Section Data</h3>
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
                                  // esetdata[index].title(e.target.value);
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
                                  // esetdata[index].subTitle(e.target.value);
                                }}
                              />
                              <TextField
                                name="email"
                                label={`Card Image ${index + 1}`}
                                style={{ width: '100%' }}
                                value={cardData.img}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  let dta = [...edata];
                                  dta[index].img = value;
                                  esetdata(dta);
                                  // esetdata[index].img(e.target.value);
                                }}
                              />
                              <TextField
                                name="email"
                                label={`Card Button Text ${index + 1}`}
                                style={{ width: '100%' }}
                                value={cardData.btnTxt}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  let dta = [...edata];
                                  dta[index].btnTxt = value;
                                  esetdata(dta);
                                  // esetdata[index].btnTxt(e.target.value);
                                }}
                              />
                              <TextField
                                name="email"
                                label={`Card Button Routes ${index + 1}`}
                                style={{ width: '100%' }}
                                value={cardData?.btnRoutes}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  let dta = [...edata];
                                  dta[index].btnRoutes = value;
                                  esetdata(dta);
                                  // esetdata[index].btnTxt(e.target.value);
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

          {/* Choose Company */}

          <div style={{ marginTop: '50px' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ py: 2, px: 3 }}>
                  <h2>Company Section</h2>
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
                        label="Sub Title"
                        value={fsubtitle}
                        onChange={(e) => {
                          fsetsubtitle(e.target.value);
                        }}
                      />
                      <TextField
                        name="title"
                        label="Title"
                        value={ftitle}
                        onChange={(e) => {
                          fsettitle(e.target.value);
                        }}
                      />
                    </Box>
                    <div style={{ padding: '0px 40px' }}>
                      <h4>Description</h4>
                      {/*  <TextField
                        name="email"
                        label="Last Description"
                        style={{ width: '100%' }}
                        value={flastDesc}
                        multiline
                        rows={4}
                        onChange={(e) => {
                          fsetlastDesc(e.target.value);
                        }} /> */}
                      <JoditEditor
                        value={flastDesc}
                        config={editorConfig}
                        onChange={(value) => fsetlastDesc(value)}
                        style={{ width: '100%' }}
                      />
                    </div>
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
                        value={fbtnTxt}
                        onChange={(e) => {
                          fsetbtnTxt(e.target.value);
                        }}
                      />
                      <TextField
                        name="email"
                        label="Button Routes"
                        value={fbtnUrl}
                        onChange={(e) => {
                          fsetbtnUrl(e.target.value);
                        }}
                      />
                    </Box>
                    <div style={{ padding: '0px 40px' }}>
                      <TextField
                        name="email"
                        style={{ width: '100%' }}
                        label="Main Image URL"
                        value={fmainImg}
                        onChange={(e) => {
                          fsetmainImg(e.target.value);
                        }}
                      />

                      {/* <h3>Icon Section Data</h3>
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
                                label={`Icon Image ${index + 1}`}
                                style={{ width: '100%', marginTop: '24px' }}
                                value={cardData.icon}
                                onChange={(e) => {
                                  // fsetdata[index].icon(e.target.value);
                                  let value = e.target.value;
                                  let dta = [...fdata];
                                  dta[index].icon = value;
                                  fsetdata(dta);
                                }}
                              />
                              <TextField
                                name="email"
                                label={`Icon Title ${index + 1}`}
                                style={{ width: '100%', marginTop: '24px' }}
                                value={cardData.txt}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  let dta = [...fdata];
                                  dta[index].txt = value;
                                  fsetdata(dta);
                                  // fsetdata[index].txt(e.target.value);
                                }}
                              />
                            </Box>
                          </>
                        );
                      })} */}
                    </div>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </div>

          {/* Slider Section */}
          <div style={{ marginTop: '50px' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ py: 2, px: 3 }}>
                  <h2>Slider Section</h2>
                  <Grid item xs={12} md={12}>
                    <div style={{ padding: '0px 40px' }}>
                      <TextField
                        name="email"
                        label="Title"
                        style={{ width: '100%', marginTop: '24px' }}
                        value={gtitle}
                        onChange={(e) => {
                          gsettitle(e.target.value);
                        }}
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
                          value={gsubtitle}
                          onChange={(e) => {
                            gsetsubtitle(e.target.value);
                          }}
                        />
                      </Box>
                      <h3>Image Section </h3>

                      {gimgData.map((cardData, index) => {
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
                                value={cardData.url}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  let dta = [...gimgData];
                                  dta[index].url = value;
                                  gsetimgData(dta);
                                  // gsetimgData[index].url(e.target.value);
                                }}
                              />
                            </Box>
                          </>
                        );
                      })}

                      <h3>Card Section Data</h3>
                      {gcardData.map((cardData, index) => {
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
                                label={`Title ${index + 1}`}
                                style={{ width: '100%', marginTop: '24px' }}
                                value={cardData.title}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  let dta = [...gcardData];
                                  dta[index].title = value;
                                  gsetcardData(dta);

                                  // gsetcardData[index].title(e.target.value);
                                }}
                              />
                              <TextField
                                name="email"
                                label={`Author Name ${index + 1}`}
                                style={{ width: '100%', marginTop: '24px' }}
                                value={cardData.author}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  let dta = [...gcardData];
                                  dta[index].author = value;
                                  gsetcardData(dta);
                                  // gsetcardData[index].author(e.target.value);
                                }}
                              />
                              <TextField
                                name="email"
                                label={`Profession ${index + 1}`}
                                style={{ width: '100%', marginTop: '24px' }}
                                value={cardData.profession}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  let dta = [...gcardData];
                                  dta[index].profession = value;
                                  gsetcardData(dta);
                                  // gsetcardData[index].profession(e.target.value);
                                }}
                              />
                              <TextField
                                name="email"
                                label={`Author Image ${index + 1}`}
                                style={{ width: '100%', marginTop: '24px' }}
                                value={cardData.img}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  let dta = [...gcardData];
                                  dta[index].img = value;
                                  gsetcardData(dta);
                                  // gsetcardData[index].img(e.target.value);
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

          {/* Work Section */}
          <div style={{ marginTop: '50px' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ py: 2, px: 3 }}>
                  <h2>Work Section</h2>
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
                        label="Sub Title"
                        value={hsubtitle}
                        onChange={(e) => {
                          hsetsubtitle(e.target.value);
                        }}
                      />
                      <TextField
                        name="title"
                        label="Title"
                        value={htitle}
                        onChange={(e) => {
                          hsettitle(e.target.value);
                        }}
                      />
                    </Box>

                    <div style={{ padding: '0px 40px' }}>
                      {/*  <TextField
                        name="email"
                        label="Description"
                        style={{ width: '100%' }}
                        value={hdesc}
                        multiline
                        rows={4}
                        onChange={(e) => {
                          hsetdesc(e.target.value);
                        }}
                      /> */}
                      <h4>Description</h4>
                      <JoditEditor
                        value={hdesc}
                        config={editorConfig}
                        onChange={(value) => hsetdesc(value)}
                        style={{ width: '100%' }}
                      />
                    </div>

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
                        label="Main Button Text"
                        value={hbtnTxt}
                        onChange={(e) => {
                          hsetbtnTxt(e.target.value);
                        }}
                      />
                      <TextField
                        name="email"
                        label="Main Button Route"
                        value={hbtnRoutes}
                        onChange={(e) => {
                          hsetbtnRoutes(e.target.value);
                        }}
                      />
                      {/* <TextField
                        name="email"
                        label="Card Button Text"
                        value={hbtn2Txt}
                        onChange={(e) => {
                          hsetbtn2Txt(e.target.value);
                        }}
                      />
                      <TextField
                        name="email"
                        label="Content 1"
                        value={hcontent}
                        onChange={(e) => {
                          hsetcontent(e.target.value);
                        }}
                      />
                      <TextField
                        name="email"
                        label="Content 2"
                        value={hcontent2}
                        onChange={(e) => {
                          hsetcontent2(e.target.value);
                        }}
                      />
                      <TextField
                        name="email"
                        label="Content Title"
                        value={hcontenttitle}
                        onChange={(e) => {
                          hsetcontenttitle(e.target.value);
                        }}
                      /> */}
                    </Box>
                    <div style={{ padding: '0px 40px' }}>
                      <TextField
                        name="email"
                        style={{ width: '100%' }}
                        label="Main Image URL"
                        value={hmainImg}
                        onChange={(e) => {
                          hsetmainImg(e.target.value);
                        }}
                      />
                      <TextField
                        name="email"
                        label="Main Section Button Text"
                        style={{ width: '100%', marginTop: '24px' }}
                        value={ibtnTitle}
                        onChange={(e) => {
                          isetbtnTitle(e.target.value);
                        }}
                      />
                      <TextField
                        name="email"
                        label="Main Section Button Routes "
                        style={{ width: '100%', marginTop: '24px' }}
                        value={ibtnRoutes}
                        onChange={(e) => {
                          isetbtnRoutes(e.target.value);
                        }}
                      />
                    </div>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </div>

          {/* Section 3 */}
          <div style={{ marginTop: '50px' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ py: 2, px: 3 }}>
                  <h2>Section 3</h2>
                  <Grid item xs={12} md={12}>
                    <div>
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
                          value={ititle}
                          onChange={(e) => {
                            isettitle(e.target.value);
                          }}
                        />
                        <TextField
                          name="email"
                          label="Soft Text"
                          style={{ width: '100%', marginTop: '24px' }}
                          value={isoftTxt}
                          onChange={(e) => {
                            isetsoftTxt(e.target.value);
                          }}
                        />
                      </Box>
                    </div>
                    <h3>Image Section </h3>
                    {iData.map((cardData, index) => {
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
                                let dta = [...iData];
                                dta[index].title = value;
                                isetData(dta);
                                // isetData[index].title(e.target.value);
                              }}
                            />
                            <TextField
                              name="email"
                              label={`Image`}
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.img}
                              onChange={(e) => {
                                let value = e.target.value;
                                let dta = [...iData];
                                dta[index].img = value;
                                isetData(dta);
                                // isetData[index].img(e.target.value);
                              }}
                            />
                          </Box>
                        </>
                      );
                    })}
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </div>

          {/* Latest Resources */}
          <div style={{ marginTop: '50px' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ py: 2, px: 3 }}>
                  <h2>Latest Resources</h2>
                  <Grid item xs={12} md={12}>
                    <div style={{ padding: '0px 40px' }}>
                      <TextField
                        name="email"
                        label="Title"
                        style={{ width: '100%', marginTop: '24px' }}
                        value={jtitle}
                        onChange={(e) => {
                          jsettitle(e.target.value);
                        }}
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
                          value={jsubtitle}
                          onChange={(e) => {
                            jsetsubtitle(e.target.value);
                          }}
                        />
                      </Box>
                      <h3>Card Section </h3>
                      {jcardData.map((cardData, index) => {
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
                                  let dta = [...jcardData];
                                  dta[index].title = value;
                                  jsetcardData(dta);
                                  // jsetcardData[index].title(e.target.value);
                                }}
                              />
                              <TextField
                                name="email"
                                label={`Card Category`}
                                style={{ width: '100%', marginTop: '24px' }}
                                value={cardData.categories[0]}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  let dta = [...jcardData];
                                  dta[index].categories[0] = value;
                                  jsetcardData(dta);
                                  // jsetcardData[index].categories[0](e.target.value);
                                }}
                              />
                              <TextField
                                name="email"
                                label={`Card Category`}
                                style={{ width: '100%' }}
                                value={cardData.categories[1]}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  let dta = [...jcardData];
                                  dta[index].categories[1] = value;
                                  jsetcardData(dta);
                                  // jsetcardData[index].categories[1](e.target.value);
                                }}
                              />

                              <TextField
                                name="email"
                                label={`Button Text`}
                                style={{ width: '100%' }}
                                value={cardData.btnTxt}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  let dta = [...jcardData];
                                  dta[index].btnTxt = value;
                                  jsetcardData(dta);
                                  // jsetcardData[index].btnTxt(e.target.value);
                                }}
                              />
                              <TextField
                                name="email"
                                label={`Download Button Text`}
                                style={{ width: '100%' }}
                                value={cardData.mainBtn}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  let dta = [...jcardData];
                                  dta[index].mainBtn = value;
                                  jsetcardData(dta);
                                  // jsetcardData[index].mainBtn(e.target.value);
                                }}
                              />
                              <TextField
                                name="email"
                                label={`Button Routes`}
                                style={{ width: '100%' }}
                                value={cardData.btnUrl}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  let dta = [...jcardData];
                                  dta[index].btnUrl = value;
                                  jsetcardData(dta);
                                  // jsetcardData[index].btnUrl(e.target.value);
                                }}
                              />
                              <TextField
                                name="email"
                                label={`Download Button Routes`}
                                style={{ width: '100%' }}
                                value={cardData.downloadUrl}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  let dta = [...jcardData];
                                  dta[index].downloadUrl = value;
                                  jsetcardData(dta);
                                  // jsetcardData[index].btnUrl(e.target.value);
                                }}
                              />
                              <TextField
                                name="email"
                                label={`Show Download`}
                                style={{ width: '100%' }}
                                value={cardData.isDownloadShown}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  let dta = [...jcardData];
                                  dta[index].isDownloadShown = value;
                                  jsetcardData(dta);
                                  // jsetcardData[index].isDownloadShown(e.target.value);
                                }}
                              />
                            </Box>
                            <TextField
                              name="email"
                              label={`Description`}
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.desc}
                              multiline
                              rows={4}
                              onChange={(e) => {
                                let value = e.target.value;
                                let dta = [...jcardData];
                                dta[index].desc = value;
                                jsetcardData(dta);
                                // jsetcardData[index].desc(e.target.value);
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
                          value={ktitle}
                          onChange={(e) => {
                            ksettitle(e.target.value);
                          }}
                        />
                        <TextField
                          name="email"
                          label="Sub Title"
                          style={{ width: '100%', marginTop: '24px' }}
                          value={ksubtitle}
                          onChange={(e) => {
                            ksetsubtitle(e.target.value);
                          }}
                        />
                      </Box>
                      <TextField
                        name="email"
                        label="Main Button"
                        style={{ width: '100%', marginTop: '24px' }}
                        value={kmainBtn}
                        onChange={(e) => {
                          ksetmainBtn(e.target.value);
                        }}
                      />
                      <TextField
                        name="email"
                        label="Main Button Routes"
                        style={{ width: '100%', marginTop: '24px' }}
                        value={kmainBtnRoute}
                        onChange={(e) => {
                          ksetmainBtnRoute(e.target.value);
                        }}
                      />
                      {/* kcardData */}
                      <h3>Card Section </h3>
                      {kcardData.map((cardData, index) => {
                        console.log(cardData, index);
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
                                let dta = [...kcardData];
                                dta[index].que = value;
                                ksetcardData(dta);
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
                                let dta = [...kcardData];
                                dta[index].ans = value;
                                ksetcardData(dta);
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

export default HomePageContent;
