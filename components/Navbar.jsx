import * as React from 'react';
import {BoxNavbar, BoxRight} from "../styles/navbar";
import {FormControl, IconButton, InputLabel, MenuItem, Select} from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import Fuse from "fuse.js";
import cardState from "../store/cardState";
import {observer} from "mobx-react-lite";

const Navbar = observer(() => {
  const [owner, setOwner] = React.useState('1');
  const name = "Никита Топольсков-Дердяй";
  const fuseAuthor = new Fuse(cardState.card, {
    keys: [
      'author',
    ]
  });
  const fuseListener = new Fuse(cardState.card, {
    keys: [
      'listener',
    ]
  });
  const resultsAuthor = fuseAuthor.search(name);
  const resultsListener = fuseListener.search(name);

  const handleChange = (event) => {
    switch (event.target.value) {
      case 1:
        cardState.filterCard = cardState.card;
        break;
      case 2:
        cardState.filterCard = resultsAuthor.map(result => result.item);
        break;
      case 3:
        cardState.filterCard = resultsListener.map(result => result.item);
        break;
      default:
        break;
    }

    setOwner(event.target.value);
  };

  return (
    <>
      <BoxNavbar>
        <h3>Недавние файлы</h3>
        <BoxRight>
          <FormControl sx={{m: 1, minWidth: 120}} size="small">
            <InputLabel id="demo-select-small">Владелец</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={owner}
              label="Владелец"
              autoWidth={true}
              onChange={handleChange}
            >
              <MenuItem value={1}>Кто угодно</MenuItem>
              <MenuItem value={2}>Я</MenuItem>
              <MenuItem value={3}>Не я</MenuItem>
            </Select>
          </FormControl>
          <IconButton color="primary" aria-label="Перезагрузить страницу">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/">
              <RefreshIcon fontSize="medium"/>
            </a>
          </IconButton>
        </BoxRight>
      </BoxNavbar>
    </>
  )
});

export default Navbar;