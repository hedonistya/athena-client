import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import {
  Avatar, Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, Drawer, Menu, MenuItem, Switch,
  TextField,
  Tooltip
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useEffect, useState} from "react";
import {useTheme} from '@mui/material/styles';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {AppBar, DrawerHeader, drawerWidth} from '../../styles/boardAppbar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import userState from "../../store/userState";
import {observer} from "mobx-react-lite";
import boardState from "../../store/boardState";

const BoardAppbar = observer(() => {
  const [iconTitle, setIconTitle] = useState('No user');
  const [iconSrc, setIconSrc] = useState('');
  const [open, setOpen] = useState(false);
  const [boardTitle, setBoardTitle] = useState('Без названия');
  const theme = useTheme();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [title, setTitle] = useState("");

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpenSidebar(true);
  };

  const handleDrawerClose = () => {
    setOpenSidebar(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateTitle = () => {
    setBoardTitle(title);
    handleClose();
  }

  const handleChange = e => {
    setTitle(e.target.value);
  }

  const saveImage = () => {
    const dataUrl = boardState.board.toDataURL()
    console.log(dataUrl)
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = boardState.sessionId + ".png"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  };

  useEffect(() => {
    // Perform localStorage action
    setIconTitle(localStorage.getItem("userEmailAthena"));
    setIconSrc(localStorage.getItem("userAvatarAthena"))
  }, []);

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
                      onClick={handleClickOpen}>
            {boardTitle}
          </Typography>
          <Box sx={{flexGrow: 1}}/>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={openMenu ? 'long-menu' : undefined}
            aria-expanded={openMenu ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClickMenu}
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
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={handleClose}>Сохранить</MenuItem>
            <MenuItem onClick={saveImage}>Сохранить в png</MenuItem>
            <MenuItem onClick={handleClose}>Выйти</MenuItem>
          </Menu>
          <Box>
            <Tooltip title={iconTitle} placement="bottom-start">
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                color="inherit"
              >
                <Avatar alt={iconTitle}
                        src={iconSrc}
                        sx={{width: 34, height: 34}}/>
              </IconButton>
            </Tooltip>
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{...(open && {display: 'none'})}}
          >
            <MenuIcon sx={{width: 30, height: 30}}/>
          </IconButton>
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
        </DrawerHeader>
        <Divider/>
        <List>
          {userState.users.map((item) =>
            <ListItem key={item.index}>
              <ListItemIcon>
                <Avatar alt={item.name}
                        src={item.photo}
                        sx={{width: 34, height: 34}}/>
              </ListItemIcon>
              <ListItemText primary={item.name}/>
              <Switch edge='end' disabled={item.owner} defaultChecked={item.permission}/>
            </ListItem>
          )}
        </List>
      </Drawer>

      {/*Dialog form*/}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Название проекта</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Напишите название проекта. <br/>Название должно состоять из: <strong>букв</strong> или <strong>цифр</strong>
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
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={updateTitle}>Изменить</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
});

export default BoardAppbar;