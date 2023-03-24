/* eslint-disable */
import { LoadingButton } from '@mui/lab';
import { Grid, TextField, Card, Box, CircularProgress, Divider } from '@mui/material';
// import { Box, Stack } from '@mui/system';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import LoadingAnimation from 'src/components/LoadingAnimation';

const FooterPageContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [homeContent, setHomeContent] = useState();
  const [addRecordLoader, setaddLoader] = useState(false);
  const [id, setid] = useState();
  // Context States

  const [atitle, setatitle] = useState('');
  const [asubtitle, setasubtitle] = useState('');
  const [adata, setadata] = useState('');

  const [btitle, setbtitle] = useState('');
  const [bdata, setbdata] = useState('');
  const [ctitle, setctitle] = useState('');
  const [cdata, setcdata] = useState('');
  const [dtitle, setdtitle] = useState('');
  const [ddata, setddata] = useState('');
  const [etitle, setetitle] = useState('');
  const [edata, setedata] = useState('');

  const [ftitle, setftitle] = useState('');
  const [fdata, setfdata] = useState('');
  // const [faddress1, setfaddress1] = useState('');
  // const [faddress2, setfaddress2] = useState('');
  // const [fmail, setfmail] = useState('');
  // const [fcontactnumber, setfcontactnumber] = useState('');

  const setStateData = (data) => {
    setatitle(data.title);
    setasubtitle(data.desc);
    setadata(data.socialsection);
    // setafacebooklink(data.mainTitle.facebooklink);
    // setainstalink(data.mainTitle.instalink);
    // setalinkdinlink(data.mainTitle.linkdinlink);
    setbtitle(data.section1.title);
    setbdata(data.section1.data);
    setctitle(data.section2.title);
    setcdata(data.section2.data);
    setdtitle(data.section3.title);
    setddata(data.section3.data);
    setetitle(data.section4.title);
    setedata(data.section4.data);
    setftitle(data.section5.title);
    setfdata(data.section5.data);
    // setfaddress1(data.contactSection.address1);
    // setfaddress2(data.contactSection.address2);
    // setfmail(data.contactSection.mail);
    // setfcontactnumber(data.contactSection.contactNo);
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

      const { data } = await axios.get(`${BASE_URL}content?page=footer`, {
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
        pageTitle: 'footer',
        content: {
          title: atitle,
          desc: asubtitle,
          socialsection: adata,
          section1: {
            title: btitle,
            data: bdata,
          },
          section2: {
            title: ctitle,
            data: cdata,
          },
          section3: {
            title: dtitle,
            data: ddata,
          },
          section4: {
            title: etitle,
            data: edata,
          },
          section5: {
            title: ftitle,
            data: fdata,
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
                <h2>Main Title</h2>
                <Grid item xs={12} md={12}>
                  <div style={{ padding: '0px 40px', display: 'flex', flexDirection: 'column' }}>
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
                        value={atitle}
                        style={{ margin: '10px' }}
                        onChange={(e) => {
                          setatitle(e.target.value);
                        }}
                      />
                      <TextField
                        name="email"
                        label="Subtitle"
                        value={asubtitle}
                        style={{ margin: '10px' }}
                        onChange={(e) => {
                          setasubtitle(e.target.value);
                        }}
                      />
                    </Box>
                    <h3>Social Section Data</h3>
                    {adata.map((cardData, index) => {
                      return (
                        <>
                          {index === 0 ? '' : <Divider style={{ marginTop: '18px' }} />}
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
                              value={cardData.title}
                              onChange={(e) => {
                                const value = e.target.value;
                                const dta = [...adata];
                                dta[index].title = value;
                                setadata(dta);
                              }}
                            />
                            <TextField
                              name="email"
                              label="Routes"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.routes}
                              onChange={(e) => {
                                const value = e.target.value;
                                const dta = [...adata];
                                dta[index].routes = value;
                                setadata(dta);
                              }}
                            />
                            <TextField
                              name="email"
                              label="Image Link"
                              style={{ width: '100%', marginTop: '24px' }}
                              value={cardData.img}
                              onChange={(e) => {
                                const value = e.target.value;
                                const dta = [...adata];
                                dta[index].img = value;
                                setadata(dta);
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

          <div style={{ marginTop: '50px' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ py: 2, px: 3 }}>
                  <h2>Company Section</h2>
                  <Grid item xs={12} md={12}>
                    <div style={{ padding: '0px 40px', display: 'flex', flexDirection: 'column' }}>
                      <TextField
                        name="sub_title"
                        label="Title"
                        value={btitle}
                        style={{ margin: '10px' }}
                        onChange={(e) => {
                          setbtitle(e.target.value);
                        }}
                      />

                      <h3>Company Data</h3>
                      {bdata.map((cardData, index) => {
                        return (
                          <>
                            {index === 0 ? '' : <Divider style={{ marginTop: '18px' }} />}
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
                                value={cardData.title}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  const dta = [...bdata];
                                  dta[index].title = value;
                                  setbdata(dta);
                                }}
                              />
                              <TextField
                                name="email"
                                label="Routes"
                                style={{ width: '100%', marginTop: '24px' }}
                                value={cardData.routes}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  const dta = [...bdata];
                                  dta[index].routes = value;
                                  setbdata(dta);
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
                  <h2>Service Section</h2>
                  <Grid item xs={12} md={12}>
                    <div style={{ padding: '0px 40px', display: 'flex', flexDirection: 'column' }}>
                      <TextField
                        name="sub_title"
                        label="Title"
                        value={ctitle}
                        style={{ margin: '10px' }}
                        onChange={(e) => {
                          setctitle(e.target.value);
                        }}
                      />

                      <h3>Service Data</h3>
                      {cdata.map((cardData, index) => {
                        return (
                          <>
                            {index === 0 ? '' : <Divider style={{ marginTop: '18px' }} />}
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
                                value={cardData.title}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  const dta = [...cdata];
                                  dta[index].title = value;
                                  setcdata(dta);
                                }}
                              />
                              <TextField
                                name="email"
                                label="Routes"
                                style={{ width: '100%', marginTop: '24px' }}
                                value={cardData.routes}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  const dta = [...cdata];
                                  dta[index].routes = value;
                                  setcdata(dta);
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
                  <h2>Industries Section</h2>
                  <Grid item xs={12} md={12}>
                    <div style={{ padding: '0px 40px', display: 'flex', flexDirection: 'column' }}>
                      <TextField
                        name="sub_title"
                        label="Title"
                        value={dtitle}
                        style={{ margin: '10px' }}
                        onChange={(e) => {
                          setdtitle(e.target.value);
                        }}
                      />

                      <h3>Industries Data</h3>
                      {ddata.map((cardData, index) => {
                        return (
                          <>
                            {index === 0 ? '' : <Divider style={{ marginTop: '18px' }} />}
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
                                value={cardData.title}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  const dta = [...ddata];
                                  dta[index].title = value;
                                  setddata(dta);
                                }}
                              />
                              <TextField
                                name="email"
                                label="Routes"
                                style={{ width: '100%', marginTop: '24px' }}
                                value={cardData.routes}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  const dta = [...ddata];
                                  dta[index].routes = value;
                                  setddata(dta);
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
                  <h2>Resources Section</h2>
                  <Grid item xs={12} md={12}>
                    <div style={{ padding: '0px 40px', display: 'flex', flexDirection: 'column' }}>
                      <TextField
                        name="sub_title"
                        label="Title"
                        value={etitle}
                        style={{ margin: '10px' }}
                        onChange={(e) => {
                          setetitle(e.target.value);
                        }}
                      />

                      <h3>Resources Data</h3>
                      {edata.map((cardData, index) => {
                        return (
                          <>
                            {index === 0 ? '' : <Divider style={{ marginTop: '18px' }} />}
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
                                value={cardData.title}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  const dta = [...edata];
                                  dta[index].title = value;
                                  setedata(dta);
                                }}
                              />
                              <TextField
                                name="email"
                                label="Routes"
                                style={{ width: '100%', marginTop: '24px' }}
                                value={cardData.routes}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  const dta = [...edata];
                                  dta[index].routes = value;
                                  setedata(dta);
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
                  <h2>Contact Section</h2>
                  <Grid item xs={12} md={12}>
                    <div style={{ padding: '0px 40px', display: 'flex', flexDirection: 'column' }}>
                      <TextField
                        name="sub_title"
                        label="Title"
                        value={ftitle}
                        style={{ margin: '10px' }}
                        onChange={(e) => {
                          setftitle(e.target.value);
                        }}
                      />
                      <h3>Social Section Data</h3>
                      {fdata.map((cardData, index) => {
                        return (
                          <>
                            {index === 0 ? '' : <Divider style={{ marginTop: '18px' }} />}
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
                                value={cardData.title}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  const dta = [...fdata];
                                  dta[index].title = value;
                                  setfdata(dta);
                                }}
                              />

                              <TextField
                                name="email"
                                label="Image Link"
                                style={{ width: '100%', marginTop: '24px' }}
                                value={cardData.img}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  const dta = [...fdata];
                                  dta[index].img = value;
                                  setfdata(dta);
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

export default FooterPageContent;
