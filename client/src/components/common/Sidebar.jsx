import { useSelector, useDispatch } from 'react-redux'
import { Box, Drawer, IconButton, List, ListItem, ListItemButton, Typography} from '@mui/material'
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import BallotIcon from '@mui/icons-material/Ballot';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useNavigate, useParams } from 'react-router-dom'
import assets from '../../assets/index'
import { useEffect, useState } from 'react'
import boardApi from '../../api/boardApi'
import { setBoards } from '../../redux/features/boardSlice'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import FavouriteList from './FavouriteList'
import { AppBar, Toolbar } from '@mui/material';
import Logo from '../../assets/images/ASAN.svg';

const Sidebar = () => {
  const boards = useSelector((state) => state.board.value)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { boardId } = useParams()
  const [activeIndex, setActiveIndex] = useState(0)

  const sidebarWidth = 250

  useEffect(() => {
    const getBoards = async () => {
      try {
        const res = await boardApi.getAll()
        dispatch(setBoards(res))
      } catch (err) {
        alert(err)
      }
    }
    getBoards()
  }, [dispatch])

  useEffect(() => {
    const activeItem = boards.findIndex(e => e.id === boardId)
    if (boards.length > 0 && boardId === undefined) {
      navigate(`/boards/${boards[0].id}`)
    }
    setActiveIndex(activeItem)
  }, [boards, boardId, navigate])


  const onDragEnd = async ({ source, destination }) => {
    const newList = [...boards]
    const [removed] = newList.splice(source.index, 1)
    newList.splice(destination.index, 0, removed)

    const activeItem = newList.findIndex(e => e.id === boardId)
    setActiveIndex(activeItem)
    dispatch(setBoards(newList))

    try {
      await boardApi.updatePositoin({ boards: newList })
    } catch (err) {
      alert(err)
    }
  }

  const addBoard = async () => {
    try {
      const res = await boardApi.create()
      const newList = [res, ...boards]
      dispatch(setBoards(newList))
      navigate(`/boards/${res.id}`)
    } catch (err) {
      alert(err)
    }
  }

  return (
    <Drawer
      container={window.document.body}
      variant='permanent'
      open={true}
      sx={{
        width: sidebarWidth,
        height: '100vh',
        '& > div': { borderRight: 'none' },
        
      }}
    >
      <List
        disablePadding
        sx={{
          width: sidebarWidth,
          height: '100vh',
          backgroundColor: '#1e1f21'
        }}
      >
        <ListItem sx= {{backgroundColor: '#1e1f21'}}>
          <Box sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#1e1f21'
          }}>
             <AppBar position="static" sx= {{backgroundColor: '#1e1f21'}}>
              <Toolbar sx= {{backgroundColor: '#1e1f21'}}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <img src={Logo} alt="Logo" style={{ height: 40, marginRight: 10 }} />
                  <Typography variant="h4" component="div">
                    asana
                  </Typography>
                </Box>
              </Toolbar>
            </AppBar>
          </Box>
        </ListItem>
        <hr style={{ width: '100%', color: '#534e3b', backgroundColor: '#534e3b', height: '1px', border: 'none' }} />
        <Box sx={{ paddingTop: '10px' }} />
        <ListItem>
          <Box sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography variant='body2' fontWeight='700' style={{ display: 'flex', alignItems: 'center' }}>
            <HomeIcon fontSize='medium' style={{ marginRight: '5px' }}/> Home
            </Typography>
          </Box>
        </ListItem>
        <Box sx={{ paddingTop: '10px' }} />
        <ListItem>
          <Box sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography variant='body2' fontWeight='700' style={{ display: 'flex', alignItems: 'center' }}>
              <TaskAltIcon fontSize='medium' style={{ marginRight: '5px' }}/>
              My tasks
            </Typography>
          </Box>
        </ListItem>
        <Box sx={{ paddingTop: '10px' }} />
        <ListItem>
          <Box sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography variant='body2' fontWeight='700' style={{ display: 'flex', alignItems: 'center' }}>
              <NotificationsNoneIcon fontSize='medium' style={{ marginRight: '5px' }}/>
              Inbox
            </Typography>
          </Box>
        </ListItem>
        <Box sx={{ paddingTop: '10px' }} />
        <ListItem>
          <Box sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography variant='body2' fontWeight='700' style={{ display: 'flex', alignItems: 'center' }}>
              <SignalCellularAltIcon fontSize='medium' style={{ marginRight: '5px' }}/>
              Portfolio
            </Typography>
          </Box>
        </ListItem>
        <hr style={{ width: '100%', color: '#534e3b', backgroundColor: '#534e3b', height: '1px', border: 'none' }} />
        <ListItem>
          <Box sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography variant='body2' fontWeight='700' style={{ display: 'flex', alignItems: 'center' }}>
              <BallotIcon fontSize='medium' style={{ marginRight: '5px' }} />
              Projects
            </Typography>
            <IconButton onClick={addBoard}>
              <AddBoxOutlinedIcon fontSize='small' />
            </IconButton>
          </Box>
        </ListItem>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable key={'list-board-droppable-key'} droppableId={'list-board-droppable'}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {
                  boards.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <ListItemButton
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          selected={index === activeIndex}
                          component={Link}
                          to={`/boards/${item.id}`}
                          sx={{
                            pl: '20px',
                            cursor: snapshot.isDragging ? 'grab' : 'pointer!important'
                          }}
                        >
                          <Typography
                            variant='body2'
                            fontWeight='700'
                            sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                          >
                            {item.icon} {item.title}
                          </Typography>
                        </ListItemButton>
                      )}
                    </Draggable>
                  ))
                }
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <Box sx={{ paddingTop: '10px' }} />
        <FavouriteList />

        <hr style={{ width: '100%', color: '#534e3b', backgroundColor: '#534e3b', height: '1px', border: 'none' }} />
        <Box sx={{ paddingTop: '10px' }} />
        <ListItem>
          <Box sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography variant='body2' fontWeight='700' style={{ display: 'flex', alignItems: 'center' }}>
              <QueryStatsIcon fontSize='medium' style={{ marginRight: '5px' }}/>
              Reporting
            </Typography>
          </Box>
        </ListItem>
      </List>
      
    </Drawer>
  )
}

export default Sidebar