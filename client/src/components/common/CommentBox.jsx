import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
const CommentBox = () => {
    const [comment, setComment] = useState('');
    const [submittedComments, setSubmittedComments] = useState([]);
  
    const handleCommentChange = (event) => {
      setComment(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      setSubmittedComments([...submittedComments, comment]);
      setComment('');
    };

  return (
    <div style={{margin:'30px'}}>
      <div>
        <h4>Comments:</h4>
        {submittedComments.map((submittedComment, index) => (
          <p key={index}>{submittedComment}</p>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
        <TextField
          label="Write a comment"
          value={comment}
          onChange={handleCommentChange}
          style={{ width: '90%' }}
        />
        <IconButton color="primary" type="submit">
          <SendIcon style={{ fontSize: '30px' }} />
        </IconButton>
      </form>
    </div>
  );
};

export default CommentBox;
