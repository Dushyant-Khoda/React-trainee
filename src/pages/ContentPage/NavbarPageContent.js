/* eslint-disable */
import { LoadingButton } from '@mui/lab';
import { Grid, TextField, Card, Box, CircularProgress, Divider } from '@mui/material';
// import { Box, Stack } from '@mui/system';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import LoadingAnimation from 'src/components/LoadingAnimation';

const NavbarPageContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [homeContent, setHomeContent] = useState();
  const [addRecordLoader, setaddLoader] = useState(false);
  const [id, setid] = useState();
  // Context States

  const [home, sethome] = useState('');
  const [homeurl, sethomeUrl] = useState('');
  const [service, setservice] = useState('');
  const [serviceurl, setserviceUrl] = useState('');
  const [contact, setcontact] = useState('');
  const [contacturl, setcontactUrl] = useState('');

  const [about, setabout] = useState('');
  const [resources, setresources] = useState('');
  const [industries, setindustries] = useState('');

  const [aboutdata, setaboutdata] = useState('');
  const [resourcesdata, setresourcesdata] = useState('');
  const [industriesdata, setindustriesdata] = useState('');
  const [servicedata, setservicedata] = useState('');

  const [metaTitle, setMetaTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [metakeyword, setMetaKeyword] = useState('');

  const setStateData = (data) => {
    sethome(data.home);
    sethomeUrl(data.homeUrl);
    setservice(data.service);
    setserviceUrl(data.serviceUrl);
    setcontact(data.contact);
    setcontactUrl(data.contactUrl);
    setabout(data.about);
    setresources(data.resources);
    setindustries(data.industries);
    setaboutdata(data.aboutData);
    setservicedata(data.serviceData);
    setresourcesdata(data.ResourcesData);
    setindustriesdata(data.IndustriesData);

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

      const { data } = await axios.get(`${BASE_URL}content?page=navbar`, {
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
        pageTitle: 'navbar',
        content: {
          home,
          homeUrl: homeurl,
          about,
          service,
          industries,
          resources,
          aboutData: aboutdata,
          IndustriesData: industriesdata,
          serviceData: servicedata,
          ResourcesData: resourcesdata,
          contactUrl: contacturl,
          contact: contact,
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
                <h2>Single Url</h2>
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
                        label="Home Title"
                        value={home}
                        style={{ margin: '10px' }}
                        onChange={(e) => {
                          sethome(e.target.value);
                        }}
                      />
                      <TextField
                        name="email"
                        label="Home Routes"
                        value={homeurl}
                        style={{ margin: '10px' }}
                        onChange={(e) => {
                          sethomeUrl(e.target.value);
                        }}
                      />
                      {/*  <TextField
                        name="email"
                        label="Service Title"
                        value={service}
                        style={{ margin: '10px' }}
                        onChange={(e) => {
                          setservice(e.target.value);
                        }}
                      /> */}
                      {/*  <TextField
                        name="email"
                        label="Service Routes"
                        value={serviceurl}
                        style={{ margin: '10px' }}
                        onChange={(e) => {
                          setserviceUrl(e.target.value);
                        }}
                      /> */}
                      <TextField
                        name="email"
                        label="Contact Title"
                        value={contact}
                        style={{ margin: '10px' }}
                        onChange={(e) => {
                          setcontact(e.target.value);
                        }}
                      />
                      <TextField
                        name="email"
                        label="Contact Routes"
                        value={contacturl}
                        style={{ margin: '10px' }}
                        onChange={(e) => {
                          setcontactUrl(e.target.value);
                        }}
                      />
                    </Box>
                  </div>
                </Grid>
              </Card>
            </Grid>
          </Grid>

          <div style={{ marginTop: '50px' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ py: 2, px: 3 }}>
                  <h2> Services Section</h2>
                  <Grid item xs={12} md={12}>
                    <div style={{ padding: '0px 40px', display: 'flex', flexDirection: 'column' }}>
                      <TextField
                        name="email"
                        label="Service Title"
                        value={service}
                        style={{ margin: '10px' }}
                        onChange={(e) => {
                          setservice(e.target.value);
                        }}
                      />

                      <h3>Service Dropdown Data</h3>
                      {servicedata.map((cardData, index) => {
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
                                  const dta = [...servicedata];
                                  dta[index].title = value;
                                  setservicedata(dta);
                                }}
                              />
                              <TextField
                                name="email"
                                label="Routes"
                                style={{ width: '100%', marginTop: '24px' }}
                                value={cardData.url}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  const dta = [...servicedata];
                                  dta[index].url = value;
                                  setservicedata(dta);
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
                  <h2>About Navbar</h2>
                  <Grid item xs={12} md={12}>
                    <div style={{ padding: '0px 40px', display: 'flex', flexDirection: 'column' }}>
                      <TextField
                        name="sub_title"
                        label="Title"
                        value={about}
                        style={{ margin: '10px' }}
                        onChange={(e) => {
                          setabout(e.target.value);
                        }}
                      />

                      <h3>About Dropdown Data</h3>
                      {aboutdata.map((cardData, index) => {
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
                                  const dta = [...aboutdata];
                                  dta[index].title = value;
                                  setaboutdata(dta);
                                }}
                              />
                              <TextField
                                name="email"
                                label="Routes"
                                style={{ width: '100%', marginTop: '24px' }}
                                value={cardData.url}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  const dta = [...aboutdata];
                                  dta[index].url = value;
                                  setaboutdata(dta);
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
                  <h2>Industries Navbar</h2>
                  <Grid item xs={12} md={12}>
                    <div style={{ padding: '0px 40px', display: 'flex', flexDirection: 'column' }}>
                      <TextField
                        name="sub_title"
                        label="Title"
                        value={industries}
                        style={{ margin: '10px' }}
                        onChange={(e) => {
                          setindustries(e.target.value);
                        }}
                      />

                      <h3>Industries Dropdown Data</h3>
                      {industriesdata.map((cardData, index) => {
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
                                  const dta = [...industriesdata];
                                  dta[index].title = value;
                                  setaboutdata(dta);
                                }}
                              />
                              <TextField
                                name="email"
                                label="Routes"
                                style={{ width: '100%', marginTop: '24px' }}
                                value={cardData.url}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  const dta = [...industriesdata];
                                  dta[index].url = value;
                                  setaboutdata(dta);
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
                  <h2>Resources Navbar</h2>
                  <Grid item xs={12} md={12}>
                    <div style={{ padding: '0px 40px', display: 'flex', flexDirection: 'column' }}>
                      <TextField
                        name="sub_title"
                        label="Title"
                        value={resources}
                        style={{ margin: '10px' }}
                        onChange={(e) => {
                          setresources(e.target.value);
                        }}
                      />

                      <h3>Resources Dropdown Data</h3>
                      {resourcesdata.map((cardData, index) => {
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
                                  const dta = [...resourcesdata];
                                  dta[index].title = value;
                                  setaboutdata(dta);
                                }}
                              />
                              <TextField
                                name="email"
                                label="Routes"
                                style={{ width: '100%', marginTop: '24px' }}
                                value={cardData.url}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  const dta = [...resourcesdata];
                                  dta[index].url = value;
                                  setaboutdata(dta);
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

export default NavbarPageContent;
