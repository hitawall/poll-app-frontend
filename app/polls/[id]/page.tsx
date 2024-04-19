// app/polls/[id]/index.tsx
'use client'

import React, { useEffect, useState } from 'react';
import axios from '../../../components/axiosConfig';
import { useRouter, useParams } from 'next/navigation'; // Import useParams along with useRouter
import { Button, Container, List, ListItem, Typography, TextField, Box, CssBaseline } from '@mui/material';

const PollDetailPage = () => {
    const router = useRouter();
    const { id } = useParams(); // Using useParams to access the dynamic route parameter 'id'
    const [poll, setPoll] = useState(null);
    const [newOption, setNewOption] = useState('');
    const [loading, setLoading] = useState(true);
    const fetchPoll = async () => {
            try {
                const response = await axios.get(`/polls/${id}`);
                setPoll(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch poll:', error);
                setLoading(false);
            }
        };
    
    useEffect(() => {
        if (!id) return; // Ensure id is present before making the API call


        fetchPoll();
    }, [id]);

    const handleVote = async (optionId) => {
        try {
            await axios.post(`/options/${optionId}/vote`);
            alert('Vote recorded!');
            fetchPoll(); // Refresh the poll data
        } catch (error) {
            console.error('Error recording vote:', error);
            alert('Failed to vote');
        }
    };

    const handleAddOption = async () => {
        if (!newOption.trim()) return;
        try {
            await axios.post(`/polls/${id}/options`, { text: newOption });
            setNewOption('');
            fetchPoll(); // Refresh the poll data
        } catch (error) {
            console.error('Failed to add option:', error);
            alert('Failed to add option');
        }
    };

    if (loading) {
        return (
            <Container maxWidth="sm">
                <Typography>Loading...</Typography>
            </Container>
        );
    }

    if (!poll) {
        return (
            <Container maxWidth="sm">
                <Typography>No poll found or failed to load the poll details.</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm">
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
                <Typography variant="h4" marginBottom={2}>
                    {poll.title}
                </Typography>
                <List>
                    {poll.edges.polloptions.map((option) => (
                        <ListItem key={option.id} sx={{ flexDirection: 'column', alignItems: 'start' }}>
                            <Typography sx={{ mt: 1, mb: 1 }}>{option.text} - Votes: {option.votes}</Typography>
                            <Button onClick={() => handleVote(option.id)} variant="contained" color="primary">
                                Vote
                            </Button>
                        </ListItem>
                    ))}
                    <Box sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            label="New Option"
                            value={newOption}
                            onChange={(e) => setNewOption(e.target.value)}
                            variant="outlined"
                            InputLabelProps={{ style: { color: '#fff' } }}
                            InputProps={{ style: { color: '#fff' } }}
                        />
                        <Button onClick={handleAddOption} variant="contained" color="secondary" sx={{ mt: 2 }}>
                            Add Option
                        </Button>
                    </Box>
                </List>
            </Box>
        </Container>
    );
};

export default PollDetailPage;
