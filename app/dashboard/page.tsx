// app/dashboard/index.tsx
'use client'
import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import Link from 'next/link';

const DashboardPage = () => {
  const userEmail = localStorage.getItem('userEmail') || 'User';

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ mt: 4, mb: 4 }}>
        Welcome, {userEmail.split('@')[0]}
      </Typography>
      <Button variant="contained" color="primary" sx={{ mr: 2 }} component={Link} href="/create-poll">
        Create Poll
      </Button>
      <Button variant="contained" color="secondary" component={Link} href="/polls">
        View Polls
      </Button>
    </Container>
  );
};

export default DashboardPage;
