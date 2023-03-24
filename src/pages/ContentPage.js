import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
// @mui
import { Container, Typography, Box, Card, Stack, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
// mock

import Iconify from '../components/iconify';

// ----------------------------------------------------------------------

export default function ActivityPage() {
  const icon = (icon, customWidth = 100, customHeight = 100) => (
    <Iconify icon={icon} width={customWidth} height={customHeight} />
  );

  const PageData = [
    {
      title: 'Home Page',
      url: 'home',
    },
    {
      title: 'Service Page',
      url: 'service',
    },
    {
      title: 'Contact Page',
      url: 'contact',
    },
    {
      title: 'Industries Page',
      url: 'industries',
    },
    {
      title: 'Casestudies Page',
      url: 'casestudy',
    },
    {
      title: 'Infographics Page',
      url: 'infographics',
    },
    {
      title: 'Checklist Page',
      url: 'checklist',
    },
    {
      title: 'Ebook',
      url: 'ebook',
    },
    {
      title: 'Our Story',
      url: 'ourstory',
    },
    {
      title: 'FAQs Page',
      url: 'faq',
    },
    {
      title: 'Become A Partner Page',
      url: 'partner',
    },
    {
      title: 'Carrier',
      url: 'carrier',
    },
    {
      title: 'Blog Page',
      url: 'blog',
    },
    {
      title: 'Navbar',
      url: 'navbar',
    },
    {
      title: 'Footer',
      url: 'footer',
    },
  ];
  return (
    <>
      <Helmet>
        <title> Pages | React Trainee </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Page Content
        </Typography>

        <Grid container spacing={3}>
          {PageData.map((pageContent, index) => {
            return (
              <Grid key={index} item xs={12} sm={6} md={3}>
                <Link to={pageContent?.url}>
                  <Card>
                    <Stack spacing={2} sx={{ p: 3 }}>
                      <div
                        style={{
                          position: 'absolute',
                          fontSize: '12px',
                          top: '-15px',
                          zIndex: -1,
                          opacity: 0.4,
                          left: '-10px',
                        }}
                      >
                        <p>{pageContent?.icon1}</p>
                      </div>
                      <div
                        style={{
                          position: 'absolute',
                          fontSize: '48px',
                          top: '-50px',
                          zIndex: -1,
                          opacity: 0.5,
                          right: '-25%',
                        }}
                      >
                        <p>{pageContent?.icon}</p>
                      </div>
                      <div
                        style={{
                          height: '50px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: '100%',
                          flexDirection: 'column',
                        }}
                      >
                        <p>{index + 1}</p>
                        <Link color="inherit" underline="hover">
                          <Typography variant="subtitle2" noWrap>
                            {pageContent.title}
                          </Typography>
                        </Link>
                      </div>
                    </Stack>
                  </Card>
                </Link>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}
