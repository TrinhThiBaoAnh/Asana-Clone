import { Backdrop, Fade, IconButton, Modal, Box, TextField, Typography, Divider, backdropClasses } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import Moment from 'moment'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import taskApi from '../../api/taskApi'
import TaskForm from './TaskForm'
import '../../css/custom-editor.css'
import {useSelector } from 'react-redux'
import LaunchIcon from '@mui/icons-material/Launch';
import LinkIcon from '@mui/icons-material/Link';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PushPinIcon from '@mui/icons-material/PushPin';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import ChatBox from './ChatBox';
import CommentBox from './CommentBox'
const modalStyle = {
  outline: 'none',
  position: 'absolute',
  top: '50%',
  right: '0',  // Position from the right side
  transform: 'translateY(-50%)',
  width: '40%',
  bgcolor: 'background.paper',
  border: '0px solid #000',
  boxShadow: 24,
  p: 1,
  height: '100%',
  overflowY: 'auto', // Add this property for vertical scroll bar
};


let timer
const timeout = 500
let isModalClosed = false
// Window shows details of chosen task
const TaskModal = props => {
  const user = useSelector((state) => state.user.value)
  const boardId = props.boardId
  const [task, setTask] = useState(props.task)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const editorWrapperRef = useRef()
  useEffect(() => {
    setTask(props.task)
    setTitle(props.task !== undefined ? props.task.title : '')
    setContent(props.task !== undefined ? props.task.content : '')
    if (props.task !== undefined) {
      isModalClosed = false

      updateEditorHeight()
    }
  }, [props.task])
  console.log(props)
  const updateEditorHeight = () => {
    setTimeout(() => {
      if (editorWrapperRef.current) {
        const box = editorWrapperRef.current
        box.querySelector('.ck-editor__editable_inline').style.height = (box.offsetHeight - 50) + 'px'
      }
    }, timeout)
  }

  const onClose = () => {
    isModalClosed = true
    props.onUpdate(task)
    props.onClose()
  }

  const deleteTask = async () => {
    try {
      await taskApi.delete(boardId, task.id)
      props.onDelete(task)
      setTask(undefined)
    } catch (err) {
      alert(err)
    }
  }

  const updateTitle = async (e) => {
    clearTimeout(timer)
    const newTitle = e.target.value
    timer = setTimeout(async () => {
      try {
        await taskApi.update(boardId, task.id, { title: newTitle })
      } catch (err) {
        alert(err)
      }
    }, timeout)

    task.title = newTitle
    setTitle(newTitle)
    props.onUpdate(task)
  }

  const updateContent = async (event, editor) => {
    clearTimeout(timer)
    const data = editor.getData()

    console.log({ isModalClosed })

    if (!isModalClosed) {
      timer = setTimeout(async () => {
        try {
          await taskApi.update(boardId, task.id, { content: data })
        } catch (err) {
          alert(err)
        }
      }, timeout);

      task.content = data
      setContent(data)
      props.onUpdate(task)
    }
  }

  return (
    <Modal
      open={task !== undefined}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={task !== undefined}>
        <Box sx={modalStyle}>
          {/* ================================
                      header
          ===================================*/}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: '100%',
            margin: '15px'
          }}>
            {/* <TextField
                  value={title}
                  onChange={updateTitle}
                  placeholder='Untitled'
                  variant='outlined'
                  fullWidth
                  sx={{
                    width: '100%',
                    '& .MuiOutlinedInput-input': { padding: 0 },
                    '& .MuiOutlinedInput-notchedOutline': { border: 'unset ' },
                    '& .MuiOutlinedInput-root': { fontSize: '40px', fontWeight: '700' },
                    marginBottom: '10px'
                  }}
              /> */}
              <Box sx={{display: 'flex', alignItems: 'center', 
                            justifyContent: 'space-between',
                            flex: 3}}>
                    <Button variant="outlined"
                            sx={{
                              borderRadius: '5px',
                              fontSize: '12px',
                              fontWeight: 'bold',
                              height: '40px',
                              
                            }}
                            color="success"
                            >
                      <CheckIcon fontSize='medium' sx={{ marginRight: '5px' }}></CheckIcon> Mark complete
                    
                    </Button>
              </Box>
              <Box sx={{display: 'flex', alignItems: 'center', 
                            justifyContent: 'flex-end',
                            flex: 9}}>
                <IconButton variant='outlined'> 
                    <ThumbUpOffAltIcon fontSize='medium'></ThumbUpOffAltIcon>
                </IconButton>
                <IconButton variant='outlined'> 
                    <PushPinIcon fontSize='medium'></PushPinIcon>
                </IconButton>
                <IconButton variant='outlined'> 
                    <LinkIcon fontSize='medium'></LinkIcon>
                </IconButton>
                <IconButton variant='outlined'> 
                    <LaunchIcon fontSize='medium'></LaunchIcon>
                </IconButton>
                <IconButton variant='outlined'> 
                    <MoreHorizIcon fontSize='medium'></MoreHorizIcon>
                </IconButton>
                <IconButton variant='outlined' color='error' onClick={deleteTask}>
                    <DeleteOutlinedIcon />
              </IconButton>
              </Box>
          </Box>
          <Divider sx={{ margin: '1.5rem 0' }} />
          {/* ================================
                      main form
          ===================================*/}
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '2rem 5rem 5rem',
            fontSize: '14px'
          }}>
            <TaskForm user={user} task={task} boardId={boardId}></TaskForm>
            <Box sx = {{ display: 'flex', flexDirection: 'column'}}>
              <p>Description: </p>
            </Box>
            <Divider sx={{ margin: '1.5rem 0' }} />
            <Box
              ref={editorWrapperRef}
              sx={{
                position: 'relative',
                height: '200px',
                overflowX: 'hidden',
                overflowY: 'auto',
                backgroundColor: '#47476b',
              }}
            >
              <CKEditor
                editor={ClassicEditor}
                data={content}
                onChange={updateContent}
                onFocus={updateEditorHeight}
                onBlur={updateEditorHeight}
              />
            </Box>
          </Box>
         
          {/* ================================
                      chatbox
          ===================================*/}
          <Divider sx={{ margin: '1.5rem 0' }} />
          <Box>
            <CommentBox/>
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}

export default TaskModal