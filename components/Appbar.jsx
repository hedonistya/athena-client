import SearchIcon from '@mui/icons-material/Search';
import {
  AppBar, Avatar, Box, CssBaseline, IconButton, Toolbar, Tooltip, Typography, useScrollTrigger
} from "@mui/material";
import PropTypes from "prop-types";
import {cloneElement, useEffect, useState} from "react";
import Fuse from "fuse.js";
import {observer} from "mobx-react-lite";

// components
import {authWithGoogleProvider} from "../firebase/";
import {cardState} from "../store";
import {Search, SearchIconWrapper, StyledInputBase} from "../styles/appbar";

// Scroll navbar property
const ElevationScroll = (props) => {
  const {children, window} = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
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