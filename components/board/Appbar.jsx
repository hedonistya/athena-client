import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import {
  Alert, Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Drawer,
  IconButton, Menu, MenuItem, TextField, Toolbar, Tooltip, Typography, useTheme
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MailIcon from '@mui/icons-material/Mail';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";
import {addData, postData} from "../../firebase";

//components
import {saveImage} from "../../helpers";
import {AppBar, DrawerHeader, drawerWidth, MessageBox} from "../../styles/boardAppbar";
import {userState} from "../../store";
import {collection, getDocs} from "firebase/firestore";
import {firebase} from "../../firebase/config";

const BoardAppbar = observer(() => {
  const theme = useTheme();
  const [iconTitle, setIconTitle] = useState('No user');
  const [iconSrc, setIconSrc] = useState('https://google.com');
  const [boardTitle, setBoardTitle] = useState('Без названия');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [socket, setSocket] = useState(null);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState('');
  const [chat, setChat] = useState([]);
  const openMenu = Boolean(anchorEl);

  useEffect(() => {
    // Perform localStorage action
    setIconTitle(localStorage.getItem("userEmailAthena"));
    setIconSrc(localStorage.getItem("userAvatarAthena"));
    setLocation(window.location.pathname.replace('/', ''));
  }, []);

  // show menu
  const clickMenu = (event) => {
    setAnchorEl(event.currentTarget);
    localStorage.removeItem('titleAthena');
  };

  // show message
  const handleDrawerOpen = () => {
    const sock = new WebSocket('ws://45.90.35.46:5000/');
    if (!socket) {
      sock.onopen = () => {
        sock.send(JSON.stringify({
          username: userState.username,
          id: location,
          method: "connection"
        }))
      };
      setSocket(sock);
    }

    sock.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      switch (msg.method) {
        case 'connection':
          console.log(`User ${msg.username} connected`);
          break;
        case 'message':
          setChat(prev => [msg, ...prev]);
          break;
        default:
          break;
      }
    };
    setOpenSidebar(true);
  };

  // close message
  const handleDrawerClose = () => {
    setOpenSidebar(false);
  };

  // close menu
  const closeMenu = () => {
    setAnchorEl(null);
  };

  // open modal
  const openModal = () => {
    setOpen(true);
  };

  // close modal
  const closeModal = () => {
    setOpen(false);
    setTitle("");
    setError(false);
  };

  // update title
  const updateTitle = () => {
    if (title.trim().length > 0 && title.trim().length < 32) {
      setBoardTitle(title);
      setTitle("");
      setError(false);
      closeModal();
    } else {
      setError(true);
    }
  };

  // set message
  const typeMessage = e => {
    setMessage(e.target.value);
  };

  // change title
  const changeTitle = e => {
    setTitle(e.target.value);
  };

  // send message
  const sendMessage = () => {
    const date = new Date();
    const current = date.getHours() + ':' + date.getMinutes();
    if (message.trim().length > 0) {
      socket.send(JSON.stringify({
        username: userState.username,
        id: location,
        method: "message",
        content: message,
        date: current,
        messageID: Date.now()
      }))
      setMessage('')
    }
  };

  // save project
  const getSave = async () => {
    let result = 0;
    const querySnapshot = await getDocs(collection(firebase, 'projects'));
    querySnapshot.forEach((doc) => {
      if (doc.data().code === window.location.pathname.replace('/', '') && doc.data().username === localStorage.getItem('displayNameAthena')) {
        result++;
        postData(doc.id, doc.data().code, doc.data().username, doc.data().ownerName, boardTitle).then();
      }
    });

    if (result === 0) {
      axios.get(`http://45.90.35.46:5000/users?id=${window.location.pathname.replace('/', '')}`).then(response => {
        addData(window.location.pathname.replace('/', ''), localStorage.getItem('displayNameAthena'), response.data.owner, boardTitle);
      })
    }
    closeMenu();
  }

  // save as image .jpeg
  const getSaveImage = () => {
    saveImage();
    closeMenu();
  };

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/">
              Athena
            </a>
          </Typography>
          <Typography variant="h7" component="div" sx={{marginLeft: '25px', cursor: 'pointer'}}
                      onClick={openModal}>
            {boardTitle}
          </Typography>
          <Box sx={{flexGrow: 1}}/>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={openMenu ? 'long-menu' : undefined}
            aria-expanded={openMenu ? 'true' : undefined}
            aria-haspopup="true"
            onClick={clickMenu}
          >
            <MoreVertIcon sx={{color: 'white'}}/>
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            anchorEl={anchorEl}
            open={openMenu}
            onClose={closeMenu}
          >
            <MenuItem onClick={getSave}>Сохранить</MenuItem>
            <MenuItem onClick={getSaveImage}>Сохранить в jpeg</MenuItem>
            <MenuItem>
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/">
                Выйти
              </a>
            </MenuItem>
          </Menu>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{...(open && {display: 'none'})}}
          >
            <MailIcon sx={{width: 25, height: 25}}/>
          </IconButton>
          <Box>
            <Tooltip title={iconTitle} placement="bottom-start">
              <Avatar alt={iconTitle}
                      src={iconSrc}
                      sx={{width: 34, height: 34, marginLeft: 3}}/>

            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/*Sidebar*/}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={openSidebar}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
          </IconButton>
          <Typography variant="h6" component="div">
            Сообщения
          </Typography>
        </DrawerHeader>
        <Divider sx={{marginBottom: 1}}/>
        <Box sx={{margin: '0 auto'}}>
          <TextField
            id="outlined-textarea"
            label="Сообщение"
            placeholder="Сообщение"
            maxRows={3}
            type='text'
            multiline
            size='small'
            sx={{width: '18rem'}}
            value={message}
            onChange={typeMessage}
          />
          <IconButton color='primary' onClick={sendMessage}>
            <SendIcon/>
          </IconButton>
        </Box>
        <Box sx={{
          width: '20.3rem',
          margin: '0 auto',
          marginTop: 1.5,
          height: '800px',
          overflowY: 'scroll',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          }
        }}>
          {chat.map(msg =>
            <MessageBox key={msg.messageID}>
              <Box sx={{display: 'flex', flexDirection: 'row'}}>
                <Typography flexWrap='wrap' whiteSpace='pre-wrap' sx={{wordWrap: 'break-word'}} fontSize='13px'
                            fontWeight='bold'>
                  {msg.username}
                </Typography>
                <Typography flexWrap='wrap' whiteSpace='pre-wrap' sx={{wordWrap: 'break-word', marginLeft: '5px'}}
                            fontSize='13px'>
                  {msg.date}
                </Typography>
              </Box>
              <Typography flexWrap='wrap' whiteSpace='pre-wrap' sx={{wordWrap: 'break-word', width: '20.3rem'}}
                          fontSize='15px'>
                {msg.content}
              </Typography>
            </MessageBox>
          )}
        </Box>
      </Drawer>

      {/*Dialog form*/}
      <Dialog open={open} onClose={closeModal}>
        <DialogTitle>Название проекта</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Название должно состоять из: <strong>букв</strong> или <strong>цифр</strong>.
            <br/>Количество символов не должно быть не больше 32
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Название проекта"
            type="text"
            fullWidth
            variant="standard"
            value={title}
            onChange={changeTitle}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Отмена</Button>
          <Button onClick={updateTitle}>Изменить</Button>
        </DialogActions>
        {/*  Error*/}
        {error
          ? <Alert severity="error">Количество символов должно быть от <strong>0</strong> до <strong>32</strong></Alert>
          : <div></div>}
      </Dialog>
    </Box>
  )
});

export default BoardAppbar;