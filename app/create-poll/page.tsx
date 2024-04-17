// app/create-poll/page.tsx
'use client'

import React, { useState } from 'react';
import axios from '../../components/axiosConfig';
import { useRouter } from 'next/navigation';
import { Button, Container, TextField, Typography, Box, CssBaseline } from '@mui/material';


const CreatePollPage = () => {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [options, setOptions] = useState(['', '']);

    const addOption = () => setOptions([...options, '']);
    const updateOption = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleSubmit = async () => {
        const validOptions = options.filter(option => option.trim() !== '');
        if (!title.trim() || validOptions.length < 2) {
            alert('Please enter a title and at least two options.');
            return;
        }

        try {
            const response = await axios.post('/polls', {
                title,
                options: validOptions
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            if (response.status === 201) {
                router.push('/polls');
            }
        } catch (error) {
            console.error('Failed to create poll:', error);
            alert('Failed to create poll');
        }
    };

    return (
        <Container component="main" maxWidth="sm">
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
                color: '#fff'
            }}>
                <Typography variant="h4" marginBottom={2}>Create New Poll</Typography>
                <TextField
                    fullWidth
                    label="Poll Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    margin="normal"
                    InputLabelProps={{ style: { color: '#fff' } }}
                    InputProps={{ style: { color: '#fff' } }}
                    variant="outlined"
                />
                {options.map((option, index) => (
                    <TextField
                        key={index}
                        fullWidth
                        label={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        margin="normal"
                        InputLabelProps={{ style: { color: '#fff' } }}
                        InputProps={{ style: { color: '#fff' } }}
                        variant="outlined"
                    />
                ))}
                <Button onClick={addOption} variant="outlined" sx={{ mt: 2, mb: 2, color: '#fff', borderColor: '#fff' }}>
                    Add Option
                </Button>
                <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ mt: 2, backgroundColor: '#556cd6' }}>
                    Create Poll
                </Button>
            </Box>
        </Container>
    );
};

export default CreatePollPage;
