// app/page.tsx or pages/index.tsx
import { Button, Box, Container, Typography, CssBaseline } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Container component="main" style={{ maxWidth:"false", height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#333', color: '#fff' }}>
      <CssBaseline />
      <Typography variant="h2" component="h1" gutterBottom style={{ fontWeight: 'bold', color: '#61dafb', textShadow: '2px 2px #000' }}>
        Welcome to Make Your Polls!
      </Typography>
      <Typography variant="h5" style={{ marginBottom: '30px', color: '#fff', fontStyle: 'italic' }}>
        Where every vote matters!
      </Typography>
      <Box>
        <Link href="/login" passHref>
          <Button variant="contained" style={{ marginRight: '10px', backgroundColor: '#556cd6', color: '#fff' }}>
            Login
          </Button>
        </Link>
        <Link href="/signup" passHref>
          <Button variant="contained" style={{ backgroundColor: '#556cd6', color: '#fff' }}>
            Sign Up
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
