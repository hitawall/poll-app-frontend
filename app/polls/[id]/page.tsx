'use client'

import React, { useEffect, useState } from 'react';
import axios from '../../../components/axiosConfig';
import { useRouter, useParams } from 'next/navigation';
import {
    Button,
    Container,
    List,
    ListItem,
    Typography,
    TextField,
    Box,
    CssBaseline,
    LinearProgress,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List as DialogList,
    ListItem as DialogListItem,
    Tooltip, Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import {red, yellow} from '@mui/material/colors';
import VotersDialog from "@/components/VotersDialog";

const PollDetailPage = () => {
    const router = useRouter();
    const { id } = useParams();
    const [poll, setPoll] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState({});
    const [newOptionText, setNewOptionText] = useState('');
    const [voterDialogOpen, setVoterDialogOpen] = useState(false);
    const [currentVoters, setCurrentVoters] = useState([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedOptionId, setSelectedOptionId] = useState(null);

    useEffect(() => {
        if (!id) return;
        fetchPoll();
    }, [id]);

    const fetchPoll = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/polls/${id}`);
            const options = response.data.edges.polloptions;
            const totalVotes = 10;
            const voteStatusPromises = options.map(option => axios.get(`/options/${option.id}/voters`));

            const votersResponses = await Promise.all(voteStatusPromises);
            votersResponses.forEach((voterResponse, index) => {
                options[index].hasVoted = voterResponse.data.hasVoted;
            });

            options.forEach(option => option.percent = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0);
            setPoll({ ...response.data, totalVotes, options });
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch poll:', error);
            setLoading(false);
        }
    };


    const handleVote = async (optionId) => {
        try {
            await axios.post(`/options/${optionId}/vote`);
            setSelectedOptionId(optionId); // Set selected option ID
            fetchPoll(); // Refresh the poll data
        } catch (error) {
            console.error('Error recording vote:', error);
        }
    };

    const handleViewVoters = async (optionId) => {
        try {
        const response = await axios.get(`/options/${optionId}/voters`);
        console.log("Voters data received:", response.data); // To see the exact structure

        // Set the current voters based on the 'voters' key in the response data
        setCurrentVoters(response.data.voters); // Now correctly accessing the voters array
        setVoterDialogOpen(true);
    } catch (error) {
        console.error('Error fetching voters:', error);
        setCurrentVoters([]); // Ensure it's set to an empty array in case of error
    }
    };

    const handleAddOption = async () => {
        if (!newOptionText.trim()) return;
        try {
            await axios.post(`/polls/${id}/options`, { text: newOptionText });
            setNewOptionText('');
            fetchPoll(); // Refresh the poll data
        } catch (error) {
            console.error('Failed to add option:', error);
        }
    };

    const startEditing = (optionId, text) => {
        setEditMode({ [optionId]: text });
    };

    const handleEditOption = async (optionId) => {
        if (!editMode[optionId].trim()) return;
        try {
            await axios.put(`/options/${optionId}`, { text: editMode[optionId] });
            setEditMode({});
            fetchPoll();
        } catch (error) {
            console.error('Failed to update option:', error);
        }
    };

    const handleDeleteOption = async (optionId) => {
        try {
            await axios.delete(`/options/${optionId}`);
            setDeleteDialogOpen(false);
            fetchPoll();
        } catch (error) {
            console.error('Failed to delete option:', error);
        }
    };

    const confirmDeleteOption = (optionId) => {
        setSelectedOptionId(optionId);
        setDeleteDialogOpen(true);
    };

    if (loading) {
        return <Container maxWidth="sm"><Typography>Loading...</Typography></Container>;
    }

    if (!poll) {
        return <Container maxWidth="sm"><Typography>No poll found or failed to load the poll details.</Typography></Container>;
    }

    return (
        <Container maxWidth="sm">
            <CssBaseline />
            <Typography variant="h4" marginBottom={2}>{poll.title}</Typography>
            <List>
                {poll.edges.polloptions.map((option) => (
                    <ListItem key={option.id} sx={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2,
                        backgroundColor: option.hasVoted ? '#4caf50' : '#333', // Conditional background color
                        padding: '10px', borderRadius: '5px'
                    }}>
                        {editMode[option.id] ? (
                            <TextField
                                value={editMode[option.id]}
                                onChange={(e) => setEditMode({ [option.id]: e.target.value })}
                                onBlur={() => handleEditOption(option.id)}
                                variant="outlined"
                                InputLabelProps={{ style: { color: '#fff' } }}
                                InputProps={{ style: { color: '#fff' } }}
                            />
                        ) : (
                            <>
                                <Box sx={{ flexGrow: 1, mr: 1, cursor: 'pointer' }} onClick={() => handleVote(option.id)}>
                                    <LinearProgress variant="determinate" value={option.percent} sx={{ height: 10, backgroundColor: '#bbb' }} />
                                    <Typography>{option.text}</Typography>
                                </Box>
                                <Tooltip title="Click to see who voted" placement="top">
                                    <Chip
                                        label={option.votes || 0}
                                        onClick={() => handleViewVoters(option.id)}
                                        sx={{ cursor: 'pointer', backgroundColor: yellow[700], color: '#fff' }}
                                    />
                                </Tooltip>
                                <IconButton onClick={() => startEditing(option.id, option.text)} sx={{ color: '#fff' }}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => confirmDeleteOption(option.id)} sx={{ color: red[500] }}>
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        )}
                    </ListItem>
                ))}
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', backgroundColor: '#333' }}>
                    <TextField
                        fullWidth
                        label="New Option"
                        value={newOptionText}
                        onChange={(e) => setNewOptionText(e.target.value)}
                        variant="outlined"
                        InputLabelProps={{ style: { color: '#fff' } }}
                        InputProps={{ style: { color: '#fff' }, endAdornment: (
                            <IconButton onClick={handleAddOption} color="primary" sx={{ color: '#fff' }}>
                                <AddCircleOutlineIcon />
                            </IconButton>
                        ) }}
                    />
                </Box>
            </List>
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Delete Option</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this option?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)} color="primary">Cancel</Button>
                    <Button onClick={() => handleDeleteOption(selectedOptionId)} color="secondary">Delete</Button>
                </DialogActions>
            </Dialog>
            <VotersDialog open={voterDialogOpen} onClose={() => setVoterDialogOpen(false)} voters={currentVoters} />
        </Container>
    );
};

export default PollDetailPage;
