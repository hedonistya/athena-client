import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import {Avatar, CssBaseline, Tooltip, useScrollTrigger} from "@mui/material";
import PropTypes from "prop-types";
import {Search, SearchIconWrapper, StyledInputBase} from "../styles/appbar";
import {useEffect, useState} from "react";
import Fuse from "fuse.js";
import cardState from "../store/cardState";
import {observer} from "mobx-react-lite";
import {authWithGoogleProvider} from "../firebase/";

// Scroll navbar property
const ElevationScroll = (props) => {
  const {children, window} = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};

// Check scroll navbar property
ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const Appbar = observer((props) => {
  const [iconTitle, setIconTitle] = useState('No user');
  const [iconSrc, setIconSrc] = useState('');
  const [query, setQuery] = useState('');
  const fuse = new Fuse(cardState.filterCard, {
    keys: [
      'title',
      'ownerName'
    ]
  });
  const results = fuse.search(query);
  cardState.cardResult = query ? results.map(result => result.item) : cardState.filterCard;

  const getSearch = ({currentTarget = {}}) => {
    const {value} = currentTarget;
    setQuery(value);
  };

  useEffect(() => {
    // Perform localStorage action
    setIconTitle(localStorage.getItem("userEmailAthena"));
    setIconSrc(localStorage.getItem("userAvatarAthena"))
  }, []);

  return (
    <>
      <CssBaseline/>
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{display: {xs: 'none', sm: 'block'}}}
            >
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href='/'>
                Athena
              </a>
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon/>
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Поиск…"
                inputProps={{'aria-label': 'search'}}
                value={query}
                onChange={getSearch}
              />
            </Search>
            <Box sx={{flexGrow: 1}}/>
            <Box>
              <Tooltip title={iconTitle} placement="bottom-start">
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  onClick={authWithGoogleProvider}
                  color="inherit"
                >
                  <Avatar alt={iconTitle}
                          src={iconSrc}/>
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </>
  );
});

export default Appbar;