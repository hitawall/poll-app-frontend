// app/login/page.tsx
'use client'
import { Button, Box, Container, TextField, Typography, CssBaseline } from '@mui/material';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as yup from 'yup';

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object({
      email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
      password: yup.string('Enter your password').min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
    }),
    onSubmit: (values) => {
      console.log(values);
      // Place your login logic here
    },
  });

  return (
    <Container component="main" maxWidth="xs" style={{ padding: 0 }}>
      <CssBaseline />
      <Box sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#333',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0 3px 5px 2px rgba(255, 255, 255, .3)',
      }}>
        <Typography component="h1" variant="h5" marginBottom={2} style={{ color: '#fff' }}>
          Sign in
        </Typography>
        <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              style: { color: '#fff' },
            }}
            InputProps={{
              style: { color: '#fff' },
            }}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              style: { color: '#fff' },
            }}
            InputProps={{
              style: { color: '#fff' },
            }}
          />
          <Button color="primary" variant="contained" fullWidth type="submit" sx={{ mt: 3, mb: 2, backgroundColor: '#556cd6' }}>
            Sign In
          </Button>
        </form>
        <Link href="/signup" passHref>
          <Typography variant="body2" style={{ cursor: 'pointer', marginTop: '10px', color: '#fff' }}>
            Don't have an account? Sign up
          </Typography>
        </Link>
      </Box>
    </Container>
  );
};

export default LoginPage;
