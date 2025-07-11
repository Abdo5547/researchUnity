import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Header from './components/Header';
import MyMessages from './components/MyMessages';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AppAppBar from '../components/AppAppBar/AppAppBar';

export default function Message() {


  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }} mt={5}>
        <Header />
        <Box component="main" className="MainContent" sx={{ flex: 1 }}>
          <MyMessages />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
