import React from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatBox = () => {
  const handleSendMessage = () => {
    // Handle send message logic
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', padding: '1rem' }}>
      <TextField
        variant="outlined"
        placeholder="Type your message"
        fullWidth
        defaultValue={"Add a message for others"}
      />
      <IconButton color="primary" onClick={handleSendMessage}>
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default ChatBox;
