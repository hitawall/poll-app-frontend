// app/polls/index.tsx
'use client'
import React, { useEffect, useState } from 'react';
import axios from '../../components/axiosConfig';
import { Container, List, ListItem, ListItemText, Typography } from '@mui/material';
import Link from 'next/link';

const PollsPage = () => {
    const [polls, setPolls] = useState([]);

    useEffect(() => {
        const fetchPolls = async () => {
            try {
                const response = await axios.get('/polls');
                setPolls(response.data);
            } catch (error) {
                console.error('Error fetching polls:', error);
            }
        };
        fetchPolls();
    }, []);

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
                Available Polls
            </Typography>
            <List>
                {polls.map(poll => (
                    <ListItem key={poll.id} button component={Link} href={`/polls/${poll.id}`}>
                        <ListItemText primary={poll.title} />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default PollsPage;
