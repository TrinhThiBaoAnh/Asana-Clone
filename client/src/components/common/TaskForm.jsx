import React, { useState } from 'react';
import { TextField, Button, Box, Grid, Typography,Divider } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import {  Menu, MenuItem } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const TaskForm = ({ user, task, boardId }) => {
    const [taskName, setTaskName] = useState(boardId||'');
    const [userName, setUserName] = useState(user.username || '');
    const [selectedDate, setSelectedDate] = useState(null);
    const [projectName, setProjectName] = useState(task?.section?.title|| '');
    const [anchorEl, setAnchorEl] = useState(null);
    // Check if task is null or undefined
    const isTaskAvailable = task !== null && task !== undefined;
    const handleOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleTaskNameChange = (event) => {
      setTaskName(event.target.value);
    };

    const handleUserNameChange = (event) => {
      setUserName(event.target.value);
    };

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };

    const handleProjectNameChange = (event) => {
      setProjectName(event.target.value);
    };

    const handleSubmit = (event) => {
      event.preventDefault();

      // Perform form submission or other actions
      // based on the form data

      // Reset the form fields
      setTaskName('');
      setUserName('');
      setSelectedDate(null);
      setProjectName('');
    };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{fontSize: '14px'}}>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{display:'flex'}}>
            <Typography variant="span" sx={{flex:1}}>Task Name:</Typography>
            <TextField value="Sample Task" variant="standard" disabled sx={{ marginLeft: '1rem' }} />
        </Grid>
        <Grid item xs={12} sx={{display:'flex'}}>
            <Typography variant="span" sx={{flex:1}}>Assignees:</Typography>
            <Avatar alt="User Avatar" src="/path/to/avatar.jpg" sx={{ marginLeft: '1rem' }} />
            {/* <TextField value="John Doe" variant="standard" disabled sx={{ marginLeft: '1rem' }} /> */}
        </Grid>
        <Grid item xs={12} sx={{display:'flex'}}>
            <Typography variant="span" sx={{flex:1}}>Due date:</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Select Date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    fullWidth
                    required
                    slotProps={{ textField: { size: 'small' } }}
                />
            </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sx={{display:'flex'}}>
            <Typography variant="span" sx={{flex:1}}>Project:</Typography>
            <Typography variant="span">{isTaskAvailable ? task.section.title : "None"}</Typography>
            {/* <TextField value="John Doe" variant="standard" disabled sx={{ marginLeft: '1rem' }} /> */}
        </Grid>
        <Grid item xs={12} sx={{display:'flex'}}>
            <Typography variant="span" sx={{flex:1}}>Dependencies:</Typography>
            <TextField value="Add dependencies" variant="standard" disabled sx={{ marginLeft: '1rem' }} />
        </Grid>
        <Grid item xs={12} sx={{display:'flex'}}>
            <Typography variant="span" sx={{flex:1}}><CheckCircleOutlineIcon fontSize='small' sx={{marginRight: '5px'}}></CheckCircleOutlineIcon>Priorities:</Typography>
            <Box>
                <Button onClick={handleOpen} sx={{textTransform: 'None'}}>Choose priority</Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem sx={{
                    display:'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100px',
                    
                  }}>
                      <Badge badgeContent="High" color="error" sx={{}}/>
                      <Divider sx={{ margin: '0.5rem 0' }} />
                  </MenuItem>
                  <MenuItem sx={{
                     display:'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     width: '100px',
                  }}>
                      <Badge badgeContent="Medium" color="primary" />
                      <Divider sx={{ margin: '0.5rem 0' }} />
                  </MenuItem>

                  <MenuItem sx={{
                     display:'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     width: '100px',
                  }}>
                      <Badge badgeContent="Low" color="primary" />
                      <Divider sx={{ margin: '0.5rem 0' }} />
                  </MenuItem>

                </Menu>
            </Box>
            {/* <TextField value="John Doe" variant="standard" disabled sx={{ marginLeft: '1rem' }} /> */}
        </Grid>
        <Grid item xs={12} sx={{display:'flex'}}>
            <Typography variant="span" sx={{flex:1}}><CheckCircleOutlineIcon fontSize='small' sx={{marginRight: '5px'}}></CheckCircleOutlineIcon>Status:</Typography>
            <Box>
                {/* <Button onClick={handleOpen} sx={{textTransform: 'None'}}>Choose priority</Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem>Not Started</MenuItem>
                  <MenuItem>Waiting</MenuItem>
                  <MenuItem>On Process</MenuItem>
                  <MenuItem>Done</MenuItem>
                </Menu> */}
            </Box>
            {/* <TextField value="John Doe" variant="standard" disabled sx={{ marginLeft: '1rem' }} /> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskForm;
