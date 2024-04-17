// app/polls/[id]/index.tsx
'use client'

import React, { useEffect, useState } from 'react';
import axios from '../../../components/axiosConfig';
import { useRouter } from 'next/navigation';
import { Button, Container, List, ListItem, Typography, TextField, Box } from '@mui/material';

const PollDetailPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [poll, setPoll] = useState(null);
    const [newOption, setNewOption] = useState('');

    useEffect(() => {
        const fetchPoll = async () => {
            try {
                const response = await axios.get(`/api/polls/${id}`);
                setPoll(response.data);
            } catch (error) {
                console.error('Failed to fetch poll:', error);
            }
        };

        if (id) {
            fetchPoll();
        }
    }, [id]);

    const handleVote = async (optionId) => {
        try {
            await axios.post(`/api/options/${optionId}/vote`);
            alert('Vote recorded!');
            fetchPoll(); // Re-fetch the poll to update the state
        } catch (error) {
            console.error('Error recording vote:', error);
            alert('Failed to vote');
        }
    };

    const handleAddOption = async () => {
        if (!newOption.trim()) return;
        try {
            await axios.post(`/api/polls/${id}/options`, { text: newOption });
            setNewOption('');
            fetchPoll(); // Re-fetch the poll to update the state
        } catch (error) {
            console.error('Failed to add option:', error);
            alert('Failed to add option');
        }
    };

    if (!poll) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
                {poll.title}
            </Typography>
            <List>
                {poll.options.map((option) => (
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
                        InputLabelProps={{
                            style: { color: '#fff' },
                        }}
                        InputProps={{
                            style: { color: '#fff' },
                        }}
                    />
                    <Button onClick={handleAddOption} variant="contained" color="secondary" sx={{ mt: 2 }}>
                        Add Option
                    </Button>
                </Box>
            </List>
        </Container>
    );
};

export default PollDetailPage;
