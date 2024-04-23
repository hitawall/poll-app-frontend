import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, List, ListItem, ListItemAvatar, Avatar, ListItemText,
  Typography, IconButton, Paper
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Voter {
  id: number;
  name: string;
  email: string;
}

interface VotersDialogProps {
  open: boolean;
  onClose: () => void;
  voters: Voter[];
}

const VotersDialog: React.FC<VotersDialogProps> = ({ open, onClose, voters }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Voters
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Paper variant="outlined" sx={{ maxHeight: 400, overflow: 'auto' }}>
          <List>
            {voters.length > 0 ? (
              voters.map((voter) => (
                <ListItem key={voter.id}>
                  <ListItemAvatar>
                    <Avatar alt={voter.name} src="/static/images/avatar/1.jpg" /> {/* Placeholder, replace with actual image if available */}
                  </ListItemAvatar>
                  <ListItemText primary={voter.name} />
                </ListItem>
              ))
            ) : (
              <Typography variant="subtitle1" align="center" sx={{ my: 2 }}>
                No voters found
              </Typography>
            )}
          </List>
        </Paper>
      </DialogContent>
    </Dialog>
  );
};

export default VotersDialog;
