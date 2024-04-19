// app/polls/index.tsx
'use client'
import React, { useEffect, useState } from 'react';
import axios from '../../components/axiosConfig';
import { Container, List, ListItem, ListItemText, Typography, Box, CssBaseline, Tab, Tabs } from '@mui/material';
import Link from 'next/link';

const PollsPage = () => {
    const [polls, setPolls] = useState([]);
    const [error, setError] = useState('');
    const [tabValue, setTabValue] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPolls = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/polls');
                setPolls(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching polls:', error);
                setError('Failed to load polls. Please try again later.');
                setLoading(false);
            }
        };
        fetchPolls();
    }, []);

    const handleChangeTab = (event, newValue) => {
        setTabValue(newValue);
    };

    const filterPollsByType = (type) => {
        return polls.filter(poll => type ? poll.createdByMe : !poll.createdByMe);
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
                <Typography variant="h4" marginBottom={2}>Available Polls</Typography>
                <Tabs value={tabValue} onChange={handleChangeTab} textColor="inherit" indicatorColor="primary" sx={{ marginBottom: 2 }}>
                    <Tab label="Created by Me" />
                    <Tab label="Others" />
                </Tabs>
                {loading ? (
                    <Typography>Loading polls...</Typography>
                ) : error ? (
                    <Typography color="error">{error}</Typography>
                ) : (
                    <List sx={{ width: '100%' }}>
                        {filterPollsByType(tabValue === 0).length > 0 ? (
                            filterPollsByType(tabValue === 0).map(poll => (
                                <Link key={poll.id} href={`/polls/${poll.id}`} passHref>
                                    <ListItem button component="a">
                                        <ListItemText primary={poll.title} />
                                    </ListItem>
                                </Link>
                            ))
                        ) : (
                            <Typography>No polls available.</Typography>
                        )}
                    </List>
                )}
            </Box>
        </Container>
    );
};

export default PollsPage;
