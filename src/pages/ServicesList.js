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

export default function ServiceList() {
  const icon = (icon, customWidth = 100, customHeight = 100) => (
    <Iconify icon={icon} width={customWidth} height={customHeight} />
  );

  const PageData = [
    {
      title: 'Account Pay And Receivables Service',
      url: 'AccountPayAndReceivablesService',
    },
    {
      title: 'Bank Reconciliation Services',
      url: 'BankReconciliationServices',
    },
    {
      title: 'Bookkeping Services',
      url: 'BookkepingServices',
    },
    {
      title: 'Card Reconciliation Services',
      url: 'CardReconciliationServices',
    },
    {
      title: 'Customer And Vender Reconciliation Services',
      url: 'CustomerAndVenderReconciliationService',
    },
    {
      title: 'Financial Statment Preparation Services',
      url: 'FinancialStatmentPreparationServices',
    },
    {
      title: 'Payroll Reconciliation Services',
      url: 'PayrollReconciliationServices',
    },
    {
      title: 'Payroll Services',
      url: 'PayrollServices',
    },
    {
      title: 'Virtual Accounting Services',
      url: 'VirtualAccountingServices',
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
