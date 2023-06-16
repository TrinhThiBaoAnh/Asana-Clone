import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import { Box, Container, IconButton, TextField,InputAdornment} from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import boardApi from '../api/boardApi'
import EmojiPicker from '../components/common/EmojiPicker'
import Kanban from '../components/common/Kanban'
import { setBoards } from '../redux/features/boardSlice'
import { setFavouriteList } from '../redux/features/favouriteSlice'
import { Typography} from '@mui/material'
import { Tabs, Tab } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import Button from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';
import AvatarMenu from './AvatarMenu'
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
let timer
const timeout = 500

const Board = () => {
  const user = useSelector((state) => state.user.value)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { boardId } = useParams()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [sections, setSections] = useState([])
  const [isFavourite, setIsFavourite] = useState(false)
  const [icon, setIcon] = useState('')
  const [searchTerm, setSearchTerm] = useState("");
  const boards = useSelector((state) => state.board.value)
  const favouriteList = useSelector((state) => state.favourites.value)

  const [activeTab, setActiveTab] = useState(2);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  }

  useEffect(() => {
    const getBoard = async () => {
      try {
        const res = await boardApi.getOne(boardId)
        setTitle(res.title)
        setDescription(res.description)
        setSections(res.sections)
        setIsFavourite(res.favourite)
        setIcon(res.icon)
      } catch (err) {
        alert(err)
      }
    }
    getBoard()
  }, [boardId])

  const onIconChange = async (newIcon) => {
    let temp = [...boards]
    const index = temp.findIndex(e => e.id === boardId)
    temp[index] = { ...temp[index], icon: newIcon }

    if (isFavourite) {
      let tempFavourite = [...favouriteList]
      const favouriteIndex = tempFavourite.findIndex(e => e.id === boardId)
      tempFavourite[favouriteIndex] = { ...tempFavourite[favouriteIndex], icon: newIcon }
      dispatch(setFavouriteList(tempFavourite))
    }

    setIcon(newIcon)
    dispatch(setBoards(temp))
    try {
      await boardApi.update(boardId, { icon: newIcon })
    } catch (err) {
      alert(err)
    }
  }

  const updateTitle = async (e) => {
    clearTimeout(timer)
    const newTitle = e.target.value
    setTitle(newTitle)

    let temp = [...boards]
    const index = temp.findIndex(e => e.id === boardId)
    temp[index] = { ...temp[index], title: newTitle }

    if (isFavourite) {
      let tempFavourite = [...favouriteList]
      const favouriteIndex = tempFavourite.findIndex(e => e.id === boardId)
      tempFavourite[favouriteIndex] = { ...tempFavourite[favouriteIndex], title: newTitle }
      dispatch(setFavouriteList(tempFavourite))
    }

    dispatch(setBoards(temp))

    timer = setTimeout(async () => {
      try {
        await boardApi.update(boardId, { title: newTitle })
      } catch (err) {
        alert(err)
      }
    }, timeout);
  }

  const updateDescription = async (e) => {
    clearTimeout(timer)
    const newDescription = e.target.value
    setDescription(newDescription)
    timer = setTimeout(async () => {
      try {
        await boardApi.update(boardId, { description: newDescription })
      } catch (err) {
        alert(err)
      }
    }, timeout);
  }

  const addFavourite = async () => {
    try {
      const board = await boardApi.update(boardId, { favourite: !isFavourite })
      let newFavouriteList = [...favouriteList]
      if (isFavourite) {
        newFavouriteList = newFavouriteList.filter(e => e.id !== boardId)
      } else {
        newFavouriteList.unshift(board)
      }
      dispatch(setFavouriteList(newFavouriteList))
      setIsFavourite(!isFavourite)
    } catch (err) {
      alert(err)
    }
  }

  const deleteBoard = async () => {
    try {
      await boardApi.delete(boardId)
      if (isFavourite) {
        const newFavouriteList = favouriteList.filter(e => e.id !== boardId)
        dispatch(setFavouriteList(newFavouriteList))
      }

      const newList = boards.filter(e => e.id !== boardId)
      if (newList.length === 0) {
        navigate('/boards')
      } else {
        navigate(`/boards/${newList[0].id}`)
      }
      dispatch(setBoards(newList))
    } catch (err) {
      alert(err)
    }
  }


  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleButtonClick = () => {
    // Handle button click event here
    console.log('Button clicked!');
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'right',
            justifyContent: 'space-between'
          }}>
              <Container sx={{flex: 6}}>
              </Container>
              <Container sx={{display: 'flex', alignItems: 'center', 
                            justifyContent: 'space-between',
                            flex: 2}}>
                <AvatarGroup max={4}>
                  <Avatar alt="Remy Sharp" src="https://kiemtientuweb.com/ckfinder/userfiles/images/avatar-fb/avatar-fb-1.jpg" />
                  <Avatar alt="Travis Howard" src="https://thuthuatnhanh.com/wp-content/uploads/2018/07/anh-dai-dien-dep.jpg" />
                  <Avatar alt="Cindy Baker" src="https://phunugioi.com/wp-content/uploads/2020/01/anh-avatar-supreme-dep-lam-dai-dien-facebook.jpg" />
                  <Avatar alt="Remy Sharp" src="https://kiemtientuweb.com/ckfinder/userfiles/images/avatar-fb/avatar-fb-1.jpg" />
                  <Avatar alt="Travis Howard" src="https://thuthuatnhanh.com/wp-content/uploads/2018/07/anh-dai-dien-dep.jpg" />
                </AvatarGroup>
              </Container>
              <Container sx={{display: 'flex', alignItems: 'center', 
                            justifyContent: 'space-between',
                            flex: 1}}>
                  
                  <Button variant="outlined"
                          sx={{
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            height: '40px',
                          }}
                          onClick={handleButtonClick}>
                    <ShareIcon fontSize='medium' sx={{ marginRight: '5px' }}></ShareIcon> Share
                  
                  </Button>
              </Container>
              <Container sx={{  
                            display: 'flex', alignItems: 'center', 
                            justifyContent: 'space-between',
                            flex: 2 }}>
                 <TextField
                      id="search"
                      type="search"
                      label="Search"
                      value={searchTerm}
                      onChange={handleChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                        sx: { borderRadius: 20,  
                              width: 250,
                              height: 50, }
                        
                      }}
                  />
                
                <Container sx={{  
                            display: 'flex', alignItems: 'center', 
                            justifyContent: 'space-between',
                            flex: 1 }}>
                  <Box>
                    <AvatarMenu user={user}  />
                  </Box>
                </Container>
              </Container>

      </Box>
      {/* <hr style={{ width: '100%', color: '#534e3b', backgroundColor: '#534e3b', height: '1px', border: 'none' }} /> */}
      <Box sx={{ padding: '10px 50px', }}>
        <Box>
          {/* emoji picker */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <EmojiPicker icon={icon} onChange={onIconChange} />

            <TextField
              value={title}
              onChange={updateTitle}
              placeholder='Untitled'
              variant='outlined'
              fullWidth
              sx={{
                '& .MuiOutlinedInput-input': { padding: 0 },
                '& .MuiOutlinedInput-notchedOutline': { border: 'unset' },
                '& .MuiOutlinedInput-root': { fontSize: '2rem', fontWeight: '700' },
                marginLeft: '10px', // Add left margin for spacing
              }}
            />

            <IconButton variant='outlined' onClick={addFavourite} sx={{ color: '#ffffff', marginLeft: '10px' }}>
              {isFavourite ? <StarOutlinedIcon color='warning' /> : <StarBorderOutlinedIcon />}
            </IconButton>
            <Box>
              <IconButton variant='outlined' color='error' onClick={deleteBoard}>
                <DeleteOutlinedIcon />
              </IconButton>
            </Box>
          </div>
          <TextField
            value={description}
            onChange={updateDescription}
            placeholder='Add a description'
            variant='outlined'
            multiline
            fullWidth
            sx={{
              '& .MuiOutlinedInput-input': { padding: 0 },
              '& .MuiOutlinedInput-notchedOutline': { border: 'unset ' },
              '& .MuiOutlinedInput-root': { fontSize: '0.8rem' }
            }}
          />
          <Box style={{ flexGrow: 1 }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Overview" sx={{ textTransform: 'none' }} />
            <Tab label="List" sx={{ textTransform: 'none' }} />
            <Tab label="Board" sx={{ textTransform: 'none' }} />
            <Tab label="TimeLine" sx={{ textTransform: 'none' }} />
            <Tab label="Calendar" sx={{ textTransform: 'none' }} />
            <Tab label="Workflow" sx={{ textTransform: 'none' }} />
            <Tab label="Dashboard" sx={{ textTransform: 'none' }} />
          </Tabs>
          {activeTab === 0 && (
            <Typography component="div" style={{ padding: '1rem' }}>
              Tab 0 Content
            </Typography>
          )}
          {activeTab === 1 && (
            <Typography component="div" style={{ padding: '1rem' }}>
              Tab 1 Content
            </Typography>
          )}
          {activeTab === 2 && (
            <Box>
            {/* Kanban board */}
            
            <Kanban data={sections} boardId={boardId} />
          </Box>
       
          )}
          {activeTab === 3 && (
            <Typography component="div" style={{ padding: '1rem' }}>
              Tab 3 Content
            </Typography>
          )}
          {activeTab === 4 && (
            <Typography component="div" style={{ padding: '1rem' }}>
              Tab 4 Content
            </Typography>
          )}
          {activeTab === 5 && (
            <Typography component="div" style={{ padding: '1rem' }}>
              Tab 5 Content
            </Typography>
          )}
          {activeTab === 6 && (
            <Typography component="div" style={{ padding: '1rem' }}>
              Tab 6 Content
            </Typography>
          )}
        </Box>      
        </Box>
      </Box>
    </>
  )
}

export default Board